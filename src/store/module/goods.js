/**
 * 商品
 *
 * ***/

import commonSend from "@/api/api";
import {
   GOODS_LIST,
   GOODS_LIST2,
   GOODS_LIST3,
   GOODS_LIST_EDIT_GROUP,
   GOODS_ITEM,
   DEAL_GOODS,
   GOODS_EXPORTDATA,
   GOODS_IMPORTDATA,
   SET_GOODS_MOVING,
   GET_GOODS_INVENTORY,
   GET_GOODS_SETMEALG,
   GET_GOODS_SETMEALGSAVE,
   GET_GOODS_SETMEALGDETAILS,
   GET_GOODS_BRAND,
   GET_GOODS_ATTRIBUTE,
   GET_GOODS_SUPPLIER,
   DEL_GOODS,
   ADD_SHOP_CATEGORY,
   ADD_SUPPLIER,
   ADD_GOODS_BRAND,
   ADD_GOODS_UNIT,
   ADD_GOODS_UPLOADIMAGE,
   MODIFY_BARCODE,
   GET_AUTOGOODCODE,
   EDIT_GROUP_GOODS,
   BARCODE_SCAN_GOODS,
   GOODSLIST_INCLUDE_SINGLE
} from "@/store/mutation-types";
import { getUserInfo, getHomeData } from "@/api/index";
import { stat } from "fs";
let selected = {};

// init state
const state = {
   editGroupGoodsState: {},
   goodsState: {},
   goodsListState: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      }
   },
   goodsListState3: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      }
   },
   goodsListEditGroupState: {},
   goodsListState2: {},
   goodsList: [],
   goodsList2: [],
   goodsList3: [],
   goodsItem: {},
   exportGoodsState: {},
   importGoodsState: {},
   goodsMovingState: {},
   goodsInventoryList: [],
   goodsInventoryListState: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      },
      List: []
   },
   selgoods: {},
   goodsstemaealgState: {},
   goodsstemaealgsaveState: {},
   goodsstemaealgdetailsState: {},
   goodsbrandState: {},
   goodsbrandList: [],
   goodsattributeState: {},
   goodssupplierState: {},
   goodssupplierList: [],
   delGoods: {},
   addGoodsCategoryState: {},
   addSupplierState: {},
   addGoodsBrandState: {},
   addGoodsUnitState: {},
   addImageState: {},
   OnlyOneGoodsState: [],
   modifyBarCodeState: {},
   getAutoGoodCodeState: {},
   barcodeScanGoodsState: {},
   goodsListIncludeSingleState: {}
};

// getters
const getters = {
   editGroupGoodsState: state => state.editGroupGoodsState,
   getAutoGoodCodeState: state => state.getAutoGoodCodeState,
   goodsState: state => state.goodsState,
   goodsListState: state => state.goodsListState,
   goodsListState2: state => state.goodsListState2,
   goodsListState3: state => state.goodsListState3,
   goodsListEditGroupState: state => state.goodsListEditGroupState,
   OnlyOneGoodsState: state => state.OnlyOneGoodsState,
   goodsList: state => state.goodsList,
   goodsList2: state => state.goodsList2,
   goodsList3: state => state.goodsList3,
   goodsItem: state => state.goodsItem,
   exportGoodsState: state => state.exportGoodsState,
   importGoodsState: state => state.importGoodsState,
   goodsMovingState: state => state.goodsMovingState,
   goodsInventoryList: state => state.goodsInventoryList,
   goodsInventoryListState: state => state.goodsInventoryListState,
   selgoods: state => state.selgoods,
   goodsstemaealgState: state => state.goodsstemaealgState,
   goodsstemaealgsaveState: state => state.goodsstemaealgsaveState,
   goodsstemaealgdetailsState: state => state.goodsstemaealgdetailsState,
   goodsbrandState: state => state.goodsbrandState,
   goodsbrandList: state => state.goodsbrandList,
   goodsattributeState: state => state.goodsattributeState,
   goodssupplierState: state => state.goodssupplierState,
   goodssupplierList: state => state.goodssupplierList,
   delGoods: state => state.delGoods,
   addGoodsCategoryState: state => state.addGoodsCategoryState,
   addSupplierState: state => state.addSupplierState,
   addGoodsBrandState: state => state.addGoodsBrandState,
   addGoodsUnitState: state => state.addGoodsUnitState,
   addImageState: state => state.addImageState,
   modifyBarCodeState: state => state.modifyBarCodeState,
   barcodeScanGoodsState: state => state.barcodeScanGoodsState,
   goodsListIncludeSingleState: state => state.goodsListIncludeSingleState
};

