/**
 * 会员
 *
 * ***/

import commonSend from "@/api/api";
import {
   MEMBER_LIST,
   MEMBER_LISTALL,
   MEMBER_ITEM,
   MEMBER_ITEM2,
   ADD_MEMEBER,
   EDIT_MEMEBER,
   SET_REPORTLOSS,
   GET_MEMBER_LEVEL,
   GET_MEMBER_EXPORTDATA,
   MEMBER_IMPORTDATA,
   GET_MEMBER_SPENDING,
   GET_MEMBER_BALANCE,
   GET_MEMBER_INTEGRAL,
   GET_MEMBER_ARREARS,
   GET_MEMBER_FLAG,
   REPAY_MEMBER_ARREARS,
   GET_MEMBER_COUNT,
   MEMBER_MOENY_REPORT,
   GET_AUTOVIPCODE,
   GET_MEMBER_BIRTHDAY,
   GET_MEMBER_VALIDITY,
   DEL_MEMBER,
   MODIFY_VIP_PASSWD
} from "@/store/mutation-types";
import { getUserInfo, getHomeData } from "@/api/index";
import home from "./home";
let selected = {};
// init state
const state = {
   memberCount: {},
   memberState: {},
   memberState2: {},
   memberListState: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      }
   },
   memberList: [],
   memberListAll: [],
   memberItem: { profile: {}, info: {} },
   reportLossState: {}, // 挂失
   memberLevelList: [],
   exportMemberState: {},
   importMemberState: {},
   memberSpendingState: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      },
      List: []
   },
   memberBalanceState: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      },
      List: []
   },
   memberIntegralState: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      },
      List: []
   },
   memberArrearsState: {
      paying: {
         TotalNumber: 0,
         PageNumber: 0,
         PageSize: 20,
         PN: 0
      },
      List: []
   },
   repayMemberArrears: {},
   memberFlagList: [],
   selmember: {},
   selmemberArr: [],
   dealMemberState: {},
   memberListAllState: {},
   memberMoneyReport: {},
   getAutoVipCodeState: {},
   memberbrithday: {},
   memberValidityState: {},
   delMember: {},
   isAllMember: false,
   modifyVipPasswdState: {}
};

// getters
const getters = {
   isAllMember: state => state.isAllMember,
   getAutoVipCodeState: state => state.getAutoVipCodeState,
   memberMoneyReport: state => state.memberMoneyReport,
   memberCount: state => state.memberCount,
   memberState: state => state.memberState,
   memberState2: state => state.memberState2,
   memberListState: state => state.memberListState,
   memberList: state => state.memberList,
   memberListAll: state => state.memberListAll,
   memberItem: state => state.memberItem,
   memberbrithday: state => state.memberbrithday,
   memberItemInfo: getters => {
      return getters.memberItem.info;
   },
   memberItemProfile: (state, getters) => {
      return state.memberItem.profile;
   },
   reportLossState: state => state.reportLossState,
   memberLevelList: state => state.memberLevelList,
   exportMemberState: state => state.exportMemberState,
   importMemberState: state => state.importMemberState,
   memberSpendingState: state => state.memberSpendingState,
   memberSpendingList: state => {
      return state.memberSpendingState.List ? [...state.memberSpendingState.List] : [];
   },
   memberBalanceState: state => state.memberBalanceState,
   memberBalanceList: state => {
      return state.memberBalanceState.List ? [...state.memberBalanceState.List] : [];
   },
   memberIntegralState: state => state.memberIntegralState,
   memberIntegralList: state => {
      return state.memberIntegralState.List ? [...state.memberIntegralState.List] : [];
   },
   memberArrearsState: state => state.memberArrearsState,
   memberArrearsList: state => {
      return state.memberArrearsState.List ? [...state.memberArrearsState.List] : [];
   },

   repayMemberArrears: state => state.repayMemberArrears,
   memberFlagList: state => state.memberFlagList,
   selmember: state => state.selmember,
   selmemberArr: state => state.selmemberArr,
   dealMemberState: state => state.dealMemberState,
   memberListAllState: state => state.memberListAllState,
   memberValidityState: state => state.memberValidityState,
   delMember: state => state.delMember,
   modifyVipPasswdState: state => state.modifyVipPasswdState
};

