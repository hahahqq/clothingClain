import commonSend from "@/api/api";
import { getUserInfo, setHomeData, getHomeData } from "@/api/index";
import {
   GET_BARCODEPAYF_LIST,
   GET_BARCODEPAYT_LIST,
   GET_BARCODEPAYOPEN_LIST
} from "@/store/mutation-types";
let selected = {};

// initial state
const state = {
   barcodepayFState: {},
   barcodepayTState: {},
   barcodepayopenState: {}
};

// getters
const getters = {
   barcodepayFState: state => state.barcodepayFState,
   barcodepayTState: state => state.barcodepayTState,
   barcodepayopenState: state => state.barcodepayopenState
};

// actions
const actions = {
   getbarcodepayopenState({ commit }, data) {
      // 判断扫呗是否开通
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "000304_06",
         CompanyCode: userInfo.CompanyCode
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_BARCODEPAYOPEN_LIST, { data });
         },
         sendData
      );
   },
   getbarcodepayFState({ commit }, data) {
      // BarCode支付
      let userInfo = getUserInfo();
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "000306_V1",
         shopID: homeInfo.shop.ID,
         pay_type: "000",
         total_fee: data.total_fee,
         auth_no: data.auth_no,
         bill_money: data.bill_money,
         paytypeid: data.paytypeid,
         dealautograph: 1
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_BARCODEPAYF_LIST, { data });
         },
         sendData
      );
   },
   getbarcodepayTState({ commit }, data) {
      //交易查询
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "000306_03",
         out_trade_no: data.out_trade_no,
         dealautograph: 1
      };
      if (data) {
         sendData = Object.assign({}, sendData, data);
      }
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_BARCODEPAYT_LIST, { data });
         },
         sendData
      );
   }
};

// mutations
const mutations = {
   [GET_BARCODEPAYOPEN_LIST](state, { data }) {
      state.barcodepayopenState = Object.assign({}, data);
   },
   [GET_BARCODEPAYF_LIST](state, { data }) {
      state.barcodepayFState = Object.assign({}, data);
   },
   [GET_BARCODEPAYT_LIST](state, { data }) {
      state.barcodepayTState = Object.assign({}, data);
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
