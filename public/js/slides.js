(function($) {

function Slides(container) {
   this.windowHeight = $(window).height();
   this.windowWidth = $(window).width();
   this.container = $(container);
   this.slideWrap = $('>.content', this.container);
   this.slides = $('>.slide', this.slideWrap);
   this.slideWrapWidth = this.slideWrap.width();
   this.nav = $('#nav');
   this.calculateLeftPosOfSlideWrapFlushRight();
   if ($(".home").length) {
      this.leftPosArray = this.calculateLeftPosArrayForHome();
   } else {
      this.leftPosArray = this.calculateLeftPosArray();
   }
}

Slides.prototype.expandWrapper = function(){
   $('#wrapper').animate({ 'margin-left' : 0});
   this.slideWrapExpanded = true;
};

Slides.prototype.slideWrapExpanded = false;

Slides.prototype.calculateLeftPosOfSlideWrapFlushRight = function() {
      this.leftPosOfSlideWrapFlushRight = ($('body').width() - this.slideWrapWidth);
};

Slides.prototype.getClosestMatch = function (arr, num) {
    var curr = arr[0];
    var diff = Math.abs (num - curr);
    for (var val = 0; val < arr.length; val++) {
        var newDiff = Math.abs (num - arr[val]);
        if (newDiff < diff) {
            diff = newDiff;
            curr = arr[val];
        }
    }
    return curr;
};

Slides.prototype.calculateLeftPosArray = function(){
   var leftPos = 0,
       arr = [0];

   this.slides.each(function(idx, el){
      leftPos = parseInt($(el).outerWidth());
      if (idx != 0) {
        leftPos += arr[idx];
      } else {
        leftPos -= (this.nav.width() + 3);
      }
      arr.push(leftPos);
   }.bind(this));

   return arr.map(function(num){
      return -num;
   });
};


Slides.prototype.calculateLeftPosArrayForHome = function(){
   var leftPos = 0,
      arr = [-(this.nav.width() + 3)];

   this.slides.each(function(idx, el){
      leftPos = parseInt($(el).outerWidth());
      leftPos += arr[idx];
      arr.push(leftPos);
   }.bind(this));

   return arr.map(function(num){
      return -num;
   });
};

Slides.prototype.leftPosOfSlideWrapFlushRight = 0;

EW.Slides = Slides;

})(jQuery);
