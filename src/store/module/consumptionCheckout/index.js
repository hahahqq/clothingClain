// // 消费结账
import commonSend from "@/api/api";
import { getUserInfo, getHomeData } from "@/api/index";
import { GET_CCGOODS_ITEM, GET_CCNUMBER_ITEM } from "@/store/mutation-types";
let selected = {};

// initial state
const state = {
   CCGoodsItem: { data: { Obj: {}, GoodsObj: [] } },
   CCNumberItem: { data: { Obj: {}, GoodsObj: [] } }
};

// getters
const getters = {
   CCGoodsItem: state => state.CCGoodsItem,
   CCNumberItem: stete => state.CCNumberItem
};

// actions
const actions = {
   getCCGoodsItem({ commit }, data) {
      // 商品消费详情
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "601020406",
         CompanyId: userInfo.CompanyID,
         ShopId: data.ShopId,
         BillId: data.BillId
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_CCGOODS_ITEM, { data });
         },
         sendData
      );
   },
   getCCNumberItem({ commit }, data) {
      // 计次消费详情
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "601020406",
         CompanyId: userInfo.CompanyID,
         ShopId: data.ShopId,
         BillId: data.BillId
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_CCNUMBER_ITEM, { data });
         },
         sendData
      );
   }
};

// mutations
const mutations = {
   [GET_CCGOODS_ITEM](state, { data }) {
      let ssdd = data.success ? data : { data: { Obj: {}, GoodsObj: [] } };
      state.CCGoodsItem = Object.assign({}, data, ssdd);
   },
   [GET_CCNUMBER_ITEM](state, { data }) {
      let ssdd = data.success ? data : { data: { Obj: {}, GoodsObj: [] } };
      state.CCNumberItem = Object.assign({}, data, ssdd);
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
