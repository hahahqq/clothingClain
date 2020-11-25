/**
 *  报表分析
 * ***/
import commonSend from "@/api/api";
import { getUserInfo, getHomeData } from "@/api/index";
import { GET_REPORT_LIST } from "@/store/mutation-types";
var ListARR = {
   defrayReport: {
      // 支出报表 支出分析
      InterfaceCode: "91030901",
      paying: { PN: 0 },
      List: []
   }
};
let selected = {};

// initial state
const state = {
   reportARR: Object.assign({}, ListARR),
   reportList: [],
   reportListState: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      }
   }
};

// getters
const getters = {
   reportARR: state => state.reportARR,
   reportListState: state => state.reportListState,
   reportList: state => state.reportList
};

// actions
const actions = {
   getReportList({ commit }, { obj, data }) {
      let userInfo = getUserInfo();
      let sendData = Object.assign({}, data, {
         InterfaceCode: state.reportARR[obj].InterfaceCode,
         CompanyId: userInfo.CompanyID,
         PN: data.PN ? data.PN : 1
      });
      selected.obj = obj;
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_REPORT_LIST, { data });
         },
         sendData
      );
   },
   clearReportAll({ state }) {
      state.reportList = [];
      state.reportListState.paying.PN = 0;
      state.reportARR = Object.assign({}, ListARR);
   }
};

// mutations
const mutations = {
   [GET_REPORT_LIST](state, { data }) {
      let pageData = Object.assign({}, state.reportListState.paying);
      if (data.success) {
         state.reportList = [...data.data.PageData.DataArr];
         pageData = Object.assign(pageData, data.data.PageData);
         state.reportARR[selected.obj].paying = Object.assign({}, pageData);
         state.reportARR[selected.obj].List = [...state.reportList];
      }
      state.reportListState = Object.assign({}, data, { paying: pageData, List: state.reportList });
      selected = {};
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
