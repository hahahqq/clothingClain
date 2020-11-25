import { getLodop } from '@/assets/js/LodopFuncs' //导入模块
import commonSend from '@/api/api'
// import { getHomeData } from '@/api/index'
import { getHomeData, getPrintData, getOthersData, getUserInfo } from '@/api/index'
let LODOP;
let qrcSrcimg;
var isGoodsPrice = false;

const getDayindate = function(InterfaceCode, BillId, ItemsHeaderType,qrcSrc) {
  if(InterfaceCode==601020406){
    isGoodsPrice = true;
  }else{
    isGoodsPrice = false;
  }
  console.log("接口号",InterfaceCode)
  console.log(BillId)
  console.log(ItemsHeaderType)
  qrcSrcimg = qrcSrc;
  console.log("二维码",qrcSrcimg)
  let homeInfo = getHomeData();
  let sendData = {
    InterfaceCode: InterfaceCode,
    CompanyId: homeInfo.shop.COMPANYID,
    ShopId: homeInfo.shop.ID,
    BillId: BillId
  };
  commonSend.commonSend('get', function(data) {
    console.log("这里网络有误吗",data)
    if (data.success) {
      var dayinjson = data.data;
      BillIdPrinting(dayinjson, ItemsHeaderType);
    }
  }, sendData);
}
const BillIdPrinting = function(dayinjson, ItemsHeaderType) {
  console.log('11112243print',dayinjson)
  LODOP = getLodop();
  if (LODOP != undefined) {
    if (typeof(LODOP.VERSION) != "undefined") {
      GoodsConsumption(dayinjson, ItemsHeaderType);
    }
  }
}
const dealFilterDate = function(dealname) {
  if (dealname == undefined) {
    return '';
  } else {
    return dealname;
  }
}
const GoodsConsumption = function(dayinjson, ItemsHeaderType) {
  let pringInfo = getPrintData(); // 打印设置

  if (Object.keys(pringInfo).length == 0) {
    pringInfo =
      {
        "ddList": [{ "label": "标题", "value": "店来客美业通", "isShow": true }, { "label": "注脚", "value": "谢谢惠顾，欢迎下次光临!", "isShow": true }, { "label": "店铺二维码", "value": "data:image/png;base64,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", "isShow": true }],
        "ddList1": [{ "label": "结账单号：", "value": "1000000", "isShow": true }, { "label": "结账日期：", "value": "2020-10-19 11:34", "isShow": true }, { "label": "收 银 员：", "value": "小张", "isShow": true }],
        "ddList3": [{ "label": "会员卡号：", "value": "000001", "isShow": true }, { "label": "会员姓名：", "value": "陈生", "isShow": true }, { "label": "会员余额：", "value": "678", "isShow": true }, { "label": "积分(本次/剩余)：", "value": "256/32555", "isShow": true }],
        "ddList4": [{ "label": "联系电话：", "value": "", "isShow": true }, { "label": "联系地址：", "value": "", "isShow": true }],
        "ssList": [{ "name": "收 银 员", "checked": true, "list": 1, "no": 2 }, { "name": "店铺电话", "checked": true, "list": 4, "no": 0 }, { "name": "店铺地址", "checked": true, "list": 4, "no": 1 }, { "name": "会员卡号", "checked": true, "list": 3, "no": 0 }, { "name": "会员姓名", "checked": true, "list": 3, "no": 1 }, { "name": "会员余额", "checked": true, "list": 3, "no": 2 }, { "name": "会员积分", "checked": true, "list": 3, "no": 3 }]
      }
  }
  console.log("打印设置",pringInfo)
  let hPos = 10, //小票上边距
    pageWidth = 500, //小票宽度
    rowHeight = 20, //小票行距
    xianHeight = 6,
    leftwidth = 60,
    printrulestatus = 1;
  let Objvalue = dayinjson.Obj;
  console.log("销售员",Objvalue)
  let COMPANYNAME = dealFilterDate(Objvalue.COMPANYNAME);
  let SHOPNAME = dealFilterDate(Objvalue.SHOPNAME);
  let BILLNO = dealFilterDate(Objvalue.BILLNO);
  let BILLDATE = dealFilterDate(Objvalue.BILLDATE);
  let USERNAME = dealFilterDate(Objvalue.USERNAME);
  let ROOMLONGNAME = dealFilterDate(Objvalue.ROOMLONGNAME);
  let GOODSQTY = dealFilterDate(Objvalue.GOODSQTY);
  let GOODSMONEY = dealFilterDate(Objvalue.GOODSMONEY);
  let FAVORMONEY = dealFilterDate(Objvalue.FAVORMONEY);
  let PAYMONEY = dealFilterDate(Objvalue.PAYMONEY);
  let PAYTYPENAME = dealFilterDate(Objvalue.PAYTYPENAME);
  let VIPCODE = dealFilterDate(Objvalue.VIPCODE);
  let VIPNAME = dealFilterDate(Objvalue.VIPNAME);
  let CURRMONEY = dealFilterDate(Objvalue.CURRMONEY);
  let REMARK = dealFilterDate(Objvalue.REMARK);
  let SHOPTEL = dealFilterDate(Objvalue.SHOPTEL);
  let SHOPADDRESS = dealFilterDate(Objvalue.SHOPADDRESS);
  let GETINTEGRAL = dealFilterDate(Objvalue.GETINTEGRAL);
  let VIPINTEGRAL = dealFilterDate(Objvalue.VIPINTEGRAL);
  let SUMSALEMONEY = dealFilterDate(Objvalue.SUMSALEMONEY);
  let ADDMONEY = dealFilterDate(Objvalue.ADDMONEY);
  let GIFTMONEY = dealFilterDate(Objvalue.GIFTMONEY);
  let ADDSUMMONEY = dealFilterDate(Objvalue.ADDSUMMONEY);
  let SALEEMPNAME = dealFilterDate(Objvalue.SALEEMPNAME);
  LODOP.PRINT_INIT("");
  LODOP.SET_PRINT_PAGESIZE(3, pageWidth, 25, '');
  LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
  LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
  let companynamewidth = parseInt((180 - COMPANYNAME.length * 12) / 2);

  if(!pringInfo || pringInfo.ddList[0].isShow){//表标
    LODOP.ADD_PRINT_TEXT(hPos, companynamewidth, pageWidth, rowHeight, COMPANYNAME);
    hPos += 30;
  }
  showPrintrules(1);
  let shopTypename = '';
  if (ItemsHeaderType == 1 || ItemsHeaderType == 2 || ItemsHeaderType == 3 ) {
    shopTypename = SHOPNAME + '消费小票';
  } else {
    shopTypename = SHOPNAME + '充值小票';
  }
  let xiaofeiheight = parseInt((180 - shopTypename.length * 12) / 2);
  LODOP.ADD_PRINT_TEXT(hPos, xiaofeiheight, pageWidth, rowHeight, shopTypename);
  showPrintrules(1);
  hPos += 25;
  hPos = PrintLODOPcommon('结账单号:', BILLNO, hPos);
  hPos = PrintLODOPcommon('结账日期:', BILLDATE, hPos);
  if(ROOMLONGNAME!= ''){
       hPos = PrintLODOPcommon('房台号:', ROOMLONGNAME, hPos);
  }

  if (!pringInfo || pringInfo.ddList1[2].isShow) { // 收 银 员
    hPos = PrintLODOPcommon('收 银 员:', USERNAME, hPos);
  }
  if(SALEEMPNAME.length>0){
    hPos = PrintLODOPcommon('销售员:', SALEEMPNAME, hPos);
  }
  hPos = PrintLODOPcommonbold(hPos, pageWidth, xianHeight);
  if (ItemsHeaderType == 1 || ItemsHeaderType == 3) {
    if (ItemsHeaderType == 1) {
      let leftw0 = 1,
        leftw1 = 35,
        leftw2 = 72,
        leftw3 = 118,
        leftw4 = 150;
      LODOP.ADD_PRINT_TEXT(hPos, leftw0, pageWidth, rowHeight, "商品");
      showPrintrules(printrulestatus);
      LODOP.ADD_PRINT_TEXT(hPos, leftw2, pageWidth, rowHeight, "单价");
      showPrintrules(printrulestatus);
      LODOP.ADD_PRINT_TEXT(hPos, leftw3, pageWidth, rowHeight, "数量");
      showPrintrules(printrulestatus);
      LODOP.ADD_PRINT_TEXT(hPos, leftw1, pageWidth, rowHeight, "折扣");
      showPrintrules(printrulestatus);
      LODOP.ADD_PRINT_TEXT(hPos, leftw4, pageWidth, rowHeight, "小计");
      showPrintrules(printrulestatus);
      hPos += rowHeight;
      for (let i = 0; i < dayinjson.GoodsObj.length; i++) {

        let goodsName = dayinjson.GoodsObj[i].GOODSNAME

        let height = String(goodsName).length / (pageWidth == 800 ? 15 : 14)
        let ROWHEIGHT = 14 * Math.ceil(height);
        console.log("ROWHEIGHT222222222222222222222",ROWHEIGHT)
        let gw1 = 180;
        LODOP.ADD_PRINT_TEXT(hPos, 0, gw1, ROWHEIGHT, goodsName,  { TextNeatRow: true, LineSpacing: 0.3, Bold: 1 });
        hPos += ROWHEIGHT;
        showPrintrules(1);

        let DISCOUNT = dayinjson.GoodsObj[i].DISCOUNT.toFixed(2);
        let PRICE = isGoodsPrice?dayinjson.GoodsObj[i].GOODSPRICE:dayinjson.GoodsObj[i].PRICE;
        let qty = dayinjson.GoodsObj[i].QTY ? String(dayinjson.GoodsObj[i].QTY) : '0';
        let money = dayinjson.GoodsObj[i].MONEY ? String(dayinjson.GoodsObj[i].MONEY) : '0';
        let GOODSPRICE=dayinjson.GoodsObj[i].GOODSPRICE;

        LODOP.ADD_PRINT_TEXT(hPos, leftw0, pageWidth, rowHeight, GOODSPRICE);
        showPrintrules(printrulestatus);
        LODOP.ADD_PRINT_TEXT(hPos, leftw2, pageWidth, rowHeight, PRICE);
        showPrintrules(printrulestatus);
        LODOP.ADD_PRINT_TEXT(hPos, leftw3, pageWidth, rowHeight, qty);
        showPrintrules(printrulestatus);
        LODOP.ADD_PRINT_TEXT(hPos, leftw1, pageWidth, rowHeight, DISCOUNT);
        showPrintrules(printrulestatus);
        LODOP.ADD_PRINT_TEXT(hPos, leftw4, pageWidth, rowHeight, money);
        showPrintrules(printrulestatus);
        hPos += ROWHEIGHT+5;
      }
      hPos = PrintLODOPcommonbold(hPos, pageWidth, xianHeight);
      hPos = PrintLODOPcommon('商品总数:', GOODSQTY, hPos);
      hPos = PrintLODOPcommon('合计金额:', GOODSMONEY, hPos);
    }
    if (ItemsHeaderType == 3) {
      hPos = PrintLODOPcommon('消费金额:', SUMSALEMONEY, hPos);
    }
    hPos = PrintLODOPcommon('优惠金额:', FAVORMONEY, hPos);
    hPos = PrintLODOPcommon('应付金额:', PAYMONEY, hPos);
    hPos = PrintLODOPcommon('支付方式:', PAYTYPENAME, hPos);
  } else if (ItemsHeaderType == 2) {
    let leftw0 = 1,
      // leftw1 = 120,
      // leftw2 = 180,
      // leftw3 = 230;
      leftw1 = 80,
      leftw2 = 110,
      leftw3 = 140;
    LODOP.ADD_PRINT_TEXT(hPos, leftw0, pageWidth, rowHeight, "商品");
    LODOP.SET_PRINT_STYLEA(0,'TextNeatRow',true)  //允许标点溢出,自动换行
    showPrintrules(printrulestatus);
    LODOP.ADD_PRINT_TEXT(hPos, leftw1, pageWidth, rowHeight, "单价");
    showPrintrules(printrulestatus);
    LODOP.ADD_PRINT_TEXT(hPos, leftw2, pageWidth, rowHeight, "消费");
    showPrintrules(printrulestatus);
    LODOP.ADD_PRINT_TEXT(hPos, leftw3, pageWidth, rowHeight, "剩余");
    showPrintrules(printrulestatus);
    hPos += rowHeight;
    for (let i = 0; i < dayinjson.GoodsObj.length; i++) {
      let goodsName = dayinjson.GoodsObj[i].GOODSNAME,
        PRICE = dayinjson.GoodsObj[i].PRICE,
        CURCOUNT = dayinjson.GoodsObj[i].CURCOUNT - dayinjson.GoodsObj[i].QTY,
        qty = dayinjson.GoodsObj[i].QTY ? String(dayinjson.GoodsObj[i].QTY) : '0';

      // LODOP.ADD_PRINT_TEXT(hPos, leftw0, pageWidth, rowHeight, goodsName);


      let height = String(goodsName).length / (pageWidth == 800 ? 25 : 20)
      let ROWHEIGHT = 16 * Math.ceil(height);
      let gw1 = 180;
      LODOP.ADD_PRINT_TEXT(hPos, 0, gw1, ROWHEIGHT, goodsName,  { TextNeatRow: true, LineSpacing: 0.3, Bold: 1 });
      hPos += ROWHEIGHT;
      showPrintrules(printrulestatus);

      LODOP.ADD_PRINT_TEXT(hPos, leftw1, pageWidth, rowHeight, PRICE);
      showPrintrules(printrulestatus);
      LODOP.ADD_PRINT_TEXT(hPos, leftw2, pageWidth, rowHeight, qty);
      showPrintrules(printrulestatus);
      LODOP.ADD_PRINT_TEXT(hPos, leftw3, pageWidth, rowHeight, CURCOUNT);
      showPrintrules(printrulestatus);
      hPos += rowHeight;
    }
  } else if (ItemsHeaderType == 5) {
    console.log("计次消费")
    let leftw0 = 1,
      leftw1 = 150;
    for (let i = 0; i < dayinjson.GoodsList.length; i++) {
      let goodsName = dayinjson.GoodsList[i].GOODSNAME,
        qty = dayinjson.GoodsList[i].QTY ? String(dayinjson.GoodsList[i].QTY) : '0';
      LODOP.ADD_PRINT_TEXT(hPos, leftw0, pageWidth, rowHeight, goodsName);
      showPrintrules(printrulestatus);
      LODOP.ADD_PRINT_TEXT(hPos, leftw1, pageWidth, rowHeight, qty);
      showPrintrules(printrulestatus);
      hPos += rowHeight;
    }
    hPos = PrintLODOPcommonbold(hPos, pageWidth, xianHeight);
    hPos = PrintLODOPcommon('支付方式:', PAYTYPENAME, hPos);

  } else if (ItemsHeaderType == 4) {
    hPos = PrintLODOPcommon('充值金额:', ADDMONEY, hPos);
    hPos = PrintLODOPcommon('赠送金额:', GIFTMONEY, hPos);
    hPos = PrintLODOPcommon('充值合计:', ADDSUMMONEY, hPos);
    hPos = PrintLODOPcommon('支付方式:', PAYTYPENAME, hPos);
  }else if(ItemsHeaderType == 6){

      console.log("积分兑换")
      let leftw0 = 1,
      leftw1 = 70,
      leftw2 = 100,
      leftw3 = 130,
      leftw4 = 160;
    LODOP.ADD_PRINT_TEXT(hPos, leftw0, pageWidth, rowHeight, "礼品");
    showPrintrules(1);
    LODOP.ADD_PRINT_TEXT(hPos, leftw2, pageWidth, rowHeight, "数量");
    showPrintrules(1);
    LODOP.ADD_PRINT_TEXT(hPos, leftw4, pageWidth, rowHeight, "小计");
    showPrintrules(1);
    hPos += rowHeight;
    console.log("for积分兑换而已",dayinjson)
    for (let i = 0; i < dayinjson.GoodsObj.length; i++) {
      let goodsName = dayinjson.GoodsObj[i].GOODSNAME,
        DISCOUNT = dayinjson.GoodsObj[i].DISCOUNT,
        PRICE = isGoodsPrice?dayinjson.GoodsObj[i].GOODSPRICE:dayinjson.GoodsObj[i].PRICE,
        qty = dayinjson.GoodsObj[i].QTY ? String(dayinjson.GoodsObj[i].QTY) : '0',
        money = dayinjson.GoodsObj[i].PAYINTEGRAL ? String(dayinjson.GoodsObj[i].PAYINTEGRAL) : '0';

      let height = String(goodsName).length / (pageWidth == 800 ? 25 : 20)
      let ROWHEIGHT = 16 * Math.ceil(height);
      let gw1 = 180;
      LODOP.ADD_PRINT_TEXT(hPos, 0, gw1, ROWHEIGHT, goodsName,  { TextNeatRow: true, LineSpacing: 0.3, Bold: 1 });
      hPos += ROWHEIGHT;
      showPrintrules(1);

      LODOP.ADD_PRINT_TEXT(hPos, leftw2, pageWidth, rowHeight, qty);
      showPrintrules(1);
      LODOP.ADD_PRINT_TEXT(hPos, leftw4, pageWidth, rowHeight, money*qty);
      showPrintrules(1);
      hPos += ROWHEIGHT;
    }

    hPos = PrintLODOPcommonbold(hPos, pageWidth, xianHeight);
    hPos = PrintLODOPcommon('积分合计:', dayinjson.Obj.PAYINTEGRAL, hPos);

  }
  hPos = PrintLODOPcommonbold(hPos, pageWidth, xianHeight);
  if (!pringInfo || pringInfo.ddList3[0].isShow) { //
    hPos = PrintLODOPcommon('会员卡号:', VIPCODE, hPos);
  }
  if (!pringInfo || pringInfo.ddList3[1].isShow) { //
    hPos = PrintLODOPcommon('会员姓名:', VIPNAME, hPos);
  }
  if (!pringInfo || pringInfo.ddList3[2].isShow) { //
    hPos = PrintLODOPcommon('储值积分:', CURRMONEY, hPos);
  }
  if (ItemsHeaderType != 4) {
    if (!pringInfo || pringInfo.ddList3[3].isShow) { //
      hPos = PrintLODOPcommon('积分(本次/剩余):', GETINTEGRAL + '/' + VIPINTEGRAL, hPos, 109);
    }

  }
  hPos = PrintLODOPcommonbold(hPos, pageWidth, xianHeight);
  hPos = PrintLODOPcommon('备注:', REMARK, hPos);
  hPos = PrintLODOPcommonbold(hPos, pageWidth, xianHeight);
  if (!pringInfo || pringInfo.ddList4[0].isShow) { //联系电话
    hPos = PrintLODOPcommon('联系电话:', SHOPTEL, hPos);
  }
  if (!pringInfo || pringInfo.ddList4[1].isShow) { //联系地址
    hPos = PrintLODOPcommon('联系地址:', SHOPADDRESS, hPos);
  }
  if (!pringInfo || pringInfo.ddList[1].isShow) { // 注脚
    LODOP.ADD_PRINT_TEXT(hPos, 20, pageWidth, rowHeight, "谢谢惠顾，欢迎下次光临!");
  }
  showPrintrules(printrulestatus);
  hPos += 30;
  if (!pringInfo || pringInfo.ddList[2].isShow) { // 店铺二维码
   LODOP.ADD_PRINT_IMAGE(hPos, 40, 250, 100, "<img border='0' src='" + qrcSrcimg + "' />");
   LODOP.SET_PRINT_STYLEA(0, "Stretch", 2);
  }
  hPos += rowHeight * 3;
  LODOP.PRINT();
  // LODOP.PREVIEW()  //打印预览生意通50打印

}


