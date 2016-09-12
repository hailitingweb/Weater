/**
 * Created by hxsd on 2016/9/10.
 */
window.onload = function () {
    var oInpt = document.getElementById("oInp");
    var oLoad = document.getElementById("oLoding");
    var chsCity = document.getElementById("chsCity");
    var getIn = document.getElementById("getIn");
    var oDiv = document.getElementById("oDiv");
    var oDivShov=document.getElementById("oDivShov");
    var showDiv=document.getElementById("showDiv");
    var contain=document.getElementById("contain");
    var cPst=document.getElementById("pst");
    //获取键盘事件
    document.onkeydown = function (event) {
        var ev = event || window.event || arguments.callee.caller.arguments[0];//火狐情况
        if (ev.keyCode == 13) {
            referTo();
            return false;
        }
        ;
    };

    //获取天气状况
    function referTo(oInp,Div) {
        var url = "http://wthrcdn.etouch.cn/weather_mini?city=" + oInp;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function () {
            oLoad.style.display = "none";
            if (xhr.readyState == 4 && xhr.status == 200) {
                var data = JSON.parse(xhr.responseText);
                var oTemp;
                if (data.data) {
                    var oPic = wicon[data.data.forecast[0].type];
                    var oPicTmor = wicon[data.data.forecast[1].type];
                    var oPicYest = wicon[data.data.yesterday.type];
                    /*partone*/
                   // oTemp = "<img src='images/" +oPic + "' class='bigpic'>";
                    oTemp = "<p class='wendu'>" + data.data.wendu + "℃</p>";//获取到当日温度
                    oTemp += "<p class='ganmao'>" + data.data.ganmao + "</p>";//获取到当日温度
                    oTemp += "<p>" + data.data.forecast[0].type + "</p>";//天气状况
                    oTemp += "<p>" + data.data.forecast[0].fengli + "</p>";//天气状况

                    oTemp += "<span>今天<sup>" + data.data.forecast[0].high + "</sup><sup>" + data.data.forecast[0].low + "</sup></span>";
                    oTemp += "<span>明天<sup>" + data.data.forecast[0].high + "</sup><sup>" + data.data.forecast[1].low + "</sup></span>";
                    /*parttwo*/
                    var date = new Date();
                    var wekArr = ["星期七", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
                    var oDay = wekArr[date.getDay()];
                    /*昨天*/
                    oTemp += "<ul>";
                    var d = data.data.yesterday.date;//获取到date
                    //日期会有单数，填日期空格
                    if (d.length < 6) d = " " + d;
                    var strMonY = d.substr(0, 3);//日期
                    var strDayY = d.substr(3, 3);//星期、、str.substr(第几位开始，几位);
                    oTemp += "<li><p>" + strDayY + "</p>";//天气状况
                    oTemp += "<p>" + strMonY + "</p>";//天气状况
                    oTemp += "<p>" + data.data.yesterday.type + "</p>";//天气状况
                    oTemp += "<img src='images/" + oPicYest + "'>";
                    oTemp += "<p>" + data.data.yesterday.fx + "</p>";//风向
                    oTemp += "<p>" + data.data.yesterday.high + "</p>";//最高
                    oTemp += "<p>" + data.data.yesterday.low + "</p>";//最低
                    oTemp += "</li>";
                    /*今天 将来*/
                    for (var i = 0; i < data.data.forecast.length; i++) {
                        var a = data.data.forecast[i].date;//获取到date
                        //日期会有单数，填日期空格
                        if (a.length < 6) a = " " + a;
                        var strMon = a.substr(0, 3);//日期
                        var strDay = a.substr(3, 3);//星期、、str.substr(第几位开始，几位);
                        if (oDay == strDay) strDay = "今天";
                        oTemp += "<li><p>" + strDay + "</p>";//天气状况
                        oTemp += "<p>" + strMon + "</p>";//天气状况
                        oTemp += "<p>" + data.data.forecast[i].type + "</p>";//天气状况
                        var oPicD = wicon[data.data.forecast[i].type];
                        oTemp += "<img src='images/" + oPicD + "'>";
                        oTemp += "<p>" + data.data.forecast[i].fengxiang + "</p>";//风向
                        oTemp += "<p>" + data.data.forecast[i].high + "</p>";//最高
                        oTemp += "<p>" + data.data.forecast[i].low + "</p></li>";//最低
                    }
                    oTemp += "</ul>";
                    Div.innerHTML = oTemp;
                }else {
                    Div.innerHTML = "<p class='wearing'>对不起，您所选择的城市暂时没有数据，给您带来不便，敬请谅解！</p>";
                }
            }
        };
        xhr.send(null);
        return false;
    };
    //获取城市---------------------------------------------------------------------------------
    function runCity() {
        var chsDiv = document.createElement("div");
        chsDiv.className = "citydiv";
        chsDiv.id="citydiv";
        var xhr = new XMLHttpRequest();
        var chsLi = "<ul>";
        xhr.open("GET", "js/city.json", true);
        xhr.onreadystatechange = function () {
           if (xhr.readyState == 4 && xhr.status == 200) {
                var Pcity = JSON.parse(xhr.responseText);

                //省
                for (var i = 0; i < Pcity.length; i++) {
                    chsLi += "<li><h2>" + Pcity[i].name;
                    chsLi += "</h2><span>";
                    for (var j = 0; j < Pcity[i].city.length; j++) {
                        chsLi += "<p>" + Pcity[i].city[j].name + "</p>";
                        chsLi +="<div class='i'>";
                        for (var k = 0; k < Pcity[i].city[j].area.length; k++) {
                            chsLi += "<i>" + Pcity[i].city[j].area[k] + "</i>";
                        };
                        chsLi +="</div>";
                    }
                    chsLi += "</span>";
                    chsLi += "</li>";
                };
                chsLi += "</ul>";
                chsDiv.innerHTML = chsLi;
            };
        };
        xhr.send(null);
        //加进Div的城市选择 showDiv
        getIn.appendChild(chsDiv);
        chsCity.onclick = function () {
            chsDiv.style.opacity = 1;
            //为省份加鼠标划过与点击颜色
            var cityDiv=document.getElementById("citydiv");
            var chsUlPc = cityDiv.getElementsByTagName("ul")[0];
            var chsLiPc = chsUlPc.getElementsByTagName("li");
            //两级连动
            for (var i = 0; i < chsLiPc.length; i++) {
                var aP = "";
                chsLiPc[i].index = i;
                //点击一次
                chsLiPc[i].onclick = function () {
                    for (var j = 0; j < chsLiPc.length; j++) {
                        chsLiPc[j].style.display = 'none';
                    }
                    var chsLiHfont = this.getElementsByTagName("h2")[0];
                    this.className = "oli";
                    //获取省份input值
                    oInpt.value = chsLiHfont.innerHTML;
                    //找到p带的市------------------------
                    var spanP = this.getElementsByTagName("p");
                    //找到i带的县 区-----------------
                    var chsIDiv=this.getElementsByTagName("div")[0];
                    var chsI=chsIDiv.getElementsByTagName("i");
                    //----------------------------
                    for (var m = 0; m < spanP.length; m++) {
                        //点击两次
                        spanP[m].onclick = function () {
                            for (var k = 0; k < spanP.length; k++) {
                                spanP[k].style.display = 'none';
                            }
                            this.style.display=chsIDiv.style.display="inline-block";
                            aP = this.innerHTML;
                            this.className = "oli";
                            var chsI = chsIDiv.getElementsByTagName("i");
                            for(var j=0;j<chsI.length;j++){
                                //点击三次
                                chsI[j].onclick=function(){
                                    getIn.removeChild(chsDiv);
                                    getIn.className = "log-in";
                                    showDiv.style.display="block";
                                    showDiv.innerHTML = "<h5>" + chsLiHfont.innerHTML + "</h5><p>"+this.innerHTML+ "</p><i>" + aP + "</i>";
                                    oDivShov.innerHTML=" ";
                                    oDiv.innerHTML=referTo(aP,oDiv);
                                    console.log(aP);
                                }
                            }
                            return aP;
                        };
                    }
                    ;
                    oInpt.value = chsLiHfont.innerHTML + " " + aP;
                    //显示选中的城市
              };
            };
        };
    };
    //点击事件-------------------------------------------
    //选择城市页面------------------------------------
    cPst.onclick=function(){
        runCity();
        getIn.className="form sigin-in";
        showDiv.style.display="none";
        chsCity.style.display="block";
    };
    //-----------------------------------------------------------------
    //----------------------------------------
    //一开始 杭州的效果
    var bac=document.getElementsByClassName('bac02')[0];
    bac.style.opacity="0";
    bac.style.backgroundSize="200% 130%";
    oDivShov.innerHTML=referTo(oInpt.value,oDivShov);
    function btnClick() {
        document.getElementById("oBtn").onclick = function () {
            getIn.className="log-in";
            oLoad.style.display = "block";
            oDivShov.innerHTML=" ";
            oDiv.innerHTML=referTo(oInpt.value,oDiv);
        };
    };
    //-------------------------------------------
    btnClick();
};