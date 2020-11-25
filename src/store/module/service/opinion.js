/***
 * 服务
 * 意见反馈
 *  */
import commonSend from "@/api/api";
import {
   SERVICE_OPINION_LIST,
   SERVICE_OPINION_ITEM,
   SERVICE_OPINION_STATE
} from "@/store/mutation-types";
import { getUserInfo, getHomeData } from "@/api/index";
let selected = {};

// init state
const state = {
   sOpinionList: [],
   sOpinionListState: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      },
      List: []
   },
   sOpinionState: {},
   sOpinionItem: {}
};

// getters
const getters = {
   sOpinionList: state => state.sOpinionList,
   sOpinionListState: state => state.sOpinionListState,
   sOpinionState: state => state.sOpinionState,
   sOpinionItem: state => state.sOpinionItem
};

// actions
const actions = {
   getSOpinionList({ commit }, data) {
      let homeInfo = getHomeData();
      let pn = parseInt(state.sOpinionListState.paying.PN) + 1;
      let sendData = {
         InterfaceCode: "60102100403",
         CompanyId: homeInfo.shop.COMPANYID,
         VipId: data.VipId ? data.VipId : "",
         BeginDate: data.BeginDate ? data.BeginDate : 1,
         EndDate: data.EndDate ? data.EndDate : 9999999999999,
         Status: data.Status,
         PN: data.PN ? data.PN : pn
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(SERVICE_OPINION_LIST, { data });
         },
         sendData
      );
   },
   getSOpinionItem({ commit }, data) {
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "60102100405",
         CompanyId: homeInfo.shop.COMPANYID,
         BillId: data.BILLID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(SERVICE_OPINION_ITEM, { data });
         },
         sendData
      );
   },
   addSOpinionItem({ commit }, data) {
      // 新增意见反馈
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "60102100401",
         CompanyId: homeInfo.shop.COMPANYID,
         ShopId: data.ShopId,
         VipId: data.VipId,
         Remark: data.Remark
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(SERVICE_OPINION_STATE, { data });
         },
         sendData
      );
   },
   replySOpinionItem({ commit }, data) {
      // 意见反馈回复
      let sendData = {
         InterfaceCode: "60102100402",
         BillId: data.BILLID,
         Remark: data.Remark
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(SERVICE_OPINION_STATE, { data });
         },
         sendData
      );
   },
   clearSOpinionAll({ state }) {
      state.sOpinionList = [];
      state.sOpinionListState.paying.PN = 0;
      state.sOpinionItem = {};
   }
};

const mutations = {
   [SERVICE_OPINION_LIST](state, { data }) {
      let pageData = Object.assign({}, state.sOpinionListState.paying);
      if (data.success) {
         state.sOpinionList = [...data.data.PageData.DataArr];
         pageData = Object.assign(pageData, data.data.PageData);
      }
      state.sOpinionListState = Object.assign({}, data, { paying: pageData });
   },
   [SERVICE_OPINION_ITEM](state, { data }) {
      if (data.success) {
         state.sOpinionItem = Object.assign({}, data.data);
      }
      state.sOpinionState = Object.assign({}, data);
      selected = {};
   },
   [SERVICE_OPINION_STATE](state, { data }) {
      state.sOpinionState = Object.assign({}, data);
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
