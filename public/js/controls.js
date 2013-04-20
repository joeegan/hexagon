(function(){

   function Controls(advancedControlsEnabled) {
      this._advancedControlsEnabled = advancedControlsEnabled;
      this._prepareDom();
      this._attachEvents();
      this._blink(this._nextControl, 3, 200);
   }

   Controls.prototype._blink = function(el, times, speed) {
      var i = 0;
      while (i<times) {
         el.fadeIn(speed).delay(100).fadeOut(speed);
         i++;
      }
      el.fadeIn();
   };

   Controls.prototype._prepareDom = function() {
      var controlHeight = parseInt(EW.app.Slides.windowHeight, 10) - Controls.SCROLLBAR_HEIGHT;
      this._nextControl = $('.control-next div');
      this._prevControl = $('.control-prev div');
      this._nextFirstControl = $('.next-first');
      if (this._advancedControlsEnabled) {
         this._nextControl.height(controlHeight);
         this._prevControl.height(controlHeight);
      } else {
         this._nextControl.remove();
         this._prevControl.remove();
      }
      this._nextFirstControl.height(controlHeight);
      if (EW.app.Slides.slideWrapWidth < EW.app.Slides.windowWidth) {
         this._nextFirstControl.remove();
      }
   };

   Controls.prototype._attachEvents = function(){
      if (this._advancedControlsEnabled) {
         this._prevControl.on('click', this._handlePrevClick.bind(this));
         this._nextControl.on('click', this._handleNextClick.bind(this));
      }
      this._nextFirstControl.on('click', this._handleNextClick.bind(this, 1));
   };

   Controls.prototype.enableDisableControls = function(){
      var currentLeftPos = EW.app.iScroll.x;

      if (currentLeftPos == EW.app.Slides.leftPosOfSlideWrapFlushRight) {
         if (this._advancedControlsEnabled) {
            this._enableControl(this._prevControl);
            this._blink(this._prevControl, 1, 400);
            this._disableControl(this._nextControl);
         }
      } else if (currentLeftPos < 100 && currentLeftPos > -100) {
         this._nextFirstControl.fadeIn();
         if (this._advancedControlsEnabled) {
            this._disableControl(this._prevControl);
            this._enableControl(this._nextControl);
         }
      } else {
         this._nextFirstControl.fadeOut();
         if (this._advancedControlsEnabled) {
            this._enableControl(this._prevControl);
            this._enableControl(this._nextControl);
         }
      }
   };

   Controls.prototype._enableControl = function(el) {
      el.removeClass('disabled');
   };

   Controls.prototype._disableControl = function(el) {
      el.addClass('disabled');
   };

   Controls.prototype._handleNextClick = function(idx) {
      var pos, leftPos, match;

      if ($.isNumeric(idx)) {
         pos = EW.app.Slides.leftPosArray[idx];
      } else {
         leftPos = EW.app.iScroll.x;
         match = EW.app.Slides.getClosestMatch(EW.app.Slides.leftPosArray, leftPos);
         pos = EW.app.Slides.leftPosArray[EW.app.Slides.leftPosArray.indexOf(match) + 1];
      }

      function init() {
         if (pos > EW.app.Slides.leftPosOfSlideWrapFlushRight) {
            EW.app.iScroll.scrollTo(pos, 0, Controls.SLIDE_SPEED);
         } else {
            EW.app.iScroll.scrollTo(EW.app.Slides.leftPosOfSlideWrapFlushRight, 0, Controls.SLIDE_SPEED);
         }
      }

      init();

   };

   Controls.prototype._handlePrevClick = function() {
      var pos = EW.app.Slides.getClosestMatch(EW.app.Slides.leftPosArray, EW.app.iScroll.x);
      var idx = EW.app.Slides.leftPosArray.indexOf(pos) - 1;
      if (idx == -1 || idx == 0) {
         if (EW.app.Slides.isSolidNav) {
           EW.app.iScroll.scrollTo(EW.app.Slides.leftPosArray[0], 0, Controls.SLIDE_SPEED);
         } else {
            EW.app.iScroll.scrollTo(EW.app.Slides.leftPosArray[0], 0, Controls.SLIDE_SPEED);
         }
      } else {
         EW.app.iScroll.scrollTo(EW.app.Slides.leftPosArray[idx], 0, Controls.SLIDE_SPEED);
      }
   };

   Controls.SLIDE_SPEED = 700;

   Controls.SCROLLBAR_HEIGHT = 0;

   EW.Controls = Controls;

})();
