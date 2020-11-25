/**
 * 库存
 * 库存盘点
 * ***/

import commonSend from "@/api/api";
import {
   INVENTORY_LIST,
   INVENTORY_ADD,
   INVENTORY_ITEM,
   INVENTORY_CANCEL,
   INVENTORY_DEL,
   INVENTORY_EXPORT_TABLE,
   CGD_INVENTORY_DATA,
   SUM_INVENTORY_SUBORDER_SUBMIT,
   SUM_INVENTORY_SUBORDER,
   SUM_INVENTORY_SUBORDER_SEARCH,
   INVENTORY_SUBORDER_DEL,
   INVENTORY_SUBORDER_DETAILS,
   SAVE_INVENTORY_SUBORDER,
   SAVE_INVENTORY_SUBORDER_1,
   SAVE_DRAFTLIST_INVENTORY
} from "@/store/mutation-types";
import { getUserInfo, getHomeData } from "@/api/index";

// init state
const state = {
   inventoryListState: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      }
   },
   inventoryList: [],
   inventoryState: {},
   inventoryAddState: {},
   inventoryItem: {},
   inventoryObj: {},
   inventoryCancel: {},
   inventoryDel: {},
   inventoryExportState: {},
   cgdInventoryDataList: {},
   sumInventorySuborderSubmitState: {},
   sumInventorySuborderState: {},
   inventorySuborderDelState: {},
   inventorySuborderDetailsState: {},
   saveInventorySuborderState: {},
   saveInventorySuborderState_1: {},
   sumInventorySuborderSearchState: {},
   saveDraftListInventoryState: {},
   inventoryCountingUserList: {}
};

// getters
const getters = {
   inventoryState: state => state.inventoryState,
   inventoryAddState: state => state.inventoryAddState,
   inventoryListState: state => state.inventoryListState,
   inventoryExportState: state => state.inventoryExportState,
   inventoryList: state => state.inventoryList,
   inventoryCancel: state => state.inventoryCancel,
   inventoryDel: state => state.inventoryDel,
   inventoryItem: state => state.inventoryItem,
   inventoryObj: state => state.inventoryObj,
   inventoryCountingUserList: state => state.inventoryCountingUserList,
   cgdInventoryDataList: state => state.cgdInventoryDataList,

   sumInventorySuborderSubmitState: state => state.sumInventorySuborderSubmitState,
   sumInventorySuborderState: state => state.sumInventorySuborderState,
   inventorySuborderDelState: state => state.inventorySuborderDelState,
   inventorySuborderDetailsState: state => state.inventorySuborderDetailsState,
   saveInventorySuborderState: state => state.saveInventorySuborderState,
   saveInventorySuborderState_1: state => state.saveInventorySuborderState_1,
   sumInventorySuborderSearchState: state => state.sumInventorySuborderSearchState,
   saveDraftListInventoryState: state => state.saveDraftListInventoryState
};

