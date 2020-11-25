/**
 * 支出
 *
 * ***/

import commonSend from "@/api/api";
import { DEFRAY_LIST, DEAL_DEFRAY } from "@/store/mutation-types";
import { getUserInfo, getHomeData } from "@/api/index";
let selected = {};

// init state
const state = {
   defrayState: {},
   defrayListState: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      }
   },
   defrayList: [],
   defrayItem: {}
};

// getters
const getters = {
   defrayState: state => state.defrayState,
   defrayListState: state => state.defrayListState,
   defrayList: state => state.defrayList,
   defrayItem: state => state.defrayItem
};

// actions
const actions = {
   getDefrayList({ commit, state }, data) {
      // 费用支出列表
      let homeInfo = getHomeData();
      let sendData = Object.assign({}, data, {
         InterfaceCode: "91020512",
         CompanyId: homeInfo.shop.COMPANYID,
         PN: data.PN ? data.PN : 1
      });
      commonSend.commonSend(
         "get",
         data => {
            commit(DEFRAY_LIST, { data });
         },
         sendData
      );
   },
   dealDefrayItem({ commit }, { type, data }) {
      // 新增费用支出
      let homeInfo = getHomeData();
      let sendData = Object.assign({}, data, {
         InterfaceCode: "91020511",
         CompanyId: homeInfo.shop.COMPANYID
      });

      selected.type = type;
      selected.data = Object.assign({}, sendData);
      commonSend.commonSend(
         "get",
         data => {
            commit(DEAL_DEFRAY, { data });
         },
         sendData
      );
   },
   cancelDefray({ commit }, data) {
      // 费用支出作废
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020514",
         CompanyId: homeInfo.shop.COMPANYID,
         BillId: data.data.BILLID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(DEAL_DEFRAY, { data });
         },
         sendData
      );
   },
   clearDefrayAll({ state }) {
      state.defrayListState.paying.PN = 0;
      state.defrayList = [];
      state.defrayItem = {};
   }
};

// mutations
const mutations = {
   [DEFRAY_LIST](state, { data }) {
      let pageData = Object.assign({}, state.defrayListState.paying);
      if (data.success) {
         state.defrayList = [...data.data.PageData.DataArr];
         pageData = Object.assign(pageData, data.data.PageData);
      }
      state.defrayListState = Object.assign({}, data, { paying: pageData });
   },
   [DEAL_DEFRAY](state, { data }) {
      if (data.success) {
         state.defrayListState.paying.PN = 0;
      }
      state.defrayState = Object.assign({}, data);
      selected = {};
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
