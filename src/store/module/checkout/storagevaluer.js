import commonSend from "@/api/api";
import { getUserInfo, setHomeData, getHomeData } from "@/api/index";
import { GET_SRORAGEVALUERRECHARGE, GET_SRORAGEVALUERROYALTY } from "@/store/mutation-types";
let selected = {};

// initial state
const state = {
   storagevaluerroyaltyState: {},
   storagevaluerrechargeState: {}
};

// getters
const getters = {
   storagevaluerroyaltyState: state => state.storagevaluerroyaltyState,
   storagevaluerrechargeState: state => state.storagevaluerrechargeState
};

// actions
const actions = {
   getstoragevaluerroyaltyState({ commit }, data) {
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "60102011302_01",
         CompanyId: userInfo.CompanyID
      };
      if (data) {
         sendData = Object.assign({}, sendData, data);
      }
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_SRORAGEVALUERROYALTY, { data });
         },
         sendData
      );
   },
   getstoragevaluerrechargeState({ commit }, data) {
      let userInfo = getUserInfo();
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: 601020301,
         CompanyId: userInfo.CompanyID,
         ShopId: homeInfo.shop.ID
      };
      if (data) {
         sendData = Object.assign({}, sendData, data);
      }
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_SRORAGEVALUERRECHARGE, { data });
         },
         sendData
      );
   }
};

// mutations
const mutations = {
   [GET_SRORAGEVALUERROYALTY](state, { data }) {
      state.storagevaluerroyaltyState = Object.assign({}, data);
   },
   [GET_SRORAGEVALUERRECHARGE](state, { data }) {
      state.storagevaluerrechargeState = Object.assign({}, data);
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
