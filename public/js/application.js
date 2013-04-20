(function (EW, $, iScroll) {

   EW.app = {};
   EW.app.isNews =  !!$("body.news").length;

   var isSolidNav = !! $("body.solid-nav").length;
   var isProject = !! $("body.project").length;
   var isNews = !! $("body.news").length;
   var isHome = !! $("body.home").length;

   disableImageDrag();
   if (isTouchDevice()) {
      disableVerticalScrolling();
   }
   initScaler();

   if (isProject || isNews || isHome) {
      initSlides();
      initIScroll();
      $(window).on('resizethrottled', handleViewportChange);
   }  else {
      $(window).on('resizethrottled', initScaler);
   }

   $('a.projects').on('click', function(ev){
      if (!isProject) {
         $('ul.secondary').toggleClass('none');
      }
      ev.preventDefault();
   });

   window.onorientationchange = handleViewportChange;

   function initIScroll(){
      EW.app.iScroll = new iScroll('wrapper', {
         zoom: false,
         bounce: false,
         bounceLock: true,
         desktopCompatibility: true,
         fixedScrollbar: true,
         scrollbarClass: 'myScrollbar',
         hScrollbar: !isTouchDevice(),
         hideScrollbar: true,
         useTransition:true,
         vScrollbar: false,
         onBeforeScrollMove: function () {
            if (EW.app.Slides.isSolidNav && !EW.app.Slides.slideWrapExpanded) {
               EW.app.Slides.expandWrapper();
            }
            EW.app.Controls.enableDisableControls();
         },
         onScrollEnd: function () {
            EW.app.Controls.enableDisableControls();
         }
      });
   }

   function initSlides() {
      initScaler();
      EW.app.Slides = new EW.Slides("#wrapper", isSolidNav);
      EW.app.Controls = new EW.Controls(!isTouchDevice());
   }

   function initScaler(){
      EW.app.ImageScaler = new EW.ImageScaler();
      EW.app.ImageScaler.display();
   }

   function handleViewportChange() {
      EW.app.ImageScaler = null;
      EW.app.Slides = null;
      EW.app.Controls = null;
      initSlides();
      EW.app.iScroll.refresh();
   }

   function disableImageDrag() {
      $("img").bind("dragstart", function () {
         return false;
      });
   }

   function isTouchDevice() {
      if (navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad|android)/)) {
         return true;
      } else {
         return false;
      }
   }

   function disableVerticalScrolling(){
      var xStart, yStart = 0;
      document.addEventListener('touchstart', function (e) {
         xStart = e.touches[0].screenX;
         yStart = e.touches[0].screenY;
      });
      document.addEventListener('touchmove', function (e) {
         var xMovement = Math.abs(e.touches[0].screenX - xStart);
         var yMovement = Math.abs(e.touches[0].screenY - yStart);
         if ((yMovement * 3) > xMovement) {
            e.preventDefault();
         }
      });
   }

})(EW, jQuery, iScroll);