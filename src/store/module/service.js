import commonSend from "@/api/api";
import { SERVICE_REVISIT_LIST, SERVICE_REVISIT_ITEM } from "@/store/mutation-types";
import { getUserInfo, getHomeData } from "@/api/index";
let selected = {};

// init state
const state = {
   serviceRevisitList: [],
   serviceRevisitState: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      },
      List: []
   },
   serviceRevisitItem: {}
};

// getters
const getters = {
   serviceRevisitList: state => state.serviceRevisitList,
   serviceRevisitState: state => state.serviceRevisitState,
   serviceRevisitItem: state => state.serviceRevisitItem
};

// actions
const actions = {
   getServiceRevisitList({ commit }, data) {
      let homeInfo = getHomeData();
      let pn = parseInt(state.serviceRevisitState.paying.PN) + 1;
      let sendData = {
         InterfaceCode: "60102100105_1",
         CompanyId: homeInfo.shop.COMPANYID,
         ShopId: data.ShopId ? data.ShopId : "",
         BeginDate: data.BeginDate ? data.BeginDate : 1,
         EndDate: data.EndDate ? data.EndDate : 9999999999999,
         Status: data.Status, // -1=全部，0=未回访，1=已回访
         PN: data.PN ? data.PN : pn
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(SERVICE_REVISIT_LIST, { data });
         },
         sendData
      );
   },
   getServiceRevisitItem({ commit }, data) {
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: 60102100107,
         CompanyId: homeInfo.shop.COMPANYID,
         BillId: data.BILLID,
         DetailId: data.DETAILID
      };
      selected.BILLID = data.BILLID;
      selected.DETAILID = data.DETAILID;
      commonSend.commonSend(
         "get",
         data => {
            commit(SERVICE_REVISIT_ITEM, { data });
         },
         sendData
      );
   },
   clearServiceRevisitAll({ state }) {
      state.serviceRevisitList = [];
      state.serviceRevisitState.paying.PN = 0;
      state.serviceRevisitItem = {};
   }
};

const mutations = {
   [SERVICE_REVISIT_LIST](state, { data }) {
      let pageData = Object.assign({}, state.serviceRevisitState.paying);
      if (data.success) {
         state.serviceRevisitList = [...data.data.PageData.DataArr];
         pageData = Object.assign(pageData, data.data.PageData);
      }
      state.serviceRevisitState = Object.assign({}, data, { paying: pageData });
   },
   [SERVICE_REVISIT_ITEM](state, { data }) {
      if (data.success) {
         state.serviceRevisitItem = Object.assign({}, data.data, {
            BILLID: selected.BILLID,
            DETAILID: selected.DETAILID
         });
      }
      state.serviceRevisitState = Object.assign({}, state.serviceRevisitState, data);
      selected = {};
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
