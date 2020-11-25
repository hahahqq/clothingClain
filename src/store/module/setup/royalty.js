// 提成设置
import commonSend from "@/api/api";
import { getUserInfo, getHomeData } from "@/api/index";
import {
   SET_SELLING_CARDS,
   SELLING_CARDS_LIST,
   SET_RECHARGE,
   GET_RECHARGE_VALUE,
   SET_FASTCONSUME,
   SET_FASTCONSUME_VALUE,
   SET_GOODSCONSUME
} from "@/store/mutation-types";
let selected = {};
// initial state
const state = {
   sellingCardsState: {},
   sellingCardsListState: {
      data: {
         List: []
      }
   },
   rechargeState: {},
   rechargeValueState: {
      data: {
         EmpAddRate: 0
      }
   },
   fastConsumeState: {},
   fastConsumeValueState: {
      data: {
         EmpSaleRate: 0
      }
   },
   goodsConsumeState: {}
};

// getters
const getters = {
   sellingCardsState: state => state.sellingCardsState,
   sellingCardsListState: state => state.sellingCardsListState,
   rechargeState: state => state.rechargeState,
   rechargeValueState: state => state.rechargeValueState,
   fastConsumeState: state => state.fastConsumeState,
   fastConsumeValueState: state => state.fastConsumeValueState,
   goodsConsumeState: state => state.goodsConsumeState,
   EmpAddRate: getters => {
      return getters.rechargeValueState.data.EmpAddRate;
   },
   EmpSaleRate: getters => {
      return getters.fastConsumeValueState.data.EmpSaleRate;
   },
   sellingCardsList: state => {
      return state.sellingCardsListState.data.List;
   }
};

// actions
const actions = {
   setSellingCards({ commit }, data) {
      // 售卡提成设置
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "60102011301",
         CompanyId: userInfo.CompanyID,
         LevelId: data.id,
         Mode: data.Mode ? 1 : 0, // 0=按金额，1=按比例
         Money: data.Money ? data.Money : 0 // 提成金额或提成比例(0.08=8%)
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(SET_SELLING_CARDS, { data });
         },
         sendData
      );
   },
   getSellingCardsList({ commit }, data) {
      // 售卡提成列表
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "60102011301_01",
         CompanyId: userInfo.CompanyID,
         LevelId: data.LevelId ? data.LevelId : "" // 为空=all
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(SELLING_CARDS_LIST, { data });
         },
         sendData
      );
   },
   setRecharge({ commit }, data) {
      // 充值提成设置
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "60102011302",
         CompanyId: userInfo.CompanyID,
         Rate: data.Rate // 0.1
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(SET_RECHARGE, { data });
         },
         sendData
      );
   },
   getRechargeValue({ commit }) {
      // 充值提成详情
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "60102011302_01",
         CompanyId: userInfo.CompanyID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_RECHARGE_VALUE, { data });
         },
         sendData
      );
   },
   setFastConsume({ commit }, data) {
      // 快速消费提成设置
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "60102011303",
         CompanyId: userInfo.CompanyID,
         Rate: data.Rate // 0.1
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(SET_FASTCONSUME, { data });
         },
         sendData
      );
   },
   getFastConsumeValue({ commit }) {
      // 快速消费提成详情
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "60102011303_01",
         CompanyId: userInfo.CompanyID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(SET_FASTCONSUME_VALUE, { data });
         },
         sendData
      );
   },
   setGoodsConsume({ commit }, data) {
      // 商品消费提成
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "60102011305",
         CompanyId: userInfo.CompanyID,
         GoodsId: data.GoodsId, // 商品服务ID
         Mode1: data.Mode1, // 0=按金额，1=按比例
         Money1: data.Money1 ? data.Money1 : 0, // 提成金额或提成比例(0.08=8%)
         Mode2: data.Mode2,
         Money2: data.Money2 ? data.Money2 : 0,
         Mode3: data.Mode3,
         Money3: data.Money3 ? data.Money3 : 0
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(SET_GOODSCONSUME, { data });
         },
         sendData
      );
   }
};

// mutations
const mutations = {
   [SET_SELLING_CARDS](state, { data }) {
      state.sellingCardsState = Object.assign({}, data);
   },
   [SELLING_CARDS_LIST](state, { data }) {
      state.sellingCardsListState = Object.assign({}, data);
   },
   [SET_RECHARGE](state, { data }) {
      state.rechargeState = Object.assign({}, data);
   },
   [GET_RECHARGE_VALUE](state, { data }) {
      state.rechargeValueState = Object.assign({}, data);
   },
   [SET_FASTCONSUME](state, { data }) {
      state.fastConsumeState = Object.assign({}, data);
   },
   [SET_FASTCONSUME_VALUE](state, { data }) {
      state.fastConsumeValueState = Object.assign({}, data);
   },
   [SET_GOODSCONSUME](state, { data }) {
      state.goodsConsumeState = Object.assign({}, data);
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
