import commonSend from "@/api/api";
import {
   MALL_GOODS_LIST,
   MALL_GOODS_ITEM,
   CHANGE_MALLGOODS_STATE,
   DEAL_MALL_GOODS,
   MALL_CLASS_LIST
} from "@/store/mutation-types";
import { getUserInfo, getHomeData } from "@/api/index";
let selected = {};

// init state
const state = {
   mallGoodsState: {},
   mallGoodsListState: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      }
   },
   mallGoodsList: [],
   mallGoodsItem: {},
   mallClassListState: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      },
      List: []
   }
};

// getters
const getters = {
   mallGoodsState: state => state.mallGoodsState,
   mallGoodsListState: state => state.mallGoodsListState,
   mallGoodsList: state => state.mallGoodsList,
   mallGoodsItem: state => state.mallGoodsItem,
   mallClassListState: state => state.mallClassListState
};

// actions
const actions = {
   getMallGoodsList({ commit, state }, data) {
      let userInfo = getUserInfo();
      let homeInfo = getHomeData();
      let pn = parseInt(state.mallGoodsListState.paying.PN) + 1;
      let sendData = {
         InterfaceCode: "60102110201_1",
         CompanyId: userInfo.CompanyID,
         ShopId: data.shopId ? data.shopId : homeInfo.shop.ID,
         Filter: data.Filter ? data.Filter : "",
         IsSale: data.IsSale, // -1=全部，0=未上架，1=上架
         IsNew: -1, //-1=全部，0=否，1=是
         IsHot: -1, // -1=全部，0=否，1=是
         PN: data.PN ? data.PN : pn,
         IsGift: data.IsGift, // -1=全部，0=普通商品商品，1=积分兑换商品
         TypeId: data.TypeId ? data.TypeId : "", // 分类id
         OrderBy: 0, // 0=默认，1=价格，2=新品，3=热销
         OrderType: 0 // 0=降序，1=升序
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(MALL_GOODS_LIST, { data });
         },
         sendData
      );
   },
   getMallGoodsItem({ commit }, data) {
      // item
      let userInfo = getUserInfo();
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "60102110203_1",
         CompanyId: userInfo.CompanyID,
         ShopId: data.shopId ? data.shopId : homeInfo.shop.ID,
         ID: data.id
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(MALL_GOODS_ITEM, { data });
         },
         sendData
      );
   },
   dealMallGoodsItem({ commit }, data) {
      // 商城商品修改，只能编辑
      let userInfo = getUserInfo();
      let sendData = Object.assign(
         {
            InterfaceCode: "60102110204",
            CompanyId: userInfo.CompanyID
         },
         data
      );
      selected.type = "edit";
      commonSend.commonSend(
         "post",
         data => {
            commit(DEAL_MALL_GOODS, { data });
         },
         sendData
      );
   },
   changeGoodsState({ commit }, arr) {
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "60102110202",
         CompanyId: userInfo.CompanyID,
         IsSaleObj: JSON.stringify(arr) // [{"GoodsId":99620,"IsSale":1}], 0=未上架，1=上架
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(CHANGE_MALLGOODS_STATE, { data });
         },
         sendData
      );
   },
   getMallClassList({ commit }, data) {
      // 商品分类列表
      let userInfo = getUserInfo();
      let pn = parseInt(state.mallClassListState.paying.PN) + 1;
      let sendData = {
         InterfaceCode: "60102110205",
         CompanyId: userInfo.CompanyID,
         PID: data.PID ? data.PID : "", // 大类ID
         PN: data.PN ? data.PN : pn
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(MALL_CLASS_LIST, { data });
         },
         sendData
      );
   },

   clearMallGoodsAll({ state }) {
      state.mallGoodsListState.paying.PN = 0;
      state.mallGoodsList = [];
   }
};

// mutations
const mutations = {
   [MALL_GOODS_LIST](state, { data }) {
      let pageData = Object.assign({}, state.mallGoodsListState.paying);
      if (data.success && data.data.PageData.PN > 0) {
         state.mallGoodsList = [...data.data.PageData.DataArr];
         pageData = Object.assign(pageData, data.data.PageData);
      }
      state.mallGoodsListState = Object.assign({}, data, { paying: pageData });
   },
   [CHANGE_MALLGOODS_STATE](state, { data }) {
      state.mallGoodsState = Object.assign({}, data);
   },
   [MALL_GOODS_ITEM](state, { data }) {
      if (data.success) {
         state.mallGoodsItem = Object.assign({}, data.data.obj);
      }
      state.mallGoodsState = Object.assign({ type: "item" }, data);
      selected = {};
   },
   [DEAL_MALL_GOODS](state, { data }) {
      state.mallGoodsState = Object.assign({ type: "deal" }, data);
   },
   [MALL_CLASS_LIST](state, { data }) {
      let pageData = Object.assign({}, state.mallGoodsListState.paying),
         arr = [];
      if (data.success && data.data.PageData.PN > 0) {
         arr = [...data.data.PageData.DataArr];
         pageData = Object.assign(pageData, data.data.PageData);
      }
      state.mallClassListState = Object.assign({}, data, {
         paying: pageData,
         List: arr
      });
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
