// 员工排行
import commonSend from "@/api/api";
import { getUserInfo, getHomeData } from "@/api/index";
import {
   GET_EMPLOYEE_SORT_DATA,
   GET_EMPLOYEE_SORT_LIST,
   GET_EMPLOYEE_SORT_ITEM,
   GET_EMPLOYEE_ACHIEVEMENT,
   GET_EMPLOYEE_BESPEAK
} from "@/store/mutation-types";
let selected = {};
var ListARR = [
   {
      InterfaceCode: "60102100604",
      title: "员工排行-好评详情",
      paying: { TotalNumber: 0, PageNumber: 0, PageSize: 20, PN: 0 },
      List: []
   }
];

// initial state
const state = {
   employeeSortState: {},
   employeeSortData: [],
   employeeSortList: [],
   employeeSortListState: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      },
      List: []
   },
   employeeSortListARR: [...ListARR],
   employeeSortItem: { data: {} },
   employeeAchievement: {},
   employeeBespeak: {}
};

// getters
const getters = {
   employeeSortData: state => state.employeeSortData,
   employeeSortList: state => state.employeeSortList,
   employeeSortState: state => state.employeeSortState,
   employeeSortListState: state => state.employeeSortListState,
   employeeSortListARR: state => state.employeeSortListARR,
   employeeSortItem: state => state.employeeSortItem,
   employeeAchievement: state => state.employeeAchievement,
   employeeBespeak: state => state.employeeBespeak
};

// actions
const actions = {
   getemployeeSortData({ commit }, data) {
      // 员工排行-好评
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "60102100601",
         Companyid: userInfo.CompanyID,
         Shopid: data.ShopId ? data.ShopId : "",
         BeginDate: data.BeginDate ? data.BeginDate : 1,
         EndDate: data.EndDate ? data.EndDate : 9999999999999
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_EMPLOYEE_SORT_DATA, { data });
         },
         sendData
      );
   },
   getemployeeSortList({ commit, state }, { obj, data }) {
      // 员工排行-好评详情
      let userInfo = getUserInfo();
      let listArrData = state.employeeSortListARR[obj.index];
      let pn = parseInt(listArrData.paying.PN) + 1;
      let sendData = {
         InterfaceCode: listArrData.InterfaceCode,
         Companyid: userInfo.CompanyID,
         BeginDate: data.BeginDate ? data.BeginDate : 1,
         EndDate: data.EndDate ? data.EndDate : 9999999999999,
         PN: data.PN ? data.PN : pn,
         Empid: data.id // 员工ID
      };
      selected.obj = obj;
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_EMPLOYEE_SORT_LIST, { data });
         },
         sendData
      );
   },
   clearemployeeSortList({ state }, index) {
      state.employeeSortList = [];
      state.employeeSortListState.paying.PN = 0;
      state.employeeSortListARR[index].paying.PN = 0;
   },
   getEmployeeAchievement({ commit }, data) {
      // 员工排行-业绩
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "60102100602",
         Companyid: userInfo.CompanyID,
         Shopid: data.ShopId ? data.ShopId : "",
         BeginDate: data.BeginDate ? data.BeginDate : 1,
         EndDate: data.EndDate ? data.EndDate : 9999999999999
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_EMPLOYEE_ACHIEVEMENT, { data });
         },
         sendData
      );
   },
   getEmployeeBespeak({ commit }, data) {
      // 员工排行-预约
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "60102100603",
         Companyid: userInfo.CompanyID,
         Shopid: data.ShopId ? data.ShopId : "",
         BeginDate: data.BeginDate ? data.BeginDate : 1,
         EndDate: data.EndDate ? data.EndDate : 9999999999999
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_EMPLOYEE_BESPEAK, { data });
         },
         sendData
      );
   },
   clearemployeeSortAll({ state }) {
      state.employeeSortList = [];
      state.employeeSortListState.paying.PN = 0;
      state.employeeSortData = [];
      state.employeeSortListARR = [...ListARR];
      state.employeeSortItem = { data: {} };
   }
};

// mutations
const mutations = {
   [GET_EMPLOYEE_SORT_DATA](state, { data }) {
      if (data.success) {
         state.employeeSortData = [...data.data.List];
      }
      state.employeeSortState = Object.assign({}, data);
   },
   [GET_EMPLOYEE_SORT_LIST](state, { data }) {
      let listArrData = state.employeeSortListARR[selected.obj.index];
      let pageData = Object.assign({}, listArrData.paying);
      if (data.success) {
         let newArr = [...data.data.PageData.DataArr];
         if (newArr.length > 0) {
            pageData = Object.assign(pageData, data.data.PageData);
            state.employeeSortList = [...newArr];
            state.employeeSortListARR[selected.obj.index].paying = Object.assign({}, pageData);
            state.employeeSortListARR[selected.obj.index].List = [...state.employeeSortList];
         }
      }
      state.employeeSortListState = Object.assign({}, data, {
         paying: pageData,
         List: state.employeeSortList
      });
      selected = {};
   },
   [GET_EMPLOYEE_ACHIEVEMENT](state, { data }) {
      state.employeeAchievement = Object.assign({}, data);
   },
   [GET_EMPLOYEE_BESPEAK](state, { data }) {
      state.employeeBespeak = Object.assign({}, data);
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
