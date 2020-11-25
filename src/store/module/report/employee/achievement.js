// 业绩统计
import commonSend from "@/api/api";
import { getUserInfo, getHomeData } from "@/api/index";
import {
   GET_ACHIEVEMENT_DATA,
   GET_ACHIEVEMENT_LIST,
   GET_ACHIEVEMENT_ITEM
} from "@/store/mutation-types";
let selected = {};
var ListARR = [
   {
      InterfaceCode: "91031072",
      title: "业绩统计_详情",
      paying: { TotalNumber: 0, PageNumber: 0, PageSize: 20, PN: 0 },
      List: []
   },
   {
      InterfaceCode: "6010316_0101",
      title: "业绩统计_售卡提成",
      paying: { TotalNumber: 0, PageNumber: 0, PageSize: 20, PN: 0 },
      List: []
   },
   {
      InterfaceCode: "6010316_0102",
      title: "业绩统计_充值提成",
      paying: { TotalNumber: 0, PageNumber: 0, PageSize: 20, PN: 0 },
      List: []
   },
   {
      InterfaceCode: "6010316_0103",
      title: "业绩统计_快速消费提成",
      paying: { TotalNumber: 0, PageNumber: 0, PageSize: 20, PN: 0 },
      List: []
   },
   {
      InterfaceCode: "6010316_0104",
      title: "业绩统计_商品消费提成",
      paying: { TotalNumber: 0, PageNumber: 0, PageSize: 20, PN: 0 },
      List: []
   },
   {
      InterfaceCode: "6010316_0105",
      title: "业绩统计_计次消费提成",
      paying: { TotalNumber: 0, PageNumber: 0, PageSize: 20, PN: 0 },
      List: []
   }
];

// initial state
const state = {
   achievementReportState: {},
   achievementReportData: {},
   achievementReportList: [],
   achievementReportListState: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      },
      List: []
   },
   achievementReportListARR: [...ListARR],
   achievementReportItem: { data: {} },
   achievementReportObj: {}
};

// getters
const getters = {
   achievementReportData: state => state.achievementReportData,
   achievementReportList: state => state.achievementReportList,
   achievementReportState: state => state.achievementReportState,
   achievementReportListState: state => state.achievementReportListState,
   achievementReportListARR: state => state.achievementReportListARR,
   achievementReportItem: state => state.achievementReportItem,
   achievementReportObj: state => state.achievementReportObj
};

// actions
const actions = {
   getachievementReportData({ commit }, data) {
      //业绩统计
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "91031071",
         CompanyId: userInfo.CompanyID,
         ShopId: data.ShopId ? data.ShopId : "",
         BeginDate: data.BeginDate ? data.BeginDate : 1,
         EndDate: data.EndDate ? data.EndDate : 9999999999999
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_ACHIEVEMENT_DATA, { data });
         },
         sendData
      );
   },
   getachievementReportItem({ commit }, { obj, data }) {
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "6010316_01",
         CompanyId: userInfo.CompanyID,
         ShopId: data.ShopId ? data.ShopId : "",
         BeginDate: data.BeginDate ? data.BeginDate : 1,
         EndDate: data.EndDate ? data.EndDate : 9999999999999,
         EmpId: data.id // 员工ID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_ACHIEVEMENT_ITEM, { data });
         },
         sendData
      );
   },
   getachievementReportList({ commit, state }, { obj, data }) {
      console.log(data);
      let userInfo = getUserInfo();
      let listArrData = state.achievementReportListARR[obj.index];
      let sendData = {
         InterfaceCode: listArrData.InterfaceCode,
         CompanyId: userInfo.CompanyID,
         ShopId: data.ShopId ? data.ShopId : "",
         BeginDate: data.BeginDate ? data.BeginDate : 1,
         EndDate: data.EndDate ? data.EndDate : 9999999999999,
         PN: data.PN ? data.PN : 1,
         Status: -1,
         PaytypeId: data.PaytypeId ? data.PaytypeId : "",
         EmpId: data.id ? data.id : -1 // 员工ID   -1 : 无员工
      };
      selected.obj = obj;
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_ACHIEVEMENT_LIST, { data });
         },
         sendData
      );
   },
   clearachievementReportList({ state }, index) {
      state.achievementReportList = [];
      state.achievementReportListState.paying.PN = 0;
      state.achievementReportListState.List = [];
      state.achievementReportListARR[index].paying.PN = 0;
   },
   clearachievementReportAll({ state }) {
      state.achievementReportList = [];
      state.achievementReportListState.paying.PN = 0;
      state.achievementReportListARR = [...ListARR];
      state.achievementReportItem = { data: {} };
   }
};

// mutations
const mutations = {
   [GET_ACHIEVEMENT_DATA](state, { data }) {
      if (data.success) {
         state.achievementReportData = Object.assign({}, data.data);
      }
      state.achievementReportState = Object.assign({}, data);
   },
   [GET_ACHIEVEMENT_LIST](state, { data }) {
      console.log(data);
      let listArrData = state.achievementReportListARR[selected.obj.index];
      let pageData = Object.assign({}, listArrData.paying);
      if (data.success) {
         let newArr = [...data.data.PageData.DataArr];
         if (newArr.length > 0) {
            pageData = Object.assign(pageData, data.data.PageData);
            state.achievementReportList = [...newArr];
            state.achievementReportListARR[selected.obj.index].paying = Object.assign({}, pageData);
            state.achievementReportListARR[selected.obj.index].List = [
               ...state.achievementReportList
            ];
         }
      }
      state.achievementReportListState = Object.assign({}, data, {
         paying: pageData,
         List: state.achievementReportList
      });
      selected = {};
      state.achievementReportObj = data.data.Obj;
   },
   [GET_ACHIEVEMENT_ITEM](state, { data }) {
      state.achievementReportItem = Object.assign({}, data);
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
