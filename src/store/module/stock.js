/**
 * 库存管理
 *
 * ***/

import commonSend from "@/api/api";
import {
   GET_WAREHOUSING_REPORT,
   GET_SALE_CENSUS_REPORT,
   GET_Allocation_REPORT,
   GET_Inventory_REPORT,
   UPLOAD_STOCK_STATE,
   BILLID_DETAILS_CHECK,
   WAREHOUSING_REPORT_EXPORT,
   SALE_CENSUS_REPORT_EXPORT,
   ALLOCATION_REPORT_EXPORT,
   INVENTORY_REPORT_EXPORT,
   DEFRAYREPORT_EXPORT
} from "@/store/mutation-types";
import { getUserInfo, getHomeData } from "@/api/index";

// init state
const state = {
   getCaiGouReportState: {},
   getSaleCensusReportState: {},
   getAllocationReportState: {},
   getInventoryReportState: {},
   CaiGouReportList: [],
   SaleCensusReportList: [],
   AllocationReportList: [],
   InventoryReportList: [],
   uploadStockState: {},
   billIdDetailsCheckState: {},
   storkReportExport_1_state: {},
   storkReportExport_2_state: {},
   storkReportExport_3_state: {},
   storkReportExport_4_state: {},
   defrayReportExportState: {}
};

// getters
const getters = {
   billIdDetailsCheckState: state => state.billIdDetailsCheckState,
   uploadStockState: state => state.uploadStockState,
   getCaiGouReportState: state => state.getCaiGouReportState,
   getSaleCensusReportState: state => state.getSaleCensusReportState,
   getAllocationReportState: state => state.getAllocationReportState,
   getInventoryReportState: state => state.getInventoryReportState,
   CaiGouReportList: state => state.CaiGouReportList,
   SaleCensusReportList: state => state.SaleCensusReportList,
   AllocationReportList: state => state.AllocationReportList,
   InventoryReportList: state => state.InventoryReportList,
   storkReportExport_1_state: state => state.storkReportExport_1_state,
   storkReportExport_2_state: state => state.storkReportExport_2_state,
   storkReportExport_3_state: state => state.storkReportExport_3_state,
   storkReportExport_4_state: state => state.storkReportExport_4_state,
   defrayReportExportState: state => state.defrayReportExportState
};

