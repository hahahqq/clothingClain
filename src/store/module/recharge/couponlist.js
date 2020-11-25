import commonSend from "@/api/api";
import { getUserInfo, setHomeData, getHomeData } from "@/api/index";
import { GET_COUPONLIST_LIST, GET_COUPONCHECK_LIST } from "@/store/mutation-types";
let selected = {};

// initial state
const state = {
   couponlistState: {},
   couponcheckState: {}
};

// getters
const getters = {
   couponlistState: state => state.couponlistState,
   couponcheckState: state => state.couponcheckState
};

// actions
const actions = {
   getcouponlistState({ commit }, data) {
      // 支付优惠券列表
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "91020727",
         openID: data.openID,
         PN: data.PN || 1,
         Type: data.Type || 0,
         CompanyId: userInfo.CompanyID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_COUPONLIST_LIST, { data });
         },
         sendData
      );
   },
   getcouponcheckState({ commit }, data) {
      // 单张优惠券查询
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "91020310",
         Code: data.Code,
         CompanyId: userInfo.CompanyID
      };
      if (data) {
         sendData = Object.assign({}, sendData, data);
      }
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_COUPONCHECK_LIST, { data });
         },
         sendData
      );
   }
};

// mutations
const mutations = {
   [GET_COUPONLIST_LIST](state, { data }) {
      state.couponlistState = Object.assign({}, data);
   },
   [GET_COUPONCHECK_LIST](state, { data }) {
      state.couponcheckState = Object.assign({}, data);
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
