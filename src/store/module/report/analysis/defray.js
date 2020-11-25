// 支出分析
import commonSend from "@/api/api";
import { getUserInfo, getHomeData } from "@/api/index";
import { GET_DEFRAYREPORT_DATA, GET_DEFRAYREPORT_LIST } from "@/store/mutation-types";
let selected = {};
var ListARR = [
   {
      InterfaceCode: "91030902",
      title: "支出分析详情",
      paying: { TotalNumber: 0, PageNumber: 0, PageSize: 20, PN: 0 },
      List: []
   }
];

// initial state
const state = {
   defrayReportState: {},
   defrayReportData: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      },
      List: []
   },
   defrayReportList: [],
   defrayReportListState: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      },
      List: []
   },
   defrayReportListARR: [...ListARR]
};

// getters
const getters = {
   defrayReportData: state => state.defrayReportData,
   defrayReportList: state => state.defrayReportList,
   defrayReportState: state => state.defrayReportState,
   defrayReportListState: state => state.defrayReportListState,
   defrayReportListARR: state => state.defrayReportListARR
};

// actions
const actions = {
   getdefrayReportData({ commit }, data) {
      //支出分析
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "91030901",
         CompanyId: userInfo.CompanyID,
         ShopId: data.ShopId ? data.ShopId : "",
         BeginDate: data.BeginDate ? data.BeginDate : 1,
         EndDate: data.EndDate ? data.EndDate : 9999999999999,
         PN: data.PN ? data.PN : 1
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_DEFRAYREPORT_DATA, { data });
         },
         sendData
      );
   },
   getdefrayReportList({ commit, state }, { obj, data }) {
      // 明细
      let userInfo = getUserInfo();
      let listArrData = state.defrayReportListARR[obj.index];
      let sendData = {
         InterfaceCode: listArrData.InterfaceCode,
         CompanyId: userInfo.CompanyID,
         ShopId: data.ShopId ? data.ShopId : "",
         BeginDate: data.BeginDate ? data.BeginDate : 1,
         EndDate: data.EndDate ? data.EndDate : 9999999999999,
         ItemId: data.id // 支出项目ID
      };
      selected.obj = obj;
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_DEFRAYREPORT_LIST, { data });
         },
         sendData
      );
   },
   cleardefrayReportList({ state }, index) {
      state.defrayReportList = [];
      state.defrayReportListState.paying.PN = 0;
      state.defrayReportListARR[index].paying.PN = 0;
   },
   cleardefrayReportList2({ state }) {
      state.defrayReportData.paying.PN = 0;
      state.defrayReportData.List = [];
   },
   cleardefrayReportAll({ state }) {
      state.defrayReportList = [];
      state.defrayReportListState.paying.PN = 0;
      state.defrayReportData.paying.PN = 0;
      state.defrayReportListARR = [...ListARR];
   }
};

// mutations
const mutations = {
   [GET_DEFRAYREPORT_DATA](state, { data }) {
      if (data.success) {
         let pageData = Object.assign({}, state.defrayReportData.paying);
         let newArr = [...data.data.PageData.DataArr];
         if (newArr.length > 0) {
            pageData = Object.assign(pageData, data.data.PageData);
            delete pageData.DataArr;
            state.defrayReportData.paying = Object.assign({}, pageData);
            state.defrayReportData.List = [...newArr];
         }
      }
      state.defrayReportState = Object.assign({}, data);
   },
   [GET_DEFRAYREPORT_LIST](state, { data }) {
      // 明细
      let listArrData = state.defrayReportListARR[selected.obj.index];
      let pageData = Object.assign({}, listArrData.paying);
      if (data.success) {
         let newArr = [...data.data.PageData.DataArr];
         if (newArr.length > 0) {
            pageData = Object.assign(pageData, data.data.PageData);
            state.defrayReportList = [...newArr];
            state.defrayReportListARR[selected.obj.index].paying = Object.assign({}, pageData);
            state.defrayReportListARR[selected.obj.index].List = [...state.defrayReportList];
         }
      }
      state.defrayReportListState = Object.assign({}, data, {
         paying: pageData,
         List: state.defrayReportList
      });
      selected = {};
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
