/**
 * 积分
 * ***/
import commonSend from "@/api/api";
import { getUserInfo, getHomeData } from "@/api/index";
import {
   GET_INTEGRAL_LIST,
   GET_INTEGRAL_ITEM,
   DEAL_INTEGRAL_ITEM,
   INTEGRAL_STATE
} from "@/store/mutation-types";
let selected = {};

// initial state
const state = {
   integralListState: {},
   integralList: [],
   integralState: [],
   selintegral: {},
   integralItem: {},
   dealIntegralState: {}
};

// getters
const getters = {
   integralListState: state => state.integralListState,
   integralList: state => state.integralList,
   integralState: state => state.integralState,
   selintegral: state => state.selintegral,
   integralItem: state => state.integralItem,
   dealIntegralState: state => state.dealIntegralState,
   integralDefault: state => {
      let item = {};
      if (state.integralList.length > 0) {
         let arr = state.integralList.filter(item => item.ISDEF == 1);
         item = arr[0];
      }
      return item;
   }
};

// actions
const actions = {
   getIntegralList({ commit }, data) {
      //积分倍率列表
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "9102010301",
         CompanyId: homeInfo.shop.COMPANYID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_INTEGRAL_LIST, { data });
         },
         sendData
      );
   },
   getIntegralItem({ commit }, id) {
      //积分倍率详情
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "9102010302",
         CompanyId: userInfo.CompanyID,
         ID: id
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_INTEGRAL_ITEM, { data });
         },
         sendData
      );
   },
   dealIntegralItem({ commit }, data) {
      //积分倍率保存
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "9102010303",
         CompanyId: userInfo.CompanyID,
         Name: data.NAME,
         Money: data.Money ? parseFloat(data.Money) : 0,
         Integral: data.Integral ? parseFloat(data.Integral) : 1,
         Rate: data.Rate,
         IsDefault: data.IsDefault
      };
      selected.type = "add";
      if (data.ID) {
         sendData.ID = data.ID;
         selected.type = "edit";
      }
      commonSend.commonSend(
         "get",
         data => {
            commit(DEAL_INTEGRAL_ITEM, { data });
         },
         sendData
      );
   },
   delIntegralItem({ commit }, { index, data }) {
      //积分倍率删除
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "9102010304",
         CompanyId: userInfo.CompanyID,
         ID: data.ID
      };
      selected.type = "del";
      selected.index = index;
      selected.data = Object.assign({}, data);
      commonSend.commonSend(
         "get",
         data => {
            commit(DEAL_INTEGRAL_ITEM, { data });
         },
         sendData
      );
   },
   defaultIntegralItem({ commit }, ID) {
      // 设为默认积分倍率
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "9102010305",
         CompanyId: userInfo.CompanyID,
         ID: ID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(INTEGRAL_STATE, { data });
         },
         sendData
      );
   },
   selectingIntegral({ state }, data) {
      state.selintegral = Object.assign({}, data);
   },
   clearIntegralAll({ state }) {
      state.integralList = [];
      state.selintegral = {};
      state.integralItem = {};
   }
};

// mutations
const mutations = {
   [GET_INTEGRAL_LIST](state, { data }) {
      if (data.success) {
         state.integralList = [...data.data.List];
      }
      state.integralListState = Object.assign({}, data);
   },
   [GET_INTEGRAL_ITEM](state, { data }) {
      if (data.success) {
         state.integralItem = Object.assign({}, data.data.obj);
      }
      state.integralState = Object.assign({}, data);
   },
   [DEAL_INTEGRAL_ITEM](state, { data }) {
      state.dealIntegralState = Object.assign({}, data);
      selected = {};
   },
   [INTEGRAL_STATE](state, { data }) {
      state.integralState = Object.assign({}, data);
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
