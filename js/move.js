var contain = document.getElementById('contain');
var main = document.getElementsByClassName('main')[0];
// 谁 让谁  干什么
function mouseWheel(obj, fn) {
    if (window.navigator.userAgent.indexOf('Firefox') != -1) {
        //火狐只识别DOMMouseScroll的鼠标滚动事件
        //其他的是onmousewheel()
        obj.addEventListener('DOMMouseScroll', wheelFn, false);
    } else {
        obj.onmousewheel = wheelFn;
    }
    ;
    var i=0;
    function wheelFn(ev) {
        var oEv = ev || event;
        var direct = oEv.wheelDelta ? oEv.wheelDelta < 0 : oEv.wheelDelta > 0;
        fn && fn(direct);
        if (window.event) {
            ev.returnValue = false;
            fn||fn();
            //-------------------------------------
            var oTop=main.offsetTop;
            if (ev.wheelDelta) {
                if (ev.wheelDelta > 0) {
                    oTop += 100;
                     if (oTop > 0) {
                        oTop = 0;
                     }
                    if (oTop < -300) {
                        oTop = -300;
                    }
                 }
                if (ev.wheelDelta<0) {
                   oTop -= 100;
                    if (oTop < -300) {
                        oTop = -300;
                    }
                    if (oTop > 0) {
                        oTop = 0;
                    }
                }
                main.style.top = oTop + "px";
            }
            //console.log(oTop);
            //========================================
            return false;
        }
        else {
            ev.preventDefault();
        }
    }
};
mouseWheel(contain, function () {});