const PrintLODOPcommon = function(Printtitle, Printcontent, hPos, leftwidth) {

  if (false) {
    var pageWidth = 800;
    var rowHeight = 21;
    var leftwidth = leftwidth == undefined ? 80 : leftwidth;
  } else {
    var pageWidth = 580;
    var rowHeight = 17;
    var leftwidth = leftwidth == undefined ? 60 : leftwidth;
  }
  var title = String(Printtitle),
    text = String(Printcontent);
  LODOP.ADD_PRINT_TEXT(hPos, 1, pageWidth, rowHeight, title);
  showPrintrules(1);
  LODOP.ADD_PRINT_TEXT(hPos, leftwidth, pageWidth, rowHeight, text);
  hPos += rowHeight;
  showPrintrules(1);
  return hPos;
}
const PrintLODOPcommonbold = function(hPos, pageWidth, xianHeight) {
  LODOP.ADD_PRINT_HTM(hPos, 1, pageWidth, 1, "<div style='border-top:1px dashed #000;'></div>");
  hPos += xianHeight * 1.5;
  return hPos;
}
// 匹配不同打印规则
const showPrintrules = function(rulestatus) {
  if (rulestatus == 11) {
    fontsizebold(13);
  } else {
    LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
  }
}

// 字体加粗显示
const fontsizebold = function(fontsize) {
  LODOP.SET_PRINT_STYLE("FontColor", "#00ff00");
  LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
  LODOP.SET_PRINT_STYLEA(0, "FontSize", fontsize);
  LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
}


export { getDayindate }
