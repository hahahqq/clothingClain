import commonSend from "@/api/api";
import { getUserInfo, setHomeData, getHomeData } from "@/api/index";
import { GET_FASTCCROYALTY, GET_FASTCCONSUMPTION } from "@/store/mutation-types";

let selected = {};

// initial state
const state = {
   fastccroyaltyState: {},
   fastcconsumptionState: {}
};

// getters
const getters = {
   fastccroyaltyState: state => state.fastccroyaltyState,
   fastcconsumptionState: state => state.fastcconsumptionState
};

// actions
const actions = {
   getfastccroyaltyState({ commit }, data) {
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "60102011303_01",
         CompanyId: userInfo.CompanyID
      };
      if (data) {
         sendData = Object.assign({}, sendData, data);
      }
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_FASTCCROYALTY, { data });
         },
         sendData
      );
   },
   getfastcconsumption({ commit }, data) {
      let userInfo = getUserInfo(),
         homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: 601020401,
         CompanyId: userInfo.CompanyID,
         ShopId: homeInfo.shop.ID
      };
      if (data) {
         sendData = Object.assign({}, sendData, data);
      }
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_FASTCCONSUMPTION, { data });
         },
         sendData
      );
   }
};

// mutations
const mutations = {
   [GET_FASTCCROYALTY](state, { data }) {
      state.fastccroyaltyState = Object.assign({}, data);
   },
   [GET_FASTCCONSUMPTION](state, { data }) {
      state.fastcconsumptionState = Object.assign({}, data);
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
