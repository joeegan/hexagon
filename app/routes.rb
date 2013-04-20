get "/" do
   @is_home = true
   haml :"layouts/application"
end

get "/consultancy" do
   redirect '/consultancy/bulgari'
end

get "/news" do
   @is_news = true
   haml :"layouts/application"
end


get "/:primary" do
   @hash = current_hash
   if current_hash.nil?
      haml :"layouts/error"
   else
      haml :"layouts/application"
   end
end

get "/:primary/:secondary" do
   @is_secondary = true
   @show_projects_nav = true
   if current_hash.nil? or current_secondary_hash.nil?
      haml :"layouts/error"
   else
      @hash = current_secondary_hash
      haml :"layouts/application"
   end
end

error do
   haml :"layouts/error"
end

not_found do
   haml :"layouts/error"
end