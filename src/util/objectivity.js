


const nscreenexCodeFun = function(statussum, jsondatakexian) {

  try {
        if (statussum == 1) {
            myextension.delphicallback(JSLOGINPAGELOAD, 0);//登录页面加载结束调用
        } else if (statussum == 2) {
            myextension.delphicallback(JSSAVEUSERPW, JSON.stringify(jsondatakexian));
        } else if (statussum == 3) {
            myextension.delphicallback(JSLOGINBUTTONCLICK, JSON.stringify(jsondatakexian));
        } else if (statussum == 4) {
            myextension.delphicallback(JSGETPAYMONEY, jsondatakexian);//客显价格显示/修改
        } else if (statussum == 5) {
            myextension.delphicallback(JSPAYBUTTONCLICK, 0);//客显确认支付
        } else if (statussum == 6) {
            myextension.delphicallback(JSCANCELPAY, 0);//客显取消/关闭
        }

    } catch (err) {

    }

}
export { nscreenexCodeFun }
