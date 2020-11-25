/**
 * 支出
 *
 * ***/

import commonSend from "@/api/api";
import { GET_RETAIL_QI_LIST } from "@/store/mutation-types";
import { getUserInfo, getHomeData } from "@/api/index";
let selected = {};

// init state
const state = {
   retailqueryList: [],
   retailqueryiState: {}
};

// getters
const getters = {
   retailqueryList: state => state.retailqueryList,
   retailqueryiState: state => state.retailqueryiState
};

// actions
const actions = {
   getrqueryItem({ commit }, data) {
      //消费结账列表
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020304",
         CompanyId: homeInfo.shop.COMPANYID,
         ShopId: homeInfo.shop.ID,
         BeginDate: data.BeginDate,
         EndDate: data.EndDate,
         PN: data.PN,
         BillNo: data.BillNo,
         IsCheck: 1, // -1=all  0=草稿单  1=结账单
         IsCancel: -1, // -1=all  0=正常    1=已作废
         Filter: ""
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_RETAIL_QI_LIST, { data });
         },
         sendData
      );
   }
};

// mutations
const mutations = {
   [GET_RETAIL_QI_LIST](state, { data }) {
      if (data.success) {
         state.retailqueryList = [...data.data.PageData.DataArr];
      }
      state.retailqueryiState = Object.assign({}, data);
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
