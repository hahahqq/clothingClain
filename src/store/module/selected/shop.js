import commonSend from "@/api/api";
import { getUserInfo, setHomeData, getHomeData } from "@/api/index";
import { GET_SHOP_LIST, GET_SHOP_LIST1, GET_SHOP_ITEM, SHOP_STATE } from "@/store/mutation-types";
let selected = {};

// initial state
const state = {
   shopListState: {},
   shopList: [],
   shopList1: [],
   shopItem: {},
   selshop: {},
   shopState: {},
   dealShopState: {}
};

// getters
const getters = {
   shopListState: state => state.shopListState,
   shopList: state => state.shopList,
   shopList1: state => state.shopList1,
   shopItem: state => state.shopItem,
   selshop: state => state.selshop,
   shopState: state => state.shopState,
   dealShopState: state => state.dealShopState
};

// actions
const actions = {
   getShopList({ commit }, data) {
      //店铺列表
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "910123",
         Companyid: userInfo.CompanyID,
         Filterstr: "",
         PN: 1,
         ClientType: 0,
         isinvalid: 0,
         userid: userInfo.UserID
      };
      if (data) {
         sendData = Object.assign({}, sendData, data);
      }
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_SHOP_LIST, { data });
         },
         sendData
      );
   },
   getShopList1({ commit }, data) {
      //店铺列表
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "910123",
         Companyid: userInfo.CompanyID,
         Filterstr: "",
         PN: 1,
         ClientType: 0,
         isinvalid: 0,
         userid: ""
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_SHOP_LIST1, { data });
         },
         sendData
      );
   },

   getShopItem({ commit }, data) {
      //店铺详情
      let userInfo = getUserInfo();
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "9102010602",
         CompanyId: userInfo.CompanyID,
         ID: homeInfo.shop.ID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_SHOP_ITEM, { data });
         },
         sendData
      );
   },
   choosingShop({ commit }, item) {
      setHomeData({ shop: item });
   },
   selectingShop({ state }, data) {
      state.selshop = Object.assign({}, data);
   },
   dealShopItem({ commit }, data) {
      //店铺保存
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "9102010603",
         CompanyId: userInfo.CompanyID,
         ShopCode: data.ShopCode ? data.ShopCode : "",
         ShopName: data.ShopName,
         Manager: data.Manager,
         Address: data.Address,
         ProvinceID: data.ProvinceID,
         CityID: data.CityID,
         DistrictID: data.DistrictID,
         PhoneNo: data.PhoneNo,
         Longitude: "",
         Latitude: "",
         Status: data.Status > 0 ? data.Status : 0 // 0=启用,1=停用
      };
      if (data.ShopID) {
         sendData.ShopID = data.ShopID;
      }
      commonSend.commonSend(
         "get",
         data => {
            commit(SHOP_STATE, { data });
         },
         sendData
      );
   },
   delShopItem({ commit, state }, { index, data }) {
      //店铺删除
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "9102010604",
         CompanyId: userInfo.CompanyID,
         ID: data.ID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(SHOP_STATE, { data });
         },
         sendData
      );
   },
   clearShopAll({ state }) {
      state.shopList = [];
      state.shopItem = {};
      state.selshop = {};
   }
};

// mutations
const mutations = {
   [GET_SHOP_LIST](state, { data }) {
      if (data.success) {
         state.shopList = [...data.data.PageData.DataArr];
      }
      state.shopListState = Object.assign({}, data);
   },
   [GET_SHOP_LIST1](state, { data }) {
      if (data.success) {
         state.shopList1 = [...data.data.PageData.DataArr];
      }
      state.shopListState = Object.assign({}, data);
   },
   [GET_SHOP_ITEM](state, { data }) {
      if (data.success) {
         state.shopItem = Object.assign({}, data.data.obj);
      }
      state.shopState = Object.assign({}, data);
   },
   [SHOP_STATE](state, { data }) {
      state.dealShopState = Object.assign({}, data);
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
