import commonSend from "@/api/api";
import {
   GET_COLOR_LIST,
   GET_COLOR_ADD,
   GET_COLOR_DELETE,
   GET_COLOR_CODE_LIST,
   COLOR_CODE_GROUP_SAVE
} from "@/store/mutation-types";
let selected = {};

import { getUserInfo, getHomeData } from "@/api/index";

// init state
const state = {
   colorState: {},
   colorList: [],
   tagState: {},
   seltagArr: [],
   coloraddState: {},
   colordeleteState: {},
   colorCodeGroupSaveState: {},
   getColorCodeListState: {}
};

// getters
const getters = {
   colorState: state => state.colorState,
   colorList: state => state.colorList,
   tagState: state => state.tagState,
   seltagArr: state => state.seltagArr,
   coloraddState: state => state.coloraddState,
   colordeleteState: state => state.colordeleteState,
   colorCodeGroupSaveState: state => state.colorCodeGroupSaveState,
   getColorCodeListState: state => state.getColorCodeListState
};

// actions
const actions = {
   getcolorState({ commit }, item) {
      //颜色列表
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: 9102080101,
         Filter: item.Filter || "",
         CompanyId: homeInfo.shop.COMPANYID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_COLOR_LIST, { data });
         },
         sendData
      );
   },
   getcoloraddState({ commit }, item) {
      //颜色新增
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: 9102080103,
         Id: item.Id || "",
         Name: item.Name,
         CompanyId: homeInfo.shop.COMPANYID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_COLOR_ADD, { data });
         },
         sendData
      );
   },
   getcolordeleteState({ commit }, item) {
      //颜色删除
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: 9102080104,
         Id: item.Id,
         CompanyId: homeInfo.shop.COMPANYID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_COLOR_DELETE, { data });
         },
         sendData
      );
   },
   colorCodeGroupSave({ commit }, data) {
      //颜色编号批量保存
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: 9102080105,
         CompanyId: homeInfo.shop.COMPANYID,
         ColorObj: data.ColorObj
      };
      commonSend.commonSend(
         "post",
         data => {
            commit(COLOR_CODE_GROUP_SAVE, { data });
         },
         sendData
      );
   },
   getColorBarCodeList({ commit }, data) {
      //颜色编号列表
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: 9102080106,
         CompanyId: homeInfo.shop.COMPANYID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_COLOR_CODE_LIST, { data });
         },
         sendData
      );
   },

   selectingTagArr({ commit, state }, index) {
      if (state.seltagArr[index].active) {
         state.seltagArr[index].active = false;
      } else {
         state.seltagArr[index].active = true;
      }
      state.tagState = { action: "selectingTagArr" };
   }
};

const mutations = {
   [COLOR_CODE_GROUP_SAVE](state, { data }) {
      state.colorCodeGroupSaveState = data;
   },
   [GET_COLOR_CODE_LIST](state, { data }) {
      state.getColorCodeListState = data;
   },

   [GET_COLOR_LIST](state, { data }) {
      state.colorState = Object.assign({}, data);
      if (data.success) {
         state.colorList = [...data.data.List];
         state.seltagArr = [...data.data.List];
      }
   },
   [GET_COLOR_ADD](state, { data }) {
      state.coloraddState = Object.assign({}, data);
      if (data.success) {
      }
   },
   [GET_COLOR_DELETE](state, { data }) {
      state.colordeleteState = Object.assign({}, data);
      if (data.success) {
      }
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