// actions
const actions = {
   getMemberList({ commit, state }, data) {
      // 会员列表 ， 分页
      console.log(data);
      let homeInfo = getHomeData();
      // let shopId = data.ShopId == '' ? '' : homeInfo.shop.ID
      let sendData = Object.assign({}, data, {
         InterfaceCode: "91020203",
         Filter: data.Filter ? data.Filter : "",
         ShopId: data.ShopId,
         VipFlag: data.VipFlag ? data.VipFlag : "",
         LevelName: data.LevelName ? data.LevelName : "",
         birthday: data.birthday ? data.birthday : -1,
         PayCount: data.PayCount ? data.PayCount : -1,
         LossVip: data.LossVip ? data.LossVip : -1,
         PN: data.PN ? data.PN : 1,
         Status: data.Status ? data.Status : -1, // -1=全部,0=正常，2=挂失
         CompanyId: homeInfo.shop.COMPANYID,
         ShowMoney: 0, // 0=全部,1=余额大于0
         OweMoney: 0 // 0=全部,1=余额大于0
      });
      commonSend.commonSend(
         "get",
         data => {
            commit(MEMBER_LIST, { data });
         },
         sendData
      );
   },
   getMemeberMonerReport({ commit }, data) {
      //余额积分统计
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91031041",
         VipCode: data.VipCode,
         PN: data.PN,
         CompanyId: homeInfo.shop.COMPANYID,
         ShopId: data.ShopId
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(MEMBER_MOENY_REPORT, { data });
         },
         sendData
      );
   },
   getMemberListAll({ commit, state }, data) {
      //会员列表 ， 不分页
      let homeInfo = getHomeData();
      let sendData = Object.assign({}, data, {
         InterfaceCode: "91020203_1",
         Filter: data.Filter ? data.Filter : "",
         // 'ShopId': data.ShopId?data.ShopId:homeInfo.shop.ID,
         ShopId: data.ShopId,
         VipFlag: data.VipFlag ? data.VipFlag : "",
         LevelName: data.LevelName ? data.LevelName : "",
         birthday: -1,
         PayCount: -1,
         LossVip: -1,
         Status: data.Status ? data.Status : -1, // -1=全部,0=正常，2=挂失
         CompanyId: homeInfo.shop.COMPANYID,
         ShowMoney: 0, // 0=全部,1=余额大于0
         OweMoney: 0 // 0=全部,1=余额大于0
      });
      commonSend.commonSend(
         "get",
         data => {
            commit(MEMBER_LISTALL, { data });
         },
         sendData
      );
   },
   getMemberItem({ commit, state }, item) {
      // NAME 必须传
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020205",
         ID: item.ID,
         CompanyId: homeInfo.shop.COMPANYID
      };
      state.memberItem.info = Object.assign({}, item);

      commonSend.commonSend(
         "get",
         data => {
            commit(MEMBER_ITEM, { data });
         },
         sendData
      );
   },
   getMemberItem2({ commit, state }, item) {
      //会员消费
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020213",
         VipId: item.ID,
         CompanyId: homeInfo.shop.COMPANYID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(MEMBER_ITEM2, { data });
         },
         sendData
      );
   },
   setReportLoss({ commit }, data) {
      //会员卡挂失
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020208",
         ShopId: homeInfo.shop.ID,
         VipId: data.id,
         Type: data.Type, // 0=挂失 1=取消挂失
         IsSms: 0,
         CompanyId: homeInfo.shop.COMPANYID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(SET_REPORTLOSS, { data });
         },
         sendData
      );
   },
   getMemberDel({ commit }, data) {
      // 会员卡删除
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020204",
         ShopId: homeInfo.shop.ID,
         VipId: data.ID,
         CompanyId: homeInfo.shop.COMPANYID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(DEL_MEMBER, { data });
         },
         sendData
      );
   },
   setReportLossAfter({ commit, state }, array) {
      let arr = [...array],
         list = [...state.memberList];
      for (let i = 0; i < arr.legnth; i++) {
         let index = list.findIndex(obj => Object.is(parseInt(arr[i].ID), parseInt(obj.ID)));
         list[index].STATUS = 0;
      }
      state.memberList = [...list];
   },
   addNewMember({ commit, state }, data) {
      //手动添加会员 ( 增加注册有礼 )
      let homeInfo = getHomeData();
      let sendData = Object.assign(
         {
            // 'InterfaceCode':'91020201',
            InterfaceCode: "91020201A",
            Code: data.Code,
            Name: data.Name,
            Sex: data.Sex,
            PhoneNo: data.PhoneNo,
            LevelId: data.LevelId,
            BirthDate: data.BirthDate ? data.BirthDate : 0,
            VipFlag: data.VipFlag,
            ShopID: homeInfo.shop.ID,
            Passwd: data.Passwd,
            Address: data.Address,
            EMail: data.EMail ? data.EMail : "",
            Remark: data.Remark,
            CompanyId: homeInfo.shop.COMPANYID,
            InvalidDate: data.InvalidDate ? new Date(data.InvalidDate).getTime() : 0,
            Height: data.Height ? parseInt(data.Height) : 0,
            Weight: data.Weight ? parseInt(data.Weight) : 0,
            SaleEmpId: data.SaleEmpId,
            ShareVipId: "",
            FormMode: "",
            IsUsePassWd: data.IsUsePassWd ? 1 : 0, // 0=不启用，1=启用
            PayTypeId: "",
            SaleEmpMoney: ""
         },
         data
      );
      commonSend.commonSend(
         "get",
         data => {
            commit(ADD_MEMEBER, { data });
         },
         sendData
      );
   },
   editTheMember({ commit, state }, data) {
      //会员信息修改
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020206",
         VipID: data.id,
         VipCode: data.Code,
         VipName: data.Name,
         MobileNo: data.PhoneNo,
         Sex: data.Sex,
         ShopID: homeInfo.shop.ID,
         BirthDate: data.BirthDate ? data.BirthDate : 0,
         InvalidDate: data.InvalidDate,
         LevelID: data.LevelId,
         Password: data.Passwd,
         Status: data.STATUS ? data.STATUS : 0, // 0-正常 1-停用 2-挂失 3-换卡
         ShareVipID: "",
         SaleEmpIDL: "",
         address: data.Address,
         EMail: data.EMail ? data.EMail : "",
         Remark: data.Remark,
         VipFlag: data.VipFlag,
         IsUsePassWd: data.IsUsePassWd ? 1 : 0, // 0=不启用，1=启用
         Height: data.Height ? parseInt(data.Height) : 0,
         Weight: data.Weight ? parseInt(data.Weight) : 0,
         formmode: ""
      };
      selected = Object.assign({}, sendData);
      commonSend.commonSend(
         "get",
         data => {
            commit(EDIT_MEMEBER, { data });
         },
         sendData
      );
   },
   getMemberLevel({ commit }) {
      // 会员级别
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "9102010801",
         CompanyId: homeInfo.shop.COMPANYID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_MEMBER_LEVEL, { data });
         },
         sendData
      );
   },
   modifyPassWord({ commit }, data) {
      let sendData = {
         InterfaceCode: "91020207",
         VipId: data.VipId,
         Md5Pass: data.Md5Pass,
         IsUsePasswd: data.IsUsePasswd
      };
      commonSend.commonSend(
         "post",
         data => {
            commit(MODIFY_VIP_PASSWD, { data });
         },
         sendData
      );
   },
   getImportMemberData({ commit }, arr) {
      // 导入
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020203_2",
         CompanyId: homeInfo.shop.COMPANYID,
         ShopID: homeInfo.shop.ID,
         List: arr
      };
      commonSend.commonSend(
         "post",
         data => {
            commit(MEMBER_IMPORTDATA, { data });
         },
         sendData
      );
   },
   getMemberSpending({ commit }, item) {
      // 会员消费
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020211",
         VipId: item.ID,
         PN: item.PN ? item.PN : 1,
         CompanyId: homeInfo.shop.COMPANYID,
         ShopId: homeInfo.shop.ID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_MEMBER_SPENDING, { data });
         },
         sendData
      );
   },
   getMemberBalance({ commit }, item) {
      //  余额对帐明细
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020215",
         VipId: item.ID,
         PN: item.PN ? item.PN : 1,
         CompanyId: homeInfo.shop.COMPANYID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_MEMBER_BALANCE, { data });
         },
         sendData
      );
   },
   getMemberIntegral({ commit }, item) {
      //  积分对帐明细
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020216",
         VipId: item.ID,
         PN: item.PN ? item.PN : 1,
         CompanyId: homeInfo.shop.COMPANYID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_MEMBER_INTEGRAL, { data });
         },
         sendData
      );
   },
   getMemberArrears({ commit }, item) {
      //  会员还款记录
      let sendData = {
         InterfaceCode: "91020227",
         VipId: item.ID,
         PN: item.PN ? item.PN : 1
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_MEMBER_ARREARS, { data });
         },
         sendData
      );
   },
   repayMemberArrears({ commit }, data) {
      // 会员还款保存
      let sendData = {
         InterfaceCode: "91020228",
         ShopId: data.ShopId,
         VipId: data.VipId,
         Money: data.Money ? data.Money : 0,
         PayTypeId: data.PayTypeId, // 还款方式ID
         Remark: data.Remark ? data.Remark : ""
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(REPAY_MEMBER_ARREARS, { data });
         },
         sendData
      );
   },
   cancelMemberArrears({ commit }, data) {
      // 会员还款作废
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "91020229",
         CompanyId: userInfo.CompanyID,
         BillId: data.BillId
      };
   },
   getMemberFlag({ commit }) {
      //  会员标况列表
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_MEMBER_FLAG, { data });
         },
         { InterfaceCode: "91020202" }
      );
   },
   selectingMember({ state }, { isArr, data }) {
      if (isArr) {
         state.selmemberArr = [...data];
         state.isAllMember = true;
      } else {
         state.selmember = Object.assign({}, data);
         state.isAllMember = false;
      }

      console.log(this.selmemberArr);
   },
   clearMemberList({ state }) {
      state.memberListState.paying.PN = 0;
      state.memberList = [];
   },
   clearMember({ state }, index) {
      switch (index) {
         case 1:
            state.memberItem = { profile: {}, info: {} };
            break;
         case 2:
            state.memberLevelList = [];
            break;
         case 3:
            state.memberSpendingState.paying.PN = 0;
            state.memberSpendingState.List = [];
            break;
         case 4:
            state.memberBalanceState.paying.PN = 0;
            state.memberBalanceState.List = [];
            break;
         case 5:
            state.memberIntegralState.paying.PN = 0;
            state.memberIntegralState.List = [];
            break;
         case 6: // 欠款记录
            state.memberArrearsState.paying.PN = 0;
            state.memberArrearsState.List = [];
            state.repayMemberArrears = {};
            break;
         case 7:
            state.memberFlagList = [];
            break;
         case 8:
            state.selmember = {};
            state.selmemberArr = [];
            break;
         default:
            state.memberListState.paying.PN = 0;
            state.memberList = [];
      }
   },
   clearMemberAll({ state }) {
      state.memberListState.paying.PN = 0;
      state.memberList = [];
      state.memberItem = { profile: {}, info: {} };
      state.memberLevelList = [];
      state.memberSpendingState.paying.PN = 0;
      state.memberBalanceState.paying.PN = 0;
      state.memberIntegralState.paying.PN = 0;
      state.memberArrearsState.paying.PN = 0;
      state.memberFlagList = [];
      state.selmember = {};
      state.selmemberArr = [];
   },
   getMemberCount({ commit }) {
      // 全部会员人数
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "91020205_1",
         CompanyId: userInfo.CompanyID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_MEMBER_COUNT, { data });
         },
         sendData
      );
   },
   getAutoVipCode({ commit }, data) {
      //生成会员编码
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_AUTOVIPCODE, { data });
         },
         { InterfaceCode: "910134" }
      );
   },

   getMemberBirthday({ commit }, data) {
      //  会员生日提醒
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020742",
         ShopId: homeInfo.shop.ID,
         CompanyId: homeInfo.shop.COMPANYID,
         BeginDate: data.BeginDate,
         EndDate: data.EndDate,
         PN: data.PN
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_MEMBER_BIRTHDAY, { data });
         },
         sendData
      );
   },
   getMemberValidity({ commit }, data) {
      //  会员过期提醒
      let homeInfo = getHomeData();
      let sendData = {
         InterfaceCode: "91020741",
         ShopId: homeInfo.shop.ID,
         CompanyId: homeInfo.shop.COMPANYID,
         BeginDate: data.BeginDate,
         EndDate: data.EndDate,
         PN: data.PN,
         Filter: ""
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_MEMBER_VALIDITY, { data });
         },
         sendData
      );
   }
};

