import commonSend from "@/api/api";
import { getUserInfo, setHomeData, getHomeData } from "@/api/index";
import { GET_TIMESCOUNTCCONSUMPTION } from "@/store/mutation-types";
let selected = {};

// initial state
const state = {
   timescountcconsumptionState: {}
};

// getters
const getters = {
   timescountcconsumptionState: state => state.timescountcconsumptionState
};

// actions
const actions = {
   gettimescountcconsumption({ commit }, data) {
      let userInfo = getUserInfo();
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: 601020403,
         CompanyId: userInfo.CompanyID,
         ShopId: homeInfo.shop.ID
      };
      if (data) {
         sendData = Object.assign({}, sendData, data);
      }
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_TIMESCOUNTCCONSUMPTION, { data });
         },
         sendData
      );
   }
};

// mutations
const mutations = {
   [GET_TIMESCOUNTCCONSUMPTION](state, { data }) {
      state.timescountcconsumptionState = Object.assign({}, data);
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
