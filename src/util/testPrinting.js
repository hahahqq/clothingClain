import { getLodop } from "@/assets/js/LodopFuncs"; //导入模块
import commonSend from "@/api/api";
import { getHomeData, getUserInfo } from "@/api/index";
let LODOP;
let qrcSrcimg;
var isGoodsPrice = false;
var scaling = 0.375,
   pageTop = 10, //小票上边距
   pageLeft = 20, //小票左边距
   pageWidth = 0, //小票规格 58mm , 80mm
   printW = 0, // 内容宽度
   rowHeight = 20, //小票行距
   lineHeight = 6, // 分割线高度
   pageLabel = 45, // 标签左边距
   printValueW = 0, // 文本内容右宽度
   fontSize = 12;

const getDayindata = function(printData, printType, qresurl) {
   let hPos = 10;
   console.log(printData);
   LODOP = getLodop();
   pageWidth = 580;
   printW = pageWidth * scaling; // 内容宽度
   printValueW = (pageWidth - (pageLabel + pageLeft) * 2) * scaling; // 文本内容右宽度

   LODOP.PRINT_INIT("");
   LODOP.SET_PRINT_PAGESIZE(3, 580, 25, "");
   LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
   LODOP.SET_PRINT_STYLEA(0, "FontSize", fontSize);
   LODOP.SET_PRINT_STYLEA(0, "Bold", 1);

   let gw1 = pageLeft + pageLabel,
      gw2 = 35;

   let COMPANYNAME = "德州会员系统";
   console.log(printData.title);
   if (printData.title.isShow) {
      // 标题
      PrintLODOP_Text(hPos, 0, printW, rowHeight, printData.title.value, {
         FontSize: fontSize + 2,
         Alignment: 2,
         Bold: 1
      });
   }
   hPos += 30;

   let typename = "";

   if (printType == "Print1") {
      typename = "充值小票";
   } else if (printType == "Print2") {
      typename = "销售小票";
   } else if (printType == "Print3") {
      typename = "消费小票";
   } else if (printType == "Print4") {
      typename = "报名小票";
   } else if (printType == "Print5") {
      typename = "领奖小票";
   } else if (printType == "Print6") {
      typename = "奖励小票";
   }

   PrintLODOP_Text(hPos, 0, printW, rowHeight, typename, {
      FontSize: fontSize,
      Alignment: 2,
      Bold: 1
   });

   hPos += 25;

   hPos = PrintLODOPcommon(printData.billInfo[0].label, printData.billInfo[0].value, hPos);
   hPos = PrintLODOPcommon(printData.billInfo[1].label, printData.billInfo[1].value, hPos);

   if (printData.saleEmploy.isShow) {
      hPos = PrintLODOPcommon("收银员：", printData.saleEmploy.value, hPos);
   }

   hPos = dividingLine(hPos, pageWidth);
   console.log(printType)

   if (printType == "Print2" || printType == "Print5") {
      // 销售小票 -- 商品
      let leftw0 = 1,
         leftw1 = 70,
         leftw2 = 100,
         leftw3 = 130;
      PrintLODOP_Text(hPos, leftw0, pageWidth, rowHeight, printType == "Print2" ? "商品" : "奖品", {
         Bold: 1
      });
      PrintLODOP_Text(hPos, leftw1, gw2, rowHeight, printType == "Print2" ? "单价" : "积分", {
         Alignment: 2,
         Bold: 1
      });
      PrintLODOP_Text(hPos, leftw2 + 8, gw2, rowHeight, "数量", { Alignment: 2, Bold: 1 });
      PrintLODOP_Text(hPos, leftw3 + 8, gw2, rowHeight, printType == "Print2" ? "金额" : "小计", {
         Alignment: 2,
         Bold: 1
      });
      hPos += rowHeight;
      for (let i = 0; i < printData.goodsList.length; i++) {
         let goodsName = printData.goodsList[i].name,
            purPrice = printData.goodsList[i].purPrice,
            qty = String(printData.goodsList[i].qty),
            price = String(printData.goodsList[i].price);

         let height = String(goodsName).length / 5;
         let ROWHEIGHT = rowHeight * Math.ceil(height);
         PrintLODOP_Text(hPos, leftw0, gw1, ROWHEIGHT, goodsName, {
            TextNeatRow: true,
            LineSpacing: 0.3
         });
         PrintLODOP_Text(hPos, leftw1, gw2, rowHeight, purPrice, { Alignment: 2 });
         PrintLODOP_Text(hPos, leftw2 + 10, gw2, rowHeight, qty, { Alignment: 2 });
         PrintLODOP_Text(hPos, leftw3 + 10, gw2, rowHeight, price, { Alignment: 2 });
         hPos += ROWHEIGHT;
      }
      hPos = dividingLine(hPos, pageWidth);
   }

   for (var i in printData.saleInfo) {
      hPos = PrintLODOPcommon(printData.saleInfo[i].label, printData.saleInfo[i].value, hPos);
   }

   hPos = dividingLine(hPos, pageWidth);

   for (var i in printData.vipInfo) {
      if (printData.vipInfo[i].isShow) {
         hPos = PrintLODOPcommon(
            printData.vipInfo[i].label + "：",
            printData.vipInfo[i].value,
            hPos
         );
      }
   }
   hPos = dividingLine(hPos, pageWidth);

   if (printData.remark.isShow) {
      hPos = PrintLODOPcommon(printData.remark.label + "：", printData.remark.value, hPos);
      hPos = dividingLine(hPos, pageWidth);
   }

   //联系电话
   if (printData.phone.isShow) {
      hPos = PrintLODOPcommon("联系电话:", printData.phone.value, hPos);
   }

   //联系地址
   if (printData.address.isShow) {
      PrintLODOP_Text(hPos, 1, pageWidth, rowHeight, "联系地址:", {});
      PrintLODOP_Text(hPos, pageLabel + pageLeft, 130, rowHeight, printData.address.value, {
         TextNeatRow: true,
         LineSpacing: 0.5
      });
      let height = String(printData.address.value).length / 8;
      hPos += rowHeight * Math.ceil(height);
   }
   hPos += rowHeight;

   if (printData.footNote.isShow) {
      // 注脚
      hPos += rowHeight;
      PrintLODOP_Text(hPos, 0, printW, 130, printData.footNote.value, {
         Alignment: 2,
         TextNeatRow: true,
         LineSpacing: 0.5
      });
      hPos += rowHeight;
   }
   if (printData.shopQRCode.isShow) {
      // 店铺二维码
      let iw = (printW - 120) / 2;
      LODOP.ADD_PRINT_IMAGE(hPos, iw, 120, 120, "<img border='0' src='" + qresurl + "' />");
      LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
      LODOP.SET_PRINT_STYLEA(0, "Stretch", 2);
      LODOP.ADD_PRINT_TEXT(hPos, 0, pageWidth, 100, "");
   }
   hPos += rowHeight * pageWidth * 0.01;

   let printNum = printData.setupPrintnum;

   LODOP.SET_PRINT_COPIES(printNum); // 打印份数
   LODOP.PRINT();
   // LODOP.PREVIEW();
};

// 增加纯文本打印项
const PrintLODOP_Text = function(Top, Left, Width, Height, strContent, style) {
   LODOP.ADD_PRINT_TEXT(Top, Left, Width, Height, strContent);
   LODOP.SET_PRINT_STYLEA(0, "TextNeatRow", true);
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

const PrintLODOPcommon = function(Printtitle, Printcontent, hPos, leftwidth) {
   var pageWidth = 580;
   var rowHeight = 17;
   var leftwidth = leftwidth == undefined ? 60 : leftwidth;
   var title = String(Printtitle),
      text = String(Printcontent);
   LODOP.ADD_PRINT_TEXT(hPos, 1, pageWidth, rowHeight, title);
   // LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
   LODOP.ADD_PRINT_TEXT(hPos, leftwidth, pageWidth, rowHeight, text);
   hPos += rowHeight;
   // LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
   return hPos;
};

// 分割线
const dividingLine = function(top, width) {
   LODOP.ADD_PRINT_HTM(top, 1, width, 1, "<div style='border-top:1px dashed #000;'></div>");
   return top + lineHeight * 1.5;
};

export { getDayindata };
