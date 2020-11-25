// 积分调整统计 + 余额调整统计
import commonSend from "@/api/api";
import { getUserInfo, getHomeData } from "@/api/index";
import { GET_INTEGRAL_ADJUST_LIST, GET_BALANCE_ADJUST_LIST } from "@/store/mutation-types";
let selected = {};

// initial state
const state = {
   integralAdjustList: [], // 积分调整统计
   integralAdjustListState: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      },
      List: []
   },
   balanceAdjustList: [], // 余额调整统计
   balanceAdjustListState: {
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
   integralAdjustList: state => state.integralAdjustList,
   integralAdjustListState: state => state.integralAdjustListState,
   balanceAdjustList: state => state.balanceAdjustList,
   balanceAdjustListState: state => state.balanceAdjustListState
};

// actions
const actions = {
   getintegralAdjustList({ commit }, data) {
      //积分调整统计
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "91031061",
         CompanyId: userInfo.CompanyID,
         ShopId: data.ShopId,
         BeginDate: data.BeginDate ? data.BeginDate : 1,
         EndDate: data.EndDate ? data.EndDate : 9999999999999,
         PN: data.PN ? data.PN : 1
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_INTEGRAL_ADJUST_LIST, { data });
         },
         sendData
      );
   },
   getbalanceAdjustList({ commit, state }, data) {
      // 余额调整统计
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "91031062",
         CompanyId: userInfo.CompanyID,
         ShopId: data.ShopId,
         BeginDate: data.BeginDate ? data.BeginDate : 1,
         EndDate: data.EndDate ? data.EndDate : 9999999999999,
         PN: data.PN ? data.PN : 1
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_BALANCE_ADJUST_LIST, { data });
         },
         sendData
      );
   },
   clearAdjustList({ state }, index) {
      state.integralAdjustList = [];
      state.integralAdjustListState.paying.PN = 0;
      state.balanceAdjustList = [];
      state.balanceAdjustListState.paying.PN = 0;
   },
   clearAdjustAll({ state }) {
      state.integralAdjustList = [];
      state.integralAdjustListState.paying.PN = 0;
      state.balanceAdjustList = [];
      state.balanceAdjustListState.paying.PN = 0;
   }
};

// mutations
const mutations = {
   [GET_INTEGRAL_ADJUST_LIST](state, { data }) {
      let pageData = Object.assign({}, state.integralAdjustListState.paying);
      if (data.success) {
         let newArr = [...data.data.PageData.DataArr];
         if (newArr.length > 0) {
            pageData = Object.assign(pageData, data.data.PageData);
            state.integralAdjustList = [...newArr];
         }
      }
      state.integralAdjustListState = Object.assign({}, data, {
         paying: pageData,
         List: state.integralAdjustList
      });
   },
   [GET_BALANCE_ADJUST_LIST](state, { data }) {
      let pageData = Object.assign({}, state.balanceAdjustListState.paying);
      if (data.success) {
         let newArr = [...data.data.PageData.DataArr];
         if (newArr.length > 0) {
            pageData = Object.assign(pageData, data.data.PageData);
            state.balanceAdjustList = [...newArr];
         }
      }
      state.balanceAdjustListState = Object.assign({}, data, {
         paying: pageData,
         List: state.balanceAdjustList
      });
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
