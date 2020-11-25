import commonSend from '@/api/api'
import { getUserInfo,setHomeData,getHomeData } from '@/api/index'
import { 
  GET_SSMEMBERD_LIST
} from '@/store/mutation-types'
let selected={}

// initial state
const state = {
  ssmemberdListState: {},
  ssmemberopenID: ''
  // ssmemberdList: [],
}

// getters
const getters = {
  // ssmemberdList: state => state.ssmemberdList,
  ssmemberdListState: state => state.ssmemberdListState,
}

// actions
const actions = {
  getSsmemberdList ({commit},data) {
    let  userInfo= getUserInfo();
    let shopuserInfo = getHomeData().shop;
    let ShopId=data.Filter!='' ? '' :shopuserInfo.ID;
    let sendData = {
      InterfaceCode: 601020203,
      CompanyId: userInfo.CompanyID,
      ShopId: ShopId,
      VipFlag: '',
      LevelName: '',
      birthday: -1,
      PayCount: -1,
      LossVip: -1,
      Status: -1,
      ShowMoney:0,
      OweMoney:0
    };
    if(data){
      sendData = Object.assign({},sendData,data)
    }
    commonSend.commonSend('get',data => {
      commit(GET_SSMEMBERD_LIST, { data })
    }, sendData )
  }

  
}

// mutations
const mutations = {
  [GET_SSMEMBERD_LIST] (state, { data }) {
    if(data.success){
       // state.ssmemberdList = [...data.data.PageData.DataArr];
       state.ssmemberdListState = Object.assign({},data);
    }
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