// actions
const actions = {
   GetWarehousingReport({ commit }, data) {
      // 采购统计
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91031001",
         CompanyId: homeInfo.shop.COMPANYID,
         ShopId: data.ShopId,
         BeginDate: data.dateChoose[0],
         EndDate: data.dateChoose[1],
         FN: data.PN,
         Filter: data.Filter,
         SupplierId: data.SupplierId,
         Brand: data.Brand,
         TypeId: data.TypeId
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_WAREHOUSING_REPORT, { data });
         },
         sendData
      );
   },
   GetSaleCensusReport({ commit }, data) {
      //销售统计
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91031011",
         CompanyId: homeInfo.shop.COMPANYID,
         ShopId: data.ShopId,
         BeginDate: data.dateChoose[0],
         EndDate: data.dateChoose[1],
         FN: data.PN,
         Filter: data.Filter,
         SaleEmpId: data.SaleEmpId,
         Brand: data.Brand,
         TypeId: data.TypeId
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_SALE_CENSUS_REPORT, { data });
         },
         sendData
      );
   },
   GetAllocationReport({ commit }, data) {
      // 调拨统计
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91031021",
         CompanyId: homeInfo.shop.COMPANYID,
         ShopId: data.ShopId,
         BeginDate: data.dateChoose[0],
         EndDate: data.dateChoose[1],
         FN: data.PN,
         Filter: data.Filter,
         Brand: data.Brand,
         TypeId: data.TypeId
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_Allocation_REPORT, { data });
         },
         sendData
      );
   },
   GetInventoryReport({ commit }, data) {
      // 盘点统计
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91031031",
         CompanyId: homeInfo.shop.COMPANYID,
         ShopId: data.ShopId,
         BeginDate: data.dateChoose[0],
         EndDate: data.dateChoose[1],
         FN: data.PN,
         Filter: data.Filter,
         Brand: data.Brand,
         TypeId: data.TypeId
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_Inventory_REPORT, { data });
         },
         sendData
      );
   },
   uploadStockExcel({ commit }, data) {
      // 单据明细转id
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020431",
         CompanyId: homeInfo.shop.COMPANYID,
         GoodsList: data.GoodsList
      };
      commonSend.commonSend(
         "post",
         data => {
            commit(UPLOAD_STOCK_STATE, { data });
         },
         sendData
      );
   },
   billdetailsCheck({ commit }, data) {
      //单据明细单条检测
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020432",
         CompanyId: homeInfo.shop.COMPANYID,
         Color: data.COLORNAME,
         Size: data.SIZENAME,
         Code: data.GOODSCODE
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(BILLID_DETAILS_CHECK, { data });
         },
         sendData
      );
   },
   caiGouReportExport({ commit }, data) {
      // 采购统计报表 导出
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020910",
         CompanyId: homeInfo.shop.COMPANYID,
         ShopId: data.ShopId,
         BeginDate: data.dateChoose[0],
         EndDate: data.dateChoose[1],
         Filter: data.Filter,
         SupplierId: data.SupplierId,
         Brand: data.Brand,
         TypeId: data.TypeId
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(WAREHOUSING_REPORT_EXPORT, { data });
         },
         sendData
      );
   },
   SaleCensusReportExport({ commit }, data) {
      // 销售分析报表 导出
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020911",
         CompanyId: homeInfo.shop.COMPANYID,
         ShopId: data.ShopId,
         BeginDate: data.dateChoose[0],
         EndDate: data.dateChoose[1],
         Filter: data.Filter,
         SaleEmpId: data.SaleEmpId,
         Brand: data.Brand,
         TypeId: data.TypeId
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(SALE_CENSUS_REPORT_EXPORT, { data });
         },
         sendData
      );
   },
   allocationReportExport({ commit }, data) {
      // 调拨统计报表 导出
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020912",
         CompanyId: homeInfo.shop.COMPANYID,
         ShopId: data.ShopId,
         BeginDate: data.dateChoose[0],
         EndDate: data.dateChoose[1],
         Filter: data.Filter,
         Brand: data.Brand,
         TypeId: data.TypeId
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(ALLOCATION_REPORT_EXPORT, { data });
         },
         sendData
      );
   },
   inventoryReportExport({ commit }, data) {
      // 盘点统计报表 导出
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020913",
         CompanyId: homeInfo.shop.COMPANYID,
         ShopId: data.ShopId,
         BeginDate: data.dateChoose[0],
         EndDate: data.dateChoose[1],
         Filter: data.Filter,
         Brand: data.Brand,
         TypeId: data.TypeId
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(INVENTORY_REPORT_EXPORT, { data });
         },
         sendData
      );
   },

   defrayReportExport({ commit }, data) {
      //支出分析报表 导出
      let userInfo = getUserInfo();
      console.log(data);
      let sendData = {
         InterfaceCode: "91020914",
         CompanyId: userInfo.CompanyID,
         ShipIDList: data.ShopId ? data.ShopId : "",
         BeginDate: data.BeginDate ? data.BeginDate : 1,
         EndDate: data.EndDate ? data.EndDate : 9999999999999
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(DEFRAYREPORT_EXPORT, { data });
         },
         sendData
      );
   }
};

// mutations
const mutations = {
   [DEFRAYREPORT_EXPORT](state, { data }) {
      state.defrayReportExportState = data;
   },
   [WAREHOUSING_REPORT_EXPORT](state, { data }) {
      state.storkReportExport_1_state = data;
   },
   [SALE_CENSUS_REPORT_EXPORT](state, { data }) {
      state.storkReportExport_2_state = data;
   },
   [ALLOCATION_REPORT_EXPORT](state, { data }) {
      state.storkReportExport_3_state = data;
   },
   [INVENTORY_REPORT_EXPORT](state, { data }) {
      state.storkReportExport_4_state = data;
   },
   [BILLID_DETAILS_CHECK](state, { data }) {
      state.billIdDetailsCheckState = data;
   },
   [UPLOAD_STOCK_STATE](state, { data }) {
      state.uploadStockState = data;
   },
   [GET_WAREHOUSING_REPORT](state, { data }) {
      if (data.success) {
         state.CaiGouReportList = [...data.data.PageData.DataArr];
      }
      state.getCaiGouReportState = Object.assign({}, data);
   },
   [GET_SALE_CENSUS_REPORT](state, { data }) {
      if (data.success) {
         state.SaleCensusReportList = [...data.data.PageData.DataArr];
      }
      state.getSaleCensusReportState = Object.assign({}, data);
   },
   [GET_Allocation_REPORT](state, { data }) {
      if (data.success) {
         state.AllocationReportList = [...data.data.PageData.DataArr];
      }
      state.getAllocationReportState = Object.assign({}, data);
   },
   [GET_Inventory_REPORT](state, { data }) {
      if (data.success) {
         state.InventoryReportList = [...data.data.PageData.DataArr];
      }
      state.getInventoryReportState = Object.assign({}, data);
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
