/**
 * 会员
 *
 * ***/
import commonSend from "@/api/api";
import { getUserInfo, getHomeData } from "@/api/index";
import {
   MEMBER_BALANCE_ADJUST,
   MEMBER_RECHARGE,
   MEMBER_INTEGRAL_ADJUST,
   MEMBER_CARDS_ADJUST
} from "@/store/mutation-types";
let selected = {};

// initial state
const state = {
   memberBAdjustState: {},
   memberRechargeState: {},
   memberIAdjustState: {},
   memberCAdjustState: {}
};

// getters
const getters = {
   memberBAdjustState: state => state.memberBAdjustState,
   memberRechargeState: state => state.memberRechargeState,
   memberIAdjustState: state => state.memberIAdjustState,
   memberCAdjustState: state => state.memberCAdjustState
};

// actions
const actions = {
   memberRecharge({ commit }, data) {
      // 储值卡充值
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "91020221",
         CompanyId: userInfo.CompanyID,
         ShopId: data.ShopId,
         VipId: data.VipId,
         AddMoney: data.AddMoney ? data.AddMoney : 0,
         GiftMoney: data.GiftMoney ? data.GiftMoney : 0,
         Remark: data.Remark ? data.Remark : "",
         IsSmd: data.IsSms ? 1 : 0,
         PayTypeId: data.PayTypeId,
         SaleEmpMoney: []
      };
      commonSend.commonSend(
         "post",
         data => {
            commit(MEMBER_RECHARGE, { data });
         },
         sendData
      );
   },
   memberBalanceAdjust({ commit }, data) {
      // 余额调整
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "91020231",
         CompanyId: userInfo.CompanyID,
         ShopId: data.ShopId,
         VipId: data.VipId,
         Money: data.Money ? data.Money : 0, // 增加为正数，减少为负数
         Remark: data.Remark ? data.Remark : "",
         IsSms: data.IsSms ? 1 : 0
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(MEMBER_BALANCE_ADJUST, { data });
         },
         sendData
      );
   },
   memberIntegralAdjust({ commit }, data) {
      // 积分调整
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "91020232",
         CompanyId: userInfo.CompanyID,
         ShopId: data.ShopId,
         VipId: data.VipId,
         Integral: data.Integral ? data.Integral : 0, // 增加为正数，减少为负数
         Remark: data.Remark ? data.Remark : "",
         IsSms: data.IsSms ? 1 : 0
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(MEMBER_INTEGRAL_ADJUST, { data });
         },
         sendData
      );
   },
   memberCardsAdjust({ commit }, data) {
      // 计次卡调整
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "601020313",
         CompanyId: userInfo.CompanyID,
         ShopId: data.ShopId,
         VipId: data.VipId,
         GoodsId: data.GoodsId,
         Qty: data.Qty ? data.Qty : 0,
         Remark: data.Remark ? data.Remark : "",
         IsSms: data.IsSms ? 1 : 0,
         EndDate: data.EndDate ? data.EndDate : "9999997999999",
         IsInvalid: data.IsInvalid ? 1 : 0 // 0=不限，1=限制
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(MEMBER_CARDS_ADJUST, { data });
         },
         sendData
      );
   }
};

// mutations
const mutations = {
   [MEMBER_BALANCE_ADJUST](state, { data }) {
      state.memberBAdjustState = Object.assign({}, data);
   },
   [MEMBER_RECHARGE](state, { data }) {
      state.memberRechargeState = Object.assign({}, data);
   },
   [MEMBER_INTEGRAL_ADJUST](state, { data }) {
      state.memberIAdjustState = Object.assign({}, data);
   },
   [MEMBER_CARDS_ADJUST](state, { data }) {
      state.memberCAdjustState = Object.assign({}, data);
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
