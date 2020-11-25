import commonSend from "@/api/api";
import { MALL_REDUCE_STOCK_TYPE } from "@/store/mutation-types";
import { getUserInfo, getHomeData } from "@/api/index";
let selected = {};

// init state
const state = {
   mallsetupState: {}
};

// getters
const getters = {
   mallsetupState: state => state.mallsetupState
};

// actions
const actions = {
   setMallDisplaySaleQty({ commit }, data) {
      // 商品销量设置
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "6010211060606",
         CompanyId: userInfo.CompanyID,
         DisplaySaleQty: data.value ? 1 : 0 // 0=不显示，1=显示
      };
      selected.type = "setMallDisplaySaleQty";
      commonSend.commonSend(
         "get",
         data => {
            commit(MALL_REDUCE_STOCK_TYPE, { data });
         },
         sendData
      );
   },
   setMallDisplayEvaluate({ commit }, data) {
      // 商品评价设置
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "6010211060605",
         CompanyId: userInfo.CompanyID,
         DisplayEvaluate: data.value ? 1 : 0 // 0=不显示，1=显示
      };
      selected.type = "setMallDisplayEvaluate";
      commonSend.commonSend(
         "get",
         data => {
            commit(MALL_REDUCE_STOCK_TYPE, { data });
         },
         sendData
      );
   },
   setMallMinMoney({ commit }, data) {
      // 最低消费设置
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "6010211060604",
         CompanyId: userInfo.CompanyID,
         MinMoney: data.money ? data.money : 0,
         MinQty: data.qty ? data.qty : 0,
         IsPlusFreight: data.freight ? data.freight : 0 // 0=不包含，1=包含
      };
      selected.type = "setMallMinMoney";
      commonSend.commonSend(
         "get",
         data => {
            commit(MALL_REDUCE_STOCK_TYPE, { data });
         },
         sendData
      );
   },
   setMallAutoOrder({ commit }, data) {
      // 自动关闭订单设置
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "6010211060603",
         CompanyId: userInfo.CompanyID,
         AutoOrder: data.value // 自动关闭分钟数
      };
      selected.type = "setMallAutoOrder";
      commonSend.commonSend(
         "get",
         data => {
            commit(MALL_REDUCE_STOCK_TYPE, { data });
         },
         sendData
      );
   },
   setMallAutoSaleDay({ commit }, data) {
      // 自动收货时间设置
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "6010211060602",
         CompanyId: userInfo.CompanyID,
         AutoSaleDay: data.value
      };
      selected.type = "setMallAutoSaleDay";
      commonSend.commonSend(
         "get",
         data => {
            commit(MALL_REDUCE_STOCK_TYPE, { data });
         },
         sendData
      );
   },
   setMallReduceStockType({ commit }, data) {
      // 减库存设置
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "6010211060601",
         CompanyId: userInfo.CompanyID,
         ReduceStockType: data.value
      };
      selected.type = "setMallReduceStockType";
      commonSend.commonSend(
         "get",
         data => {
            commit(MALL_REDUCE_STOCK_TYPE, { data });
         },
         sendData
      );
   }
};

// mutations
const mutations = {
   [MALL_REDUCE_STOCK_TYPE](state, { data }) {
      state.mallsetupState = Object.assign({}, data, selected);
      selected = {};
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