// actions
const actions = {
   addInventory({ commit }, data) {
      // 库存盘点保存
      let homeInfo = getHomeData();
      let sendData = {
         // 'InterfaceCode':'91020426',
         InterfaceCode: "91020426_A",
         CompanyId: homeInfo.shop.COMPANYID,
         ShopId: data.ShopId,
         BillId: data.BillId,
         BillDate: data.BillDate,
         ManualNo: data.ManualNo, //手工单号
         IsAll: data.IsAll,
         GoodsList: data.GoodsList, // 货号Id,颜色Id,尺码Id,数量,单价,备注
         Remark: data.Remark,
         IsCheck: data.IsCheck
      };

      commonSend.commonSend(
         "post",
         data => {
            commit(INVENTORY_ADD, { data });
         },
         sendData
      );
   },
   getInventoryList({ commit, state }, data) {
      // 库存盘点列表
      let homeInfo = getHomeData();
      let pn = parseInt(state.inventoryListState.paying.PN) + 1;
      if (data.Filter) pn = 1;
      let sendData = {
         InterfaceCode: "91020428",
         CompanyId: homeInfo.shop.COMPANYID,
         ShopId: data.ShopId == "" ? homeInfo.shop.ID : data.ShopId,
         Filter: data.Filter ? data.Filter : "",
         BeginDate: data.BeginDate,
         EndDate: data.EndDate,
         BillNo: data.BillNo,
         IsCheck: data.IsCheck, // 是否确认, -1=all,0=草稿,1=确认单
         IsCancel: data.IsCancel, // 是否作废,-1=all,0=正常,1=已作废
         PN: data.PN ? data.PN : pn
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(INVENTORY_LIST, { data });
         },
         sendData
      );
   },
   getinventoryList_Export({ commit, state }, data) {
      // 采购盘点列表—— 导出
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020428_1",
         CompanyId: homeInfo.shop.COMPANYID,
         ShopId: data.ShopId,
         Filter: data.Filter ? data.Filter : "",
         BeginDate: data.BeginDate,
         EndDate: data.EndDate,
         BillNo: data.BillNo,
         IsCheck: data.IsCheck, // 是否确认, -1=all,0=草稿,1=确认单
         IsCancel: data.IsCancel // 是否作废,-1=all,0=正常,1=已作废
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(INVENTORY_EXPORT_TABLE, { data });
         },
         sendData
      );
   },
   getInventoryItem({ commit }, data) {
      //店铺盘点详情
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020427",
         CompanyId: homeInfo.shop.COMPANYID,
         BillId: data.BillId
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(INVENTORY_ITEM, { data });
         },
         sendData
      );
   },
   cancelInventory({ commit }, data) {
      //店铺盘点作废
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020429_1",
         CompanyId: homeInfo.shop.COMPANYID,
         ShopId: homeInfo.shop.ID,
         BillId: data.BillId,
         IsDel: data.IsDel
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(INVENTORY_CANCEL, { data });
         },
         sendData
      );
   },
   delInventory({ commit }, data) {
      //店铺盘点草稿单删除
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020429",
         CompanyId: homeInfo.shop.COMPANYID,
         BillId: data.BillId
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(INVENTORY_DEL, { data });
         },
         sendData
      );
   },
   clearinventoryAll({ state }) {
      state.inventoryListState.paying.PN = 0;
      state.inventoryList = [];
      state.inventoryState = {};
      state.inventoryItem = {};
      state.inventoryObj = {};
      state.inventoryCancel = {};
   },
   cgdInventoryDataList(data) {
      data.commit("CGD_INVENTORY_DATA", data);
   },

   saveDraftListInventory({ commit }, data) {
      // 多人盘点主单草稿单
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020426_1",
         CompanyId: homeInfo.shop.COMPANYID,
         ShopId: data.ShopId,
         BillId: data.BillId,
         BillDate: data.BillDate,
         ManualNo: "", //手工单号
         IsAll: data.IsAll,
         Remark: data.Remark
      };

      commonSend.commonSend(
         "post",
         data => {
            commit(SAVE_DRAFTLIST_INVENTORY, { data });
         },
         sendData
      );
   },

   saveInventorySuborder({ commit }, data) {
      // 库存盘点主单保存
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020426_2",
         CompanyId: homeInfo.shop.COMPANYID,
         ShopId: data.ShopId,
         BillId: data.BillId,
         BillDate: data.BillDate,
         ManualNo: data.ManualNo, //手工单号
         IsAll: data.IsAll,
         GoodsList: data.GoodsList, // 货号Id,颜色Id,尺码Id,数量,单价,备注
         Remark: data.Remark,
         CountingId: data.CountingId, // 子单id
         CountingUserId: data.CountingUserId, // 子单用户id
         CountingRemark: data.CountingRemark, // 子单备注
         IsAddGoods: data.IsAddGoods // 是否新增明细
      };

      commonSend.commonSend(
         "post",
         data => {
            commit(SAVE_INVENTORY_SUBORDER, { data });
         },
         sendData
      );
   },
   saveInventorySuborder_1({ commit }, data) {
      // 库存盘点子单保存
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020426_2",
         CompanyId: homeInfo.shop.COMPANYID,
         ShopId: data.ShopId,
         BillId: data.BillId,
         BillDate: data.BillDate,
         ManualNo: data.ManualNo, //手工单号
         IsAll: data.IsAll,
         GoodsList: data.GoodsList, // 货号Id,颜色Id,尺码Id,数量,单价,备注
         Remark: data.Remark,
         CountingId: data.CountingId, // 子单id
         CountingUserId: data.CountingUserId, // 子单用户id
         CountingRemark: data.CountingRemark, // 子单备注
         IsAddGoods: data.IsAddGoods // 是否新增明细
      };

      commonSend.commonSend(
         "post",
         data => {
            commit(SAVE_INVENTORY_SUBORDER_1, { data });
         },
         sendData
      );
   },
   inventorySuborderDetails({ commit }, data) {
      // 库存盘点子单明细
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020426_3",
         CompanyId: homeInfo.shop.COMPANYID,
         BillId: data.BillId, // 主单单号
         CountingId: data.CountingId // 子单id
      };

      commonSend.commonSend(
         "get",
         data => {
            commit(INVENTORY_SUBORDER_DETAILS, { data });
         },
         sendData
      );
   },
   delInventorySuborder({ commit }, data) {
      // 库存盘点子单删除
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020426_4",
         CompanyId: homeInfo.shop.COMPANYID,
         BillId: data.BillId, // 主单单号
         CountingId: data.CountingId // 子单id
      };

      commonSend.commonSend(
         "get",
         data => {
            commit(INVENTORY_SUBORDER_DEL, { data });
         },
         sendData
      );
   },
   sumInventorySuborder({ commit }, data) {
      // 库存盘点子单汇总
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020426_5",
         CompanyId: homeInfo.shop.COMPANYID,
         BillId: data.BillId // 主单单号
      };

      commonSend.commonSend(
         "get",
         data => {
            commit(SUM_INVENTORY_SUBORDER, { data });
         },
         sendData
      );
   },
   sumInventorySuborderSearch({ commit }, data) {
      // 库存盘点子单汇总查询
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020426_7",
         CompanyId: homeInfo.shop.COMPANYID,
         BillId: data.BillId, // 主单单号
         Filter: data.Filter,
         Type: data.Type,
         GoodsType: data.GoodsType
      };

      commonSend.commonSend(
         "get",
         data => {
            commit(SUM_INVENTORY_SUBORDER, { data });
         },
         sendData
      );
   },
   sumInventorySuborderSubmit({ commit }, data) {
      // 库存盘点汇总确认
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020426_6",
         CompanyId: homeInfo.shop.COMPANYID,
         BillId: data.BillId // 主单单号
      };

      commonSend.commonSend(
         "get",
         data => {
            commit(SUM_INVENTORY_SUBORDER_SUBMIT, { data });
         },
         sendData
      );
   }
};

