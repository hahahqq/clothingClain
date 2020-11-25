import commonSend from "@/api/api";
import { getUserInfo, setHomeData, getHomeData } from "@/api/index";
import {
   GET_COMMODITYCFL_LIST,
   GET_COMMODITYCCONSUMPTION,
   GET_MEMBERQRCODEURL,
   SAVE_INTEGRAL_EXCHANGE
} from "@/store/mutation-types";
let selected = {};
let ItemsHeaderType = 0;

// initial state
const state = {
   payMoneyVipID: "",
   commoditycflListState: {},
   commoditycflList: [],
   commoditycconsumption: {},
   saveQRcodeIMG: "",
   memberQRcodeurlstate: {},
   saveIntegralExchangeState: {}
};

// getters
const getters = {
   commoditycflListState: state => state.commoditycflListState,
   commoditycflList: state => state.commoditycflList,
   commoditycconsumption: state => state.commoditycconsumption,
   memberQRcodeurlstate: state => state.memberQRcodeurlstate,
   saveIntegralExchangeState: state => state.saveIntegralExchangeState
};

// actions
const actions = {
   getcommoditycflList({ commit }, data) {
      //商品分类列表
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: 9102080311,
         PID: "",
         CompanyId: userInfo.CompanyID,
         PN: 1
      };
      if (data) {
         sendData = Object.assign({}, sendData, data);
      }
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_COMMODITYCFL_LIST, { data });
         },
         sendData
      );
   },
   getcommoditycconsumption({ commit }, data) {
      let userInfo = getUserInfo();
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: 601020402,
         CompanyId: userInfo.CompanyID,
         ShopId: homeInfo.shop.ID
      };
      if (data) {
         sendData = Object.assign({}, sendData, data);
      }
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_COMMODITYCCONSUMPTION, { data });
         },
         sendData
      );
   },
   getmemberQRcodeurlstate({ commit }, data) {
      //获取门店永久二维码
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: 910125,
         ShopID: homeInfo.shop.ID
      };
      if (data) {
         sendData = Object.assign({}, sendData, data);
      }
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_MEMBERQRCODEURL, { data });
         },
         sendData
      );
   },
   saveIntegralExchange({ commit }, data) {
      // 积分兑换保存
      let homeInfo = getHomeData();
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "91020241",
         CompanyId: userInfo.CompanyID,
         ShopId: homeInfo.shop.ID,
         VipId: data.VipId,
         GoodsDetail: JSON.stringify(data.GoodsDetail),
         PayIntegral: data.PayIntegral,
         Remark: data.Remark,
         SaleEmpId: data.SaleEmpId
      };
      commonSend.commonSend(
         "post",
         data => {
            commit(SAVE_INTEGRAL_EXCHANGE, { data });
         },
         sendData
      );
   }
};

// mutations
const mutations = {
   [GET_MEMBERQRCODEURL](state, { data }) {
      state.memberQRcodeurlstate = Object.assign({}, data);
   },
   [GET_COMMODITYCFL_LIST](state, { data }) {
      if (data.success) {
         state.commoditycflList = [...data.data.PageData.DataArr];
      }
      state.commoditycflListState = Object.assign({}, data);
   },
   [GET_COMMODITYCCONSUMPTION](state, { data }) {
      state.commoditycconsumption = Object.assign({}, data);
   },
   [SAVE_INTEGRAL_EXCHANGE](state, { data }) {
      state.saveIntegralExchangeState = data;
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
