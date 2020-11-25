import commonSend from "@/api/api";
import {
   SERVER_TIME,
   LOGIN,
   REGISTER,
   CHANGE_PASSWORD,
   VERIFYCODE,
   EXPERIENCE,
   GET_PERMISSION,
   CHOOSE_SEVER_IP,
   GET_COMPAYNINFO
} from "@/store/mutation-types";
import { getUserInfo, setUserInfo, setServerIP } from "@/api/index";
import { setToken, getToken } from '@/libs/util'

let selected = {};
let VersionText = "1.0";
// init state
const state = {
   loginState: {},
   registerState: {},
   STimeState: {},
   AgentInfo: {},
   changePwdState: {},
   verCodeState: {},
   experienceState: {},
   AgentPermission: {},
   severIpData: {},
   token: getToken(),
   access: ''
};

// getters
const getters = {
   loginState: state => state.loginState,
   severIpData: state => state.severIpData,
   registerState: state => state.registerState,
   STimeState: state => state.STimeState,
   AgentInfo: state => state.AgentInfo,
   changePwdState: state => state.changePwdState,
   verCodeState: state => state.verCodeState,
   experienceState: state => state.experienceState,
   AgentPermission: state => state.AgentPermission
};

// actions
const actions = {
   getServerTime({ commit }) {
      commonSend.methodGet(
         data => {
            commit(SERVER_TIME, { data });
         },
         { InterfaceCode: 910111 }
      );
   },
   toLogin({ commit }, data = {}) {
      let sendData = Object.assign({}, data, {
         InterfaceCode: "910105",
         AppType: 0, // 0:pc  1:安卓   2:IOS  3:web
         VersionText: VersionText,
         IMEI: "",
         platform: 0
      });
      selected.data = {
         CODE2: data.UserCode.toLowerCase(),
         PPWW: Math.random().toFixed(4) + (data.Password ? data.Password : "")
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(LOGIN, { data })
            // commit('setToken', data)
         },
         sendData
      );
   },
   toLogOut({ commit }, data = {}) {
      sessionStorage.clear();
      // commit('setToken', '')
          // commit('setAccess', [])
   },
   chooseSeverIp({ commit }, code) {
      //登录判断服务器连接
      let sendData = {
         InterfaceCode: "20660801",
         authcode: code
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(CHOOSE_SEVER_IP, { data });
         },
         sendData
      );
   },
   toRegister({ commit }, data = {}) {
      //商家注册
      let sendData = Object.assign({}, data, {
         InterfaceCode: "910102",
         shareauthcode: "",
         regversion: 8,
         platform: "",
         ordermode: 0
      });
      selected.data = { AuthCode: data.mobileno, UserCode: "boss", Password: data.password };
      commonSend.commonSend(
         "get",
         data => {
            commit(REGISTER, { data });
         },
         sendData
      );
   },
   getVerCode({ commit }, tel) {
      // 获取验证码
      let sendData = {
         InterfaceCode: "910101",
         MobileNo: tel,
         verifycode: ""
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(VERIFYCODE, { data });
         },
         sendData
      );
   },
   getCompanyInfo({ commit }, id) {
      //获取商家信息
      let sendData = {
         InterfaceCode: "910106",
         Companyid: id
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_COMPAYNINFO, data);
         },
         sendData
      );
   },
   changePwd({ commit }, data = {}) {
      //修改用户密码
      let sendData = Object.assign({}, data, {
         InterfaceCode: "910117"
      });
      commonSend.commonSend(
         "get",
         data => {
            commit(CHANGE_PASSWORD, { data });
         },
         sendData
      );
   },
   toExperience({ commit }, data = {}) {
      //获取体验账号
      let sendData = {
         InterfaceCode: "910103",
         VersionText: VersionText
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(EXPERIENCE, { data });
         },
         sendData
      );
   },
   addServerIP({ commit }, item) {
      setServerIP({ serverIP: item });
   },
   getPermissionInfo({ commit }) {
      // 获取当前用户权限列表
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "910119",
         UserID: userInfo.UserID
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_PERMISSION, { data });
         },
         sendData
      );
   }
};

const mutations = {
  setAccess (state, access) {
    state.access = access
  },
  setToken (state, token) {
    state.token = token
    setToken(token)
  },
   [GET_COMPAYNINFO](data) {
      if (data.success) {
         console.log(data);
      }
   },
   [CHOOSE_SEVER_IP](state, { data }) {
      state.severIpData = Object.assign({}, data);
   },
   [LOGIN](state, { data }) {
      if (data.success) {
         state.AgentInfo = Object.assign({}, data.data, selected.data);
         setUserInfo(state.AgentInfo);
      }
      state.loginState = Object.assign({}, data);
      selected = {};
   },
   [REGISTER](state, { data }) {
      state.registerState = Object.assign({}, data, { regdata: selected.data });
      selected = {};
   },
   [SERVER_TIME](state, { data }) {
      let SERVER_TIME = {};
      state.STimeState = Object.assign({}, data.data);
      if (data.data.success) {
         SERVER_TIME.time = data.data.data.ServerTime - new Date().getTime();
         SERVER_TIME.JSESSIONID = data.headers["Set-Cookie"] ? data.headers["Set-Cookie"] : "";
      }
      console.log(SERVER_TIME);
      sessionStorage.setItem("SERVER_TIME", JSON.stringify(SERVER_TIME));
   },
   [CHANGE_PASSWORD](state, { data }) {
      state.changePwdState = Object.assign({}, data);
   },
   [VERIFYCODE](state, { data }) {
      state.verCodeState = Object.assign({}, data);
   },
   [EXPERIENCE](state, { data }) {
      state.experienceState = Object.assign({}, data);
   },
   [GET_PERMISSION](state, { data }) {
      if (data.success) {
         setUserInfo(data.data);
      }
      state.AgentPermission = Object.assign({}, data);
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
