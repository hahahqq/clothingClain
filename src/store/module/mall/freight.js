import commonSend from "@/api/api";
import {
   MALL_FREIGHT_LIST,
   MALL_FREIGHT_ITEM,
   MALL_FREIGHT_DEAL,
   MALL_EXPRESS_LIST,
   MALL_EXPRESS_DEAL
} from "@/store/mutation-types";
import { getUserInfo, getHomeData } from "@/api/index";
let selected = {};

// init state
const state = {
   mallFreightListState: {},
   mallFreightList: [],
   mallFreightItem: {},
   mallFreightState: {},

   mallExpressListState: {},
   mallExpressList: [],
   mallExpressState: {}
};

// getters
const getters = {
   mallFreightListState: state => state.mallFreightListState,
   mallFreightList: state => state.mallFreightList,
   mallFreightItem: state => state.mallFreightItem,
   mallFreightState: state => state.mallFreightState,

   mallExpressListState: state => state.mallExpressListState,
   mallExpressList: state => state.mallExpressList,
   mallExpressState: state => state.mallExpressState
};

// actions
const actions = {
   getMallFreightList({ commit }) {
      // 运费模板列表
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "601021106012",
         CompanyId: userInfo.CompanyID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(MALL_FREIGHT_LIST, { data });
         },
         sendData
      );
   },
   getMallFreightItem({ commit, state }, data) {
      state.mallFreightItem = Object.assign({}, data);
   },
   editMallFreight({ commit }, data) {
      // 运费模板保存
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "601021106011",
         CompanyId: userInfo.CompanyID,
         Name: data.Name,
         Type: data.Type, // 计价方式 0=计数，1=计量
         MinQty: data.MinQty, // 最低数量
         MinMoney: data.MinMoney, // 最低运费
         AddQty: data.AddQty, //新增数量
         AddMoney: data.AddMoney, // 新增运费
         IsDefault: data.IsDefault ? 1 : 0 // 是否默认
      };
      selected.type = "add";
      if (data.id) {
         sendData.Id = data.id;
         selected.type = "edit";
      }
      selected.type = "checkout";
      commonSend.commonSend(
         "get",
         data => {
            commit(MALL_FREIGHT_DEAL, { data });
         },
         sendData
      );
   },
   delMallFreight({ commit }, data) {
      // 运费模板删除
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "601021106013",
         CompanyId: userInfo.CompanyID,
         Id: data.id
      };
      selected.type = "delete";
      commonSend.commonSend(
         "post",
         data => {
            commit(MALL_FREIGHT_DEAL, { data });
         },
         sendData
      );
   },

   clearMallFreightList({ state }) {
      state.mallFreightListState.paying.PN = 0;
      state.mallFreightList = [];
   },
   clearMallFreightAll({ state }) {
      state.mallFreightListState.paying.PN = 0;
      state.mallFreightList = [];
   },

   getMallExpressList({ commit }) {
      // 快递列表
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "6010211060701",
         CompanyId: userInfo.CompanyID
      };
      commonSend.commonSend(
         "post",
         data => {
            commit(MALL_EXPRESS_LIST, { data });
         },
         sendData
      );
   },
   dealMallExpress({ commit }, { data, type }) {
      // 快递保存, 快递删除
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "6010211060702",
         CompanyId: userInfo.CompanyID,
         Name: data.name
      };
      if (type == "edit") {
         sendData.Id = data.id;
      }
      if (type == "del") {
         sendData = {
            InterfaceCode: "6010211060703",
            CompanyId: userInfo.CompanyID,
            Id: data.id
         };
      }
      console.log(sendData);
      selected.type = type;
      commonSend.commonSend(
         "get",
         data => {
            commit(MALL_EXPRESS_DEAL, { data });
         },
         sendData
      );
   }
};

// mutations
const mutations = {
   [MALL_FREIGHT_LIST](state, { data }) {
      if (data.success) {
         state.mallFreightList = [...data.data.List];
      } else {
         state.mallFreightList = [];
      }
      state.mallFreightListState = Object.assign({}, data);
   },
   [MALL_FREIGHT_ITEM](state, { data }) {
      let d = {
            success: false,
            message: data.message
         },
         tprice = 0;

      if (data.success) {
         let arr = [...data.data.GoodsList];
         arr.forEach(element => {
            tprice += element.PRICE * element.QTY;
         });
         d.success = true;
         state.mallFreightItem = Object.assign(
            {
               goodsMoney: tprice
            },
            data.data,
            d
         );
      } else {
         state.mallFreightItem = Object.assign({}, data);
      }
   },
   [MALL_FREIGHT_DEAL](state, { data }) {
      state.mallFreightState = Object.assign({}, data, selected);
      selected = {};
   },

   [MALL_EXPRESS_LIST](state, { data }) {
      if (data.success) {
         state.mallExpressList = [...data.data.List];
      }
      state.mallExpressListState = Object.assign({}, data);
   },
   [MALL_EXPRESS_DEAL](state, { data }) {
      state.mallExpressState = Object.assign({}, data, selected);
      selected = {};
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
