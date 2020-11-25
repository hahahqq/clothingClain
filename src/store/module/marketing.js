/***
 *
 *优惠券
 *
 * */
import commonSend from "@/api/api";
import {
   MARKETING_LIST,
   MARKETING_ITEM,
   STOP_MARKETING_ACTION,
   DEAL_MARKETING_ACTION,
   MARKETING_LOT_LIST,
   MARKETING_SHOP_LIST2,
   GET_REGISTERGIFTS_DATA,
   GET_REGISTERGIFTS_ITEM,
   DEAL_REGISTERGIFTS,
   DEL_REGISTERGIFTS,
   SAVE_SPECIALS,
   GET_SPECIALS_LIST,
   SPECIALS_ITEM,
   DEL_SPECIALS,
   MARKETING_RECHARGE_SMSSIGN,
   MARKETING_DEL_IMG,
   MARKETING_SAVE_IMG,
   MARKETING_LIST_IMG,
   MARKETING_RECHARGE_ADD,
   MARKETING_RECHARGE_DETAILED,
   MARKETING_RECHARGE_EIT,
   MARKETING_RECHARGE_STATYS,
   MARKETING_RECHARGE_LIST,
   GET_REGISTERGIFTS_DEL,
   SET_VIPCARD_BACKGROUND,
   GET_VIPCARD_BACKGROUND,
   GET_INTEGRAL_RESET_LIST,
   DEL_INTEGRAL_RESET,
   SAVE_INTEGRAL_RESET,
   DETAIL_INTEGRAL_RESET
} from "@/store/mutation-types";
import { getUserInfo, getHomeData } from "@/api/index";

let selected = {};
var ListARR = {
   coupon: {
      title: "优惠券",
      InterfaceCode: "91020723",
      ItemCode: "91020724",
      CodeStop: "91020725",
      paying: { TotalNumber: 0, PageNumber: 0, PageSize: 20, PN: 0 },
      List: []
   },
   member: {
      InterfaceCode: "",
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      },
      List: []
   },
   sms: {
      InterfaceCode: "",
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      },
      List: []
   },
   goods: {
      title: "优惠商品",
      InterfaceCode: "91020712",
      ItemCode: "91020713",
      CodeStop: "91020714",
      paying: { TotalNumber: 0, PageNumber: 0, PageSize: 20, PN: 0 },
      List: []
   },
   promotion: {
      title: "优惠活动",
      InterfaceCode: "91020702",
      ItemCode: "91020703",
      CodeStop: "91020704",
      paying: { TotalNumber: 0, PageNumber: 0, PageSize: 20, PN: 0 },
      List: []
   }
};

// init state
const state = {
   detailIntegralResetState: {},
   saveIntegralResetState: {},
   delIntegralResetState: {},
   IntegralResetListState: {},
   marketingList: [],
   marketingListARR: Object.assign({}, ListARR),
   marketingListState: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      },
      List: []
   },
   marketingRechargeListState: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      }
   },
   marketingShopListState2: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      }
   },
   marketingState: {},
   marketingItem: {},
   dealMarketingState: {},
   marketingLotList: {},
   registerGiftsData: [],
   registerGiftsDataState: {},
   delRegisterGiftsState: {},
   dealRegisterGiftsState: {},
   registerGiftsItem: {},
   specialsDataState: {},
   delSpecialsState: {},
   specialsItemState: {},
   saveSpecialsState: {},
   marketingSmStage: {},
   marketingSaveImg: "",
   marketingDelImg: "",
   marketingListImg: [],
   ImageMaxNum: "",
   marketingRechargeDel: {},
   marketingRechargeStatus: {},
   marketingRechargeAdd: {},
   marketingRechargedetailed: [],
   marketingRechargeeit: {},
   marketingRechargeList: [],
   setVipCardBackGround: {},
   getVipCardBackGround: {}
};