// actions
const actions = {
   modifyBarCode({ commit }, data) {
      // 商品条码修改
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "9102080323_1",
         CompanyId: homeInfo.shop.COMPANYID,
         GoodsId: data.GoodsId,
         ColorId: data.ColorId,
         SizeId: data.SizeId,
         BarCode: data.BarCode
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(MODIFY_BARCODE, { data });
         },
         sendData
      );
   },
   getGoodsList({ commit, state }, data) {
      // 商品信息列表
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "9102080321_2A",
         ShopId: homeInfo.shop.ID,
         CompanyId: homeInfo.shop.COMPANYID,
         Filter: data.Filter ? data.Filter : "",
         Status: data.Status ? data.Status : -1, // -1=all  1=启用 0=停用
         TypeID: data.TypeID ? data.TypeID : "", //商品类别ID
         DescType: data.DescType ? data.DescType : 0,
         IsGift: data.IsGift ? data.IsGift : -1, // -1=all  1=是 0=否
         YearList: data.YearList ? data.YearList : "",
         SeasonList: data.SeasonList ? data.SeasonList : "",
         BrandList: data.BrandList ? data.BrandList : "",
         CategoryList: data.CategoryList ? data.CategoryList : "",
         SexNameList: data.SexNameList ? data.SexNameList : "",
         PN: data.PN ? data.PN : 1,
         TypeList: data.TypeList ? data.TypeList : "",
         PriceType: data.PriceType ? data.PriceType : ""
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GOODS_LIST, { data });
         },
         sendData
      );
   },
   getGoodsList2({ commit, state }, data) {
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "9102080321C", //  9102080321A
         ShopId: homeInfo.shop.ID,
         CompanyId: homeInfo.shop.COMPANYID,
         Filter: data.Filter,
         Status: data.Status, // -1=all  1=启用 0=停用
         TypeID: "", //商品类别ID
         DescType: 0,
         IsGift: -1, // -1=all  1=是 0=否
         YearList: "",
         SeasonList: "",
         BrandList: "",
         CategoryList: "",
         SexNameList: "",
         PN: 0
      };
      state.goodsList2 = [];
      commonSend.commonSend(
         "get",
         data => {
            commit(GOODS_LIST2, { data });
         },
         sendData
      );
   },
   getGoodsList3({ commit, state }, data) {
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "9102080321_1B",
         ShopId: homeInfo.shop.ID,
         CompanyId: homeInfo.shop.COMPANYID,
         Filter: data.Filter,
         PN: data.PN ? data.PN : 1,
         Status: data.Status, // -1=all  1=启用 0=停用
         TypeID: data.TypeID ? data.TypeID : "", //商品类别ID
         IsGift: data.IsGift ? data.IsGift : -1 // -1=all  1=是 0=否
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GOODS_LIST3, { data });
         },
         sendData
      );
   },
   getGoodsListIncludeSingle({ commit }, data) {
      // 商品信息列表 （含单品条码查询）
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "9102080321_1C",
         ShopId: homeInfo.shop.ID,
         Filter: data.Filter,
         CompanyId: homeInfo.shop.COMPANYID,
         IsBarcode: data.IsBarcode
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GOODSLIST_INCLUDE_SINGLE, { data });
         },
         sendData
      );
   },
   getBarCodeScanGoods({ commit, state }, data) {
      // 扫码获取商品（商品条码、单品条码）
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "9102080327A",
         ShopId: homeInfo.shop.ID,
         CompanyId: homeInfo.shop.COMPANYID,
         Code: data.Code
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(BARCODE_SCAN_GOODS, { data });
         },
         sendData
      );
   },
   getGoodsListEditGroup({ commit, state }, data) {
      // 商品信息列表--批量编辑
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "9102080321_2A",
         ShopId: homeInfo.shop.ID,
         CompanyId: homeInfo.shop.COMPANYID,
         Filter: data.Filter,
         Status: data.Status, // -1=all  1=启用 0=停用
         // TypeID: data.TypeID ? data.TypeID : '', //商品类别ID
         DescType: data.DescType ? data.DescType : 0,
         IsGift: data.IsGift ? data.IsGift : -1, // -1=all  1=是 0=否
         YearList: data.YearList ? data.YearList : "",
         SeasonList: data.SeasonList ? data.SeasonList : "",
         BrandList: data.BrandList ? data.BrandList : "",
         CategoryList: data.CategoryList ? data.CategoryList : "",
         TypeList: data.TypeList ? data.TypeList : "",
         SexNameList: data.SexNameList ? data.SexNameList : "",
         PN: data.PN ? data.PN : 1
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GOODS_LIST_EDIT_GROUP, { data });
         },
         sendData
      );
   },
   getGoodsItem({ commit }, item) {
      //商品信息详情
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "9102080322_2", // 9102080322
         ID: item.ID,
         CompanyId: homeInfo.shop.COMPANYID,
         ShopId: homeInfo.shop.ID,
         IsShowStock: item.IsShowStock ? item.IsShowStock : 0, // 0=全部,1=库存不为零
         Type: 0,
         IsGetDisprcie: item.IsGetDisprcie ? item.IsGetDisprcie : 0
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GOODS_ITEM, { data });
         },
         sendData
      );
   },
   delGoods({ commit }, data) {
      // 删除商品
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "9102080324",
         CompanyId: homeInfo.shop.COMPANYID,
         ID: data.ID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(DEL_GOODS, { data });
         },
         sendData
      );
   },
   dealGoods({ commit }, { type, data }) {
      // 商品信息保存
      console.log(data);
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "9102080323A",
         CompanyId: homeInfo.shop.COMPANYID,
         Code: data.Code,
         Name: data.Name,
         Id: type === "edit" ? data.Id : "",
         UnitId:
            data.UnitId == "undefined" || data.UnitId == "" || data.UnitId == undefined
               ? ""
               : data.UnitId,
         TypeId:
            data.TypeId == "undefined" || data.TypeId == "" || data.TypeId == undefined
               ? ""
               : data.TypeId,
         SupperId:
            data.SupplierId == "undefined" || data.SupplierId == "" || data.SupplierId == undefined
               ? ""
               : data.SupplierId,
         SizeGroupId: data.SizeGroupId,
         Status: data.Status ? "True" : "False",
         Price:
            data.Price == "undefined" || data.Price == "" || data.Price == undefined
               ? ""
               : data.Price,
         PuPrice: data.PurPrice,
         Integral: data.Integral ? data.Integral : 0,
         Remark:
            data.Remark == "undefined" || data.Remark == "" || data.Remark == undefined
               ? ""
               : data.Remark,
         IsGift: data.IsGift ? "True" : "False",
         GiftIntegral: data.GiftIntegral ? data.GiftIntegral : 0,
         Brand: data.Brand == undefined || data.Brand == "" ? "" : data.Brand,
         BrandId: data.Brand == undefined || data.Brand == "" ? "" : data.BrandId,
         Pyear: data.Pyear1 ? data.Pyear1 : "",
         Season: data.Season ? data.Season : "",
         Category:
            data.Category == "undefined" || data.Category == "" || data.Category == undefined
               ? ""
               : data.Category,
         SexName:
            data.SexName == "undefined" || data.SexName == "" || data.SexName == undefined
               ? ""
               : data.SexName,
         SupperGoodsCode:
            data.SupperGoodsCode == "undefined" ||
            data.SupperGoodsCode == "" ||
            data.SupperGoodsCode == undefined
               ? ""
               : data.SupperGoodsCode,
         SizeList: data.SizeList,
         ColorList: data.ColorList,
         BarCodeList: data.BarCodeList,
         VipPrice: data.VipPrice,
         Minstocknumber:
            data.Minstocknumber == "undefined" ||
            data.Minstocknumber == "" ||
            data.Minstocknumber == undefined
               ? ""
               : data.Minstocknumber,
         Maxstocknumber:
            data.Maxstocknumber == "undefined" ||
            data.Maxstocknumber == "" ||
            data.Maxstocknumber == undefined
               ? ""
               : data.Maxstocknumber,
         Isstocktips: data.Isstocktips ? "True" : "False",
         Barcode: data.Barcode == undefined ? "" : data.Barcode,
         Material:
            data.Material == "undefined" || data.Material == "" || data.Material == undefined
               ? ""
               : data.Material,
         Style:
            data.Style == "undefined" || data.Style == "" || data.Style == undefined
               ? ""
               : data.Style,
         Style1:
            data.Style1 == "undefined" || data.Style1 == "" || data.Style1 == undefined
               ? ""
               : data.Style1,
         Provenance:
            data.Provenance == "undefined" || data.Provenance == "" || data.Provenance == undefined
               ? ""
               : data.Provenance,
         DescNo: data.DescNo,
         Standard:
            data.Standard == "undefined" || data.Standard == "" || data.Standard == undefined
               ? ""
               : data.Standard,
         SafetyCategory:
            data.SafetyCategory == "undefined" ||
            data.SafetyCategory == "" ||
            data.SafetyCategory == undefined
               ? ""
               : data.SafetyCategory
      };

      console.log(sendData);
      if (type == "add") {
         sendData.GoodsStock = data.GoodsStock;
      }
      selected.type = type;
      selected.data = Object.assign({}, sendData);
      commonSend.commonSend(
         "post",
         data => {
            commit(DEAL_GOODS, { data });
         },
         sendData
      );
   },
   selectingGoods({ state }, data) {
      state.selgoods = Object.assign({}, data);
   },
   clearGoodsAll({ state }) {
      state.goodsListState.paying.PN = 0;
      state.goodsListState3.paying.PN = 0;
      state.goodsList = [];
      state.goodsList3 = [];
      state.goodsItem = {};
      state.goodsMovingState = {};
      state.goodsInventoryList = [];
      state.goodsInventoryListState.paying.PN = 0;
      state.selgoods = {};
      state.goodsattributeState = {};
      state.goodsbrandState = {};
      state.goodsbrandList = [];
      state.goodssupplierState = {};
      state.goodssupplierList = [];
   },
   clearGoodsList({ state }) {
      state.goodsListState.paying.PN = 0;
      state.goodsList = [];
   },
   getGoodsbrandList({ commit }, item) {
      //商品品牌列表
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "9102080331",
         Filter: item.Filter || "",
         CompanyId: homeInfo.shop.COMPANYID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_GOODS_BRAND, { data });
         },
         sendData
      );
   },
   getExportGoodsData({ commit }, data) {
      // 导出
      let homeInfo = getHomeData();
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "91020915",
         ShopId: homeInfo.shop.ID,
         CompanyId: userInfo.CompanyID,
         Filter: data.FilterStr,
         IsGift: -1,
         TypeID: data.TypeID,
         Status: data.Status ? data.Status : -1 // -1=all  1=上架 0=下架
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GOODS_EXPORTDATA, { data });
         },
         sendData
      );
   },
   getGoodsattributeList({ commit }, item) {
      // 商品属性列表
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "9102080325",
         FieldId: item.FieldId,
         CompanyId: userInfo.CompanyID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_GOODS_ATTRIBUTE, { data });
         },
         sendData
      );
   },
   getGoodssupplierList({ commit }, item) {
      // 供应商列表
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "910201101",
         Filter: item.Filter || "",
         IsCurr: item.IsCurr || 0,
         IsStop: item.IsStop || 0,
         CompanyId: userInfo.CompanyID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_GOODS_SUPPLIER, { data });
         },
         sendData
      );
   },
   getImportGoodsData({ commit }, data) {
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "9102080320_1", // 商品列表导入
         CompanyId: userInfo.CompanyID,
         List: JSON.stringify(data.arr)
      };
      if (data.type == "code") {
         // 单品条码导入
         sendData.InterfaceCode = "9102080320_2";
      }
      if (data.type == "goods1") {
         // 商品列表导入(含尺码)
         sendData.InterfaceCode = "9102080320_0";
      }
      commonSend.commonSend(
         "post",
         data => {
            commit(GOODS_IMPORTDATA, { data });
         },
         sendData
      );
   },
   addGoodsCategory({ commit }, item) {
      //商品分类保存
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: 9102080313,
         CompanyId: userInfo.CompanyID,
         Name: item.Name,
         Remark: item.Remark
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(ADD_SHOP_CATEGORY, { data });
         },
         sendData
      );
   },
   addSupplier({ commit }, item) {
      //新增供应商
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: 910201102,
         CompanyId: userInfo.CompanyID,
         Name: item.Name,
         Id: item.ID,
         Code: "",
         Linker: item.Linker,
         PhoneNo: item.PhoneNo,
         Fax: item.Fax,
         Tel: item.Tel,
         Address: item.Address,
         Email: item.Email,
         IsStop: 0,
         Remark: item.Remark,
         FirstMoney: item.FirstMoney,
         BankCardName: item.BankCardName,
         BankCardNo: item.BankCardNo,
         CardHolder: item.CardHolder,
         PROVINCEID: item.PROVINCEID,
         CITYID: item.CITYID,
         DISTRICTID: item.DISTRICTID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(ADD_SUPPLIER, { data });
         },
         sendData
      );
   },
   addGoodsBrand({ commit }, item) {
      //商品品牌保存
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: 9102080332,
         CompanyId: userInfo.CompanyID,
         id: "",
         Name: item.Name,
         Remark: item.Remark
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(ADD_GOODS_BRAND, { data });
         },
         sendData
      );
   },
   addGoodsUnit({ commit }, item) {
      // 商品单位保存
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "9102080302",
         CompanyId: userInfo.CompanyID,
         id: "",
         Name: item.Name,
         Remark: item.Remark
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(ADD_GOODS_UNIT, { data });
         },
         sendData
      );
   },
   addGoodsImg({ commit }, data) {
      //商品图片保存
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "9102080326",
         CompanyId: homeInfo.shop.COMPANYID,
         GoodsId: data.GoodsId ? data.GoodsId : "",
         Image: data.Image,
         Image1: data.Image1,
         Image2: data.Image2,
         Image3: data.Image3,
         Image4: data.Image4,
         Image5: data.Image5
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(ADD_GOODS_UPLOADIMAGE, { data });
         },
         sendData
      );
   },
   getAutoGoodCode({ commit }, data) {
      //生成商品货号
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "910135",
         CompanyId: userInfo.CompanyID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_AUTOGOODCODE, { data });
         },
         sendData
      );
   },
   editGroupInfo({ commit }, data) {
      // 商品批量修改
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "9102080323_2A",
         CompanyId: userInfo.CompanyID,
         GoodsId: data.GoodsId,
         UnitId: data.UnitId,
         TypeId: data.TypeId,
         SupperId: data.SupperId,
         Status: data.Status,
         Brand: data.Brand,
         Pyear: data.Pyear,
         Season: data.Season,
         Material: data.Material,
         Style: data.Style,
         Provenance: data.Provenance,
         IsDel: data.IsDel,
         BrandId: data.BrandId
      };
      commonSend.commonSend(
         "post",
         data => {
            commit(EDIT_GROUP_GOODS, { data });
         },
         sendData
      );
   }
};

