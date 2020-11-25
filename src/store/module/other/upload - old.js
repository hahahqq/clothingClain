import commonSend from '@/api/api'
import { getUserInfo,getHomeData } from '@/api/index'
import { 
  UPLOAD_STATE
} from '@/store/mutation-types'
let selected={}
// init state
const state = {
  goodsImgUploadState: {}
}

// getters
const getters = {
  goodsImgUploadState:state=>state.goodsImgUploadState,
}

// actions
const actions = {
  uploadGoodsImg({commit},data){
    commonSend.methodUpload(data=>{
      commit(UPLOAD_STATE,{data})
    },data)
  },
}

const mutations = {
  [UPLOAD_STATE] (state, { data }) {
    state.goodsImgUploadState = Object.assign({},data)
  },
}

export default{
  state,
  getters,
  actions,
  mutations
}
