/**
 * 员工
 *
 * ***/
import commonSend from "@/api/api";
import { getUserInfo, getHomeData, setHomeData } from "@/api/index";
import {
   GET_EMPLOYEE_LIST,
   GET_EMPLOYEE_ITEM,
   GET_DELEMPLOYEE_STATE
} from "@/store/mutation-types";
let selected = {};

// initial state
const state = {
   employeeListState: {},
   employeeList: [],
   selemployee: {},
   employeeitemState: {},
   delemployeestate: {}
};

// getters
const getters = {
   employeeListState: state => state.employeeListState,
   employeeList: state => state.employeeList,
   selemployee: state => state.selemployee,
   employeeitemState: state => state.employeeitemState,
   delemployeestate: state => state.delemployeestate
};

// actions
const actions = {
   getEmployeeList({ commit }, data) {
      //员工档案列表
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "9102010401",
         CompanyId: userInfo.CompanyID,
         Filter: data.Filter ? data.Filter : "",
         Category: data.Category ? data.Category : ""
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_EMPLOYEE_LIST, { data });
         },
         sendData
      );
   },
   choosingEmployee({ commit }, item) {
      setHomeData({ employee: item });
   },
   selectingEmployee({ commit, state }, data) {
      state.selemployee = Object.assign({}, data);
   },
   clearEmployeeAll({ state }) {
      state.employeeList = [];
      state.selemployee = {};
   },
   dealEmployeeItem({ commit }, data) {
      //员工档案保存
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "9102010403",
         CompanyId: userInfo.CompanyID
      };
      if (data) {
         sendData = Object.assign({}, sendData, data);
      }
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_EMPLOYEE_ITEM, { data });
         },
         sendData
      );
   },
   getdelemployeestate({ commit, state }, { index, data }) {
      //员工档案删除
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "9102010404",
         CompanyId: userInfo.CompanyID,
         ID: data.ID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_DELEMPLOYEE_STATE, { data });
         },
         sendData
      );
   }
};

// mutations
const mutations = {
   [GET_EMPLOYEE_LIST](state, { data }) {
      if (data.success) {
         state.employeeList = [...data.data.List];
      }
      state.employeeListState = Object.assign({}, data);
   },
   [GET_EMPLOYEE_ITEM](state, { data }) {
      if (data.success) {
      }
      state.employeeitemState = Object.assign({}, data);
   },
   [GET_DELEMPLOYEE_STATE](state, { data }) {
      if (data.success) {
      }
      state.delemployeestate = Object.assign({}, data);
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
