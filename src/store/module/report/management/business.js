// 营业概况
import commonSend from "@/api/api";
import { getUserInfo, getHomeData } from "@/api/index";
import {
   GET_BUSINESS_DATA,
   GET_BUSINESS_LIST,
   CANCEL_BUSINESS_BILLS,
   GET_SALES_DETAILS
} from "@/store/mutation-types";
let selected = {};
var ListARR = [
   {},
   {
      InterfaceCode: "6010301_01",
      title: "售卡金额明细",
      paying: { TotalNumber: 0, PageNumber: 0, PageSize: 20, PN: 0 },
      List: [],
      index: 1,
      caneclCode: "",
      caneclTitle: ""
   },
   {
      InterfaceCode: "6010301_02",
      title: "储值充值明细",
      paying: { TotalNumber: 0, PageNumber: 0, PageSize: 20, PN: 0 },
      List: [],
      index: 2,
      caneclCode: "601020302",
      caneclTitle: "作废充值单"
   },
   {
      InterfaceCode: "6010301_03",
      title: "计次充值明细",
      paying: { TotalNumber: 0, PageNumber: 0, PageSize: 20, PN: 0 },
      List: [],
      index: 3,
      caneclCode: "",
      caneclTitle: ""
   },
   {
      InterfaceCode: "6010301_04",
      title: "套餐充值明细",
      paying: { TotalNumber: 0, PageNumber: 0, PageSize: 20, PN: 0 },
      List: [],
      index: 4,
      caneclCode: "",
      caneclTitle: ""
   },
   {
      InterfaceCode: "6010301_05",
      title: "快速消费明细",
      paying: { TotalNumber: 0, PageNumber: 0, PageSize: 20, PN: 0 },
      List: [],
      index: 5,
      caneclCode: "",
      caneclTitle: ""
   },
   {
      InterfaceCode: "91031011",
      title: "商品消费明细",
      paying: { TotalNumber: 0, PageNumber: 0, PageSize: 20, PN: 0 },
      List: [],
      index: 6,
      caneclCode: "",
      caneclTitle: ""
   },
   {
      InterfaceCode: "6010301_07",
      title: "计次消费明细",
      paying: { TotalNumber: 0, PageNumber: 0, PageSize: 20, PN: 0 },
      List: [],
      index: 7,
      caneclCode: "",
      caneclTitle: ""
   },
   {
      InterfaceCode: "6010301_08",
      title: "积分兑换明细",
      paying: { TotalNumber: 0, PageNumber: 0, PageSize: 20, PN: 0 },
      List: [],
      index: 8,
      caneclCode: "601020316",
      caneclTitle: "积分兑换作废"
   },
   {
      InterfaceCode: "6010301_09",
      title: "费用支出明细",
      paying: { TotalNumber: 0, PageNumber: 0, PageSize: 20, PN: 0 },
      List: [],
      index: 9,
      caneclCode: "",
      caneclTitle: ""
   },
   {
      InterfaceCode: "6010301_10",
      title: "新增会员列表",
      paying: { TotalNumber: 0, PageNumber: 0, PageSize: 20, PN: 0 },
      List: [],
      index: 10,
      caneclCode: "",
      caneclTitle: ""
   },
   {
      InterfaceCode: "601020501",
      title: "商品库存列表",
      paying: { TotalNumber: 0, PageNumber: 0, PageSize: 20, PN: 0 },
      List: [],
      index: 11,
      caneclCode: "",
      caneclTitle: ""
   }
];

// initial state
const state = {
   businessReportState: {},
   businessReportData: {},
   businessReportList: [],
   businessReportListState: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      },
      List: []
   },
   businessReportListARR: [...ListARR],
   cancelbusinessState: {},
   salesDetailsState: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      },
      List: [],
      Item: {}
   }
};

// getters
const getters = {
   businessReportData: state => state.businessReportData,
   businessReportList: state => state.businessReportList,
   businessReportState: state => state.businessReportState,
   businessReportListState: state => state.businessReportListState,
   businessReportListARR: state => state.businessReportListARR,
   cancelbusinessState: state => state.cancelbusinessState,
   salesDetailsState: state => state.salesDetailsState
};

