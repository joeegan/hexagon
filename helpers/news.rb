module Sinatra::News

   def news_views_path
      APP_ROOT + '/views/pages/news/'
   end

   def news_images_path
      APP_ROOT + '/images/static/news/'
   end

   def dirs
      Dir[news_views_path + '*'].map { |f| File.basename(f) }.sort.each{|dir| -dir.split('_').first.gsub('.','').to_i}
   end

   def news
      news = []
      dirs.each_with_index do |dir, i|
         news.push({
          :order => i,
          :date => dir.split('_').first,
          :title => dir.split('_').last.gsub('-',' '),
          :text => File.read(news_views_path + dir + '/0.txt'),
          :img_src => news_images_path + dir + '/0.jpg'
         })
      end
      news.sort_by {|i| -i[:order]}
   end

end