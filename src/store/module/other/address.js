import commonSend from "@/api/api";
import { ADDRESS_STATE } from "@/store/mutation-types";
import { getHomeData } from "@/api/index";
let selected = {};
// init state
const state = {
   provinceList: [],
   cityList: [],
   districtList: [],
   addressState: {}
};

// getters
const getters = {
   provinceList: state => state.provinceList,
   cityList: state => state.cityList,
   districtList: state => state.districtList,
   addressState: state => state.addressState
};

// actions
const actions = {
   getProvince({ commit }, data) {
      //省份列表
      let sendData = {
         InterfaceCode: "9102010101",
         Name: data.Name ? data.Name : ""
      };
      selected.type = 1;
      commonSend.commonSend(
         "get",
         data => {
            commit(ADDRESS_STATE, { data });
         },
         sendData
      );
   },
   getCity({ commit }, data) {
      //城市列表
      let sendData = {
         InterfaceCode: "9102010102",
         Name: data.Name ? data.Name : "",
         PID: data.Pid
      };
      selected.type = 2;
      commonSend.commonSend(
         "get",
         data => {
            commit(ADDRESS_STATE, { data });
         },
         sendData
      );
   },
   getDistrict({ commit }, data) {
      //区县列表
      let sendData = {
         InterfaceCode: "9102010103",
         Name: data.Name ? data.Name : "",
         PID: data.Pid
      };
      selected.type = 3;
      commonSend.commonSend(
         "get",
         data => {
            commit(ADDRESS_STATE, { data });
         },
         sendData
      );
   }
};

const mutations = {
   [ADDRESS_STATE](state, { data }) {
      if (data.success) {
         let arr = [...data.data.List];
         switch (selected.type) {
            case 1:
               state.provinceList = [...arr];
               break;
            case 2:
               state.cityList = [...arr];
               break;
            case 3:
               state.districtList = [...arr];
               break;
         }
      }
      state.addressState = Object.assign({}, data);
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
