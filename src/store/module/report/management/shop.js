import commonSend from "@/api/api";
import { getUserInfo, getHomeData } from "@/api/index";
import { REPORT_SHOP_LIST } from "@/store/mutation-types";

// initial state
const state = {
   reportShopList: {}
};

// getters
const getters = {
   reportShopList: state => state.reportShopList
};
// actions
const actions = {
   getReportShopList({ commit }, data) {
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "91031101",
         CompanyId: userInfo.CompanyID,
         ShopId: data.ShopId ? data.ShopId : getHomeData().shop.ID,
         BeginDate: data.BeginDate ? data.BeginDate : 1,
         EndDate: data.EndDate ? data.EndDate : 9999999999999
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(REPORT_SHOP_LIST, { data });
         },
         sendData
      );
   }
};

// mutations
const mutations = {
   [REPORT_SHOP_LIST](state, { data }) {
      state.reportShopList = Object.assign({}, data.data);
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