// getters
const getters = {
   detailIntegralResetState: state => state.detailIntegralResetState,
   saveIntegralResetState: state => state.saveIntegralResetState,
   delIntegralResetState: state => state.delIntegralResetState,
   IntegralResetListState: state => state.IntegralResetListState,
   getVipCardBackGround: state => state.getVipCardBackGround,
   setVipCardBackGround: state => state.setVipCardBackGround,
   marketingList: state => state.marketingList,
   marketingListState: state => state.marketingListState,
   marketingLotList: state => state.marketingLotList,
   marketingState: state => state.marketingState,
   marketingItem: state => state.marketingItem,
   marketingListARR: state => state.marketingListARR,
   dealMarketingState: state => state.dealMarketingState,
   marketingShopListState2: state => state.marketingShopListState2,
   registerGiftsData: state => state.registerGiftsData,
   registerGiftsDataState: state => state.registerGiftsDataState,
   delRegisterGiftsState: state => state.delRegisterGiftsState,
   dealRegisterGiftsState: state => state.dealRegisterGiftsState,
   registerGiftsItem: state => state.registerGiftsItem,
   saveSpecialsState: state => state.saveSpecialsState,
   specialsItemState: state => state.specialsItemState,
   delSpecialsState: state => state.delSpecialsState,
   specialsDataState: state => state.specialsDataState,
   marketingSmStage: state => state.marketingSmStage,
   marketingSaveImg: state => state.marketingSaveImg,
   marketingDelImg: state => state.marketingDelImg,
   marketingListImg: state => state.marketingListImg,
   ImageMaxNum: state => state.ImageMaxNum,
   marketingRechargeAdd: state => state.marketingRechargeAdd,
   marketingRechargedetailed: state => state.marketingRechargedetailed,
   marketingRechargeeit: state => state.marketingRechargeeit,
   marketingRechargeDel: state => state.marketingRechargeDel,
   marketingRechargeStatus: state => state.marketingRechargeStatus,
   marketingRechargeList: state => state.marketingRechargeList,
   marketingRechargeListState: state => state.marketingRechargeListState
};