// mutations
const mutations = {
   [MODIFY_VIP_PASSWD](state, { data }) {
      state.modifyVipPasswdState = data;
   },
   [DEL_MEMBER](state, { data }) {
      if (data.success) {
         state.delMember = data;
      }
   },
   [GET_MEMBER_VALIDITY](state, { data }) {
      if (data.success) {
         state.memberValidityState = data.data.PageData;
      }
   },
   [GET_MEMBER_BIRTHDAY](state, { data }) {
      if (data.success) {
         state.memberbrithday = data.data.PageData;
      }
   },
   [GET_AUTOVIPCODE](state, { data }) {
      if (data.success) {
         state.getAutoVipCodeState = data;
      }
   },
   [MEMBER_MOENY_REPORT](state, { data }) {
      if (data.success) {
         state.memberMoneyReport = data;
      }
   },
   [MEMBER_LIST](state, { data }) {
      let pageData = Object.assign({}, state.memberListState.paying);
      if (data.success) {
         state.memberList = [...data.data.PageData.DataArr];
         pageData = Object.assign(pageData, data.data.PageData);
      }
      state.memberListState = Object.assign({}, data, { paying: pageData });
   },
   [MEMBER_LISTALL](state, { data }) {
      //不分页会员列表
      if (data.success) {
         state.memberListAll = [...data.data.List];
      }
      state.memberListAllState = Object.assign({}, data);
   },
   [MEMBER_ITEM](state, { data }) {
      if (data.success) {
         state.memberItem.profile = Object.assign({}, data.data);
      }
      state.memberState = Object.assign({}, data);
   },
   [MEMBER_ITEM2](state, { data }) {
      if (data.success) {
         state.memberItem.profile = Object.assign({}, state.memberItem.profile, {
            total: data.data
         });
      }
      state.memberState2 = Object.assign({}, data);
   },
   [SET_REPORTLOSS](state, { data }) {
      state.reportLossState = Object.assign({}, data);
   },
   [GET_MEMBER_LEVEL](state, { data }) {
      state.memberLevelList = data.success ? [...data.data.List] : [];
   },
   [ADD_MEMEBER](state, { data }) {
      // add
      if (data.success) {
         state.memberListState.paying.PN = 0;
      }
      state.dealMemberState = Object.assign({}, data);
   },
   [EDIT_MEMEBER](state, { data }) {
      //edit
      if (data.success) {
         state.memberItem.profile.obj.ISUSEPASSWD = selected.IsUsePassWd == 1 ? true : false;
         for (let key in selected) {
            let kk = key.toUpperCase();
            state.memberItem.info[kk] = selected[key];
         }
         state.memberItem.info.CODE = selected.VipCode;
         state.memberItem.info.NAME = selected.VipName;
         let list = [...state.memberList];
         let index = list.findIndex(obj => Object.is(parseInt(selected.VipID), parseInt(obj.ID)));
         state.memberList[index] = Object.assign(
            {},
            state.memberList[index],
            state.memberItem.info
         );
         state.memberListState = Object.assign({}, state.memberListState);
      }
      state.dealMemberState = Object.assign({}, data);
      selected = {};
   },
   [GET_MEMBER_EXPORTDATA](state, { data }) {
      // 导出
      state.exportMemberState = Object.assign({}, data);
   },
   [MEMBER_IMPORTDATA](state, { data }) {
      // 导入
      state.importMemberState = Object.assign({}, data);
   },
   [GET_MEMBER_SPENDING](state, { data }) {
      // 消费明细
      let pageData = Object.assign({}, state.memberSpendingState.paying);
      let list = [];
      let homeInfo = getHomeData();
      if (data.success) {
         list = [...data.data.PageData.DataArr];
         pageData = Object.assign(pageData, data.data.PageData);
      }
      state.memberSpendingState = Object.assign({}, data, { paying: pageData, List: list });
   },
   [GET_MEMBER_BALANCE](state, { data }) {
      // 余额对帐明细
      let pageData = Object.assign({}, state.memberBalanceState.paying);
      let list = [];
      if (data.success) {
         list = [...data.data.PageData.DataArr];
         pageData = Object.assign(pageData, data.data.PageData);
      }
      state.memberBalanceState = Object.assign({}, data, { paying: pageData, List: list });
   },
   [GET_MEMBER_INTEGRAL](state, { data }) {
      // 积分对帐明细
      let pageData = Object.assign({}, state.memberIntegralState.paying);
      let list = [];
      if (data.success) {
         list = [...data.data.PageData.DataArr];
         pageData = Object.assign(pageData, data.data.PageData);
      }
      state.memberIntegralState = Object.assign({}, data, { paying: pageData, List: list });
   },
   [GET_MEMBER_ARREARS](state, { data }) {
      // 会员还款记录
      let pageData = Object.assign({}, state.memberArrearsState.paying);
      let list = [];
      if (data.success) {
         list = [...data.data.PageData.DataArr];
         pageData = Object.assign(pageData, data.data.PageData);
      }
      state.memberArrearsState = Object.assign({}, data, { paying: pageData, List: list });
   },
   [REPAY_MEMBER_ARREARS](state, { data }) {
      state.repayMemberArrears = Object.assign({}, data);
   },
   [GET_MEMBER_FLAG](state, { data }) {
      state.memberFlagList = data.success ? [...data.data.List] : [];
   },
   [GET_MEMBER_COUNT](state, { data }) {
      state.memberCount = Object.assign({}, data);
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