// actions
const actions = {
   getbusinessReportData({ commit }, data) {
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "91030102", // 6010301
         CompanyId: userInfo.CompanyID,
         ShopId: data.ShopId ? data.ShopId : "",
         BeginDate: data.BeginDate ? data.BeginDate : 1,
         EndDate: data.EndDate ? data.EndDate : 9999999999999
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_BUSINESS_DATA, { data });
         },
         sendData
      );
   },
   getbusinessReportList({ commit, state }, { obj, data }) {
      let userInfo = getUserInfo();
      console.log(obj, data);
      let listArrData = state.businessReportListARR[obj.index];
      // let pn = parseInt(listArrData.paying.PN) +1;
      let sendData = {
         InterfaceCode: listArrData.InterfaceCode,
         CompanyId: userInfo.CompanyID,
         ShopId: data.ShopId ? data.ShopId : "",
         BeginDate: data.BeginDate ? data.BeginDate : 1,
         EndDate: data.EndDate ? data.EndDate : 9999999999999,
         PN: data.PN ? data.PN : 1
      };
      if (obj.index == 6 && obj.obj == "business") {
         // 商品消费
         sendData.Filter = data.Filter;
      }
      if (obj.index == 11 && obj.obj == "business") {
         // 商品库存列表
         sendData = {
            InterfaceCode: listArrData.InterfaceCode,
            CompanyId: userInfo.CompanyID,
            ShopID: data.ShopId,
            Filter: "",
            PN: data.PN ? data.PN : 1
         };
      }
      selected.obj = obj;
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_BUSINESS_LIST, { data });
         },
         sendData
      );
   },
   clearbusinessReportList({ state }, index) {
      state.businessReportList = [];
      state.businessReportListState.paying.PN = 0;
      state.businessReportListARR[index].paying.PN = 0;
   },
   clearbusinessReportAll({ state }) {
      state.businessReportData = {};
      state.businessReportList = [];
      state.businessReportListState.paying.PN = 0;
      state.businessReportListARR = [...ListARR];
   },
   cancelbusinessBills({ commit, state }, { obj, data }) {
      // 作废
      let userInfo = getUserInfo();
      let interfaceCode = state.businessReportListARR[obj.index].caneclCode;
      let sendData = Object.assign({}, data, {
         InterfaceCode: interfaceCode,
         CompanyId: userInfo.CompanyID,
         BillId: data.BillId
      });
      commonSend.commonSend(
         "get",
         data => {
            commit(CANCEL_BUSINESS_BILLS, { data });
         },
         sendData
      );
   },
   getSalesDetails({ commit, state }, data) {
      // 销售明细
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "601020505",
         CompanyId: userInfo.CompanyID,
         ShopId: data.SHOPID,
         GoodsId: data.GOODSID,
         PN: data.PN ? data.PN : 1
      };
      selected.item = data;
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_SALES_DETAILS, { data });
         },
         sendData
      );
   }
};

// mutations
const mutations = {
   [GET_BUSINESS_DATA](state, { data }) {
      if (data.success) {
         state.businessReportData = Object.assign({}, data.data);
      }
      state.businessReportState = Object.assign({}, data);
   },
   [GET_BUSINESS_LIST](state, { data }) {
      console.log(selected, "selected");
      let listArrData = state.businessReportListARR[selected.obj.index];
      let pageData = Object.assign({}, listArrData.paying);
      if (data.success) {
         let newArr = [...data.data.PageData.DataArr];
         if (newArr.length > 0) {
            pageData = Object.assign(pageData, data.data.PageData);
            state.businessReportList = [...newArr];
            state.businessReportListARR[selected.obj.index].paying = Object.assign({}, pageData);
            state.businessReportListARR[selected.obj.index].List = [...state.businessReportList];
         }
      }
      state.businessReportListState = Object.assign({}, data, {
         paying: pageData,
         List: state.businessReportList
      });
      selected = {};
   },
   [CANCEL_BUSINESS_BILLS](state, { data }) {
      state.cancelbusinessState = Object.assign({}, data);
   },
   [GET_SALES_DETAILS](state, { data }) {
      let pageData = Object.assign({}, state.salesDetailsState.paying);
      let arr = [];
      if (data.success) {
         let newArr = [...data.data.PageData.DataArr];
         if (newArr.length > 0) {
            pageData = Object.assign(pageData, data.data.PageData);
            arr = [...newArr];
         }
      }
      state.salesDetailsState = Object.assign({}, data, {
         paying: pageData,
         List: arr,
         Item: selected.item
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
