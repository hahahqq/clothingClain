/**
 *  报表
 *  作废 - 总
 * ***/
import commonSend from "@/api/api";
import { getUserInfo, getHomeData } from "@/api/index";
import { CANCEL_BILLS } from "@/store/mutation-types";
var ListARR = {
   surplus: [{ InterfaceCode: "", title: "营业额", id: 1 }]
};
let selected = {};

// initial state
const state = {
   billsARR: Object.assign({}, ListARR),
   cancelBillsState: {}
};

// getters
const getters = {
   billsARR: state => state.billsARR,
   cancelBillsState: state => state.cancelBillsState
};

// actions
const actions = {
   cancelBills({ commit, state }, { obj, data }) {
      // 作废
      let userInfo = getUserInfo();
      let interfaceCode = state.billsARR[obj.obj][obj.index].InterfaceCode;
      let sendData = Object.assign({}, data, {
         InterfaceCode: interfaceCode,
         CompanyId: userInfo.CompanyID,
         BillId: data.BillId
      });
      commonSend.commonSend(
         "get",
         data => {
            commit(CANCEL_BILLS, { data });
         },
         sendData
      );
   }
};

// mutations
const mutations = {
   [CANCEL_BILLS](state, { data }) {
      state.cancelBillsState = Object.assign({}, data);
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
