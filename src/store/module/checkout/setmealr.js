import commonSend from "@/api/api";
import { getUserInfo, setHomeData, getHomeData } from "@/api/index";
import {
   GET_SETMEALRSELECT_LIST,
   GET_SETMEALRSELECT_DETAIL,
   GET_SETMEALRTIMERECHARGE
} from "@/store/mutation-types";
let selected = {};

// initial state
const state = {
   setmealrselectlistState: {},
   setmealrselectdetailState: {},
   setmealrtimesrechargeState: {}
};

// getters
const getters = {
   setmealrselectlistState: state => state.setmealrselectlistState,
   setmealrselectdetailState: state => state.setmealrselectdetailState,
   setmealrtimesrechargeState: state => state.setmealrtimesrechargeState
};

// actions
const actions = {
   getsetmealrselectlistState({ commit }, data) {
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "60102010731",
         CompanyId: userInfo.CompanyID,
         Filter: data.Filter || "",
         Status: -1,
         PN: data.PN || ""
      };
      if (data) {
         sendData = Object.assign({}, sendData, data);
      }
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_SETMEALRSELECT_LIST, { data });
         },
         sendData
      );
   },
   getssetmealrselectdetailState({ commit }, data) {
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "60102010732",
         CompanyId: userInfo.CompanyID
      };
      if (data) {
         sendData = Object.assign({}, sendData, data);
      }
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_SETMEALRSELECT_DETAIL, { data });
         },
         sendData
      );
   },
   getsetmealrtimesrechargeState({ commit }, data) {
      let userInfo = getUserInfo();
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: 601020306,
         CompanyId: userInfo.CompanyID,
         Shopid: homeInfo.shop.ID
      };
      if (data) {
         sendData = Object.assign({}, sendData, data);
      }
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_SETMEALRTIMERECHARGE, { data });
         },
         sendData
      );
   }
};

// mutations
const mutations = {
   [GET_SETMEALRSELECT_LIST](state, { data }) {
      state.setmealrselectlistState = Object.assign({}, data);
   },
   [GET_SETMEALRSELECT_DETAIL](state, { data }) {
      state.setmealrselectdetailState = Object.assign({}, data);
   },
   [GET_SETMEALRTIMERECHARGE](state, { data }) {
      state.setmealrtimesrechargeState = Object.assign({}, data);
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
