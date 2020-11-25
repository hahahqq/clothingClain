import commonSend from "@/api/api";
import { GET_PARAMETERSTATE, SET_PARAMETERSTATE } from "@/store/mutation-types";
import { getHomeData } from "@/api/index";
let selected = {};

// init state
const state = {
   gparameterstate: {},
   sparameterstate: {}
};

// getters
const getters = {
   gparameterstate: state => state.gparameterstate,
   sparameterstate: state => state.sparameterstate
};

// actions
const actions = {
   getparameterstate({ commit }) {
      // 获取商家信息
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "910108",
         CompanyId: homeInfo.shop.COMPANYID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_PARAMETERSTATE, { data });
         },
         sendData
      );
   },
   setparameterstate({ commit }, data) {
      //保存商家设置
      let sendData = Object.assign({}, data, {
         InterfaceCode: "910109",
         autogengoodscode: data.autogengoodscode, //商品编码自动生成
         autogenvipcode: data.autogenvipcode, //会员卡号自动生成
         isneedsaler: data.isneedsaler, //销售员必选
         autosendaddsms: data.autosendaddsms, // 自动发送充值短信
         autosendpaysms: data.autosendpaysms, //自动发送消费短信
         autosendchanagesms: data.autosendchanagesms, //自动发送调整短信
         IsPayIntegral: data.IsPayIntegral, //是否积分抵现
         IntegralRate: data.IntegralRate, //积分抵现率
         paytypeid: data.paytypeid, //支付方式
         discounttypeid: data.discounttypeid, //折扣类型
         integraltypeid: data.integraltypeid, //积分倍率
         IsAutoGoodsCode: data.IsAutoGoodsCode,
         AutoGoodsNumber: data.AutoGoodsNumber,
         AutoGoodsCode: data.AutoGoodsCode,
         AllowSaleDate: data.AllowSaleDate, // 消费结账允许选择销售日期
         AutoBarcodeType: data.AutoBarcodeType
      });
      commonSend.commonSend(
         "get",
         data => {
            commit(SET_PARAMETERSTATE, { data });
         },
         sendData
      );
   },
   clearParameterAll({ state }) {
      state.gparameterstate = {};
      state.sparameterstate = {};
   }
};

const mutations = {
   [GET_PARAMETERSTATE](state, { data }) {
      state.gparameterstate = Object.assign({}, data);
   },
   [SET_PARAMETERSTATE](state, { data }) {
      state.sparameterstate = Object.assign({}, data);
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
