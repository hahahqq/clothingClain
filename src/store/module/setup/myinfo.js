import commonSend from "@/api/api";
import { MY_INFO, EDIT_MY_INFO, GET_INDUSTRY } from "@/store/mutation-types";
import { getHomeData } from "@/api/index";
let selected = {};

// init state
const state = {
   myinfo: {},
   myinfoState: {},
   industryList: []
};

// getters
const getters = {
   myinfo: state => state.myinfo,
   myinfoState: state => state.myinfoState,
   industryList: state => state.industryList
};

// actions
const actions = {
   getMyInfo({ commit }) {
      // 获取商家信息
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "910106",
         Companyid: homeInfo.shop.COMPANYID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(MY_INFO, { data });
         },
         sendData
      );
   },
   editMyInfo({ commit }, data) {
      // 修改商家信息
      let homeInfo = getHomeData();
      let sendData = Object.assign({}, data, {
         InterfaceCode: "910107",
         Companyid: homeInfo.shop.COMPANYID
      });
      commonSend.commonSend(
         "get",
         data => {
            commit(EDIT_MY_INFO, { data });
         },
         sendData
      );
   },

   getIndustry({ commit }) {
      // 所属行业
      let sendData = {
         InterfaceCode: "20052"
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_INDUSTRY, { data });
         },
         sendData
      );
   },
   clearMyInfoAll({ state }) {
      state.myinfo = {};
      state.industryList = [];
   }
};

const mutations = {
   [MY_INFO](state, { data }) {
      if (data.success) {
         state.myinfo = Object.assign({}, data.data);
      }
      state.myinfoState = Object.assign({}, data);
      selected = {};
   },
   [EDIT_MY_INFO](state, { data }) {
      state.myinfoState = Object.assign({}, data);
   },
   [GET_INDUSTRY](state, { data }) {
      if (data.success) {
         state.industryList = [...data.data.List];
      }
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
