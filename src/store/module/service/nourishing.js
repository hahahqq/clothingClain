import commonSend from "@/api/api";
import { SERVICE_NOURISHING_LIST, SERVICE_NOURISHING_ITEM } from "@/store/mutation-types";
import { getUserInfo, getHomeData } from "@/api/index";
let selected = {};

// init state
const state = {
   sNourishingList: [],
   sNourishingState: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      },
      List: []
   },
   sNourishingItem: {}
};

// getters
const getters = {
   sNourishingList: state => state.sNourishingList,
   sNourishingState: state => state.sNourishingState,
   sNourishingItem: state => state.sNourishingItem
};

// actions
const actions = {
   getSNourishingList({ commit }, data) {
      // 护理提醒列表
      let homeInfo = getHomeData();
      let pn = parseInt(state.sNourishingState.paying.PN) + 1;
      let sendData = {
         InterfaceCode: "60102100501",
         CompanyId: homeInfo.shop.COMPANYID,
         ShopId: data.ShopId ? data.ShopId : "",
         BeginDate: data.BeginDate ? data.BeginDate : 1,
         EndDate: data.EndDate ? data.EndDate : 9999999999999,
         Status: data.Status, // -1=全部，0=未提醒，1=已提醒
         PN: data.PN ? data.PN : pn
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(SERVICE_NOURISHING_LIST, { data });
         },
         sendData
      );
   },
   getSNourishingItem({ commit }, data) {
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "60102100503",
         CompanyId: homeInfo.shop.COMPANYID,
         BillId: data.BILLID,
         DetailId: data.DETAILID
      };
      selected.BILLID = data.BILLID;
      selected.DETAILID = data.DETAILID;
      commonSend.commonSend(
         "get",
         data => {
            commit(SERVICE_NOURISHING_ITEM, { data });
         },
         sendData
      );
   },
   clearSNourishingAll({ state }) {
      state.sNourishingList = [];
      state.sNourishingState.paying.PN = 0;
      state.sNourishingItem = {};
   }
};

const mutations = {
   [SERVICE_NOURISHING_LIST](state, { data }) {
      let pageData = Object.assign({}, state.sNourishingState.paying);
      if (data.success) {
         state.sNourishingList = [...data.data.PageData.DataArr];
         pageData = Object.assign(pageData, data.data.PageData);
      }
      state.sNourishingState = Object.assign({}, data, {
         paying: pageData,
         List: state.sNourishingList
      });
   },
   [SERVICE_NOURISHING_ITEM](state, { data }) {
      if (data.success) {
         state.sNourishingItem = Object.assign({}, data.data, {
            BILLID: selected.BILLID,
            DETAILID: selected.DETAILID
         });
      }
      state.sNourishingState = Object.assign({}, state.sNourishingState, data);
      selected = {};
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
