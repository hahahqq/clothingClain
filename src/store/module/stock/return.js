/**
 * 库存
 * 采购退货
 * ***/

import commonSend from "@/api/api";
import {
   RETURN_LIST,
   RETURN_ADD,
   RETURN_ITEM,
   RETURN_CANCEL,
   RETURN_EXPORT_TABLE,
   CGD_RETURN_DATA
} from "@/store/mutation-types";
import { getUserInfo, getHomeData } from "@/api/index";
import goods from "../goods";
let selected = {};

// init state
const state = {
   returnListState: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      }
   },
   returnList: [],
   returnState: {},
   returnAddState: {},
   returnItem: {},
   returnObj: {},
   returnCancel: {},
   returnExportState: {},
   cgdReturnDataList: {}
};

// getters
const getters = {
   returnState: state => state.returnState,
   returnAddState: state => state.returnAddState,
   returnListState: state => state.returnListState,
   returnExportState: state => state.returnExportState,
   returnList: state => state.returnList,
   returnCancel: state => state.returnCancel,
   returnItem: state => state.returnItem,
   returnObj: state => state.returnObj,
   cgdReturnDataList: state => state.cgdReturnDataList
};

// actions
const actions = {
   addReturn({ commit }, data) {
      // 采购入库保存
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020411",
         CompanyId: homeInfo.shop.COMPANYID,
         ShopId: data.ShopId,
         BillId: data.BillId,
         SupplierId: data.SupplierId,
         BillDate: data.BillDate,
         ManualNo: data.ManualNo, //手工单号
         PayTypeId: data.PayTypeId, // 付款方式ID
         PayMoney: data.PayMoney,
         Remark: data.Remark,
         GoodsList: data.GoodsList, // 货号Id,颜色Id,尺码Id,数量,单价,备注
         IsCheck: data.IsCheck,
         FromBillId: data.FromBillId, // 引用采购单号
         BreaksMoney: data.BreaksMoney,
         OtherMoney: data.OtherMoney
      };

      commonSend.commonSend(
         "post",
         data => {
            commit(RETURN_ADD, { data });
         },
         sendData
      );
   },
   getReturnList({ commit, state }, data) {
      // 采购退货列表
      let homeInfo = getHomeData();
      let pn = parseInt(state.returnListState.paying.PN) + 1;
      if (data.Filter) pn = 1;
      let sendData = {
         InterfaceCode: "91020413",
         CompanyId: homeInfo.shop.COMPANYID,
         ShopId: data.ShopId,
         Filter: data.Filter ? data.Filter : "",
         BeginDate: data.BeginDate,
         EndDate: data.EndDate,
         SupplierId: data.SupplierId,
         BillNo: data.BillNo,
         IsCheck: data.IsCheck, // 是否确认, -1=all,0=草稿,1=确认单
         IsCancel: data.IsCancel, // 是否作废,-1=all,0=正常,1=已作废
         PN: data.PN ? data.PN : pn
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(RETURN_LIST, { data });
         },
         sendData
      );
   },
   getReturnList_Export({ commit, state }, data) {
      // 采购退货列表—— 导出
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020413_1",
         CompanyId: homeInfo.shop.COMPANYID,
         ShopId: data.ShopId,
         Filter: data.Filter ? data.Filter : "",
         BeginDate: data.BeginDate,
         EndDate: data.EndDate,
         SupplierId: data.SupplierId,
         BillNo: data.BillNo,
         IsCheck: data.IsCheck, // 是否确认, -1=all,0=草稿,1=确认单
         IsCancel: data.IsCancel // 是否作废,-1=all,0=正常,1=已作废
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(RETURN_EXPORT_TABLE, { data });
         },
         sendData
      );
   },
   getReturnItem({ commit }, data) {
      //采购退货详情
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020412",
         CompanyId: homeInfo.shop.COMPANYID,
         BillId: data.BillId
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(RETURN_ITEM, { data });
         },
         sendData
      );
   },
   cancelReturn({ commit }, data) {
      //采购退货作废
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020414",
         CompanyId: homeInfo.shop.COMPANYID,
         BillId: data.BillId
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(RETURN_CANCEL, { data });
         },
         sendData
      );
   },
   clearwarehousingAll({ state }) {
      state.returnListState.paying.PN = 0;
      state.returnList = [];
      state.returnState = {};
      state.returnItem = {};
      state.returnObj = {};
      state.returnCancel = {};
   },
   cgdReturnDataList(data) {
      data.commit("CGD_RETURN_DATA", data);
   }
};

// mutations
const mutations = {
   [RETURN_ADD](state, { data }) {
      state.returnAddState = Object.assign({}, data);
   },
   [CGD_RETURN_DATA](state, data) {
      state.cgdReturnDataList = data;
   },
   [RETURN_EXPORT_TABLE](state, { data }) {
      state.returnExportState = Object.assign({}, data);
   },
   [RETURN_LIST](state, { data }) {
      let pageData = Object.assign({}, state.returnListState.paying);
      if (data.success) {
         state.returnList = [...data.data.PageData.DataArr];
         pageData = Object.assign(pageData, data.data.PageData);
      }
      state.returnListState = Object.assign({}, data, { paying: pageData });
   },
   [RETURN_ITEM](state, { data }) {
      if (data.success) {
         let param = [];
         for (let i in data.data.GoodsObj) {
            data.data.GoodsObj[i].isEdit = false;
            param.push(data.data.GoodsObj[i]);
         }
         state.returnItem = param;
         state.returnObj = data.data.Obj;
      }
      state.returnState = Object.assign({}, data);
   },
   [RETURN_CANCEL](state, { data }) {
      state.returnCancel = Object.assign({}, data);
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
