// adds mousewheelstart and mousewheelstop to jquerys events
// dependant on jquery and jquery.mousewheel

(function(){

    var special = jQuery.event.special,
        uid1 = 'D' + (+new Date()),
        uid2 = 'D' + (+new Date() + 1),
        uid3 = 'D' + (+new Date() + 2);

    special.resizethrottled = {
        latency: 300,
        setup: function() {
            var timer;
            var handler = function(evt){
                var _self = this,
                    _args = arguments;

                if (timer) {
                    clearTimeout(timer);
                }

                timer = setTimeout( function(){
                    timer = null;
                    evt.type = 'resizethrottled';
                    jQuery.event.handle.apply(_self, _args);
                }, special.resizethrottled.latency);
            }
            $(window).bind('resize', handler).data(uid3, handler);
        },
        teardown: function() {
            $(window).unbind('resize', jQuery(this).data(uid3));
        }
    };

})();