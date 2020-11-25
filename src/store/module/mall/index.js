import commonSend from "@/api/api";
import { GET_SETUP_MALL, SETUP_MALL, MALL_HOME, MALL_QRCODE } from "@/store/mutation-types";
import { getUserInfo, getHomeData } from "@/api/index";
let selected = {};

// init state
const state = {
   mallData: {},
   mallState: {},
   settingMallState: {}, // 设置
   mallQRcodeState: {},
   mallHomeData: {}
};

// getters
const getters = {
   mallState: state => state.mallState,
   mallData: state => state.mallData,
   settingMallState: state => state.settingMallState,
   mallQRcodeState: state => state.mallQRcodeState,
   mallHomeData: state => state.mallHomeData
};

// actions
const actions = {
   getSettingMall({ commit }) {
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "60102110512",
         CompanyId: userInfo.CompanyID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_SETUP_MALL, { data });
         },
         sendData
      );
   },
   settingMall({ commit }, data) {
      let userInfo = getUserInfo();
      let sendData = Object.assign(
         {
            InterfaceCode: "60102110514",
            CompanyId: userInfo.CompanyID
         },
         data
      );
      commonSend.commonSend(
         "get",
         data => {
            commit(SETUP_MALL, { data });
         },
         sendData
      );
   },
   getHomeMall({ commit }) {
      let userInfo = getUserInfo();
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "60102110515",
         CompanyId: userInfo.CompanyID,
         ShopId: homeInfo.shop.ID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(MALL_HOME, { data });
         },
         sendData
      );
   },
   getQRcodeMall({ commit }, data) {
      let sendData = {
         InterfaceCode: "2100130",
         ShopID: data.shopId
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(MALL_QRCODE, { data });
         },
         sendData
      );
   }
};

// mutations
const mutations = {
   [SETUP_MALL](state, { data }) {
      state.settingMallState = Object.assign({}, data);
   },
   [GET_SETUP_MALL](state, { data }) {
      console.log("mall data", data);
      state.mallData =
         data.success && data.data.Obj ? Object.assign({}, data.data.Obj) : new Object();
      state.mallState = Object.assign({ type: "setup" }, data);
   },
   [MALL_HOME](state, { data }) {
      state.mallHomeData = Object.assign({}, data);
   },
   [MALL_QRCODE](state, { data }) {
      state.mallQRcodeState = Object.assign({ type: "qrcode" }, data);
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
