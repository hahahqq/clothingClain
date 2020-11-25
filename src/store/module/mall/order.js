import commonSend from "@/api/api";
import {
   MALL_ORDER_LIST,
   MALL_ORDER_ITEM,
   MALL_ORDER_STATE,
   MALL_REFUND_LIST,
   MALL_REFUND_ITEM,
   MALL_REFUND_STATE
} from "@/store/mutation-types";
import { getUserInfo, getHomeData } from "@/api/index";
let selected = {};

// init state
const state = {
   mallOrderListState: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      }
   },
   mallOrderList: [],
   mallOrderItem: {},
   mallOrderState: {},
   mallRefundListState: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      }
   },
   mallRefundList: [],
   mallRefundItem: {},
   mallRefundState: {}
};

// getters
const getters = {
   mallOrderListState: state => state.mallOrderListState,
   mallOrderList: state => state.mallOrderList,
   mallOrderItem: state => state.mallOrderItem,
   mallOrderState: state => state.mallOrderState,

   mallRefundListState: state => state.mallRefundListState,
   mallRefundList: state => state.mallRefundList,
   mallRefundItem: state => state.mallRefundItem,
   mallRefundState: state => state.mallRefundState
};

// actions
const actions = {
   getMallOrderList({ commit, state }, data) {
      let userInfo = getUserInfo();
      let homeInfo = getHomeData();
      let pn = parseInt(state.mallOrderListState.paying.PN) + 1;
      let BeginDate = data.BeginDate ? new Date(data.BeginDate).getTime() : 1;
      let EndDate = data.EndDate ? new Date(data.EndDate).getTime() : 9999999999999;
      let sendData = {
         InterfaceCode: "601021103101_1",
         CompanyId: userInfo.CompanyID,
         VipId: "", // 全部
         ShopId: data.ShopId ? data.ShopId : homeInfo.shop.ID,
         PN: data.PN ? data.PN : pn,
         BeginDate: BeginDate,
         EndDate: EndDate,
         Status: data.Status, // -1=全部，0=已取消，1=待付款，2=已付款（待发货），3=待收货（已发货），4=待评价（已完成），5=已评价
         Filter: data.Filter ? data.Filter : "",
         FilterType: data.FilterType ? data.FilterType : "" // 1=会员姓名，2=会员编号，3=会员手机号，4=商品名称，5=订单号，6=备注，7=收货人名称，8=收货人手机号
      };
      selected.PN = data.PN ? 0 : sendData.PN;
      selected.Status = data.Status;
      commonSend.commonSend(
         "get",
         data => {
            commit(MALL_ORDER_LIST, { data });
         },
         sendData
      );
   },
   getMallOrderItem({ commit }, data) {
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "601021103102",
         CompanyId: userInfo.CompanyID,
         BillId: data.BillId
      };
      selected.type = "item";
      commonSend.commonSend(
         "get",
         data => {
            commit(MALL_ORDER_ITEM, { data });
         },
         sendData
      );
   },
   checkoutMallOrder({ commit }, data) {
      // 结账付款
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "601021103112",
         CompanyId: userInfo.CompanyID,
         BillId: data.BillId,
         PaytypeId: data.PaytypeId, // -99=余额支付，0=扫码支付
         PayMoney: data.PayMoney // 实际支付金额，用于保证支付金额的一致性
      };
      selected.type = "checkout";
      commonSend.commonSend(
         "get",
         data => {
            commit(MALL_ORDER_STATE, { data });
         },
         sendData
      );
   },

   deliverMallOrder({ commit }, data) {
      // 确认发货
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "601021103113",
         CompanyId: userInfo.CompanyID,
         BillId: data.BillId,
         Delivery: data.Delivery, // 物流方式
         LogisticsCode: data.code, //物流单号
         LogisticsCompanyName: data.name, // 物流公司
         LogisticsId: data.id // 物流id
      };
      selected.type = "deliver";
      commonSend.commonSend(
         "post",
         data => {
            commit(MALL_ORDER_STATE, { data });
         },
         sendData
      );
   },
   finishMallOrder({ commit }, data) {
      // 订单完成
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "601021103114",
         CompanyId: userInfo.CompanyID,
         BillId: data.BillId
      };
      selected.type = "finish";
      commonSend.commonSend(
         "get",
         data => {
            commit(MALL_ORDER_STATE, { data });
         },
         sendData
      );
   },
   cancelMallOrder({ commit }, data) {
      // 订单取消
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "601021103115",
         CompanyId: userInfo.CompanyID,
         BillId: data.BillId
      };
      selected.type = "cancel";
      commonSend.commonSend(
         "get",
         data => {
            commit(MALL_ORDER_STATE, { data });
         },
         sendData
      );
   },
   changeMallOrderMoney({ commit }, data) {
      // 订单修改 改金额,改备注
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "601021103116",
         CompanyId: userInfo.CompanyID,
         BillId: data.BillId,
         PayMoney: data.PayMoney,
         Remark: data.Remark ? data.Remark : "",
         FreightMoney: data.FreightMoney // 运费
      };
      selected.type = "changeMoney";
      commonSend.commonSend(
         "get",
         data => {
            commit(MALL_ORDER_STATE, { data });
         },
         sendData
      );
   },
   changeMallOrderAddress({ commit }, data) {
      // 订单地址修改
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "601021103116_1",
         CompanyId: userInfo.CompanyID,
         BillId: data.BillId,
         ReceiptAddress: data.ReceiptAddress
      };
      selected.type = "changeAddress";
      commonSend.commonSend(
         "get",
         data => {
            commit(MALL_ORDER_STATE, { data });
         },
         sendData
      );
   },
   clearMallOrderList({ state }) {
      state.mallOrderListState.paying.PN = 0;
      state.mallOrderList = [];
   },
   clearMallOrderAll({ state }) {
      state.mallOrderListState.paying.PN = 0;
      state.mallOrderList = [];
   },

   // 退款单据
   getMallRefundList({ commit, state }, data) {
      // 退款列表
      let userInfo = getUserInfo();
      let homeInfo = getHomeData();
      let pn = parseInt(state.mallRefundListState.paying.PN) + 1;
      let BeginDate = data.BeginDate ? new Date(data.BeginDate).getTime() : 1;
      let EndDate = data.EndDate ? new Date(data.EndDate).getTime() : 9999999999999;
      let sendData = {
         InterfaceCode: "601021103201_1",
         CompanyId: userInfo.CompanyID,
         VipId: "", // 全部
         ShopId: data.ShopId ? data.ShopId : homeInfo.shop.ID,
         PN: data.PN ? data.PN : pn,
         BeginDate: BeginDate,
         EndDate: EndDate,
         Status: data.Status, // -1=全部，0=已取消，1=待处理，2=待打款，3=已完成
         Filter: data.Filter ? data.Filter : "",
         FilterType: data.FilterType ? data.FilterType : "" // 1=会员姓名，2=会员编号，3=会员手机号，4=商品名称，5=订单号，6=备注，7=收货人名称，8=收货人手机号
      };
      selected.PN = data.PN ? 0 : sendData.PN;
      selected.Status = data.Status;
      commonSend.commonSend(
         "get",
         data => {
            commit(MALL_REFUND_LIST, { data });
         },
         sendData
      );
   },
   getMallRefundItem({ commit }, data) {
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "601021103206",
         CompanyId: userInfo.CompanyID,
         BillId: data.BillId
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(MALL_REFUND_ITEM, { data });
         },
         sendData
      );
   },
   applyMallRefund({ commit }, data) {
      // 发起退款申请
      let userInfo = getUserInfo();
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "601021103202",
         CompanyId: userInfo.CompanyID,
         ShopId: data.ShopId ? data.ShopId : homeInfo.shop.ID,
         VipId: data.VipId,
         GoodsDetail: data.gList, //商品明细 [{"GoodsId":"947116","Qty":1,"Price":1,"Discount":1},{"GoodsId":"56642","Qty":1,"Price":80,"Discount":1}]
         FavorMoney: 0,
         GetIntegral: 0,
         Remark: data.Remark ? data.Remark : "", //备注留言
         PayMoney: data.PayMoney, // 退款金额
         SaleBillId: data.BillId, // 销售单BillId
         ReturnReason: data.reason ? data.reason : "",
         FreightMoney: 0 // 退货没有运费
      };
      selected.type = "applyRefund";
      commonSend.commonSend(
         "get",
         data => {
            commit(MALL_REFUND_STATE, { data });
         },
         sendData
      );
   },
   resultMallRefund({ commit }, data) {
      // 退款申请, 同意 / 拒绝
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: data.type ? "601021103203" : "601021103205",
         CompanyId: userInfo.CompanyID,
         BillId: data.BillId
      };
      selected.type = data.type ? "resultRefund_yes" : "resultRefund_no";
      commonSend.commonSend(
         "get",
         data => {
            commit(MALL_REFUND_STATE, { data });
         },
         sendData
      );
   },
   repayMallRefund({ commit }, data) {
      // 退款申请打款(同意)
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "601021103204",
         CompanyId: userInfo.CompanyID,
         BillId: data.BillId
      };
      selected.type = "repayRefund";
      commonSend.commonSend(
         "get",
         data => {
            commit(MALL_REFUND_STATE, { data });
         },
         sendData
      );
   }
};

