// 销售分析
import commonSend from "@/api/api";
import { getUserInfo, getHomeData } from "@/api/index";
import { GET_SALEREPORT_DATA, GET_SALEREPORT_LIST } from "@/store/mutation-types";
let selected = {};
var ListARR = [
   {
      InterfaceCode: "91030602",
      title: "销售分析明细",
      paying: { TotalNumber: 0, PageNumber: 0, PageSize: 20, PN: 0 },
      List: []
   }
];

// initial state
const state = {
   saleReportState: {},
   saleReportData: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      },
      List: [],
      info: {}
   },
   saleReportList: [],
   saleReportListState: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      },
      List: []
   },
   saleReportXSFXObj: {},
   saleReportListARR: [...ListARR]
};

// getters
const getters = {
   saleReportData: state => state.saleReportData,
   saleReportXSFXObj: state => state.saleReportXSFXObj,
   saleReportList: state => state.saleReportList,
   saleReportState: state => state.saleReportState,
   saleReportListState: state => state.saleReportListState,
   saleReportListARR: state => state.saleReportListARR
};

// actions
const actions = {
   getsaleReportData({ commit }, data) {
      //销售分析
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "91030601",
         CompanyId: userInfo.CompanyID,
         ShopId: data.ShopId ? data.ShopId : "",
         BeginDate: data.BeginDate ? data.BeginDate : 1,
         EndDate: data.EndDate ? data.EndDate : 9999999999999,
         PN: data.PN ? data.PN : 1
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_SALEREPORT_DATA, { data });
         },
         sendData
      );
   },
   getsaleReportList({ commit, state }, { obj, data }) {
      // 明细
      let userInfo = getUserInfo();
      let homeInfo = getHomeData();
      let listArrData = state.saleReportListARR[obj.index];
      let sendData = {
         InterfaceCode: listArrData.InterfaceCode,
         CompanyId: userInfo.CompanyID,
         ShopId: data.ShopId ? data.ShopId : "",
         DateStr: data.DateStr ? data.DateStr : "", // string 2018-09-03
         PN: data.PN ? data.PN : 1,
         OrderType: data.OrderType ? data.OrderType : 0 // 0=按金额，1=按数量
      };
      selected.obj = obj;
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_SALEREPORT_LIST, { data });
         },
         sendData
      );
   },
   clearsaleReportList({ state }, index) {
      state.saleReportList = [];
      state.saleReportListState.paying.PN = 0;
      state.saleReportListARR[index].paying.PN = 0;
   },
   clearsaleReportList2({ state }) {
      state.saleReportData.paying.PN = 0;
      state.saleReportData.List = [];
      state.saleReportData.info = {};
   },
   clearsaleReportAll({ state }) {
      state.saleReportList = [];
      state.saleReportListState.paying.PN = 0;
      state.saleReportData.paying.PN = 0;
      state.saleReportData.List = [];
      state.saleReportData.info = {};
      state.saleReportListARR = [...ListARR];
   }
};

// mutations
const mutations = {
   [GET_SALEREPORT_DATA](state, { data }) {
      if (data.success) {
         let pageData = Object.assign({}, state.saleReportData.paying);
         let newArr = [...data.data.List];
         // if(newArr.length>0){
         pageData = Object.assign(pageData, data.data.List);
         delete pageData.List;
         state.saleReportData.paying = Object.assign({}, pageData);
         state.saleReportData.List = [...newArr];
         state.saleReportData.info = Object.assign({}, data.data.SumInfo);
         state.saleReportXSFXObj = Object.assign({}, data.data.Obj);
         // }
      }
      state.saleReportState = Object.assign({}, data);
   },
   [GET_SALEREPORT_LIST](state, { data }) {
      let listArrData = state.saleReportListARR[selected.obj.index];
      let pageData = Object.assign({}, listArrData.paying);
      if (data.success) {
         let newArr = [...data.data.PageData.DataArr];
         // if(newArr.length>0){
         pageData = Object.assign(pageData, data.data.PageData);
         state.saleReportList = [...newArr];
         state.saleReportListARR[selected.obj.index].paying = Object.assign({}, pageData);
         state.saleReportListARR[selected.obj.index].List = [...state.saleReportList];
         // }
      }
      state.saleReportListState = Object.assign({}, data, {
         paying: pageData,
         List: state.saleReportList
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
