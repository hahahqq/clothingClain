// 会员注册统计
import commonSend from "@/api/api";
import { getUserInfo, getHomeData } from "@/api/index";
import { GET_REGREPORT_DATA, GET_REGREPORT_LIST, GET_REGREPORT_ITEM } from "@/store/mutation-types";
let selected = {};

// initial state
const state = {
   registeredReportState: {},
   registeredReportData: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      },
      List: []
   },
   registeredReportListState: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      },
      List: []
   },
   registeredReportItem: { data: {} }
};

// getters
const getters = {
   registeredReportData: state => state.registeredReportData,
   registeredReportState: state => state.registeredReportState,
   registeredReportListState: state => state.registeredReportListState,
   registeredReportItem: state => state.registeredReportItem
};

// actions
const actions = {
   getregisteredReportData({ commit }, data) {
      //会员注册统计
      let userInfo = getUserInfo();
      let pn = parseInt(state.registeredReportData.paying.PN) + 1;
      let sendData = {
         InterfaceCode: "91031051",
         CompanyId: userInfo.CompanyID,
         ShopId: data.ShopId ? data.ShopId : "",
         Type: data.Type, // 0=日报 1=月报
         PN: data.PN ? data.PN : pn
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_REGREPORT_DATA, { data });
         },
         sendData
      );
   },
   getregisteredReportList({ commit, state }, { obj, data }) {
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "91031052",
         CompanyId: userInfo.CompanyID,
         ShopId: data.ShopId ? data.ShopId : "",
         DateStr: data.str,
         PN: data.PN ? data.PN : 1
      };
      // selected.obj = obj;
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_REGREPORT_LIST, { data });
         },
         sendData
      );
   },
   clearregisteredReportList({ state }, index) {
      state.registeredReportListState.paying.PN = 0;
   },
   clearregisteredReportList2({ state }) {
      state.registeredReportData.paying.PN = 0;
      state.registeredReportData.List = [];
      state.registeredReportData.info = {};
   },
   clearregisteredReportAll({ state }) {
      state.registeredReportListState.paying.PN = 0;
      state.registeredReportData.paying.PN = 0;
      state.registeredReportData.List = [];
      state.registeredReportData.info = {};
      state.registeredReportItem = { data: {} };
   }
};

// mutations
const mutations = {
   [GET_REGREPORT_DATA](state, { data }) {
      if (data.success) {
         let pageData = Object.assign({}, state.registeredReportData.paying);
         let newArr = [...data.data.PageData.DataArr];
         if (newArr.length > 0) {
            pageData = Object.assign(pageData, data.data.PageData);
            delete pageData.DataArr;
            state.registeredReportData.paying = Object.assign({}, pageData);
            state.registeredReportData.List = [...newArr];
         }
      }
      state.registeredReportState = Object.assign({}, data);
   },
   [GET_REGREPORT_LIST](state, { data }) {
      state.registeredReportListState = data;
   },
   [GET_REGREPORT_ITEM](state, { data }) {
      state.registeredReportItem = Object.assign({}, data);
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
