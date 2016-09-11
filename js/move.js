var _box=document.getElementById('contain');
var _p=document.getElementsByClassName('main')[0];
// 谁 让谁  干什么

function mouseWheel(obj,fn){
    if(window.navigator.userAgent.indexOf('Firefox')!=-1){
        //火狐只识别DOMMouseScroll的鼠标滚动事件
        //其他的是onmousewheel()
        obj.addEventListener('DOMMouseScroll',wheelFn,false);
    }else {
        obj.onmousewheel=wheelFn;
    };
    function wheelFn(ev){
        var oEv=ev||event;
        var direct=oEv.wheelDelta ? oEv.wheelDelta<0 : oEv.wheelDelta>0;
        fn && fn(direct);
        if(window.event){
            ev.returnValue = false;
            return false;
        }
        else{
            ev.preventDefault();
        }
    }
}

mouseWheel(_box,function(dd){
    var tR=_p.offsetTop;
    //_scroll.offsetTop的最大值是==》_box.offsetHeight+_box.offsetTop-_scroll.offsetHeight-30
    v=_box.offsetHeight+_box.offsetTop-30
    r=_box.offsetHeight+_box.offsetTop-_p.offsetHeight-30
    rat=v/r;
    console.log(tR);
    if(dd){
        tR=tR+10;
        // if(tR<=970) tR=970;
        if(tR>0) tR=0;
    }else{
        tR=tR-10;
        if(tR<-970) tR=-970;
        //if(tR>0) tR=0;
    }
    _p.style.top=tR+'px';
});
