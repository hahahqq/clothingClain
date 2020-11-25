/**
 * 商品类别
 *
 * ***/
import commonSend from "@/api/api";
import { getUserInfo, setHomeData } from "@/api/index";
import {
   GET_CATEGORY_LIST,
   GET_CATEGORY_ITEM,
   DEAL_CATEGORY_ITEM,
   DEL_CATEGORY_ITEM
} from "@/store/mutation-types";
let selected = {};

// initial state
const state = {
   categoryListState: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      }
   },
   categoryList: [],
   categoryState: [],
   selcategory: {},
   categoryItem: {},
   dealCategoryState: {},
   delGoodsCategory: {}
};

// getters
const getters = {
   categoryListState: state => state.categoryListState,
   categoryList: state => state.categoryList,
   categoryState: state => state.categoryState,
   selcategory: state => state.selcategory,
   categoryItem: state => state.categoryItem,
   dealCategoryState: state => state.dealCategoryState,
   delGoodsCategory: state => state.delGoodsCategory
};

// actions
const actions = {
   getCategoryList({ commit }, data) {
      //商品分类列表
      let userInfo = getUserInfo();
      let pn = parseInt(state.categoryListState.paying.PN);
      let sendData = {
         InterfaceCode: "9102080311",
         CompanyId: userInfo.CompanyID,
         PN: pn,
         PID: ""
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_CATEGORY_LIST, { data });
         },
         sendData
      );
   },
   getCategoryItem({ commit }, id) {
      //商品分类详情
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "9102080312",
         CompanyId: userInfo.CompanyID,
         ID: id
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_CATEGORY_ITEM, { data });
         },
         sendData
      );
   },
   dealCategoryItem({ commit }, data) {
      //商品分类保存
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "9102080313",
         CompanyId: data.COMPANYID ? data.COMPANYID : userInfo.CompanyID,
         Name: data.Name,
         PID: "",
         Remark: data.Remark
      };
      selected.type = "add";
      if (data.ID) {
         sendData.ID = data.ID;
         selected.type = "edit";
         selected.data = Object.assign({}, data);
      } else {
         selected.data = Object.assign({}, sendData);
         delete selected.data.InterfaceCode;
      }
      commonSend.commonSend(
         "get",
         data => {
            commit(DEAL_CATEGORY_ITEM, { data });
         },
         sendData
      );
   },
   delCategoryItem({ commit }, data) {
      //商品分类删除
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: 9102080314,
         CompanyId: userInfo.CompanyID,
         ID: data.ID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(DEL_CATEGORY_ITEM, { data });
         },
         sendData
      );
   },
   choosingCategory({ commit }, item) {
      setHomeData({ category: item });
   },
   selectingCategory({ commit, state }, data) {
      state.selcategory = Object.assign({}, data);
   },
   clearCategoryAll({ state }) {
      state.categoryListState.paying.PN = 0;
      state.categoryList = [];
      state.selcategory = {};
      state.categoryItem = {};
   }
};

// mutations
const mutations = {
   [GET_CATEGORY_LIST](state, { data }) {
      let pageData = Object.assign({}, state.categoryListState.paying);
      if (data.success) {
         state.categoryList = [...data.data.PageData.DataArr];
         pageData = Object.assign(pageData, data.data.PageData);
      }
      state.categoryListState = Object.assign({}, data, { paying: pageData });
   },
   [GET_CATEGORY_ITEM](state, { data }) {
      if (data.success) {
         state.categoryItem = Object.assign({}, data.data.obj);
      }
      state.categoryState = Object.assign({}, data);
   },
   [DEAL_CATEGORY_ITEM](state, { data }) {
      if (data.success) {
         if (selected.type == "edit") {
            let index = state.categoryList.findIndex(obj =>
               Object.is(parseInt(selected.data.ID), parseInt(obj.ID))
            );
            for (let key in selected.data) {
               let kk = key.toUpperCase();
               state.categoryList[index][kk] = selected.data[key];
            }
         }
         if (selected.type == "add") {
            // let item = Object.assign({},selected.data,{Id:data.data.OutId})
            state.categoryList = [];
         }
         state.categoryListState.paying.PN = 0;
      }
      state.dealCategoryState = Object.assign({}, data);
      selected = {};
   },
   [DEL_CATEGORY_ITEM](state, { data }) {
      state.delGoodsCategory = Object.assign({}, data);
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