// mutations
const mutations = {
   [SAVE_DRAFTLIST_INVENTORY](state, { data }) {
      state.saveDraftListInventoryState = data;
   },
   [SUM_INVENTORY_SUBORDER_SUBMIT](state, { data }) {
      state.sumInventorySuborderSubmitState = Object.assign({}, data);
   },
   [SUM_INVENTORY_SUBORDER](state, { data }) {
      state.sumInventorySuborderState = Object.assign({}, data);
   },
   [SUM_INVENTORY_SUBORDER_SEARCH](state, { data }) {
      state.sumInventorySuborderSearchState = Object.assign({}, data);
   },
   [INVENTORY_SUBORDER_DEL](state, { data }) {
      state.inventorySuborderDelState = Object.assign({}, data);
   },
   [INVENTORY_SUBORDER_DETAILS](state, { data }) {
      state.inventorySuborderDetailsState = Object.assign({}, data);
   },
   [SAVE_INVENTORY_SUBORDER](state, { data }) {
      state.saveInventorySuborderState = Object.assign({}, data);
   },
   [SAVE_INVENTORY_SUBORDER_1](state, { data }) {
      state.saveInventorySuborderState_1 = Object.assign({}, data);
   },

   [INVENTORY_ADD](state, { data }) {
      state.inventoryAddState = Object.assign({}, data);
   },
   [CGD_INVENTORY_DATA](state, data) {
      state.cgdInventoryDataList = data;
   },
   [INVENTORY_EXPORT_TABLE](state, { data }) {
      state.inventoryExportState = Object.assign({}, data);
   },
   [INVENTORY_LIST](state, { data }) {
      let pageData = Object.assign({}, state.inventoryListState.paying);
      if (data.success) {
         state.inventoryList = [...data.data.PageData.DataArr];
         pageData = Object.assign(pageData, data.data.PageData);
      }
      state.inventoryListState = Object.assign({}, data, { paying: pageData });
   },
   [INVENTORY_ITEM](state, { data }) {
      if (data.success) {
         let param = [];
         for (let i in data.data.GoodsObj) {
            data.data.GoodsObj[i].isEdit = false;
            param.push(data.data.GoodsObj[i]);
         }
         state.inventoryItem = param;
         state.inventoryObj = data.data.Obj;
         state.inventoryCountingUserList = data.data.CountingUserList;
      }
      state.inventoryState = Object.assign({}, data);
   },
   [INVENTORY_CANCEL](state, { data }) {
      state.inventoryCancel = Object.assign({}, data);
   },
   [INVENTORY_DEL](state, { data }) {
      state.inventoryDel = Object.assign({}, data);
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
