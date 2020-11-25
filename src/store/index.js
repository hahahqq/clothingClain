import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";
// page
import login from "./module/login.js";
import member from "./module/member";
import member2 from "./module/member/index";
import goods from "./module/goods";
import service from "./module/service";
import sIntention from "./module/service/intention";
import sOpinion from "./module/service/opinion";
import service_nourishing from "./module/service/nourishing";
import marketing from "./module/marketing";
import defray from "./module/defray";
import account from "./module/defray/account";
// report
import report from "./module/report/index.js";
import report_business from "./module/report/management/business";
import report_surplus from "./module/report/management/surplus";
import report_checkout from "./module/report/management/checkout";
import report_shop from "./module/report/management/shop";
import report_sale from "./module/report/analysis/sale";
import report_goods from "./module/report/analysis/goods";
import report_member from "./module/report/analysis/member";
import report_defray from "./module/report/analysis/defray";
import report_achievement from "./module/report/employee/achievement";
import report_order from "./module/report/employee/order";
import report_sort from "./module/report/employee/sort";
import report_registered from "./module/report/member/registered";
import report_balance from "./module/report/member/balance";
import report_adjustment from "./module/report/member/adjustment";
//stock
import stock_query from "./module/stock/query"; //库存查询
//retail
import retail_query from "./module/retail/query"; //库存查询

// setup
import setup from "./module/setup/index";
import setup_myinfo from "./module/setup/myinfo";
import setup_user from "./module/setup/user";
import setup_integral from "./module/setup/integral";
import setup_royalty from "./module/setup/royalty";
import setup_parameter from "./module/setup/parameter";
import address from "./module/other/address";
import upload from "./module/other/upload";
//ssmember
import dropdown from "./module/ssmember/dropdown";
//checkout
import commodityc from "./module/checkout/commodityc";
import timescountc from "./module/checkout/timescountc";
import fastc from "./module/checkout/fastc";
import storagevaluer from "./module/checkout/storagevaluer";
import setmealr from "./module/checkout/setmealr";
import guadanc from "./module/checkout/guadanc";
//recharge
import recharge from "./module/recharge/recharge";
import barcodepay from "./module/recharge/barcodepay";
import couponlist from "./module/recharge/couponlist";
//home
import home from "./module/home";

// selected
import shop from "./module/selected/shop";
import employee from "./module/selected/employee";
import level from "./module/selected/level";
import unit from "./module/selected/unit";
import category from "./module/selected/category";
import payment from "./module/selected/payment";
import supplier from "./module/selected/supplier";

// 消费结账
import ccindex from "./module/consumptionCheckout/index";

// 库存管理
import stock from "./module/stock";
import stock_warehousing from "./module/stock/warehousing";
import stock_return from "./module/stock/return";
import stock_allocation from "./module/stock/allocation";
import stock_inventory from "./module/stock/inventory";

//颜色档案
import color from "./module/color/color";
import size from "./module/size/size";

// mall
import mall from "./module/mall/index.js";
import mall_goods from "./module/mall/goods.js";
import mall_order from "./module/mall/order.js";
import mall_setup from "./module/mall/setup.js";
import mall_freight from "./module/mall/freight.js";

import user from './module/user'
import app from './module/app'

Vue.use(Vuex)

const state = {
  isChangePropsState: false,
  isPopupPage: {
     masker: false,
     first: false,
     second: false,
     third: false,
     fourth: false,
     fifth: false
  }
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    user,
    app,
    login,
    member,
    member2,
    shop,
    employee,
    level,
    unit,
    category,
    payment,
    supplier,
    goods,
    service,
    sIntention,
    sOpinion,
    service_nourishing,
    marketing,
    stock,
    stock_warehousing,
    stock_return,
    stock_allocation,
    stock_inventory,
    defray,
    account,
    report,
    report_business,
    report_surplus,
    report_checkout,
    report_sale,
    report_goods,
    report_member,
    report_defray,
    report_achievement,
    report_order,
    report_sort,
    report_registered,
    report_balance,
    report_adjustment,
    setup,
    setup_myinfo,
    setup_user,
    setup_integral,
    setup_royalty,
    address,
    upload,
    commodityc,
    timescountc,
    fastc,
    storagevaluer,
    setmealr,
    guadanc,
    dropdown,
    recharge,
    home,
    ccindex,
    barcodepay,
    couponlist,
    setup_parameter,
    stock_query,
    retail_query,
    color,
    size,
    report_shop,
    mall,
    mall_goods,
    mall_order,
    mall_setup,
    mall_freight
  }
})
