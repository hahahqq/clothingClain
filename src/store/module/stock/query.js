/**
 * 支出
 *
 * ***/

import commonSend from "@/api/api";
import { GET_STOCK_QI_LIST, EXPORT_STOCK_COLUMN, EXPORT_STOCK_ROW } from "@/store/mutation-types";
import { getUserInfo, getHomeData } from "@/api/index";
let selected = {};

// init state
const state = {
   stockqueryList: [],
   stockqueryiState: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      }
   },
   exportStockColumnState: {},
   exportStockRowState: {}
};

// getters
const getters = {
   stockqueryList: state => state.stockqueryList,
   stockqueryiState: state => state.stockqueryiState,
   exportStockColumnState: state => state.exportStockColumnState,
   exportStockRowState: state => state.exportStockRowState
};

// actions
const actions = {
   getsqueryItem({ commit }, data) {
      //库存查询
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: data.tabIdx == 0 ? "91031091_2" : "91031091_3",
         CompanyId: userInfo.CompanyID,
         ShopId: data.ShopId,
         CategoryId: data.TypeId ? data.TypeId : "",
         Status: data.Status,
         ZeroQty: data.ZeroQty,
         Filter: data.Filter,
         PN: data.PN,
         OrderType: data.OrderType,
         OrderMode: data.OrderMode
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_STOCK_QI_LIST, { data });
         },
         sendData
      );
   },
   exportStockRow({ commit }, data) {
      //库存明细、汇总 导出-横排
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: data.tabIdx == 0 ? "91020906" : "91020908",
         CompanyId: userInfo.CompanyID,
         ShopId: data.ShopId,
         CategoryId: data.TypeId ? data.TypeId : "",
         Status: data.Status,
         ZeroQty: data.ZeroQty,
         Filter: data.Filter,
         OrderType: data.OrderType,
         OrderMode: data.OrderMode
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(EXPORT_STOCK_ROW, { data });
         },
         sendData
      );
   },
   exportStockColumn({ commit }, data) {
      // 库存明细、汇总导出-竖排
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: data.tabIdx == 0 ? "91020907" : "91020909",
         CompanyId: userInfo.CompanyID,
         ShopId: data.ShopId,
         CategoryId: data.TypeId ? data.TypeId : "",
         Status: data.Status,
         ZeroQty: data.ZeroQty,
         Filter: data.Filter,
         OrderType: data.OrderType,
         OrderMode: data.OrderMode
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(EXPORT_STOCK_COLUMN, { data });
         },
         sendData
      );
   }
};

// mutations
const mutations = {
   [EXPORT_STOCK_COLUMN](state, { data }) {
      state.exportStockColumnState = data;
   },
   [EXPORT_STOCK_ROW](state, { data }) {
      state.exportStockRowState = data;
   },
   [GET_STOCK_QI_LIST](state, { data }) {
      let pageData = Object.assign({}, state.stockqueryiState.paying);
      if (data.success) {
         state.stockqueryList = [...data.data.PageData.DataArr];
         pageData = Object.assign(pageData, data.data.PageData);
      }
      state.stockqueryiState = Object.assign({}, data, { paying: pageData });
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