// actions
const actions = {
   getMarketingList({ commit }, { obj, data }) {
      //
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: state.marketingListARR[obj].InterfaceCode,
         CompanyId: userInfo.CompanyID,
         IsValid: data.IsValid, // -1=全部，0=有效，1=失效。APP后台传入-1，微信公从号传入0
         PN: data.PN ? data.PN : 1
      };
      selected.obj = obj;
      commonSend.commonSend(
         "get",
         data => {
            commit(MARKETING_LIST, { data });
         },
         sendData
      );
   },

   getMarketingShopList2({ commit, state }, data) {
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "601020823_02",
         CompanyId: homeInfo.shop.COMPANYID,
         IsValid: data.IsValid ? data.IsValid : 0, // -1=全部，0=有效，1=失效。APP后台传入-1，微信公从号传入0
         PN: data.PN ? data.PN : 1,
         IsLitmitVip: 0
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(MARKETING_SHOP_LIST2, { data });
         },
         sendData
      );
   },
   getMarketingLotList({ commit }, data) {
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "601020821_02",
         CompanyId: homeInfo.shop.COMPANYID,
         BillIdList: data.couponList,
         LitmitVipList: data.selMember,
         IsSMS: data.IsSMS
      };
      commonSend.commonSend(
         "post",
         data => {
            commit(MARKETING_LOT_LIST, { data });
         },
         sendData
      );
   },
   setMarketingList({ commit, state }, obj) {
      let pageData = state.marketingListARR[obj].paying;
      state.marketingList = [...state.marketingListARR[obj].List];
      state.marketingListState = Object.assign(
         { message: "操作成功", success: true },
         { paying: pageData }
      );
   },
   getMarketingItem({ commit }, { obj, data }) {
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: state.marketingListARR[obj].ItemCode,
         CompanyId: homeInfo.shop.COMPANYID,
         BillId: data.BILLID
      };
      selected.obj = obj;
      commonSend.commonSend(
         "get",
         data => {
            commit(MARKETING_ITEM, { data });
         },
         sendData
      );
   },
   stopMarketingAction({ commit, state }, { obj, data }) {
      //
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: state.marketingListARR[obj].CodeStop,
         CompanyId: homeInfo.shop.COMPANYID,
         BillId: data.BILLID
      };
      selected.obj = obj;
      commonSend.commonSend(
         "get",
         data => {
            commit(STOP_MARKETING_ACTION, { data });
         },
         sendData
      );
   },
   dealPromotionAction({ commit, state }, { type, data }) {
      //发布优惠活动, 新增和编辑
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "",
         CompanyId: homeInfo.shop.COMPANYID,
         ImgName: data.ImgName,
         Caption: data.Caption,
         Remark1: data.Remark1,
         Remark2: data.Remark2,
         Remark3: data.Remark3,
         BeginDate: data.BeginDate,
         EndDate: data.EndDate,
         Tel: data.Tel,
         Address: data.Address,
         ShopList: data.ShopList //为空=适用全部，多个店铺用逗号分隔(15925,15926),默认为空
      };
      switch (type) {
         case "add":
            sendData.InterfaceCode = "91020701";
            break;
         case "edit":
            sendData.InterfaceCode = "91020705";
            sendData.BillId = data.BillId;
            break;
         // case 'del': break;
      }
      commonSend.commonSend(
         "get",
         data => {
            commit(DEAL_MARKETING_ACTION, { data });
         },
         sendData
      );
   },
   dealcouponAction({ commit }, { type, data }) {
      //发行优惠券, 新增和编辑
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020721",
         CompanyId: homeInfo.shop.COMPANYID,
         ImgName: data.ImgName,
         ShopList: data.ShopList,
         Money: data.Money,
         Qty: data.Qty,
         Remark: data.Remark,
         BeginDate: data.BeginDate,
         EndDate: data.EndDate,
         Tel: data.Tel,
         Address: data.Address,
         LimitMoney: data.LimitMoney ? data.LimitMoney : 1000
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(DEAL_MARKETING_ACTION, { data });
         },
         sendData
      );
   },
   dealGoodsAction({ commit, state }, { type, data }) {
      //发布优惠商品, 新增和编辑
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "",
         CompanyId: homeInfo.shop.COMPANYID,
         ImgName: data.ImgName,
         GoodsId: data.GoodsId,
         Price: data.Price,
         DisPrice: data.DisPrice,
         GoodsBrand: data.GoodsBrand,
         GoodsRemark: data.GoodsRemark,
         BeginDate: data.BeginDate,
         EndDate: data.EndDate,
         Tel: data.Tel,
         Address: data.Address,
         ShopList: data.ShopList //为空=适用全部，多个店铺用逗号分隔(15925,15926),默认为空
      };
      switch (type) {
         case "add":
            sendData.InterfaceCode = "91020711";
            break;
         case "edit":
            sendData.InterfaceCode = "91020715";
            sendData.BillId = data.BillId;
            break;
         // case 'del': break;
      }
      commonSend.commonSend(
         "get",
         data => {
            commit(DEAL_MARKETING_ACTION, { data });
         },
         sendData
      );
   },
   dealPromotionAction({ commit }, { type, data }) {
      //发布优惠活动, 新增和编辑
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "",
         CompanyId: homeInfo.shop.COMPANYID,
         ImgName: data.ImgName,
         Caption: data.Caption,
         Remark1: data.Remark1,
         Remark2: data.Remark2,
         Remark3: data.Remark3,
         BeginDate: data.BeginDate,
         EndDate: data.EndDate,
         Tel: data.Tel,
         Address: data.Address,
         ShopList: data.ShopList, //为空=适用全部，多个店铺用逗号分隔(15925,15926),默认为空
         TextColor: data.TextColor
      };
      switch (type) {
         case "add":
            sendData.InterfaceCode = "91020701";
            break;
         case "edit":
            sendData.InterfaceCode = "91020705";
            sendData.BillId = data.BillId;
            break;
         // case 'del': break;
      }
      commonSend.commonSend(
         "get",
         data => {
            commit(DEAL_MARKETING_ACTION, { data });
         },
         sendData
      );
   },
   clearMarketingData({ state }, type) {
      switch (type) {
         case 1:
            break;
         case 2:
            state.marketingItem = {};
            break;
         default:
            state.marketingList = [];
            state.marketingListARR = Object.assign({}, ListARR);
            state.marketingListState = {
               paying: {
                  TotalNumber: 0,
                  PageNumber: 0,
                  PageSize: 20,
                  PN: 0
               },
               List: []
            };
            state.marketingState = {};
            state.marketingItem = {};
      }
   },
   addMCoyponAction({ commit }, { type, data }) {
      //发行定向优惠券
      console.log(data);
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020721_01",
         CompanyId: homeInfo.shop.COMPANYID,
         ImgName: data.ImgName,
         ShopList: data.ShopList,
         Money: data.Money,
         Qty: data.Qty,
         Remark: data.Remark,
         BeginDate: data.BeginDate,
         EndDate: data.EndDate,
         Address: data.Address,
         LimitMoney: data.LimitMoney ? data.LimitMoney : 0,
         IsLitmitVip: data.IsLitmitVip,
         LitmitVipList: data.LitmitVipList,
         IsSMS: data.IsSMS
      };
      commonSend.commonSend(
         "post",
         data => {
            commit(DEAL_MARKETING_ACTION, { data });
         },
         sendData
      );
   },
   setSMSAction({ commit }, data) {
      // 短信群发
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020731",
         CompanyId: homeInfo.shop.COMPANYID,
         MobileList: data.MobileList,
         SmsRemark: data.SmsRemark,
         AllVip: data.AllVip
      };
      commonSend.commonSend(
         "post",
         data => {
            commit(DEAL_MARKETING_ACTION, { data });
         },
         sendData
      );
   },
   getSmsSign({ commit }, data) {
      // 获取短信签名
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "910106",
         Companyid: userInfo.CompanyID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(MARKETING_RECHARGE_SMSSIGN, { data });
         },
         sendData
      );
   },
   clearMarketingAll({ state }) {
      state.marketingList = [];
      state.marketingListARR = Object.assign({}, ListARR);
      state.marketingListState.paying.PN = 0;
      state.marketingItem = {};
   },
   getRegisterGiftsData({ commit }, data) {
      // 注册有礼列表
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020762",
         CompanyId: homeInfo.shop.COMPANYID,
         Filter: data.Filter,
         BeginDate: data.BeginDate,
         EndDate: data.EndDate,
         PN: data.PN
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_REGISTERGIFTS_DATA, { data });
         },
         sendData
      );
   },
   DealRegisterGifts({ commit }, { type, data }) {
      // 注册有礼修改、发布
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020761",
         CompanyId: homeInfo.shop.COMPANYID,
         Name: data.Name,
         BeginDate: data.BeginDate,
         EndDate: data.EndDate,
         IsStart: data.IsStart,
         IsSendIntegtal: data.IsSendIntegtal,
         Integtal: data.Integtal,
         IsSendMoney: data.IsSendMoney,
         Money: data.Money,
         IsSendCoupon: data.IsSendCoupon,
         CouponList: data.CouponList,
         Remark: data.Remark
      };
      if (type == "edit") {
         sendData.InterfaceCode = "91020763";
         sendData.Id = data.Id;
      }
      commonSend.commonSend(
         "post",
         data => {
            commit(DEAL_REGISTERGIFTS, { data });
         },
         sendData
      );
   },
   getRegisterGiftsItem({ commit }, data) {
      // 注册有礼详情
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020764",
         CompanyId: homeInfo.shop.COMPANYID,
         Id: data.Id
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_REGISTERGIFTS_ITEM, { data });
         },
         sendData
      );
   },
   delRegisterGiffs({ commit }, data) {
      // 注册有礼删除
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020765",
         CompanyId: homeInfo.shop.COMPANYID,
         Id: data.Id
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(DEL_REGISTERGIFTS, { data });
         },
         sendData
      );
   },
   saveSpecials({ commit }, data) {
      // 保存限时特价
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020781",
         CompanyId: homeInfo.shop.COMPANYID,
         Name: data.Name,
         BeginDate: data.BeginDate,
         EndDate: data.EndDate,
         IsStart: data.IsStart,
         GoodsList: data.GoodsList,
         Remark: data.Remark,
         ShopIdList: data.ShopIdList,
         ShopNameList: data.ShopNameList,
         IsVipDiscount: data.IsVipDiscount,
         BillId: data.BillId
      };
      commonSend.commonSend(
         "post",
         data => {
            commit(SAVE_SPECIALS, { data });
         },
         sendData
      );
   },
   getSpecialsList({ commit }, data) {
      // 限时特价列表
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020782",
         CompanyId: homeInfo.shop.COMPANYID,
         PN: data.PN,
         Filter: data.Filter,
         IsValid: data.IsValid
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_SPECIALS_LIST, { data });
         },
         sendData
      );
   },

   getSpecialsItem({ commit }, data) {
      // 限时特价详情
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020783",
         ShopId: homeInfo.shop.ID,
         CompanyId: homeInfo.shop.COMPANYID,
         BillId: data.BillId
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(SPECIALS_ITEM, { data });
         },
         sendData
      );
   },
   delSpecials({ commit }, data) {
      // 限时特价删除
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020785",
         CompanyId: homeInfo.shop.COMPANYID,
         BillId: data.BillId
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(DEL_SPECIALS, { data });
         },
         sendData
      );
   },
   getMarketingListImg({ commit }, data) {
      // 背景列表
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "9102011102",
         CompanyId: homeInfo.shop.COMPANYID,
         Type: data.Type
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(MARKETING_LIST_IMG, { data });
         },
         sendData
      );
   },
   getMarketingSaveImg({ commit, state }, data) {
      // 背景保存(仅允许修改主图以及缩略图)
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "9102011101",
         Id: data.Id ? data.Id : "",
         Image: data.Image,
         SmallImage: data.SmallImage,
         CompanyId: homeInfo.shop.COMPANYID,
         Type: 0,
         ImageNum: data.ImageNum
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(MARKETING_SAVE_IMG, { data });
         },
         sendData
      );
   },
   delImg({ commit }, data) {
      // 删除背景图片
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "9102011103",
         CompanyId: homeInfo.shop.COMPANYID,
         Id: data.id
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(MARKETING_DEL_IMG, { data });
         },
         sendData
      );
   },
   getMarketingRechargeList({ commit, state }, data) {
      //充值赠送有礼列表
      let homeInfo = getHomeData();
      let pn = parseInt(state.marketingRechargeListState.paying.PN) + 1;
      let sendData = {
         InterfaceCode: 91020772,
         CompanyId: homeInfo.shop.COMPANYID,
         IsValid: data.IsValid, // -1=全部，0=有效，1=失效。APP后台传入-1，微信公从号传入0
         PN: data.PN ? data.PN : pn,
         Filter: data.Filter
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(MARKETING_RECHARGE_LIST, { data });
         },
         sendData
      );
   },
   getMarketingRechargeDetailed({ commit, state }, data) {
      //充值赠送有礼详细
      let userInfo = getUserInfo();
      let pn = parseInt(state.marketingRechargeListState.paying.PN) + 1;
      let sendData = {
         InterfaceCode: 91020774,
         CompanyId: userInfo.CompanyID,
         Id: data
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(MARKETING_RECHARGE_DETAILED, { data });
         },
         sendData
      );
   },
   getMarketingRechargeStatus({ commit }, data) {
      // 充值有礼状态
      let userInfo = getUserInfo();
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: 91020776,
         CompanyId: userInfo.CompanyID,
         ShopId: homeInfo.shop.ID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(MARKETING_RECHARGE_STATYS, { data });
         },
         sendData
      );
   },
   getMarketingRechargeAdd({ commit }, data) {
      // 发布充值有礼
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: 91020771,
         CompanyId: userInfo.CompanyID,
         Name: data.data.Name,
         BeginDate: data.data.BeginDate,
         EndDate: data.data.EndDate,
         IsStart: data.data.IsStart,
         IsDouble: data.data.IsDouble,
         GiftList: data.data.GiftList,
         ShopList: data.data.ShopList,
         ShopName: data.data.ShopName
      };
      commonSend.commonSend(
         "post",
         data => {
            commit(MARKETING_RECHARGE_ADD, { data });
         },
         sendData
      );
   },
   getMarketingRechargeEit({ commit }, data) {
      // 活动充值修改
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: 91020773,
         CompanyId: userInfo.CompanyID,
         Name: data.data.Name,
         BeginDate: data.data.BeginDate,
         EndDate: data.data.EndDate,
         IsStart: data.data.IsStart,
         GiftList: data.data.GiftList,
         Remark: "",
         Id: data.data.Id,
         ShopList: data.data.ShopList,
         ShopName: data.data.ShopName
      };
      commonSend.commonSend(
         "post",
         data => {
            commit(MARKETING_RECHARGE_EIT, { data });
         },
         sendData
      );
   },
   getMarketingRechargeDel({ commit }, data) {
      // 活动充值删除
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: 91020775,
         CompanyId: userInfo.CompanyID,
         Id: data
      };
      commonSend.commonSend(
         "post",
         data => {
            commit(GET_REGISTERGIFTS_DEL, { data });
         },
         sendData
      );
   },
   setVipCardBg({ commit }, data) {
      // 会员卡设置
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "91020251",
         CompanyId: userInfo.CompanyID,
         Name: data.Name,
         LevelId: data.LevelId,
         Color: data.Color,
         Explain: data.Explain,
         Image: data.ImgName
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(SET_VIPCARD_BACKGROUND, { data });
         },
         sendData
      );
   },
   getVipCardBg({ commit }, data) {
      // 获取会员卡信息
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "91020252",
         CompanyId: userInfo.CompanyID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_VIPCARD_BACKGROUND, { data });
         },
         sendData
      );
   },
   getIntegralResetList({ commit }, data) {
      // 积分清零列表
      let userInfo = getUserInfo();
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020261",
         CompanyId: userInfo.CompanyID,
         ShopId: homeInfo.shop.ID,
         PN: data.PN
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_INTEGRAL_RESET_LIST, { data });
         },
         sendData
      );
   },
   delIntegralReset({ commit }, data) {
      // 积分清零删除
      let userInfo = getUserInfo();
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020264",
         CompanyId: userInfo.CompanyID,
         ShopId: homeInfo.shop.ID,
         IsSms: data.IsSms,
         IsWeChat: data.IsWeChat,
         BillId: data.BillId
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(DEL_INTEGRAL_RESET, { data });
         },
         sendData
      );
   },
   saveIntegralReset({ commit }, data) {
      // 积分清零保存
      let userInfo = getUserInfo();
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020262",
         CompanyId: userInfo.CompanyID,
         ShopId: homeInfo.shop.ID,
         Remark: data.Remark,
         IsSms: data.IsSms ? 1 : 0,
         IsWeChat: data.IsWeChat ? 1 : 0,
         AllVip: data.AllVip ? 1 : 0,
         VipId: data.VipId
      };
      commonSend.commonSend(
         "post",
         data => {
            commit(SAVE_INTEGRAL_RESET, { data });
         },
         sendData
      );
   },
   detailIntegralReset({ commit }, data) {
      // 积分清零详情
      let userInfo = getUserInfo();
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020263",
         CompanyId: userInfo.CompanyID,
         ShopId: homeInfo.shop.ID,
         PN: data.PN,
         BillId: data.BillId
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(DETAIL_INTEGRAL_RESET, { data });
         },
         sendData
      );
   }
};

