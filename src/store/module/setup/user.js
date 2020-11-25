/**
 * 用户
 * ***/
import commonSend from "@/api/api";
import { getUserInfo, getHomeData } from "@/api/index";
import {
   GET_USER_LIST,
   GET_USER_ITEM,
   DEAL_USER_ITEM,
   GET_PERMISSION_LIST,
   SET_PERMISSION,
   RESET_USER_PASSWORD,
   DEL_USER,
   SET_PERMISSION_STORE
} from "@/store/mutation-types";
let selected = {};
let homeInfo = getHomeData();
// initial state
const state = {
   userListState: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      }
   },
   userList: [],
   userState: {},
   seluser: {},
   userItem: {},
   dealUserState: {},
   permissionList: {},
   permissionStore: [],
   permissionBrand: [],
   permissionListState: {},
   permissionState: {},
   resetUserPassWordState: {},
   delUserState: {},
   permissionStoreState: {}
};

// getters
const getters = {
   userListState: state => state.userListState,
   userList: state => state.userList,
   userState: state => state.userState,
   seluser: state => state.seluser,
   userItem: state => state.userItem,
   dealUserState: state => state.dealUserState,
   permissionList: state => state.permissionList,
   permissionStore: state => state.permissionStore,
   permissionBrand: state => state.permissionBrand,
   permissionListState: state => state.permissionListState,
   permissionState: state => state.permissionState,
   resetUserPassWordState: state => state.resetUserPassWordState,
   delUserState: state => state.delUserState,
   permissionStoreState: state => state.permissionStoreState
};

// actions
const actions = {
   getUserList({ commit }, data) {
      // 获取用户列表
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "910118",
         Companyid: homeInfo.shop.COMPANYID,
         isstop: "false", // 是否禁用
         isall: -1, // 返回全部
         filter: data.filter ? data.filter : "",
         PN: data.PN ? data.PN : 1
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_USER_LIST, { data });
         },
         sendData
      );
   },
   addUserItem({ commit }, data) {
      //新增用户
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "910115",
         Companyid: userInfo.CompanyID,
         username: data.username,
         password: data.password,
         usercode: data.usercode,
         isadmin: data.isadmin ? true : false
      };
      selected.type = "add";
      commonSend.commonSend(
         "get",
         data => {
            commit(DEAL_USER_ITEM, { data });
         },
         sendData
      );
   },
   editUserItem({ commit }, data) {
      //修改用户
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "910116",
         Companyid: userInfo.CompanyID,
         UserID: data.UserID,
         UserName: data.username,
         UserCode: data.usercode,
         IsAdmin: data.isadmin ? true : false,
         IsStop: data.IsStop ? true : false
      };
      selected.type = "edit";
      commonSend.commonSend(
         "get",
         data => {
            commit(DEAL_USER_ITEM, { data });
         },
         sendData
      );
   },
   changeUserPwd({ commit }, data) {
      // 修改用户密码
      let sendData = {
         InterfaceCode: "910117",
         OldPswd: data.OldPswd,
         NewPswd: data.NewPswd
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(DEAL_USER_ITEM, { data });
         },
         sendData
      );
   },
   selectingUser({ state }, data) {
      state.seluser = Object.assign({}, data);
   },
   sendUserMessage({ commit }, data) {
      // 商家留言提交
      let userInfo = getUserInfo();
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "60101041",
         Companyid: userInfo.CompanyID,
         AppType: 8, // 3=开店宝,6=餐饮宝,8=美业宝
         VersionText: homeInfo.shop.VERSION,
         Remark: data.Remark,
         PhoneNo: data.PhoneNo
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(DEAL_USER_ITEM, { data });
         },
         sendData
      );
   },
   clearUserAll({ state }) {
      state.userListState.paying.PN = 0;
      state.userList = [];
      state.seluser = {};
      state.userItem = {};
      state.permissionList = {};
      state.permissionStore = [];
      state.permissionBrand = [];
   },
   getPermissionList({ commit }, uid) {
      // 获取用户权限列表
      let sendData = {
         InterfaceCode: "910119",
         UserID: uid
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_PERMISSION_LIST, { data });
         },
         sendData
      );
   },
   setPermissionList({ commit }, { uid, parr, BrandList }) {
      // 用户权限保存
      let userInfo = getUserInfo();
      let CompanyID = userInfo.CompanyID;
      let sendData = {
         InterfaceCode: "910120A",
         CompanyId: userInfo.CompanyID,
         UserID: uid,
         List: parr,
         BrandList: BrandList
      };
      let arr = [];
      for (let i = 0; i < parr.length; i++) {
         arr.push({
            IsPurview: 1,
            FunID: parr[i].FUNID,
            CompanyID: CompanyID
         });
      }
      sendData.List = JSON.stringify(arr);
      commonSend.commonSend(
         "post",
         data => {
            commit(SET_PERMISSION, { data });
         },
         sendData
      );
   },
   setPermissionStore({ commit }, { uid, sarr }) {
      // 用户店铺权限保存
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "910121",
         Companyid: userInfo.CompanyID,
         writer: userInfo.UserID,
         userid: uid,
         list: JSON.stringify(sarr)
      };
      commonSend.commonSend(
         "post",
         data => {
            commit(SET_PERMISSION_STORE, { data });
         },
         sendData
      );
   },
   delUser({ commit }, data) {
      // 删除用户
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "910114",
         Companyid: userInfo.CompanyID,
         UserID: data.UserID
      };
      commonSend.commonSend(
         "post",
         data => {
            commit(DEL_USER, { data });
         },
         sendData
      );
   },
   resetUserPassWord({ commit }, data) {
      // 修改用户密码
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "910122",
         Companyid: userInfo.CompanyID,
         Password: data.Password,
         UserID: data.UserID
      };
      commonSend.commonSend(
         "post",
         data => {
            commit(RESET_USER_PASSWORD, { data });
         },
         sendData
      );
   }
};

