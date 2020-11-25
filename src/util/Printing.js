import { getLodop } from "@/assets/js/LodopFuncs"; //导入模块
import commonSend from "@/api/api";
import { getHomeData, getPrintData, getOthersData, getUserInfo } from "@/api/index";
import dayjs from "dayjs";
let LODOP;
let qrcSrcimg;
var isGoodsPrice = false;
var scaling = 0.375,
   pageTop = 10, //小票上边距
   pageLeft = 20, //小票左边距
   pageWidth = 0, //小票规格 50mm , 80mm
   printW = 0, // 内容宽度
   rowHeight = 20, //小票行距
   lineHeight = 6, // 分割线高度
   pageLabel = 45, // 标签左边距
   printValueW = 0, // 文本内容右宽度
   fontSize = 12;
const pType = [{ idx: 14, InterfaceCode: "601021242", name: "采购入库历史" }];

const getOpenMoneyBox = function() {
   //打开收钱箱
   LODOP = getLodop();
   LODOP.PRINT_INIT("");
   LODOP.SEND_PRINT_RAWDATA(String.fromCharCode(27, 112, 1, 128, 128));
};

const getDayindate = function(InterfaceCode, BillId, ItemsHeaderType, qrcSrc) {
   if (InterfaceCode == 601020406) {
      isGoodsPrice = true;
   } else {
      isGoodsPrice = false;
   }
   qrcSrcimg = qrcSrc;
   let homeInfo = getHomeData();
   let sendData = {
      InterfaceCode: InterfaceCode,
      CompanyId: homeInfo.shop.COMPANYID,
      ShopId: homeInfo.shop.ID,
      BillId: BillId
   };
   commonSend.commonSend(
      "get",
      function(data) {
         if (data.success) {
            var dayinjson = data.data;
            BillIdPrinting(dayinjson, ItemsHeaderType);
         }
      },
      sendData
   );
};
const BillIdPrinting = function(dayinjson, ItemsHeaderType) {
   LODOP = getLodop();
   if (LODOP != undefined) {
      if (typeof LODOP.VERSION != "undefined") {
         GoodsConsumption(dayinjson, ItemsHeaderType);
      }
   }
};
const dealFilterDate = function(dealname) {
   if (dealname == undefined) {
      return "";
   } else {
      return dealname;
   }
};
const GoodsConsumption = function(dayinjson, ItemsHeaderType) {
   let pringInfo = getPrintData(); // 打印设置
   let printtype = getOthersData().printtype ? parseInt(getOthersData().printtype) : 0; //小票宽度   0=580,1=800
   let name = localStorage.getItem("printType") ? parseInt(localStorage.getItem("printType")) : 0;
   let printnum = getOthersData().printnum ? parseInt(getOthersData().printnum) : 1; // 打印数量

   pageWidth = name > 0 ? 800 : 500; //小票宽度   0=500,1=800

   printW = pageWidth * scaling; // 内容宽度
   printValueW = (pageWidth - (pageLabel + pageLeft) * 2) * scaling; // 文本内容右宽度
   if (Object.keys(pringInfo).length == 0) {
      pringInfo = {
         ddList: [
            { label: "标题", value: "店来客生意通", isShow: true },
            { label: "注脚", value: "谢谢惠顾，欢迎下次光临!", isShow: true },
            {
               label: "店铺二维码",
               value:
                  "data:image/png;base64,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",
               isShow: true
            }
         ],
         ddList1: [
            { label: "结账单号：", value: "1000000", isShow: true },
            { label: "结账日期：", value: "2020-10-19 11:34", isShow: true },
            { label: "收银员：", value: "小张", isShow: true }
         ],
         ddList3: [
            { label: "会员卡号：", value: "000001", isShow: true },
            { label: "会员姓名：", value: "陈生", isShow: true },
            { label: "会员余额：", value: "678", isShow: true },
            { label: "积分(本次/剩余)：", value: "256/32555", isShow: true }
         ],
         ddList4: [
            { label: "联系电话：", value: "", isShow: true },
            { label: "联系地址：", value: "", isShow: true }
         ],
         ssList: [
            { name: "收 银 员", checked: true, list: 1, no: 2 },
            { name: "店铺电话", checked: true, list: 4, no: 0 },
            { name: "店铺地址", checked: true, list: 4, no: 1 },
            { name: "会员卡号", checked: true, list: 3, no: 0 },
            { name: "会员姓名", checked: true, list: 3, no: 1 },
            { name: "会员余额", checked: true, list: 3, no: 2 },
            { name: "会员积分", checked: true, list: 3, no: 3 }
         ]
      };
   }
   let hPos = 10; //小票上边距

   let Objvalue = dayinjson.Obj;
   let COMPANYNAME = dealFilterDate(Objvalue.COMPANYNAME);
   let SHOPNAME = dealFilterDate(Objvalue.SHOPNAME);
   let BILLNO = dealFilterDate(Objvalue.BILLNO);
   let BILLDATE = dealFilterDate(Objvalue.BILLDATE);
   let USERNAME = dealFilterDate(Objvalue.USERNAME);
   let SALEEMPNAME = dealFilterDate(Objvalue.SALEEMPNAME);
   let ROOMLONGNAME = dealFilterDate(Objvalue.ROOMLONGNAME);
   let GOODSQTY = dealFilterDate(Objvalue.GOODSQTY);
   let GOODSMONEY = dealFilterDate(Objvalue.GOODSMONEY);
   let FAVORMONEY = dealFilterDate(Objvalue.FAVORMONEY);
   let PAYMONEY = dealFilterDate(Objvalue.PAYMONEY);

   let PAYTYPENAME = dealFilterDate(Objvalue.PAYTYPENAME);
   let VIPCODE = dealFilterDate(Objvalue.VIPCODE);
   let VIPNAME = dealFilterDate(Objvalue.VIPNAME);
   let REMARK = dealFilterDate(Objvalue.REMARK);
   let SHOPTEL = dealFilterDate(Objvalue.SHOPTEL);
   let SHOPADDRESS = dealFilterDate(Objvalue.SHOPADDRESS);
   let GETINTEGRAL = dealFilterDate(Objvalue.GETINTEGRAL);
   let VIPMONEY = dealFilterDate(Objvalue.VIPMONEY);
   let VIPINTEGRAL = dealFilterDate(Objvalue.VIPINTEGRAL);
   let SUMSALEMONEY = dealFilterDate(Objvalue.SUMSALEMONEY);
   let ADDMONEY = dealFilterDate(Objvalue.ADDMONEY);
   let GIFTMONEY = dealFilterDate(Objvalue.GIFTMONEY);
   let ADDSUMMONEY = dealFilterDate(Objvalue.ADDSUMMONEY);

   LODOP.PRINT_INIT("");
   LODOP.SET_PRINT_PAGESIZE(3, pageWidth, 25, "");
   LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
   LODOP.SET_PRINT_STYLEA(0, "FontSize", fontSize);
   LODOP.SET_PRINT_STYLEA(0, "Bold", 1);

   if (!pringInfo || pringInfo.ddList[0].isShow) {
      // 标题
      PrintLODOP_Text(hPos, 0, printW, rowHeight, COMPANYNAME, {
         FontSize: fontSize + 2,
         Alignment: 2,
         Bold: 1
      });
      hPos += 30;
   }

   let shopTypename = "";
   if (ItemsHeaderType == 1 || ItemsHeaderType == 2 || ItemsHeaderType == 3) {
      shopTypename = SHOPNAME + "消费小票";
   } else if (ItemsHeaderType == 14) {
      shopTypename = "采购入库";
   } else if (ItemsHeaderType == 15) {
      shopTypename = "采购退货";
   } else if (ItemsHeaderType == 16) {
      shopTypename = "库存调拨";
   } else if (ItemsHeaderType == 6) {
      shopTypename = "会员领奖";
   } else {
      shopTypename = SHOPNAME + "充值小票";
   }
   PrintLODOP_Text(hPos, 0, printW, rowHeight, shopTypename, {
      FontSize: fontSize,
      Alignment: 2,
      Bold: 1
   });
   hPos += 25;

   if (ItemsHeaderType == 14 || ItemsHeaderType == 15) {
      hPos = PrintLODOPcommon(ItemsHeaderType == 14 ? "采购单号:" : "退货单号:", BILLNO, hPos);
      hPos = PrintLODOPcommon(
         ItemsHeaderType == 14 ? "采购日期:" : "退货日期:",
         dayjs(BILLDATE).format("YYYY-MM-DD"),
         hPos
      );
      hPos = PrintLODOPcommon("店 铺 :", SHOPNAME, hPos);
      hPos = PrintLODOPcommon("供应商:", dealFilterDate(Objvalue.SUPPLIERNAME), hPos);
      hPos = PrintLODOPcommon("制单人:", USERNAME, hPos);
   } else if (ItemsHeaderType == 16) {
      hPos = PrintLODOPcommon("调拨单号:", BILLNO, hPos);
      hPos = PrintLODOPcommon("调拨日期:", dayjs(BILLDATE).format("YYYY-MM-DD"), hPos);
      hPos = PrintLODOPcommon("调出店铺:", SHOPNAME, hPos);
      hPos = PrintLODOPcommon("调入店铺:", dealFilterDate(Objvalue.INSHOPNAME), hPos);
      hPos = PrintLODOPcommon("制 单 人:", USERNAME, hPos);
   } else {
      hPos = PrintLODOPcommon("结账单号:", BILLNO, hPos);
      hPos = PrintLODOPcommon("结账日期:", BILLDATE, hPos);
      if (ROOMLONGNAME != "") {
         hPos = PrintLODOPcommon("房台号:", ROOMLONGNAME, hPos);
      }
      if (!pringInfo || pringInfo.ddList1[2].isShow) {
         // 收 银 员
         hPos = PrintLODOPcommon("收 银 员:", USERNAME, hPos);
      }
      hPos = PrintLODOPcommon("销售员:", SALEEMPNAME, hPos);
      console.log("销售员", SALEEMPNAME);
   }
   hPos = dividingLine(hPos, pageWidth);

   let gw1 = pageLeft + pageLabel - 5,
      gw2 = 35;
   if (ItemsHeaderType == 1 || ItemsHeaderType == 3) {
      // 消费小票
      if (ItemsHeaderType == 1) {
         PrintLODOP_Text(hPos, 1, pageWidth, rowHeight, "商品", { Bold: 1 });
         PrintLODOP_Text(hPos, gw1 - 15, pageWidth, rowHeight, "折扣", { Bold: 1 });
         PrintLODOP_Text(hPos, gw1 + gw2 * 1 - 15, gw2, rowHeight, "单价", {
            Alignment: 2,
            Bold: 1
         });
         PrintLODOP_Text(hPos, gw1 + gw2 * 2 - 10, gw2, rowHeight, "数量", {
            Alignment: 2,
            Bold: 1
         });
         PrintLODOP_Text(hPos, gw1 + gw2 * 3 - 10, pageWidth, rowHeight, "小计", { Bold: 1 });
         hPos += rowHeight;
         for (let i = 0; i < dayinjson.GoodsObj.length; i++) {
            let goodsName = dayinjson.GoodsObj[i].GOODSNAME,
               DISCOUNT = dayinjson.GoodsObj[i].DISCOUNT.toFixed(1),
               PRICE = isGoodsPrice
                  ? dayinjson.GoodsObj[i].GOODSPRICE
                  : dayinjson.GoodsObj[i].PRICE,
               qty = dayinjson.GoodsObj[i].QTY ? String(dayinjson.GoodsObj[i].QTY) : "0",
               money = dayinjson.GoodsObj[i].MONEY ? String(dayinjson.GoodsObj[i].MONEY) : "0";

            let height = String(goodsName).length / (pageWidth == 800 ? 25 : 14);
            let ROWHEIGHT = 14 * Math.ceil(height);

            let tw = pageWidth == 800 ? 250 : 180;
            LODOP.ADD_PRINT_TEXT(hPos, 0, tw, ROWHEIGHT, goodsName, {
               TextNeatRow: true,
               LineSpacing: 0.3,
               Bold: 1
            });
            hPos += ROWHEIGHT;
            showPrintrules(1);
            let GOODSPRICE = dayinjson.GoodsObj[i].GOODSPRICE;
            PrintLODOP_Text(hPos, 0, pageWidth, rowHeight, GOODSPRICE, { Bold: 1 });
            PrintLODOP_Text(hPos, gw1 - 15, pageWidth, rowHeight, DISCOUNT, { Bold: 1 });
            PrintLODOP_Text(hPos, gw1 + gw2 * 1 - 15, gw2 + 10, rowHeight, PRICE, {
               Alignment: 2,
               Bold: 1
            });
            PrintLODOP_Text(hPos, gw1 + gw2 * 2 - 10, gw2, rowHeight, qty, {
               Alignment: 2,
               Bold: 1
            });
            PrintLODOP_Text(hPos, gw1 + gw2 * 3 - 10, pageWidth, rowHeight, money, { Bold: 1 });
            hPos += ROWHEIGHT;
         }

         hPos = dividingLine(hPos, pageWidth);
         hPos = PrintLODOPcommon("商品总数:", GOODSQTY, hPos);
         hPos = PrintLODOPcommon("合计金额:", GOODSMONEY, hPos);
      }
      if (ItemsHeaderType == 3) {
         hPos = PrintLODOPcommon("消费金额:", PAYMONEY, hPos);
      }
      hPos = PrintLODOPcommon("优惠金额:", FAVORMONEY, hPos);
      let payMoney = Number(PAYMONEY) + Number(dayinjson.Obj.PAYINTEGRAL)
      hPos = PrintLODOPcommon("应付金额:", payMoney.toFixed(2), hPos);
      hPos = PrintLODOPcommon("支付方式:", PAYTYPENAME, hPos);
   } else if (ItemsHeaderType == 2) {
      if (pageWidth == 800) {
         gw1 = (printW / 8) * 3;
         gw2 = ((printW / 8) * 5) / 3;
         LODOP.ADD_PRINT_TEXT(hPos, 1, pageWidth, rowHeight, "商品");
         LODOP.SET_PRINT_STYLEA(0, "TextNeatRow", true); //允许标点溢出,自动换行
         showPrintrules(1);
         LODOP.ADD_PRINT_TEXT(hPos, gw1, gw2, rowHeight, "单价", { Alignment: 2, Bold: 1 });
         showPrintrules(1);
         LODOP.ADD_PRINT_TEXT(hPos, gw1 + gw2, gw2, rowHeight, "消费", { Alignment: 2, Bold: 1 });
         showPrintrules(1);
         LODOP.ADD_PRINT_TEXT(hPos, gw1 + gw2 * 2, gw2, rowHeight, "剩余", {
            Alignment: 2,
            Bold: 1
         });
         showPrintrules(1);
         hPos += rowHeight;
         for (let i = 0; i < dayinjson.GoodsObj.length; i++) {
            let goodsName = dayinjson.GoodsObj[i].GOODSNAME,
               PRICE = dayinjson.GoodsObj[i].GOODSPRICE,
               CURCOUNT = dayinjson.GoodsObj[i].CURCOUNT,
               qty = dayinjson.GoodsObj[i].QTY ? String(dayinjson.GoodsObj[i].QTY) : "0";

            let height = String(goodsName).length / (pageWidth == 800 ? 25 : 20);
            let ROWHEIGHT = 16 * Math.ceil(height);
            let gw1 = 100;
            LODOP.ADD_PRINT_TEXT(hPos, 0, gw1, ROWHEIGHT, goodsName, {
               TextNeatRow: true,
               LineSpacing: 0.3,
               Bold: 1
            });
            hPos += ROWHEIGHT;
            showPrintrules(1);

            LODOP.ADD_PRINT_TEXT(hPos, gw1 + 18, gw2, rowHeight, PRICE, { Bold: 1 });
            showPrintrules(1);
            LODOP.ADD_PRINT_TEXT(hPos, gw1 + 18 + gw2, gw2, rowHeight, qty, { Bold: 1 });
            showPrintrules(1);
            LODOP.ADD_PRINT_TEXT(hPos, gw1 - 40 + gw2 * 3, gw2, rowHeight, CURCOUNT, { Bold: 1 });
            showPrintrules(1);
            hPos += rowHeight;
         }
      } else {
         let leftw0 = 1,
            leftw1 = 80,
            leftw2 = 110,
            leftw3 = 140;
         LODOP.ADD_PRINT_TEXT(hPos, leftw0, pageWidth, rowHeight, "商品");
         LODOP.SET_PRINT_STYLEA(0, "TextNeatRow", true); //允许标点溢出,自动换行
         showPrintrules(1);
         LODOP.ADD_PRINT_TEXT(hPos, leftw1, pageWidth, rowHeight, "单价");
         showPrintrules(1);
         LODOP.ADD_PRINT_TEXT(hPos, leftw2 + 8, pageWidth, rowHeight, "消费");
         showPrintrules(1);
         LODOP.ADD_PRINT_TEXT(hPos, leftw3 + 8, pageWidth, rowHeight, "剩余");
         showPrintrules(1);
         hPos += rowHeight;
         for (let i = 0; i < dayinjson.GoodsObj.length; i++) {
            let goodsName = dayinjson.GoodsObj[i].GOODSNAME,
               PRICE = dayinjson.GoodsObj[i].GOODSPRICE,
               CURCOUNT = dayinjson.GoodsObj[i].CURCOUNT,
               qty = dayinjson.GoodsObj[i].QTY ? String(dayinjson.GoodsObj[i].QTY) : "0";
            let height = String(goodsName).length / (pageWidth == 800 ? 25 : 20);
            let ROWHEIGHT = 16 * Math.ceil(height);
            let gw1 = 180;
            LODOP.ADD_PRINT_TEXT(hPos, 0, gw1, ROWHEIGHT, goodsName, {
               TextNeatRow: true,
               LineSpacing: 0.3,
               Bold: 1
            });
            hPos += ROWHEIGHT;
            showPrintrules(1);
            LODOP.ADD_PRINT_TEXT(hPos, leftw1, pageWidth, rowHeight, PRICE);
            showPrintrules(1);
            LODOP.ADD_PRINT_TEXT(hPos, leftw2 + 15, pageWidth, rowHeight, qty);
            showPrintrules(1);
            LODOP.ADD_PRINT_TEXT(hPos, leftw3 + 15, pageWidth, rowHeight, CURCOUNT);
            showPrintrules(1);
            hPos += rowHeight;
         }
      }
   } else if (ItemsHeaderType == 5) {
      let leftw0 = 1,
         leftw1 = 150;
      for (let i = 0; i < dayinjson.GoodsList.length; i++) {
         let goodsName = dayinjson.GoodsList[i].GOODSNAME,
            qty = dayinjson.GoodsList[i].QTY ? String(dayinjson.GoodsList[i].QTY) : "0";
         LODOP.ADD_PRINT_TEXT(hPos, leftw0, pageWidth, rowHeight, goodsName);
         LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
         LODOP.ADD_PRINT_TEXT(hPos, leftw1, pageWidth, rowHeight, qty);
         LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
         hPos += rowHeight;
      }
      hPos = dividingLine(hPos, pageWidth);
      hPos = PrintLODOPcommon("支付方式:", PAYTYPENAME, hPos);
   } else if (ItemsHeaderType == 4) {
      hPos = PrintLODOPcommon("充值金额:", ADDMONEY, hPos);
      hPos = PrintLODOPcommon("赠送金额:", GIFTMONEY, hPos);
      hPos = PrintLODOPcommon("充值合计:", ADDSUMMONEY, hPos);
      hPos = PrintLODOPcommon("支付方式:", PAYTYPENAME, hPos);
   } else if (ItemsHeaderType == 6) {
      console.log("积分兑换");

      PrintLODOP_Text(hPos, 1, pageWidth, rowHeight, "奖品", { Bold: 1 });
      PrintLODOP_Text(hPos, gw1, pageWidth, rowHeight, "积分", { Bold: 1 });
      PrintLODOP_Text(hPos, gw1 + gw2, gw2, rowHeight, "数量", { Alignment: 2, Bold: 1 });
      PrintLODOP_Text(hPos, gw1 + gw2 * 2, gw2, rowHeight, "小计", { Alignment: 2, Bold: 1 });

      hPos += rowHeight;
      console.log("for积分兑换而已", dayinjson);
      for (let i = 0; i < dayinjson.GoodsObj.length; i++) {
         let goodsName = dayinjson.GoodsObj[i].GOODSNAME,
            PRICE = (dayinjson.GoodsObj[i].PAYINTEGRAL / dayinjson.GoodsObj[i].QTY).toFixed(2),
            qty = dayinjson.GoodsObj[i].QTY,
            money = dayinjson.GoodsObj[i].PAYINTEGRAL;

         PrintLODOP_Text(hPos, 0, pageWidth, rowHeight, goodsName, { Bold: 1 });
         PrintLODOP_Text(hPos, gw1 , pageWidth, rowHeight, PRICE, { Bold: 1 });
         PrintLODOP_Text(hPos, gw1 + gw2, gw2 + 10, rowHeight, qty, {
            Alignment: 2,
            Bold: 1
         });
         PrintLODOP_Text(hPos, gw1 + gw2 * 2 , gw2, rowHeight, money, {
            Alignment: 2,
            Bold: 1
         });
         hPos += rowHeight;
      }
   } else if (ItemsHeaderType == 14 || ItemsHeaderType == 15 || ItemsHeaderType == 16) {
      // 14：采购入库   15：采购退货   16：库存调拨
      let param = dayinjson.GoodsObj,
         map = {},
         dest = [];
      for (let i = 0; i < param.length; i++) {
         let ai = param[i];
         if (!map[ai.GOODSID]) {
            dest.push({
               GOODSID: ai.GOODSID,
               name: ai.GOODSNAME,
               code: ai.GOODSCODE,
               data: [ai]
            });
            map[ai.GOODSID] = ai;
         } else {
            for (var j = 0; j < dest.length; j++) {
               var dj = dest[j];
               if (dj.GOODSID == ai.GOODSID) {
                  dj.data.push(ai);
                  break;
               }
            }
         }
      }

      let agentPermission = getUserInfo().List;
      let ISPURVIEW = agentPermission.filter(element => element.MODULECODE == "601050701");
      let showPurPrice = true;
      if (getUserInfo().CODE2 != "boss" && ISPURVIEW[0].ISPURVIEW == 0) {
         showPurPrice = false;
      } else {
         showPurPrice = true;
      }

      if (pageWidth == 800) {
         gw1 = (printW / 8) * 3;
         gw2 = ((printW / 8) * 5) / 3;
      }
      PrintLODOP_Text(hPos, 1, pageWidth, rowHeight, "商品", { Bold: 1 });
      PrintLODOP_Text(hPos, gw1, gw2, rowHeight, "数量", { Alignment: 2, Bold: 1 });
      PrintLODOP_Text(hPos, gw1 + gw2, gw2, rowHeight, "单价", { Alignment: 2, Bold: 1 });
      PrintLODOP_Text(hPos, gw1 + gw2 * 2, gw2, rowHeight, "金额", { Alignment: 2, Bold: 1 });
      hPos += rowHeight;
      for (let i = 0; i < dest.length; i++) {
         for (let j = 0; j < dest[i].data.length; j++) {
            let goodsName = dest[i].name,
               PRICE = showPurPrice == true ? dest[i].data[j].PRICE : "****",
               qty = dest[i].data[j].QTY ? String(dest[i].data[j].QTY) : "0",
               money = showPurPrice == true ? String(dest[i].data[j].MONEY) : "****";

            let height = String(goodsName).length / (pageWidth == 800 ? 7 : 5);
            let ROWHEIGHT = rowHeight * Math.ceil(height);
            PrintLODOP_Text(hPos, 1, gw1, ROWHEIGHT, goodsName, {
               TextNeatRow: true,
               LineSpacing: 0.3,
               Bold: 1
            });
            PrintLODOP_Text(hPos, gw1, gw2, rowHeight, qty, { Alignment: 2, Bold: 1 });
            PrintLODOP_Text(hPos, gw1 + gw2, gw2, rowHeight, PRICE, { Alignment: 2, Bold: 1 });
            PrintLODOP_Text(hPos, gw1 + gw2 * 2, gw2, rowHeight, money, { Alignment: 2, Bold: 1 });
            hPos += ROWHEIGHT;
         }
      }

      if (ItemsHeaderType == 14 || ItemsHeaderType == 15) {
         hPos = dividingLine(hPos, pageWidth);
         hPos = PrintLODOPcommon("优惠金额:", dealFilterDate(Objvalue.BREAKSMONEY), hPos);
         hPos = PrintLODOPcommon("其它费用:", dealFilterDate(Objvalue.OTHERMONEY), hPos);
      }

      hPos = dividingLine(hPos, pageWidth);
      PrintLODOP_Text(hPos, 1, pageWidth, rowHeight, "合计：", { Bold: 1 });
      PrintLODOP_Text(hPos, 80, pageWidth, rowHeight, GOODSQTY, { Bold: 1 });
      PrintLODOP_Text(hPos, 140, pageWidth, rowHeight, showPurPrice == true ? PAYMONEY : "****", {
         Bold: 1
      });
      hPos += rowHeight;
   }

   if (ItemsHeaderType != 14 && ItemsHeaderType != 15 && ItemsHeaderType != 16) {
      if (pringInfo) {
         let hasLine = 0;
         for (let i = 0; i < 3; i++) {
            if (pringInfo.ddList3[i].isShow) hasLine++;
         }
         if (ItemsHeaderType != 4 && pringInfo.ddList3[3].isShow) hasLine++;
         if (hasLine > 0) hPos = dividingLine(hPos, pageWidth);
      }

      if (!pringInfo || pringInfo.ddList3[0].isShow) {
         hPos = PrintLODOPcommon("会员卡号:", VIPCODE, hPos);
      }
      if (!pringInfo || pringInfo.ddList3[1].isShow) {
         hPos = PrintLODOPcommon("会员姓名:", VIPNAME, hPos);
      }

      hPos = PrintLODOPcommon("储值积分:", VIPMONEY);
      hPos = PrintLODOPcommon("竞技积分:", VIPINTEGRAL);
   }

   if (String(REMARK).length != 0) {
      // 备注
      hPos = dividingLine(hPos, pageWidth);
      PrintLODOP_Text(hPos, 1, pageWidth, rowHeight, "备注:", { Bold: 1 });
      PrintLODOP_Text(hPos, pageLabel + pageLeft, printValueW, rowHeight, REMARK, {
         TextNeatRow: true,
         LineSpacing: 0.5,
         Bold: 1
      });
      let height = String(REMARK).length / 9;
      hPos += rowHeight * Math.ceil(height);
   }

   hPos = dividingLine(hPos, pageWidth);

   if (ItemsHeaderType == 14) {
      hPos = PrintLODOPcommon("结算账户:", dealFilterDate(Objvalue.PAYTYPENAME), hPos);
      hPos = PrintLODOPcommon("实付金额:", dealFilterDate(Objvalue.SUPPLIERBILLCURMONEY), hPos);
      LODOP.ADD_PRINT_TEXT(hPos, 1, pageWidth, rowHeight, "欠供应商款:");
      LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
      LODOP.ADD_PRINT_TEXT(
         hPos,
         72,
         pageWidth,
         rowHeight,
         dealFilterDate(Objvalue.SUPPLIERCURMONEY)
      );
      LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
      hPos += rowHeight;

      hPos = dividingLine(hPos, pageWidth);
      hPos = PrintLODOPcommon("打印时间:", dayjs(new Date()).format("YYYY-MM-DD HH:mm"), hPos);
      LODOP.ADD_PRINT_TEXT(hPos, 65, pageWidth, 60, "");
   } else if (ItemsHeaderType == 15) {
      hPos = PrintLODOPcommon("退款账户:", dealFilterDate(Objvalue.PAYTYPENAME), hPos);
      hPos = PrintLODOPcommon("实退金额:", dealFilterDate(Objvalue.SUPPLIERBILLCURMONEY), hPos);
      LODOP.ADD_PRINT_TEXT(hPos, 1, pageWidth, rowHeight, "欠供应商款:");
      LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
      LODOP.ADD_PRINT_TEXT(
         hPos,
         72,
         pageWidth,
         rowHeight,
         dealFilterDate(Objvalue.SUPPLIERCURMONEY)
      );
      LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
      hPos += rowHeight;
      hPos = dividingLine(hPos, pageWidth);
      hPos = PrintLODOPcommon("打印时间:", dayjs(new Date()).format("YYYY-MM-DD HH:mm"), hPos);
      LODOP.ADD_PRINT_TEXT(hPos, 65, pageWidth, 60, "");
   } else if (ItemsHeaderType == 16) {
      hPos = PrintLODOPcommon("打印时间:", dayjs(new Date()).format("YYYY-MM-DD HH:mm"), hPos);
      LODOP.ADD_PRINT_TEXT(hPos, 65, pageWidth, 60, "");
   }

   if (ItemsHeaderType != 14 && ItemsHeaderType != 15 && ItemsHeaderType != 16) {
      if (!pringInfo || pringInfo.ddList4[0].isShow) {
         //联系电话
         hPos = PrintLODOPcommon("联系电话:", SHOPTEL, hPos);
      }
      if (!pringInfo || pringInfo.ddList4[1].isShow) {
         //联系地址
         PrintLODOP_Text(hPos, 1, pageWidth, rowHeight, "联系地址:", { Bold: 1 });
         PrintLODOP_Text(hPos, pageLabel + pageLeft, printValueW, rowHeight, SHOPADDRESS, {
            TextNeatRow: true,
            LineSpacing: 0.5,
            Bold: 1
         });
         let height = String(SHOPADDRESS).length / 9;
         hPos += rowHeight * Math.ceil(height);
      }
      hPos += rowHeight;
      if (!pringInfo || pringInfo.ddList[1].isShow) {
         // 注脚
         hPos += rowHeight;
         PrintLODOP_Text(hPos, 0, printW, 130, pringInfo.ddList[1].value, {
            Alignment: 2,
            TextNeatRow: true,
            LineSpacing: 0.5,
            Bold: 1
         });
         hPos += rowHeight;
      }
      if (!pringInfo || pringInfo.ddList[2].isShow) {
         // 店铺二维码
         let iw = (printW - 120) / 2;
         LODOP.ADD_PRINT_IMAGE(hPos, iw, 120, 120, "<img border='0' src='" + qrcSrcimg + "' />");
         LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
         LODOP.SET_PRINT_STYLEA(0, "Stretch", 2);
         LODOP.ADD_PRINT_TEXT(hPos, 0, pageWidth, 100, "");
      }
      hPos += rowHeight * pageWidth * 0.01;
   }

   LODOP.SET_PRINT_STYLEA(0, "FontSize", fontSize);
   LODOP.SET_PRINT_COPIES(printnum);

     LODOP.PRINT();
   // LODOP.PREVIEW(); //50或者80打印
};

