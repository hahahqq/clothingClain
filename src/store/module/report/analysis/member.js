// 会员分析
import commonSend from "@/api/api";
import { getUserInfo, getHomeData } from "@/api/index";
import { GET_MEMBERREPORT_DATA, GET_MEMBERREPORT_LIST } from "@/store/mutation-types";
let selected = {};
var ListARR = [
   {
      InterfaceCode: "91030802",
      title: "会员分析明细",
      paying: { TotalNumber: 0, PageNumber: 0, PageSize: 20, PN: 0 },
      List: []
   }
];

// initial state
const state = {
   memberReportState: {},
   memberReportData: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      },
      List: [],
      info: {}
   },
   memberReportList: [],
   memberReportListState: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      },
      List: []
   },
   memberReportDataObj: "memberReportDataObj",
   memberReportListARR: [...ListARR]
};

// getters
const getters = {
   memberReportData: state => state.memberReportData,
   memberReportDataObj: state => state.memberReportDataObj,
   memberReportList: state => state.memberReportList,
   memberReportState: state => state.memberReportState,
   memberReportListState: state => state.memberReportListState,
   memberReportListARR: state => state.memberReportListARR,
   memberReportItem: getters => {
      return getters.memberReportListState.data;
   }
};

// actions
const actions = {
   getmemberReportData({ commit }, data) {
      //会员综合分析
      console.log(data);
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "91030801",
         CompanyId: userInfo.CompanyID,
         Shops: data.ShopId ? data.ShopId : "",
         BeginDate: data.BeginDate ? data.BeginDate : 1,
         EndDate: data.EndDate ? data.EndDate : 9999999999999,
         PN: data.PN ? data.PN : 1
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_MEMBERREPORT_DATA, { data });
         },
         sendData
      );
   },
   getmemberReportList({ commit, state }, { obj, data }) {
      // 明细
      let userInfo = getUserInfo();
      let homeInfo = getHomeData();
      let listArrData = state.memberReportListARR[obj.index];
      let sendData = {
         InterfaceCode: listArrData.InterfaceCode,
         CompanyId: userInfo.CompanyID,
         ShopId: data.ShopId ? data.ShopId : "",
         BeginDate: data.BeginDate ? data.BeginDate : 1,
         EndDate: data.EndDate ? data.EndDate : 9999999999999,
         VipId: data.VipId
      };
      selected.obj = obj;
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_MEMBERREPORT_LIST, { data });
         },
         sendData
      );
   },
   clearmemberReportList({ state }, index) {
      state.memberReportList = [];
      state.memberReportListState.paying.PN = 0;
      state.memberReportListARR[index].paying.PN = 0;
   },
   clearmemberReportList2({ state }) {
      state.memberReportData.paying.PN = 0;
      state.memberReportData.List = [];
      state.memberReportData.info = {};
   },
   clearmemberReportAll({ state }) {
      state.memberReportList = [];
      state.memberReportListState.paying.PN = 0;
      state.memberReportData.paying.PN = 0;
      state.memberReportData.List = [];
      state.memberReportData.info = {};
      state.memberReportListARR = [...ListARR];
   }
};

// mutations
const mutations = {
   [GET_MEMBERREPORT_DATA](state, { data }) {
      if (data.success) {
         let pageData = Object.assign({}, state.memberReportData.paying);
         let newArr = [...data.data.PageData.DataArr];
         // if(newArr.length>0){
         pageData = Object.assign(pageData, data.data.PageData);
         delete pageData.DataArr;
         state.memberReportData.paying = Object.assign({}, pageData);
         state.memberReportData.List = [...newArr];
         state.memberReportData.info = Object.assign({}, data.data.SumInfo);

         state.memberReportState = Object.assign({}, data);
         state.memberReportDataObj = Object.assign({}, data.data);

         // }
      }
      // state.memberReportState = Object.assign({},data);
      // state.memberReportDataObj = Object.assign({}, data.data)
   },
   [GET_MEMBERREPORT_LIST](state, { data }) {
      let listArrData = state.memberReportListARR[selected.obj.index];
      let pageData = Object.assign({}, listArrData.paying);
      if (data.success) {
         state.memberReportList = [...data.data.GoodsList];
         state.memberReportListARR[selected.obj.index].List = [...state.memberReportList];
      }
      state.memberReportListState = Object.assign({}, data, {
         paying: pageData,
         List: state.memberReportList
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
