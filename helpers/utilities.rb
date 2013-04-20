module Sinatra::Utilities

  def current_primary
    request.path_info.match(/^\/([a-z0-9-]*)/)[1]
  end

  def current_secondary
    request.path_info.match(/([a-z0-9-]*)$/)[1]
  end

  def current_hash
    structure.select {|k| k[:title].downcase == current_primary}[0]
  end

  def current_secondary_hash
     current_hash[:children].select {|k| convert_to_url_token(k[:title]) == current_secondary}[0]
  end

  def nav_top
    structure.select {|k| !k.has_key?(:bottom_nav)}
  end

  def nav_bottom
    structure.select {|k| k.has_key?(:bottom_nav)}
  end

  def is_text_pos_bottom hash
     hash.has_key?(:text_pos_bottom) ? " bottom" : ""
  end

  def page_theme
    current_hash && current_hash.has_key?(:theme) ? current_hash[:theme] : "dark"
  end

  def is_project_css
     current_primary == 'projects' ? " project" : ""
  end

  def is_news_css
    @is_news ? " news" : ""
  end

  def is_home_css
    @is_home ? " home" : ""
  end

  def device_css
     env['mobvious.device_type'] == :desktop ? " desktop" : " mobile"
  end

  def solid_nav
   hash = @is_secondary ? current_secondary_hash : current_hash
   hash && hash.has_key?(:solid_nav) ? " solid-nav" : ""
  end

  def convert_to_url_token string
    string.gsub(' / ','-').gsub(' ','-').gsub('?','').gsub('&','and').gsub("'",'').downcase
  end

  def is_last? idx, array_name
    return true if (idx == array_name.length - 1)
  end

  def url_match? input
    if input.class == String
      return true if request.fullpath.include? input
    elsif input.class == Hash
      input.each_value do |str|
        return true if request.fullpath.include? str
      end
    elsif input.class == Array
      input.each do |str|
        return true if request.fullpath.include? str.to_s
      end
    end
  end

  def selected_primary str
    current_primary == str ? "selected" : ""
  end

  def selected_secondary str
    current_secondary == str ? "selected" : ""
  end

  def has_secondary_nav secondary_nav, primary_token
    !secondary_nav.nil? and url_match?("/"+primary_token)
  end

  def get_token h
    h[:rewrite] || convert_to_url_token(h[:title])
  end

  def is_yield_pos idx, h
    !h[:text_pos].nil? and idx == h[:text_pos][0]
  end

  def is_yield_pos_b idx, h
    !h[:text_pos].nil? and idx == h[:text_pos][1]
  end

  def is_yield_pos_c idx, h
    !h[:text_pos].nil? and idx == h[:text_pos][2]
  end

  def is_yield_on_img h
    !h[:yield_on_image].nil?
  end

  def has_images h
    defined? h[:images].size > 0
  end

  def has_multiple_images h
    h[:images].size > 1
  end

  def is_last arr, idx
    idx == arr.size - 1
  end

  def get_style style
    str = ""
    if style.has_key?(:right)
      str += "right: #{style[:right]}px;"
    end
    if style.has_key?(:left)
      str += "left: #{style[:left]}px;"
    end
    if style.has_key?(:bottom)
      str += "bottom: #{style[:bottom]}px;"
    end
    if style.has_key?(:top)
      str += "top: #{style[:top]}px;"
    end
    if style.has_key?(:color)
      str += "color: #{style[:color]}"
    end
    str
  end

  def partial(template, *args)
    template_array = template.to_s.split('/')
    template = template_array[0..-2].join('/') + "/_#{template_array[-1]}"
    options = args.last.is_a?(Hash) ? args.pop : {}
    options.merge!(:layout => false)
    if collection = options.delete(:collection) then
      collection.inject([]) do |buffer, member|
        buffer << haml(:"#{template}", options.merge(:layout =>
        false, :locals => {template_array[-1].to_sym => member}))
      end.join("\n")
    else
      haml(:"/partials#{template}", options)
    end
  end

  def stylesheet name
    "<link href='/css/" + name + ".css' media='screen' rel='stylesheet' type='text/css' />"
  end

  def javascript name
    "<script src='/js/" + name + ".js'></script>"
  end

  def img_builder(path, is_last)
    f = FastImage.size(path)
    last = is_last ? ' last' : ''
    haml_tag :img, :class => 'swipe' + last,
                   :src => path,
                   :"data-height" => f[1].to_s,
                   :"data-width" => f[0].to_s,
                   :"height" => f[1].to_s,
                   :"width" => f[0].to_s
  end

  def img_path img
    prefix = request.path_info.nil? ? "/home" : request.path_info
    if request.url.index(":4567")
      request.scheme + '://' + request.host + ":4567/images/static" + prefix + "/#{img}.jpg"
    else
      request.scheme + '://' + request.host + "/images/static" + prefix + "/#{img}.jpg"
    end
  end

end