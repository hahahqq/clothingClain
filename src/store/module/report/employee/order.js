// 单据业绩核对
import commonSend from "@/api/api";
import { getUserInfo, getHomeData } from "@/api/index";
import {
   GET_ORDERREPORT_DATA,
   GET_ORDERREPORT_LIST,
   GET_ORDERREPORT_ITEM
} from "@/store/mutation-types";
let selected = {};
var ListARR = [];

// initial state
const state = {
   orderReportState: {},
   orderReportData: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      },
      List: []
   },
   orderReportList: [],
   orderReportListState: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      },
      List: []
   },
   orderReportListARR: [...ListARR],
   orderReportItem: { data: {} }
};

// getters
const getters = {
   orderReportData: state => state.orderReportData,
   orderReportList: state => state.orderReportList,
   orderReportState: state => state.orderReportState,
   orderReportListState: state => state.orderReportListState,
   orderReportListARR: state => state.orderReportListARR,
   orderReportItem: state => state.orderReportItem
};

// actions
const actions = {
   getorderReportData({ commit }, data) {
      let userInfo = getUserInfo();
      let pn = parseInt(state.orderReportData.paying.PN) + 1;
      let sendData = {
         InterfaceCode: "6010315",
         CompanyId: userInfo.CompanyID,
         ShopId: data.ShopId ? data.ShopId : "",
         BeginDate: data.BeginDate ? data.BeginDate : 1,
         EndDate: data.EndDate ? data.EndDate : 9999999999999,
         PN: data.PN ? data.PN : pn,
         IsEmpMoney: data.IsEmpMoney // 0=未设置，1=已设置
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_ORDERREPORT_DATA, { data });
         },
         sendData
      );
   },
   getorderReportList({ commit, state }, { obj, data }) {},
   clearorderReportList({ state }, index) {
      state.orderReportList = [];
      state.orderReportListState.paying.PN = 0;
      state.orderReportListARR[index].paying.PN = 0;
   },
   clearorderReportList2({ state }) {
      state.orderReportData.paying.PN = 0;
      state.orderReportData.List = [];
      state.orderReportData.info = {};
   },
   clearorderReportAll({ state }) {
      state.orderReportList = [];
      state.orderReportListState.paying.PN = 0;
      state.orderReportData.paying.PN = 0;
      state.orderReportData.List = [];
      state.orderReportData.info = {};
      state.orderReportListARR = [...ListARR];
   }
};

// mutations
const mutations = {
   [GET_ORDERREPORT_DATA](state, { data }) {
      if (data.success) {
         let pageData = Object.assign({}, state.orderReportData.paying);
         let newArr = [...data.data.PageData.DataArr];
         if (newArr.length > 0) {
            pageData = Object.assign(pageData, data.data.PageData);
            delete pageData.DataArr;
            state.orderReportData.paying = Object.assign({}, pageData);
            state.orderReportData.List = [...newArr];
         }
      }
      state.orderReportState = Object.assign({}, data);
   },
   [GET_ORDERREPORT_LIST](state, { data }) {
      let listArrData = state.orderReportListARR[selected.obj.index];
      let pageData = Object.assign({}, listArrData.paying);
      if (data.success) {
         let newArr = [...data.data.PageData.DataArr];
         if (newArr.length > 0) {
            pageData = Object.assign(pageData, data.data.PageData);
            state.orderReportList = [...newArr];
            state.orderReportListARR[selected.obj.index].paying = Object.assign({}, pageData);
            state.orderReportListARR[selected.obj.index].List = [...state.orderReportList];
         }
      }
      state.orderReportListState = Object.assign({}, data, {
         paying: pageData,
         List: state.orderReportList
      });
      selected = {};
   },
   [GET_ORDERREPORT_ITEM](state, { data }) {
      state.orderReportItem = Object.assign({}, data);
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
