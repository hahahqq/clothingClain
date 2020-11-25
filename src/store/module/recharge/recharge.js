import commonSend from "@/api/api";
import { getUserInfo, setHomeData, getHomeData } from "@/api/index";
import {
   GET_RECHARGE_LIST,
   GET_INTEGRALT_LIST,
   GET_RECHARGE_WAY_LIST,
   SAVE_VIP_RECHARGE,
   SAVE_PAYMONEY,
   GET_DISCOUNTTYPE_LIST,
   SAVE_DISCOUNTTYPE,
   DEL_DISCOUNTTYPE
} from "@/store/mutation-types";
import Vue from "vue";
let selected = {};

// initial state
const state = {
   rechargeListState: {},
   rechargeListList: [],
   rechargeWayListState: {},
   rechargeWayList: [],
   integraltList: [],
   saveVipRechargeInfo: [],
   saveVipRechargeState: {},
   savePayMoneyState: {},
   discountTypeListState: {},
   saveDiscountTypeState: {},
   delDiscountTypeState: {}
};

// getters
const getters = {
   rechargeListList: state => state.rechargeListList,
   rechargeWayList: state => state.rechargeWayList,
   rechargeListState: state => state.rechargeListState,
   rechargeWayListState: state => state.rechargeWayListState,
   integraltList: state => state.integraltList,
   saveVipRechargeInfo: state => state.saveVipRechargeInfo,
   saveVipRechargeState: state => state.saveVipRechargeState,
   savePayMoneyState: state => state.savePayMoneyState,
   discountTypeListState: state => state.discountTypeListState,
   saveDiscountTypeState: state => state.saveDiscountTypeState,
   delDiscountTypeState: state => state.delDiscountTypeState
};

// actions
const actions = {
   getrechargeList({ commit }, data) {
      // 支付方式列表
      let userInfo = getUserInfo();
      let sendData = {
         // InterfaceCode: data.codestatus != 1 ? '9102010501' : '9102010506',
         InterfaceCode: "9102010506",
         CompanyId: userInfo.CompanyID,
         Fliter: data.Fliter ? data.Fliter : ""
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_RECHARGE_LIST, { data });
         },
         sendData
      );
   },
   getrechargeWayList({ commit }, data) {
      // 充值方式列表
      let sendData = {
         InterfaceCode: "21002060301",
         Name: ""
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_RECHARGE_WAY_LIST, { data });
         },
         sendData
      );
   },
   saveVipRecharge({ commit }, data) {
      // 会员充值
      let homeInfo = getHomeData(),
         userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "91020221",
         CompanyId: userInfo.CompanyID,
         ShopId: homeInfo.shop.ID,
         VipId: data.VipId,
         AddMoney: data.AddMoney,
         GiftMoney: data.GiftMoney,
         IsSmd: data.IsSmd,
         Remark: "",
         PayTypeId: data.PayTypeId,
         SaleEmpMoney: {},
         SaleEmpList: ""
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(SAVE_VIP_RECHARGE, { data });
         },
         sendData
      );
   },
   getintegralTList({ commit }, data) {
      //积分倍率列表
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "9102010301",
         CompanyId: userInfo.CompanyID
      };
      if (data) {
         sendData = Object.assign({}, sendData, data);
      }
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_INTEGRALT_LIST, { data });
         },
         sendData
      );
   },
   payMoney({ commit }, data) {
      //消费结账保存
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020301_1",
         CompanyId: homeInfo.shop.COMPANYID,
         ShopId: homeInfo.shop.ID,
         VipId: data.VipId,
         BillDate: data.BillDate,
         CustomerName: data.CustomerName,
         CustomerPhone: data.CustomerPhone,
         Remark: data.Remark,
         GoodsList: data.GoodsList,
         IsCheck: data.IsCheck, // 0 取单   1 结账
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
         Address: data.Address,
         OtherMoney: data.OtherMoney,
         ReturnReason: data.ReturnReason,
         CouponMoney: data.CouponMoney
      };
      commonSend.commonSend(
         "post",
         data => {
            commit(SAVE_PAYMONEY, { data });
         },
         sendData
      );
   },
   payMoneyMorePayWay({ commit }, data) {
      //消费结账保存(组合支付)
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020301_1",
         CompanyId: homeInfo.shop.COMPANYID,
         ShopId: homeInfo.shop.ID,
         VipId: data.VipId,
         BillDate: data.BillDate,
         CustomerName: data.CustomerName,
         CustomerPhone: data.CustomerPhone,
         Remark: data.Remark,
         GoodsList: data.GoodsList,
         IsCheck: data.IsCheck, // 0 取单   1 结账
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
         Address: data.Address,
         OtherMoney: data.OtherMoney,
         ReturnReason: data.ReturnReason,
         PayTypeList: data.PayTypeList,
         CouponMoney: data.CouponMoney
      };
      commonSend.commonSend(
         "post",
         data => {
            commit(SAVE_PAYMONEY, { data });
         },
         sendData
      );
   },

   getDiscountTypeList({ commit }, data) {
      // 折扣类型列表
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "9102010201",
         Filter: "",
         CompanyId: homeInfo.shop.COMPANYID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_DISCOUNTTYPE_LIST, { data });
         },
         sendData
      );
   },
   saveDiscountType({ commit }, data) {
      // 折扣类型保存
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "9102010203",
         ID: "",
         Name: data.Name,
         Rate: data.Rate,
         Remark: "",
         CompanyId: homeInfo.shop.COMPANYID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(SAVE_DISCOUNTTYPE, { data });
         },
         sendData
      );
   },
   delDiscountType({ commit }, data) {
      // 折扣类型删除
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "9102010204",
         ID: data.ID,
         CompanyId: homeInfo.shop.COMPANYID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(DEL_DISCOUNTTYPE, { data });
         },
         sendData
      );
   }
};

