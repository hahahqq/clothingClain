import { Message } from 'element-ui';
var CreatedOKLodop7766 = null;


//====判断是否需要安装CLodop云打印服务器:====
const needCLodop=function(){
    try {
        var ua = navigator.userAgent;
        if (ua.match(/Windows\sPhone/i) != null) return true;
        if (ua.match(/iPhone|iPod/i) != null) return true;
        if (ua.match(/Android/i) != null) return true;
        if (ua.match(/Edge\D?\d+/i) != null) return true;

        var verTrident = ua.match(/Trident\D?\d+/i);
        var verIE = ua.match(/MSIE\D?\d+/i);
        var verOPR = ua.match(/OPR\D?\d+/i);
        var verFF = ua.match(/Firefox\D?\d+/i);
        var x64 = ua.match(/x64/i);
        if ((verTrident == null) && (verIE == null) && (x64 !== null))
            return true; else
            if (verFF !== null) {
                verFF = verFF[0].match(/\d+/);
                if ((verFF[0] >= 42) || (x64 !== null)) return true;
            } else
                if (verOPR !== null) {
                    verOPR = verOPR[0].match(/\d+/);
                    if (verOPR[0] >= 32) return true;
                } else
                    if ((verTrident == null) && (verIE == null)) {
                        var verChrome = ua.match(/Chrome\D?\d+/i);
                        if (verChrome !== null) {
                            verChrome = verChrome[0].match(/\d+/);
                            if (verChrome[0] >= 42) return true;
                        };
                    };
        return false;
    } catch (err) { return true; };
};

//====页面引用CLodop云打印必须的JS文件：====
if (needCLodop()) {
    var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
    var oscript = document.createElement("script");
    oscript.src = "http://localhost:8000/CLodopfuncs.js?priority=1";
    head.insertBefore(oscript, head.firstChild);

    //引用双端口(8000和18000）避免其中某个被占用：
    oscript = document.createElement("script");
    oscript.src = "http://localhost:18000/CLodopfuncs.js?priority=0";
    head.insertBefore(oscript, head.firstChild);
};

//====获取LODOP对象的主过程：====
const getLodop=function(oOBJECT, oEMBED){
    var LODOP;
    try {
        var isIE = (navigator.userAgent.indexOf('MSIE') >= 0) || (navigator.userAgent.indexOf('Trident') >= 0);
        var is64IE = isIE && (navigator.userAgent.indexOf('x64') >= 0);
        //=====如果页面有Lodop就直接使用，没有则新建:==========
        if (needCLodop()) {
            try { LODOP = getCLodop(); } catch (err) { };
        }
        else if (CreatedOKLodop7766 == null) {
            LODOP = document.createElement("object");
            LODOP.setAttribute("width", 0);
            LODOP.setAttribute("height", 0);
            LODOP.setAttribute("style", "position:absolute;left:0px;top:-100px;width:0px;height:0px;");
            if (isIE) LODOP.setAttribute("classid", "clsid:2105C259-1E0C-4534-8141-A753534CB4CA");
            else LODOP.setAttribute("type", "application/x-print-lodop");
            document.documentElement.appendChild(LODOP);
            CreatedOKLodop7766 = LODOP;
        } else
            LODOP = CreatedOKLodop7766;
            LODOP.SET_LICENSES("","3E21A8D7F74B354352116BE98B366C85","C94CEE276DB2187AE6B65D56B3FC2848","");
       // LODOP.SET_LICENSES("","062CEFF8751CF129372A336906DB9198","C94CEE276DB2187AE6B65D56B3FC2848","");
        return LODOP;

    } catch (err) { Message('CLodop云打印服务未启动'); return 1; };
};
export  { getLodop }

