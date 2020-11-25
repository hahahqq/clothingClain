/**
 * 库存
 * 采购调拨
 * ***/

import commonSend from "@/api/api";
import {
   ALLOCATION_LIST,
   ALLOCATION_ADD,
   ALLOCATION_ITEM,
   ALLOCATION_CANCEL,
   SAVE_ALLOCATION_BILL,
   ALLOCATION_EXPORT_TABLE,
   CGD_ALLOCATION_DATA
} from "@/store/mutation-types";
import { getUserInfo, getHomeData } from "@/api/index";

// init state
const state = {
   allocationListState: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      }
   },
   allocationList: [],
   allocationState: {},
   allocationAddState: {},
   allocationItem: {},
   allocationObj: {},
   allocationCancel: {},
   saveAllocationState: {},
   allocationExportState: {},
   cgdAllocationDataList: []
};

// getters
const getters = {
   allocationState: state => state.allocationState,
   allocationAddState: state => state.allocationAddState,
   allocationListState: state => state.allocationListState,
   allocationList: state => state.allocationList,
   allocationCancel: state => state.allocationCancel,
   allocationItem: state => state.allocationItem,
   allocationObj: state => state.allocationObj,
   saveAllocationState: state => state.saveAllocationState,
   allocationExportState: state => state.allocationExportState,
   cgdAllocationDataList: state => state.cgdAllocationDataList
};

// actions
const actions = {
   addAllocation({ commit }, data) {
      // 采购调拨保存
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020416",
         CompanyId: homeInfo.shop.COMPANYID,
         ShopId: data.ShopId, // 调出店铺ID
         InShopId: data.InShopId, // 调入店铺ID
         BillId: data.BillId,
         BillDate: data.BillDate,
         ManualNo: data.ManualNo, //手工单号
         Remark: data.Remark,
         GoodsList: data.GoodsList, // 货号Id,颜色Id,尺码Id,数量,单价,备注
         IsCheck: data.IsCheck
      };

      commonSend.commonSend(
         "post",
         data => {
            commit(ALLOCATION_ADD, { data });
         },
         sendData
      );
   },
   getAllocationList({ commit, state }, data) {
      // 采购调拨列表
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: data.Status == 1 ? "91020422" : "91020418",
         CompanyId: homeInfo.shop.COMPANYID,
         ShopId: data.Status == 2 ? "" : homeInfo.shop.ID,
         InShopId: data.Status == 2 ? homeInfo.shop.ID : "",
         BeginDate: data.BeginDate,
         EndDate: data.EndDate,
         Filter: data.Filter,
         BillNo: data.BillNo,
         IsCheck: data.IsCheck, // 是否确认, -1=all,0=草稿,1=确认单
         IsCancel: data.IsCancel, // 是否作废,-1=all,0=正常,1=已作废
         IsFlag: data.IsFlag, // 是否调入  -1=all,0=未调入,1=已调入
         PN: data.PN ? data.PN : 1
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(ALLOCATION_LIST, { data });
         },
         sendData
      );
   },
   getAllocationList_Export({ commit }, data) {
      //库存调拨列表  -- 导出
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020418_1",
         CompanyId: homeInfo.shop.COMPANYID,
         ShopId: homeInfo.shop.ID,
         BeginDate: data.BeginDate,
         EndDate: data.EndDate,
         Filter: data.Filter,
         BillNo: data.BillNo,
         IsCheck: data.IsCheck, // 是否确认  -1=all, 0=草稿, 1=确认单
         IsCancel: data.IsCancel, // 是否作废  -1=all, 0=正常, 1=已作废
         IsFlag: data.IsFlag // 是否调入  -1=all, 0=未调入,1=已调入
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(ALLOCATION_EXPORT_TABLE, { data });
         },
         sendData
      );
   },
   getAllocationItem({ commit }, data) {
      //库存调拨详情
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020417",
         CompanyId: homeInfo.shop.COMPANYID,
         BillId: data.BillId
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(ALLOCATION_ITEM, { data });
         },
         sendData
      );
   },
   saveAllocationBill({ commit }, data) {
      // 待调入单 --> 调入
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020420",
         CompanyId: homeInfo.shop.COMPANYID,
         BillId: data.BillId,
         IsCheck: 1
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(SAVE_ALLOCATION_BILL, { data });
         },
         sendData
      );
   },
   cancelAllocation({ commit }, data) {
      // 库存调拨作废
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020419",
         CompanyId: homeInfo.shop.COMPANYID,
         BillId: data.BillId
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(ALLOCATION_CANCEL, { data });
         },
         sendData
      );
   },
   clearallocationAll({ state }) {
      state.allocationListState.paying.PN = 0;
      state.allocationList = [];
      state.allocationState = {};
      state.allocationItem = {};
      state.allocationObj = {};
      state.allocationCancel = {};
   },
   cgdAllocationDataList(data) {
      data.commit("CGD_ALLOCATION_DATA", data);
   }
};

// mutations
const mutations = {
   [SAVE_ALLOCATION_BILL](state, { data }) {
      state.saveAllocationState = Object.assign({}, data);
   },
   [CGD_ALLOCATION_DATA](state, data) {
      state.cgdAllocationDataList = data;
   },
   [ALLOCATION_ADD](state, { data }) {
      state.allocationAddState = Object.assign({}, data);
   },
   [ALLOCATION_LIST](state, { data }) {
      let pageData = Object.assign({}, state.allocationListState.paying);
      if (data.success) {
         state.allocationList = [...data.data.PageData.DataArr];
         pageData = Object.assign(pageData, data.data.PageData);
      }
      state.allocationListState = Object.assign({}, data, { paying: pageData });
   },
   [ALLOCATION_EXPORT_TABLE](state, { data }) {
      state.allocationExportState = Object.assign({}, data);
   },
   [ALLOCATION_ITEM](state, { data }) {
      if (data.success) {
         let param = [];
         for (let i in data.data.GoodsObj) {
            data.data.GoodsObj[i].isEdit = false;
            param.push(data.data.GoodsObj[i]);
         }
         state.allocationItem = param;
         state.allocationObj = data.data.Obj;
      }
      state.allocationState = Object.assign({}, data);
   },
   [ALLOCATION_CANCEL](state, { data }) {
      state.allocationCancel = Object.assign({}, data);
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
