module Sinatra::Structure

  def structure
    [
      {
          :title => "Home",
          :solid_nav => true,
          :images => [1,2,3,4,5,6,7,8,9,10]
      },
      {
        :title => "Projects",
        :images => [],
        :children => [
          {:title => "Mayfair", :images => [1,2,3,4,5,6,7,9,10,11,12,13], :text_pos => [2]},
          {:title => "Bayswater", :images => [0,1,2,3]},
          {:title => "Hampstead", :images => [2,1,3,4,5,6,7,8,9,10,11,12], :text_pos => [1]},
          {:title => "Hamilton Park West", :images => [1,2,3,4,5,6,7,8,9,10], :text_pos => [1,8]},
          {:title => "Notting Hill", :images => [1,2]},
          {:title => "Islington Loft", :images => [1,2,3], :text_pos => [1]},
          {:title => "Queen's Park", :images => [1,2], :text_pos => [1]},
          {:title => "Timber Room", :images => [1,2,3,4], :text_pos => [2]},
          {:title => "Riverview Gardens", :images => [1,2,3], :text_pos => [1]},
          {:title => "Bespoke Furniture", :images => ["n1","n2", "e1","e2","e3", "nt1", "nt2"], :text_pos => [0,1,4]}
        ]
      },
      #{
      #  :title => "Consultancy",
      #  :theme => "light",
      #  :images => ["1"],
      #  :children => [
      #    {:title => "Bulgari", :solid_nav => true, :images => [1], :text_pos => [0], :text_pos_bottom => true}
      #  ]
      #},
      {
        :title => "News",
        :images => []
      },
      {
        :title => "About",
        :theme => "light",
        :images => [0],
        :solid_nav => true
      },
      {
        :title => "Careers",
        :images => [1], :text_pos => [1],
        :theme => "light",
        :solid_nav => true
      }
    ]

  end

end
