(function(){

   /*
    * Scales a series of images to the window height,
    * Relies on data-height and data-width containing
    * original image dimensions
    */
   function ImageScaler() {
      this._prepareDom();
   }

   ImageScaler.prototype._prepareDom = function() {
      this._windowHeight = $(window).height();
      this._container = $('.content');
      this._slides = $('>.slide', this._container);
      this._slides.css('height', this._windowHeight - (EW.app.isNews ? 40 : 0));
      this._slideImages = $('img.swipe', this._container);
      this._slideImages.attr('height', this._windowHeight);
      this._setImageAttributes();
      this._container.width(this._getCombinedWidth(this._slides));
   };

   ImageScaler.prototype.display = function(){
      this._container.css('opacity', 1);
   };

   ImageScaler.prototype._setImageAttributes = function() {
      var ratio, $el;
      this._slideImages.each(function(idx, el){
         $el = $(el);
         ratio = this._windowHeight / $el.attr('data-height');
         $el.attr('width', Math.round($el.attr('data-width') * ratio));
         $el.css('visibility', 'visible');
      }.bind(this));
   };

   ImageScaler.prototype._getCombinedWidth = function(jqArr) {
      var total = 0;
      jqArr.each(function(){
         total += $(this).outerWidth();
      });
      return total;
   };

   EW.ImageScaler = ImageScaler;

})();