// mutations
const mutations = {
   [GET_DISCOUNTTYPE_LIST](state, { data }) {
      state.discountTypeListState = data;
   },
   [SAVE_DISCOUNTTYPE](state, { data }) {
      state.saveDiscountTypeState = data;
   },
   [DEL_DISCOUNTTYPE](state, { data }) {
      state.delDiscountTypeState = data;
   },
   [GET_RECHARGE_LIST](state, { data }) {
      if (data.success) {
         let arr = [...data.data.List];
         for (let i = 0; i < arr.length; i++) {
            let nameval = arr[i].NAME;
            if (nameval.indexOf("现金") != "-1") {
               arr[i].payerIMG = "static/images/5@2x.png";
            } else if (nameval.indexOf("扫码支付") != "-1") {
               arr[i].payerIMG = "static/images/3@2x.png";
            } else if (nameval.indexOf("微信") != "-1") {
               arr[i].payerIMG = "static/images/4@2x.png";
            } else if (nameval.indexOf("支付宝") != "-1") {
               arr[i].payerIMG = "static/images/7@2x.png";
            } else if (nameval.indexOf("欠款") != "-1") {
               arr[i].payerIMG = "static/images/2@2x.png";
            } else if (nameval.indexOf("卡") != "-1") {
               arr[i].payerIMG = "static/images/6@2x.png";
            } else if (nameval.indexOf("积分") != "-1") {
               arr[i].payerIMG = "static/images/1@2x.png";
            } else if (nameval.indexOf("余额支付") != "-1") {
               arr[i].payerIMG = "static/images/8@2x.png";
            } else {
               arr[i].payerIMG = "static/images/6@2x.png";
            }
         }
         state.rechargeListList = arr;
      }
      state.rechargeListState = Object.assign({}, data);
   },
   [GET_RECHARGE_WAY_LIST](state, { data }) {
      if (data.success) {
         state.rechargeWayList = [...data.data.List];
      }
      state.rechargeWayListState = Object.assign({}, data);
   },
   [SAVE_VIP_RECHARGE](state, { data }) {
      if (data.success) {
         state.saveVipRechargeInfo = [...data];
      }
      state.saveVipRechargeState = Object.assign({}, data);
   },
   [GET_INTEGRALT_LIST](state, { data }) {
      if (data.success) {
         state.integraltList = [...data.data.List];
      }
   },
   [SAVE_PAYMONEY](state, { data }) {
      state.savePayMoneyState = Object.assign({}, data);
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
