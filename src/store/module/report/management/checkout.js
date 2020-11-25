// 收银对账
import commonSend from "@/api/api";
import { getUserInfo, getHomeData } from "@/api/index";
import {
   GET_CHACKOUT_DATA,
   GET_CHACKOUT_LIST,
   GET_CHACKOUT_PAY_DATA
} from "@/store/mutation-types";
let selected = {};
var ListARR = [
   {
      InterfaceCode: "91030303",
      title: "支付方式明细",
      paying: { TotalNumber: 0, PageNumber: 0, PageSize: 20, PN: 0 },
      List: []
   }
];

// initial state
const state = {
   checkoutReportState: {},
   checkoutReportData: {},
   checkoutReportList: [],
   checkoutReportListState: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      },
      List: []
   },
   checkoutReportListARR: [...ListARR],
   checkoutReportPayData: []
};

// getters
const getters = {
   checkoutReportData: state => state.checkoutReportData,
   checkoutReportList: state => state.checkoutReportList,
   checkoutReportState: state => state.checkoutReportState,
   checkoutReportListState: state => state.checkoutReportListState,
   checkoutReportListARR: state => state.checkoutReportListARR,
   checkoutReportPayData: state => state.checkoutReportPayData
};

// actions
const actions = {
   getcheckoutReportData({ commit }, data) {
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "6010303",
         CompanyId: userInfo.CompanyID,
         ShopId: data.ShopId ? data.ShopId : "",
         BeginDate: data.BeginDate ? data.BeginDate : 1,
         EndDate: data.EndDate ? data.EndDate : 9999999999999
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_CHACKOUT_DATA, { data });
         },
         sendData
      );
   },
   getcheckoutReportPayData({ commit }, data) {
      // 支付方式列表
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "91030302",
         CompanyId: userInfo.CompanyID,
         ShopId: data.ShopId ? data.ShopId : "",
         // BeginDate:data.BeginDate?data.BeginDate :1,
         // EndDate:data.EndDate?data.EndDate : 9999999999999,
         BeginDate: data.BeginDate
            ? data.BeginDate
            : new Date(new Date().setHours(0, 0, 0, 0)) - 86400 * 0 * 1000,
         EndDate: data.EndDate ? data.EndDate : new Date().getTime(),
         UserId: data.UserId ? data.UserId : ""
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_CHACKOUT_PAY_DATA, { data });
         },
         sendData
      );
   },
   getcheckoutReportList({ commit, state }, { obj, data }) {
      // 支付方式明细
      let userInfo = getUserInfo();
      let listArrData = state.checkoutReportListARR[obj.index];
      let sendData = {
         InterfaceCode: listArrData.InterfaceCode,
         CompanyId: userInfo.CompanyID,
         ShopId: data.ShopId ? data.ShopId : "",
         BeginDate: data.BeginDate ? data.BeginDate : 1,
         EndDate: data.EndDate ? data.EndDate : 9999999999999,
         PN: data.PN ? data.PN : 1,
         PayTypeId: data.PayTypeId ? data.PayTypeId : "",
         UserId: data.UserId ? data.UserId : ""
      };
      selected.obj = obj;
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_CHACKOUT_LIST, { data });
         },
         sendData
      );
   },
   clearcheckoutReportList({ state }, index) {
      state.checkoutReportList = [];
      state.checkoutReportListState.paying.PN = 0;
      state.checkoutReportListARR[index].paying.PN = 0;
   },
   clearcheckoutReportAll({ state }) {
      state.checkoutReportData = {};
      state.checkoutReportList = [];
      state.checkoutReportListState.paying.PN = 0;
      state.checkoutReportListARR = [...ListARR];
      state.checkoutReportPayData = [];
   }
};

// mutations
const mutations = {
   [GET_CHACKOUT_DATA](state, { data }) {
      if (data.success) {
         state.checkoutReportData = Object.assign({}, data.data);
      }
      state.checkoutReportState = Object.assign({}, data);
   },
   [GET_CHACKOUT_LIST](state, { data }) {
      let listArrData = state.checkoutReportListARR[selected.obj.index];
      let pageData = Object.assign({}, listArrData.paying);
      if (data.success) {
         let newArr = [...data.data.PageData.DataArr];
         if (newArr.length > 0) {
            pageData = Object.assign(pageData, data.data.PageData);
            state.checkoutReportList = [...newArr];
            state.checkoutReportListARR[selected.obj.index].paying = Object.assign({}, pageData);
            state.checkoutReportListARR[selected.obj.index].List = [...state.checkoutReportList];
         }
      }
      state.checkoutReportListState = Object.assign({}, data, {
         paying: pageData,
         List: state.checkoutReportList
      });
      selected = {};
   },
   [GET_CHACKOUT_PAY_DATA](state, { data }) {
      if (data.success) {
         state.checkoutReportPayData = [...data.data.TypeMoneyList];
      }
      state.checkoutReportState = Object.assign({}, data);
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
