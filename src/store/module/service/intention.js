/***
 * 服务
 * 意向客户
 *  */
import commonSend from "@/api/api";
import {
   SERVICE_INTENTION_LIST,
   SERVICE_INTENTION_ITEM,
   SERVICE_INTENTION_STATE,
   SERVICE_INTENTION_DEAL,
   SERVICE_INTENTION_CHANGE
} from "@/store/mutation-types";
import { getUserInfo, getHomeData } from "@/api/index";
let selected = {};

// init state
const state = {
   sIntentionList: [],
   sIntentionListState: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      },
      List: []
   },
   sIntentionState: {},
   sIntentionItem: {},
   sIntentionDeal: {},
   sIntentionChange: {}
};

// getters
const getters = {
   sIntentionList: state => state.sIntentionList,
   sIntentionListState: state => state.sIntentionListState,
   sIntentionState: state => state.sIntentionState,
   sIntentionItem: state => state.sIntentionItem,
   sIntentionDeal: state => state.sIntentionDeal,
   sIntentionChange: state => state.sIntentionChange
};

// actions
const actions = {
   getSIntentionList({ commit }, data) {
      let homeInfo = getHomeData();
      let pn = parseInt(state.sIntentionListState.paying.PN) + 1;
      let sendData = {
         InterfaceCode: 60102100202,
         CompanyId: homeInfo.shop.COMPANYID,
         ShopId: data.ShopId ? data.ShopId : "",
         BeginDate: data.BeginDate ? data.BeginDate : 1,
         EndDate: data.EndDate ? data.EndDate : 9999999999999,
         SaleEmpId: data.SaleEmpId ? data.SaleEmpId : "",
         PN: data.PN ? data.PN : pn,
         Filter: data.Filter ? data.Filter : "",
         WillLevel: data.WillLevel ? data.WillLevel : ""
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(SERVICE_INTENTION_LIST, { data });
         },
         sendData
      );
   },
   getSIntentionItem({ commit }, data) {
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: 60102100205,
         CompanyId: homeInfo.shop.COMPANYID,
         ClientId: data.ID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(SERVICE_INTENTION_ITEM, { data });
         },
         sendData
      );
   },
   dealSIntentionItem({ commit }, data) {
      let homeInfo = getHomeData();
      let sendData = Object.assign({}, data, {
         InterfaceCode: 60102100201,
         CompanyId: homeInfo.shop.COMPANYID
      });
      commonSend.commonSend(
         "get",
         data => {
            commit(SERVICE_INTENTION_DEAL, { data });
         },
         sendData
      );
   },
   changeSIntentionItem({ commit }, data) {
      // 意向客户转正
      let homeInfo = getHomeData();
      let sendData = Object.assign({}, data, {
         InterfaceCode: 60102100203,
         CompanyId: homeInfo.shop.COMPANYID
      });
      commonSend.commonSend(
         "get",
         data => {
            commit(SERVICE_INTENTION_CHANGE, { data });
         },
         sendData
      );
   },
   clearSIntentionAll({ state }) {
      state.sIntentionListState.paying.PN = 0;
      state.sIntentionList = [];
      // state.sIntentionState = {}
      state.sIntentionItem = {};
      // state.sIntentionDeal = {}
   }
};

const mutations = {
   [SERVICE_INTENTION_LIST](state, { data }) {
      let pageData = Object.assign({}, state.sIntentionListState.paying);
      if (data.success) {
         state.sIntentionList = [...data.data.PageData.DataArr];
         pageData = Object.assign(pageData, data.data.PageData);
      }
      state.sIntentionListState = Object.assign({}, data, { paying: pageData });
   },
   [SERVICE_INTENTION_ITEM](state, { data }) {
      if (data.success) {
         state.sIntentionItem = Object.assign({}, data.data.Obj);
      }
      state.sIntentionState = Object.assign({}, data);
      selected = {};
   },
   [SERVICE_INTENTION_DEAL](state, { data }) {
      state.sIntentionDeal = Object.assign({}, data);
   },
   [SERVICE_INTENTION_CHANGE](state, { data }) {
      state.sIntentionChange = Object.assign({}, data);
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