//
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
   LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
   LODOP.ADD_PRINT_TEXT(hPos, leftwidth, pageWidth, rowHeight, text);
   hPos += rowHeight;
   LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
   return hPos;
};
// 增加纯文本打印项
const PrintLODOP_Text = function(Top, Left, Width, Height, strContent, style) {
   LODOP.ADD_PRINT_TEXT(Top, Left, Width, Height, strContent);
   LODOP.SET_PRINT_STYLEA(0, "TextNeatRow", style.TextNeatRow ? 1 : 0);
   if (style.FontSize) LODOP.SET_PRINT_STYLEA(0, "FontSize", style.FontSize);
   if (style.Alignment) LODOP.SET_PRINT_STYLEA(0, "Alignment", style.Alignment);
   if (style.LineSpacing) LODOP.SET_PRINT_STYLEA(0, "LineSpacing", style.LineSpacing);
   if (style.Bold) LODOP.SET_PRINT_STYLEA(0, "Bold", style.Bold);
};

// 匹配不同打印规则
const showPrintrules = function(rulestatus) {
   if (rulestatus == 11) {
      fontsizebold(13);
   } else {
      LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
   }
};

// 分割线
const dividingLine = function(top, width) {
   LODOP.ADD_PRINT_HTM(top, 1, width, 1, "<div style='border-top:1px dashed #000;'></div>");
   return top + lineHeight * 1.5;
};

export { getDayindate, getOpenMoneyBox };
