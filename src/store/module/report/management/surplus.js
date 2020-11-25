// 收支结余
import commonSend from "@/api/api";
import { getUserInfo, getHomeData } from "@/api/index";
import { GET_SURPLUS_DATA, GET_SURPLUS_LIST } from "@/store/mutation-types";
let selected = {};
var ListARR = [
   {
      InterfaceCode: "91030602",
      title: "销售分析详情",
      paying: { TotalNumber: 0, PageNumber: 0, PageSize: 20, PN: 0 },
      List: []
   },
   {
      InterfaceCode: "91030201_01",
      title: "营业额明细",
      paying: { TotalNumber: 0, PageNumber: 0, PageSize: 20, PN: 0 },
      List: []
   },
   {
      InterfaceCode: "91030201_02",
      title: "会员消费明细",
      paying: { TotalNumber: 0, PageNumber: 0, PageSize: 20, PN: 0 },
      List: []
   },
   {
      InterfaceCode: "91030201_03",
      title: "充值明细",
      paying: { TotalNumber: 0, PageNumber: 0, PageSize: 20, PN: 0 },
      List: []
   },
   {
      InterfaceCode: "91030201_04",
      title: "支出明细",
      paying: { TotalNumber: 0, PageNumber: 0, PageSize: 20, PN: 0 },
      List: []
   },
   {
      InterfaceCode: "91030201_06",
      title: "支付明细",
      paying: { TotalNumber: 0, PageNumber: 0, PageSize: 20, PN: 0 },
      List: []
   },
   {
      InterfaceCode: "6010302_06",
      title: "欠款明细",
      paying: { TotalNumber: 0, PageNumber: 0, PageSize: 20, PN: 0 },
      List: []
   },
   {
      InterfaceCode: "91030201_05",
      title: "还款明细",
      paying: { TotalNumber: 0, PageNumber: 0, PageSize: 20, PN: 0 },
      List: []
   },
   {
      InterfaceCode: "91030303",
      title: "支付方式明细",
      paying: { TotalNumber: 0, PageNumber: 0, PageSize: 20, PN: 0 },
      List: []
   }
];

// initial state
const state = {
   surplusReportState: {},
   surplusReportData: {},
   surplusReportList: [],
   surplusReportListState: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      },
      List: []
   },
   surplusReportListARR: [...ListARR]
};

// getters
const getters = {
   surplusReportData: state => state.surplusReportData,
   surplusReportList: state => state.surplusReportList,
   surplusReportState: state => state.surplusReportState,
   surplusReportListState: state => state.surplusReportListState,
   surplusReportListARR: state => state.surplusReportListARR
};

// actions
const actions = {
   getsurplusReportData({ commit }, data) {
      // 首页收支结余
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "91030201",
         CompanyId: userInfo.CompanyID,
         ShipIDList: data.ShopIdList ? data.ShopIdList : "",
         BeginDate: data.BeginDate
            ? data.BeginDate
            : new Date(new Date().setHours(0, 0, 0, 0)) - 86400 * 0 * 1000,
         EndDate: data.EndDate ? data.EndDate : new Date().getTime()
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_SURPLUS_DATA, { data });
         },
         sendData
      );
   },
   getsurplusReportList({ commit, state }, { obj, data, dateStr }) {
      let userInfo = getUserInfo();
      let listArrData = state.surplusReportListARR[obj.index];
      console.log(state.surplusReportListARR, obj);
      console.log(listArrData);
      // let pn = parseInt(listArrData.paying.PN) +1;
      let sendData = {
         InterfaceCode: listArrData.InterfaceCode,
         CompanyId: userInfo.CompanyID,
         ShipIDList: data.ShopIdList ? data.ShopIdList : "",
         BeginDate: data.BeginDate ? data.BeginDate : 1,
         EndDate: data.EndDate ? data.EndDate : 9999999999999,
         PN: data.PN ? data.PN : 1
      };

      if (obj.index == 0 && obj.obj == "sale") {
         (sendData.ShopId = getHomeData().shop.ID),
            (sendData.DateStr = dateStr.DateStr),
            (sendData.OrderType = 0);
      }

      if (listArrData.InterfaceCode == "91030303") {
         sendData.ShopId = data.ShopIdList ? data.ShopIdList : "";
      }
      if (data.PayTypeId) {
         // 支付明细
         sendData.PayTypeId = data.PayTypeId;
      }

      console.log(sendData);
      selected.obj = obj;
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_SURPLUS_LIST, { data });
         },
         sendData
      );
   },
   clearsurplusReportList({ state }, index) {
      state.surplusReportList = [];
      state.surplusReportListState.paying.PN = 0;
      state.surplusReportListARR[index].paying.PN = 0;
   },
   clearsurplusReportAll({ state }) {
      state.surplusReportData = {};
      state.surplusReportList = [];
      state.surplusReportListState.paying.PN = 0;
      state.surplusReportListARR = [...ListARR];
   }
};

// mutations
const mutations = {
   [GET_SURPLUS_DATA](state, { data }) {
      if (data.success) {
         state.surplusReportData = Object.assign({}, data.data);
      }
      state.surplusReportState = Object.assign({}, data);
   },
   [GET_SURPLUS_LIST](state, { data }) {
      let listArrData = state.surplusReportListARR[selected.obj.index];
      let pageData = Object.assign({}, listArrData.paying);
      console.log(data);
      if (data.success) {
         let newArr = [...data.data.PageData.DataArr];
         if (newArr.length > 0) {
            pageData = Object.assign(pageData, data.data.PageData);
            console.log(pageData);
            state.surplusReportList = [...newArr];
            state.surplusReportListARR[selected.obj.index].paying = Object.assign({}, pageData);
            state.surplusReportListARR[selected.obj.index].List = [...state.surplusReportList];
         }
      }
      state.surplusReportListState = Object.assign({}, data, {
         paying: pageData,
         List: state.surplusReportList
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
