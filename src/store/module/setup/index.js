import commonSend from "@/api/api";
import { REBUILD_DATA_FUN, SALE_PATTERN_STATE } from "@/store/mutation-types";
import { getUserInfo, setUserInfo } from "@/api/index";
let selected = {};

// init state
const state = {
   rebuildDataState: {},
   salePatternState: {}
};

// getters
const getters = {
   rebuildDataState: state => state.rebuildDataState,
   salePatternState: state => state.salePatternState
};

// actions
const actions = {
   rebuildDataFun({ commit }, data) {
      // 系统数据重建
      let sendData = Object.assign({}, data, {
         InterfaceCode: "910130"
      });
      commonSend.commonSend(
         "get",
         data => {
            commit(REBUILD_DATA_FUN, { data });
         },
         sendData
      );
   },
   changeSalePattern({ commit }, data) {
      // 修改消费模式
      let userInfo = getUserInfo();
      let sendData = Object.assign({}, data, {
         InterfaceCode: "910131",
         CompanyId: userInfo.CompanyID
      });
      selected.OrderMode = data.OrderMode;
      selected.DeskMode = data.DeskMode;
      commonSend.commonSend(
         "get",
         data => {
            commit(SALE_PATTERN_STATE, { data });
         },
         sendData
      );
   }
};

const mutations = {
   [REBUILD_DATA_FUN](state, { data }) {
      state.rebuildDataState = Object.assign({}, data);
   },
   [SALE_PATTERN_STATE](state, { data }) {
      let userInfo = getUserInfo();
      if (data.success && userInfo.CompanyConfig) {
         userInfo.CompanyConfig.ORDERMODE = selected.OrderMode;
         userInfo.CompanyConfig.DESKMODE = selected.DeskMode;
         setUserInfo(userInfo);
      }
      state.salePatternState = Object.assign({}, data);
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
