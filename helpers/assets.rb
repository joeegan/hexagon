module Sinatra::Assets

  assets {

    # The second parameter defines where the compressed version will be served.
    # (Note: that parameter is optional, AssetPack will figure it out.)
    js :app, '/app.js', [
      '/js/vendor/jquery-1.8.2.min.js',
      '/js/polyfills.js',
      '/js/vendor/jquery.hoverIntent.js',
      '/js/vendor/iscroll.js',
      '/js/namespace.js',
      '/js/slides.js',
      '/js/customevents.js',
      '/js/imagescaler.js',
      '/js/controls.js',
      '/js/application.js'
    ]

    css :application, '/app.css', [
      '/css/normalize.css',
      '/css/html5bp.css',
      '/css/application.css',
      '/css/nav.css',
      '/css/scrollbar.css',
      '/css/gallery.css'
    ]

    js_compression :closure, :level => "SIMPLE_OPTIMIZATIONS"
    css_compression :yui
    prebuild true
  }
end


