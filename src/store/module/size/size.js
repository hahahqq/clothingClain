import commonSend from "@/api/api";
import {
   GET_SIZE_LIST,
   GET_SIZE_ADD,
   GET_SIZE_EDIT,
   GET_SIZEGROUP_LIST,
   GET_SIZE_DELETE,
   ADD_SIZE_GROUP,
   DEL_SIZE_GROUP,
   GET_SIZE_CODE_LIST,
   SIZE_CODE_GROUP_SAVE
} from "@/store/mutation-types";
let selected = {};
import { getUserInfo, getHomeData } from "@/api/index";
// init state
const state = {
   sizeState: {},
   sizeList: [],
   // tagState:{},
   // seltagArr:[],
   sizeaddState: {},
   sizedeleteState: {},
   sizeGroupState: {},
   sizeGroupList: [],
   addSizeGroupState: {},
   addSizeState: {},
   editSizeState: {},
   delSizeState: {},
   delSizeGroupState: {},
   sizeCodeGroupSaveState: {},
   getSizeCodeListState: {}
};

// getters
const getters = {
   sizeState: state => state.sizeState,
   sizeList: state => state.sizeList,
   // tagState: state=>state.tagState,
   // seltagArr: state=>state.seltagArr,
   sizeaddState: state => state.sizeaddState,
   sizedeleteState: state => state.sizedeleteState,
   sizeGroupState: state => state.sizeGroupState,
   sizeGroupList: state => state.sizeGroupList,
   addSizeGroupState: state => state.addSizeGroupState,
   addSizeState: state => state.addSizeState,
   editSizeState: state => state.editSizeState,
   delSizeState: state => state.delSizeState,
   delSizeGroupState: state => state.delSizeGroupState,
   sizeCodeGroupSaveState: state => state.sizeCodeGroupSaveState,
   getSizeCodeListState: state => state.getSizeCodeListState
};

// actions
const actions = {
   getsizeState({ commit }, data) {
      //尺码列表
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "9102080201",
         GroupId: data.GroupId,
         CompanyId: homeInfo.shop.COMPANYID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_SIZE_LIST, { data });
         },
         sendData
      );
   },
   getsizeGroupList({ commit }, data) {
      // 尺码组列表
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "9102080210",
         CompanyId: homeInfo.shop.COMPANYID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_SIZEGROUP_LIST, { data });
         },
         sendData
      );
   },
   addSizeGroup({ commit }, data) {
      // 尺码组保存\修改
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "9102080213",
         CompanyId: homeInfo.shop.COMPANYID,
         Name: data.Name,
         Remark: "",
         Id: data.Id
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(ADD_SIZE_GROUP, { data });
         },
         sendData
      );
   },
   delSizeGroupList({ commit }, data) {
      // 尺码组删除
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "9102080214",
         CompanyId: homeInfo.shop.COMPANYID,
         Id: data.ID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(DEL_SIZE_GROUP, { data });
         },
         sendData
      );
   },
   getsizeaddState({ commit }, data) {
      // 保存尺寸
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "9102080203",
         CompanyId: homeInfo.shop.COMPANYID,
         Id: "",
         GroupId: data.GroupId,
         Name: data.Name,
         Code: "",
         OrderNo: 0,
         Remark: ""
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_SIZE_ADD, { data });
         },
         sendData
      );
   },
   getsizeEditState({ commit }, data) {
      // 修改尺寸
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "9102080203",
         CompanyId: homeInfo.shop.COMPANYID,
         Id: data.Id,
         GroupId: data.GroupId,
         Name: data.Name,
         Code: data.Code,
         OrderNo: 0,
         Remark: ""
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_SIZE_EDIT, { data });
         },
         sendData
      );
   },
   getDelsizeState({ commit }, data) {
      //删除尺寸
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "9102080204",
         CompanyId: homeInfo.shop.COMPANYID,
         Id: data.ID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_SIZE_DELETE, { data });
         },
         sendData
      );
   },
   sizeCodeGroupSave({ commit }, data) {
      //尺码编号批量保存
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: 9102080205,
         CompanyId: homeInfo.shop.COMPANYID,
         SizeObj: data.SizeObj
      };
      commonSend.commonSend(
         "post",
         data => {
            commit(SIZE_CODE_GROUP_SAVE, { data });
         },
         sendData
      );
   },
   getSizeBarCodeList({ commit }, data) {
      //尺码编号列表
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: 9102080206,
         CompanyId: homeInfo.shop.COMPANYID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_SIZE_CODE_LIST, { data });
         },
         sendData
      );
   }
};

const mutations = {
   [SIZE_CODE_GROUP_SAVE](state, { data }) {
      state.sizeCodeGroupSaveState = data;
   },
   [GET_SIZE_CODE_LIST](state, { data }) {
      state.getSizeCodeListState = data;
   },
   [GET_SIZE_LIST](state, { data }) {
      // 尺码列表
      if (data.success) {
         state.sizeList = [...data.data.List];
      }
      state.sizeState = Object.assign({}, data);
   },
   [GET_SIZE_ADD](state, { data }) {
      // 保存尺码
      state.addSizeState = Object.assign({}, data);
   },
   [GET_SIZE_EDIT](state, { data }) {
      // 修改尺码
      state.editSizeState = Object.assign({}, data);
   },
   [GET_SIZE_DELETE](state, { data }) {
      // 删除尺码
      state.delSizeState = Object.assign({}, data);
   },
   [GET_SIZEGROUP_LIST](state, { data }) {
      // 尺码组列表
      if (data.success) {
         state.sizeGroupList = [...data.data.List];
         console.log([...data.data.List]);
      }
      state.sizeGroupState = Object.assign({}, data);
   },
   [DEL_SIZE_GROUP](state, { data }) {
      // 删除尺码组
      state.delSizeGroupState = Object.assign({}, data);
   },
   [ADD_SIZE_GROUP](state, { data }) {
      // 保存尺码组
      state.addSizeGroupState = Object.assign({}, data);
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
