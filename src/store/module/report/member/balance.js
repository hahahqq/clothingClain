// 余额积分统计 + 调整余次统计
import commonSend from "@/api/api";
import { getUserInfo, getHomeData } from "@/api/index";
import { GET_INTEGRAL_BALANCE_LIST, GET_NUMBER_BALANCE_LIST } from "@/store/mutation-types";
let selected = {};
var ListARR = [
   {
      InterfaceCode: "91031041",
      title: "余额积分统计",
      paying: { TotalNumber: 0, PageNumber: 0, PageSize: 20, PN: 0 },
      List: []
   }
];

// initial state
const state = {
   integralBalanceList: [], // 余额积分统计
   integralBalanceListState: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      },
      List: []
   },
   integralBalanceListARR: [...ListARR],
   numberBalanceList: [], // 调整余次统计
   numberBalanceListState: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      },
      List: []
   }
};

// getters
const getters = {
   integralBalanceList: state => state.integralBalanceList,
   integralBalanceListState: state => state.integralBalanceListState,
   integralBalanceListARR: state => state.integralBalanceListARR,
   numberBalanceList: state => state.numberBalanceList,
   numberBalanceListState: state => state.numberBalanceListState
};

// actions
const actions = {
   getintegralBalanceList({ commit }, { obj, data }) {
      //余额积分统计
      let userInfo = getUserInfo();
      // let listArrData = state.integralBalanceListARR[obj.index];
      let sendData = {
         InterfaceCode: "91031041",
         CompanyId: userInfo.CompanyID,
         ShopId: data.ShopId ? data.ShopId : "",
         VipCode: data.code,
         PN: data.PN ? data.PN : 1
      };
      selected.obj = obj;
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_INTEGRAL_BALANCE_LIST, { data });
         },
         sendData
      );
   },
   getnumberBalanceList({ commit, state }, data) {
      // 调整余次统计
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "6010311",
         CompanyId: userInfo.CompanyID,
         ShopId: data.ShopId ? data.ShopId : "",
         BeginDate: data.BeginDate ? data.BeginDate : 1,
         EndDate: data.EndDate ? data.EndDate : 9999999999999,
         PN: data.PN ? data.PN : 1
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_NUMBER_BALANCE_LIST, { data });
         },
         sendData
      );
   },
   clearBalanceList({ state }, index) {
      if (index == 1) {
         state.integralBalanceList = [];
         state.integralBalanceListState.paying.PN = 0;
         state.integralBalanceListARR[0].List = [];
         state.integralBalanceListARR[0].paying.PN = 0;
      } else if (index == 2) {
         state.numberBalanceList = [];
         state.numberBalanceListState.paying.PN = 0;
      } else {
         state.integralBalanceList = [];
         state.integralBalanceListState.paying.PN = 0;
         state.numberBalanceList = [];
         state.numberBalanceListState.paying.PN = 0;
      }
   },
   clearBalanceAll({ state }) {
      state.integralBalanceList = [];
      state.integralBalanceListState.paying.PN = 0;
      state.numberBalanceList = [];
      state.numberBalanceListState.paying.PN = 0;
      state.integralBalanceListARR = [...ListARR];
   }
};

// mutations
const mutations = {
   [GET_INTEGRAL_BALANCE_LIST](state, { data }) {
      let pageData = Object.assign({}, state.integralBalanceListState.paying);
      if (data.success) {
         let newArr = [...data.data.PageData.DataArr];
         if (newArr.length > 0) {
            pageData = Object.assign(pageData, data.data.PageData);
            state.integralBalanceList = [...newArr];
            state.integralBalanceListARR[selected.obj.index].paying = Object.assign({}, pageData);
            state.integralBalanceListARR[selected.obj.index].List = [...state.integralBalanceList];
         }
      }
      state.integralBalanceListState = Object.assign({}, data, {
         paying: pageData,
         List: state.integralBalanceList
      });
      selected = {};
   },
   [GET_NUMBER_BALANCE_LIST](state, { data }) {
      let pageData = Object.assign({}, state.numberBalanceListState.paying);
      if (data.success) {
         let newArr = [...data.data.PageData.DataArr];
         if (newArr.length > 0) {
            pageData = Object.assign(pageData, data.data.PageData);
            state.numberBalanceList = [...newArr];
         }
      }
      state.numberBalanceListState = Object.assign({}, data, {
         paying: pageData,
         List: state.numberBalanceList
      });
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