const mutations = {
   [DETAIL_INTEGRAL_RESET](state, { data }) {
      state.detailIntegralResetState = data;
   },
   [SAVE_INTEGRAL_RESET](state, { data }) {
      state.saveIntegralResetState = data;
   },
   [DEL_INTEGRAL_RESET](state, { data }) {
      state.delIntegralResetState = data;
   },
   [GET_INTEGRAL_RESET_LIST](state, { data }) {
      state.IntegralResetListState = data;
   },
   [GET_VIPCARD_BACKGROUND](state, { data }) {
      state.getVipCardBackGround = data;
   },
   [SET_VIPCARD_BACKGROUND](state, { data }) {
      state.setVipCardBackGround = data;
   },
   [MARKETING_SHOP_LIST2](state, { data }) {
      let pageData = Object.assign({}, state.marketingShopListState2.paying);
      if (data.success) {
         pageData = Object.assign(pageData, data.data.PageData);
         state.marketingShopListState2 = Object.assign({}, pageData, data.data.CouponCount);
      }
   },
   [MARKETING_LIST](state, { data }) {
      let pageData = Object.assign({}, state.marketingListState.paying);
      if (data.success) {
         state.marketingList = [...data.data.PageData.DataArr];
         pageData = Object.assign(pageData, data.data.PageData);
         state.marketingListARR[selected.obj].paying = Object.assign({}, pageData);
         state.marketingListARR[selected.obj].List = [...state.marketingList];
      }
      state.marketingListState = Object.assign({}, data, {
         paying: pageData,
         List: state.marketingList
      });
   },
   [GET_REGISTERGIFTS_DATA](state, { data }) {
      // 注册有礼列表
      if (data.success) {
         state.registerGiftsData = data.data.PageData.DataArr;
      }
      state.registerGiftsDataState = data.data;
   },
   [GET_REGISTERGIFTS_ITEM](state, { data }) {
      state.registerGiftsItem = data;
   },
   [DEAL_REGISTERGIFTS](state, { data }) {
      state.dealRegisterGiftsState = data;
   },
   [DEL_REGISTERGIFTS](state, { data }) {
      state.delRegisterGiftsState = data;
   },
   [MARKETING_LOT_LIST](state, { data }) {
      state.marketingLotList = Object.assign({}, data);
   },
   [MARKETING_ITEM](state, { data }) {
      if (data.success) {
         state.marketingItem = Object.assign({}, data.data.obj);
      }
      state.marketingState = Object.assign({}, state.marketingState, data);
      selected = {};
   },
   [STOP_MARKETING_ACTION](state, { data }) {
      if (data.success) {
         state.marketingListState.paying.PN = 0;
      }
      state.marketingState = Object.assign({}, data);
      selected = {};
   },
   [DEAL_MARKETING_ACTION](state, { data }) {
      state.dealMarketingState = Object.assign({}, data);
   },
   [SAVE_SPECIALS](state, { data }) {
      state.saveSpecialsState = data;
   },
   [GET_SPECIALS_LIST](state, { data }) {
      if (data.success) {
         state.specialsDataState = data.data.PageData;
      }
   },
   [SPECIALS_ITEM](state, { data }) {
      state.specialsItemState = data;
   },
   [DEL_SPECIALS](state, { data }) {
      state.delSpecialsState = data;
   },
   [MARKETING_RECHARGE_SMSSIGN](state, { data }) {
      state.marketingSmStage = Object.assign({}, data.data);
   },
   [MARKETING_LIST_IMG](state, { data }) {
      if (data.success) {
         state.marketingListImg = [...data.data.List];
         state.ImageMaxNum = data.data.ImageMaxNum;
      }
   },
   [MARKETING_SAVE_IMG](state, { data }) {
      if (data.success) {
         state.marketingSaveImg = Object.assign({}, data);
      }
   },
   [MARKETING_DEL_IMG](state, { data }) {
      state.marketingDelImg = data;
   },
   [MARKETING_RECHARGE_LIST](state, { data }) {
      let pageData = Object.assign({}, state.marketingRechargeListState.paying);
      if (data.success) {
         state.marketingRechargeList = [...data.data.PageData.DataArr];
         pageData = Object.assign(pageData, data.data.PageData);
      }
      state.marketingRechargeListState = Object.assign({}, data, { paying: pageData });
   },
   [MARKETING_RECHARGE_DETAILED](state, { data }) {
      if (data.success) {
         state.marketingRechargedetailed = Object.assign({}, data);
      }
   },
   [MARKETING_RECHARGE_STATYS](state, { data }) {
      if (data.success) {
         state.marketingRechargeStatus = Object.assign({}, data);
      }
   },
   [GET_REGISTERGIFTS_DEL](state, { data }) {
      if (data.success) {
         state.marketingRechargeDel = Object.assign({}, data);
      }
   },
   [MARKETING_RECHARGE_ADD](state, { data }) {
      state.marketingRechargeAdd = Object.assign({}, data);
   },
   [MARKETING_RECHARGE_EIT](state, { data }) {
      state.marketingRechargeeit = Object.assign({}, data);
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