// mutations
const mutations = {
   [DEL_USER](state, { data }) {
      state.delUserState = data;
   },
   [RESET_USER_PASSWORD](state, { data }) {
      state.resetUserPassWordState = data;
   },
   [GET_USER_LIST](state, { data }) {
      let pageData = Object.assign({}, state.userListState.paying);
      if (data.success) {
         state.userList = [...data.data.PageData.DataArr];
         pageData = Object.assign(pageData, data.data.PageData);
      }
      state.userListState = Object.assign({}, data, { paying: pageData });
   },
   [GET_USER_ITEM](state, { data }) {
      if (data.success) {
         state.userItem = Object.assign({}, data.data.obj);
      }
      state.userState = Object.assign({}, data);
   },
   [DEAL_USER_ITEM](state, { data }) {
      state.dealUserState = Object.assign({}, data, selected);
      selected = {};
   },
   [GET_PERMISSION_LIST](state, { data }) {
      console.log(data);
      if (data.success) {
         let darr = [...data.data.List];
         let newList = {};
         for (let i = 0; i < darr.length; i++) {
            if (
               darr[i].MODULEID == "806" ||
               darr[i].MODULEID == "807" ||
               darr[i].MODULEID == "808" ||
               darr[i].MODULEID == "809"
            ) {
               darr[i].MODULETYPE = 0;
            }

            if (darr[i].MODULETYPE == 0) {
               newList[darr[i].MODULEID] = { info: darr[i], list: [] };
            } else {
               if (newList[darr[i].PID])
                  newList[darr[i].PID].list.push(
                     Object.assign({}, darr[i], {
                        IsPurview: darr[i].ISPURVIEW == 1 ? true : false
                     })
                  );
            }
         }
         state.permissionList = Object.assign({}, newList);
         state.permissionStore = [...data.data.ShopList];
         state.permissionBrand = [...data.data.BrandList];
      }
      state.permissionListState = Object.assign({}, data);
   },
   [SET_PERMISSION](state, { data }) {
      state.permissionState = Object.assign({}, data);
   },
   [SET_PERMISSION_STORE](state, { data }) {
      state.permissionStoreState = Object.assign({}, data);
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
