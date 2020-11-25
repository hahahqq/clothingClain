import commonSend from "@/api/api";
import { getUserInfo, setHomeData, getHomeData } from "@/api/index";
import {
   GET_GUADANCX_LIST,
   GET_GUADANCD_LIST,
   BILL_CANCEL,
   DEL_GUADANCX_LIST,
   GET_SAVE_GUADAN
} from "@/store/mutation-types";
let selected = {};

// initial state
const state = {
   guadancxlistState: {},
   guadancxlistBillCount: 0,
   guadancdlistState: {},
   guadancdlistobj: {},
   guadancdlistGoodsObj: [],
   delState: {},
   saveGuadanState: {},
   billCancelState: {}
};

// getters
const getters = {
   guadancdlistobj: state => state.guadancdlistobj,
   guadancdlistGoodsObj: state => state.guadancdlistGoodsObj,
   guadancxlistState: state => state.guadancxlistState,
   guadancdlistState: state => state.guadancdlistState,
   guadancxlistBillCount: state => state.guadancxlistBillCount,
   delState: state => state.delState,
   saveGuadanState: state => state.saveGuadanState,
   billCancelState: state => state.billCancelState
};

// actions
const actions = {
   getguadancxlistState({ commit }, data) {
      //消费挂单列表
      let homeInfo = getHomeData();
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "91020308",
         CompanyId: userInfo.CompanyID,
         ShopId: homeInfo.shop.ID
      };
      if (data) {
         sendData = Object.assign({}, sendData, data);
      }
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_GUADANCX_LIST, { data });
         },
         sendData
      );
   },
   saveGuadan({ commit }, data) {
      // 保存挂单
      let homeInfo = getHomeData();
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "91020301_1",
         CompanyId: userInfo.CompanyID,
         ShopId: homeInfo.shop.ID,
         VipId: data.VipId,
         BillDate: data.BillDate,
         CustomerName: data.CustomerName,
         CustomerPhone: data.CustomerPhone,
         Remark: data.Remark,
         GoodsList: data.GoodsList,
         IsCheck: data.IsCheck, // 0 挂单   1 结账
         PayMoney: data.PayMoney,
         PayTypeId: data.PayTypeId,
         PayIntegral: data.PayIntegral,
         IntegralMoney: data.IntegralMoney,
         IsSms: data.IsSms,
         BillId: data.BillId ? data.BillId : "",

         SaleEmpId: data.SaleEmpId,
         FavorMoney: data.FavorMoney,
         GetIntegral: data.GetIntegral,
         CouponNo: data.CouponNo,
         CouponMoney: data.CouponMoney,
         Address: data.Address,
         OtherMoney: data.OtherMoney
      };
      commonSend.commonSend(
         "post",
         data => {
            commit(GET_SAVE_GUADAN, { data });
         },
         sendData
      );
   },
   delguadancdlistState({ commit }, data) {
      //消费挂单删除
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020307",
         CompanyId: homeInfo.shop.COMPANYID,
         BillId: data
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(DEL_GUADANCX_LIST, { data });
         },
         sendData
      );
   },
   getguadancdlistState({ commit }, data) {
      //消费结账详情
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020303",
         CompanyId: homeInfo.shop.COMPANYID,
         ShopId: homeInfo.shop.ID,
         BillId: data.BillId
      };
      if (data) {
         sendData = Object.assign({}, sendData, data);
      }
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_GUADANCD_LIST, { data });
         },
         sendData
      );
   },
   billNoCancel({ commit }, data) {
      //消费结账作废
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020302",
         CompanyId: homeInfo.shop.COMPANYID,
         BillId: data.BillId
      };
      if (data) {
         sendData = Object.assign({}, sendData, data);
      }
      commonSend.commonSend(
         "get",
         data => {
            commit(BILL_CANCEL, { data });
         },
         sendData
      );
   },
   clearGuaDanAll({ state }) {
      state.guadancxlistBillCount = 0;
      state.guadancxlistState = {};
   }
};

// mutations
const mutations = {
   [GET_SAVE_GUADAN](state, { data }) {
      state.saveGuadanState = Object.assign({}, data);
   },
   [GET_GUADANCX_LIST](state, { data }) {
      state.guadancxlistState = Object.assign({}, data);
      state.guadancxlistBillCount = data.data.BillCount;
   },
   [DEL_GUADANCX_LIST](state, { data }) {
      state.delState = Object.assign({}, data);
   },
   [GET_GUADANCD_LIST](state, { data }) {
      state.guadancdlistState = Object.assign({}, data);
      state.guadancdlistobj = data.data.Obj;
      state.guadancdlistGoodsObj = [...data.data.GoodsObj];
   },
   [BILL_CANCEL](state, { data }) {
      state.billCancelState = data;
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
