/**
 * 库存
 * 采购入库
 * ***/

import commonSend from "@/api/api";
import {
   WAREHOUSING_LIST,
   WAREHOUSING_ADD,
   WAREHOUSING_ITEM,
   WAREHOUSING_CANCEL,
   WAREHOUSING_EXPORT_TABLE,
   CGD_WAREHOUSING_DATA
} from "@/store/mutation-types";
import { getUserInfo, getHomeData } from "@/api/index";
// init state
const state = {
   warehousingListState: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      }
   },
   warehousingList: [],
   warehousingState: {},
   warehousingAddState: {},
   warehousingItem: {},
   warehousingObj: {},
   warehousingCancel: {},
   warehousingExportState: {},
   cgdWarehousingDataList: []
};

// getters
const getters = {
   warehousingState: state => state.warehousingState,
   warehousingAddState: state => state.warehousingAddState,
   warehousingListState: state => state.warehousingListState,
   warehousingExportState: state => state.warehousingExportState,
   warehousingList: state => state.warehousingList,
   warehousingCancel: state => state.warehousingCancel,
   warehousingItem: state => state.warehousingItem,
   warehousingObj: state => state.warehousingObj,
   cgdWarehousingDataList: state => state.cgdWarehousingDataList
};

// actions
const actions = {
   addWarehousing({ commit }, data) {
      // 采购入库保存
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020406",
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
            commit(WAREHOUSING_ADD, { data });
         },
         sendData
      );
   },
   getWarehousingList({ commit, state }, data) {
      // 采购入库列表
      console.log(data);
      let homeInfo = getHomeData();
      let pn = parseInt(state.warehousingListState.paying.PN) + 1;
      if (data.Filter) pn = 1;
      let sendData = {
         InterfaceCode: "91020408",
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
            commit(WAREHOUSING_LIST, { data });
         },
         sendData
      );
   },
   getWarehousingList_Export({ commit, state }, data) {
      // 采购入库列表 -- 导出
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020408_1",
         CompanyId: homeInfo.shop.COMPANYID,
         ShopId: data.ShopId,
         Filter: data.Filter ? data.Filter : "",
         BeginDate: data.BeginDate,
         EndDate: data.EndDate,
         SupplierId: data.SupplierId,
         BillNo: data.BillNo,
         IsCheck: data.IsCheck, // 是否确认, -1=all,0=草稿,1=确认单
         IsCancel: data.IsCancel // 是否作废, -1=all,0=正常,1=已作废
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(WAREHOUSING_EXPORT_TABLE, { data });
         },
         sendData
      );
   },
   getWarehousingItem({ commit }, data) {
      // 采购入库详情
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020407",
         CompanyId: homeInfo.shop.COMPANYID,
         BillId: data.BillId
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(WAREHOUSING_ITEM, { data });
         },
         sendData
      );
   },
   cancelWarehousing({ commit }, data) {
      // 采购入库作废
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020409",
         CompanyId: homeInfo.shop.COMPANYID,
         BillId: data.BillId
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(WAREHOUSING_CANCEL, { data });
         },
         sendData
      );
   },
   clearwarehousingAll({ state }) {
      state.warehousingListState.paying.PN = 0;
      state.warehousingList = [];
      state.warehousingState = {};
      state.warehousingItem = {};
      state.warehousingObj = {};
      state.warehousingCancel = {};
   },
   cgdWarehousingDataList(data) {
      data.commit("CGD_WAREHOUSING_DATA", data);
   }
};

// mutations
const mutations = {
   [WAREHOUSING_ADD](state, { data }) {
      state.warehousingAddState = Object.assign({}, data);
   },
   [CGD_WAREHOUSING_DATA](state, data) {
      state.cgdWarehousingDataList = data;
   },
   [WAREHOUSING_EXPORT_TABLE](state, { data }) {
      state.warehousingExportState = Object.assign({}, data);
   },
   [WAREHOUSING_LIST](state, { data }) {
      let pageData = Object.assign({}, state.warehousingListState.paying);
      if (data.success) {
         state.warehousingList = [...data.data.PageData.DataArr];
         pageData = Object.assign(pageData, data.data.PageData);
      }
      state.warehousingListState = Object.assign({}, data, { paying: pageData });
   },
   [WAREHOUSING_ITEM](state, { data }) {
      if (data.success) {
         let param = [];
         for (let i in data.data.GoodsObj) {
            data.data.GoodsObj[i].isEdit = false;
            param.push(data.data.GoodsObj[i]);
         }
         state.warehousingItem = param;
         state.warehousingObj = data.data.Obj;
      }
      state.warehousingState = Object.assign({}, data);
   },
   [WAREHOUSING_CANCEL](state, { data }) {
      state.warehousingCancel = Object.assign({}, data);
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