// mutations
const mutations = {
   [GOODSLIST_INCLUDE_SINGLE](state, data) {
      state.goodsListIncludeSingleState = data.data;
   },
   [BARCODE_SCAN_GOODS](state, { data }) {
      state.barcodeScanGoodsState = data;
   },
   [EDIT_GROUP_GOODS](state, { data }) {
      state.editGroupGoodsState = data;
   },
   [GET_AUTOGOODCODE](state, { data }) {
      state.getAutoGoodCodeState = data;
   },
   [MODIFY_BARCODE](state, { data }) {
      state.modifyBarCodeState = data;
   },
   [ADD_GOODS_UNIT](state, { data }) {
      state.addGoodsUnitState = Object.assign({}, data);
   },

   [ADD_GOODS_BRAND](state, { data }) {
      state.addGoodsBrandState = Object.assign({}, data);
   },
   [ADD_GOODS_UPLOADIMAGE](state, { data }) {
      state.addImageState = Object.assign({}, data);
   },
   [GOODS_LIST](state, { data }) {
      let pageData = Object.assign({}, state.goodsListState.paying);
      if (data.success) {
         state.goodsList = [...data.data.PageData.DataArr];
         pageData = Object.assign(pageData, data.data.PageData);
      }
      state.goodsListState = Object.assign({}, data, { paying: pageData });
   },
   [GOODS_LIST2](state, { data }) {
      if (data.success) {
         state.goodsList2 = [...data.data.PageData.DataArr];
      }
      state.goodsListState2 = Object.assign({}, data);
   },
   [GOODS_LIST3](state, { data }) {
      let pageData = Object.assign({}, state.goodsListState3.paying);
      if (data.success) {
         state.goodsList3 = [...data.data.PageData.DataArr];
         pageData = Object.assign(pageData, data.data.PageData);

         let param = data.data.PageData.DataArr,
            newParam = [];
         if (param.length >= 1) {
            for (let i in param) {
               param[i].isEdit = false;
               newParam.push(param[i]);
            }
            state.OnlyOneGoodsState = newParam;
         } else {
            state.OnlyOneGoodsState = [];
         }
      }
      state.goodsListState3 = Object.assign({}, data, { paying: pageData });
   },
   [GOODS_LIST_EDIT_GROUP](state, { data }) {
      state.goodsListEditGroupState = Object.assign({}, data);
   },
   [GOODS_ITEM](state, { data }) {
      if (data.success) {
         state.goodsItem = Object.assign({}, data.data);
      }
      state.goodsState = Object.assign({}, data);
   },
   [GET_GOODS_SETMEALG](state, { data }) {
      state.goodsstemaealgState = Object.assign({}, data);
   },
   [GET_GOODS_SETMEALGSAVE](state, { data }) {
      state.goodsstemaealgsaveState = Object.assign({}, data);
   },
   [GET_GOODS_SETMEALGDETAILS](state, { data }) {
      state.goodsstemaealgdetailsState = Object.assign({}, data);
   },
   [DEAL_GOODS](state, { data }) {
      if (data.success) {
         state.goodsListState.paying.PN = 0;
      }
      state.goodsState = Object.assign({}, data);
      selected = {};
   },
   [DEL_GOODS](state, { data }) {
      state.delGoods = Object.assign({}, data);
   },
   [GOODS_EXPORTDATA](state, { data }) {
      // 导出
      state.exportGoodsState = Object.assign({}, data);
   },
   [GOODS_IMPORTDATA](state, { data }) {
      // 导入
      state.importGoodsState = Object.assign({}, data);
   },
   [GET_GOODS_INVENTORY](state, { data }) {
      let pageData = Object.assign({}, state.goodsInventoryListState.paying);
      if (data.success) {
         state.goodsInventoryList = [...data.data.PageData.DataArr];
         pageData = Object.assign(pageData, data.data.PageData);
      }
      state.goodsInventoryListState = Object.assign({}, data, { paying: pageData });
   },
   [SET_GOODS_MOVING](state, { data }) {
      state.goodsMovingState = Object.assign({}, data);
   },
   [GET_GOODS_BRAND](state, { data }) {
      state.goodsbrandState = Object.assign({}, data);
      if (data.success) {
         state.goodsbrandList = [...data.data.List];
      }
   },
   [GET_GOODS_ATTRIBUTE](state, { data }) {
      state.goodsattributeState = Object.assign({}, data);
   },
   [GET_GOODS_SUPPLIER](state, { data }) {
      state.goodssupplierState = Object.assign({}, data);
      if (data.success) {
         state.goodssupplierList = [...data.data.List];
      }
   },
   [ADD_SHOP_CATEGORY](state, { data }) {
      // 新增商品分类
      state.addGoodsCategoryState = Object.assign({}, data);
   },
   [ADD_SUPPLIER](state, { data }) {
      //新增供应商
      state.addSupplierState = Object.assign({}, data);
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