// mutations
const mutations = {
   [MALL_ORDER_LIST](state, { data }) {
      let pageData = Object.assign({}, state.mallOrderListState.paying);
      if (data.success) {
         pageData = Object.assign(pageData, data.data.PageData);
         let userInfo = getUserInfo();
         let arr = [...data.data.PageData.DataArr];
         let newArr = [],
            tprice = 0;
         arr.forEach(element => {
            let len = newArr.length > 0 ? newArr.length - 1 : 0;
            if (element.BILLID && element.BILLNO) {
               tprice = 0;
               newArr.push(
                  Object.assign({ subList: [], goodsMoney: 0, hadReturn: false }, element)
               );
               newArr[len].goodsMoney = tprice;
               if (element.SHOPID && userInfo.ShopList) {
                  for (let i = 0; i < userInfo.ShopList.length; i++) {
                     if (userInfo.ShopList[i].SHOPID == element.SHOPID) {
                        newArr[len].shopName = userInfo.ShopList[i].SHOPNAME;
                        break;
                     }
                  }
               }
            } else {
               tprice += element.PRICE * element.QTY;
               newArr[len].goodsMoney = tprice;
               newArr[len].subList.push(element);
               if (element.ISRETURN) newArr[len].hadReturn = true;
            }
         });
         state.mallOrderList = [...newArr];
      }
      state.mallOrderListState = Object.assign({ paying: pageData }, data, selected);
      selected = {};
   },
   [MALL_ORDER_ITEM](state, { data }) {
      let hadReturn = false;
      if (data.success) {
         let arr = [...data.data.GoodsList],
            tprice = 0;
         for (let i = 0; i < arr.length; i++) {
            arr[i].totalMoney = parseFloat(arr[i].PRICE) * parseInt(arr[i].QTY);
            tprice += arr[i].totalMoney;
            if (arr[i].ISRETURN) hadReturn = true;
         }
         state.mallOrderItem = Object.assign(
            {
               success: true,
               message: data.message
            },
            data.data,
            {
               goodsList: arr,
               goodsMoney: tprice,
               hadReturn: hadReturn
            }
         );
      } else {
         state.mallOrderItem = Object.assign({ hadReturn: hadReturn }, data);
      }
   },
   [MALL_ORDER_STATE](state, { data }) {
      state.mallOrderState = Object.assign({}, data, selected);
      selected = {};
   },

   [MALL_REFUND_LIST](state, { data }) {
      let pageData = Object.assign({}, state.mallRefundListState.paying);
      if (data.success) {
         pageData = Object.assign(pageData, data.data.PageData);
         let userInfo = getUserInfo();
         let arr = [...data.data.PageData.DataArr];
         let newArr = [],
            tprice = 0;
         for (let i = 0; i < arr.length; i++) {
            let element = arr[i];
            let len = newArr.length > 0 ? newArr.length - 1 : 0;
            if (element.BILLID && element.BILLNO) {
               tprice = 0;
               newArr.push(Object.assign({ subList: [], goodsMoney: 0 }, element));
               newArr[len].goodsMoney = tprice;
               if (element.SHOPID && userInfo.ShopList) {
                  for (let i = 0; i < userInfo.ShopList.length; i++) {
                     if (userInfo.ShopList[i].SHOPID == element.SHOPID) {
                        newArr[len].shopName = userInfo.ShopList[i].SHOPNAME;
                        break;
                     }
                  }
               }
            } else {
               element.totalMoney = parseFloat(element.PRICE) * parseInt(element.QTY);
               tprice += element.totalMoney;
               newArr[len].goodsMoney = tprice;
               newArr[len].subList.push(element);
            }
         }
         state.mallRefundList = [...newArr];
      }
      state.mallRefundListState = Object.assign({ paying: pageData }, data, selected);
      selected = {};
   },
   [MALL_REFUND_ITEM](state, { data }) {
      let hadReturn = false;
      if (data.success) {
         let arr = [...data.data.GoodsList],
            tprice = 0;
         for (let i = 0; i < arr.length; i++) {
            arr[i].totalMoney = parseFloat(arr[i].PRICE) * parseInt(arr[i].QTY);
            tprice += arr[i].totalMoney;
            if (arr[i].ISRETURN) hadReturn = true;
         }
         state.mallRefundItem = Object.assign(
            {
               success: true,
               message: data.message
            },
            data.data,
            {
               goodsList: arr,
               goodsMoney: tprice,
               hadReturn: hadReturn
            }
         );
      } else {
         state.mallRefundItem = Object.assign({ hadReturn: hadReturn }, data);
      }
   },
   [MALL_REFUND_STATE](state, { data }) {
      state.mallRefundState = Object.assign({}, data, selected);
      selected = {};
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
