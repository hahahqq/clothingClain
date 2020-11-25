import commonSend from "@/api/api";
import { UPLOAD_STATE, GET_IMAGES_LIST, DEAL_IMAGE } from "@/store/mutation-types";
import { getUserInfo, getHomeData } from "@/api/index";
let selected = {};

// init state
const state = {
   goodsImgUploadState: {},
   imagesList: [],
   imagesListState: {},
   imagesState: {}
};

// getters
const getters = {
   goodsImgUploadState: state => state.goodsImgUploadState,
   imagesState: state => state.imagesState,
   imagesListState: state => state.imagesListState,
   imagesList: state => state.imagesList
};

// actions
const actions = {
   uploadGoodsImg({ commit }, data) {
      commonSend.methodUpload(data => {
         commit(UPLOAD_STATE, { data });
      }, data);
   },
   saveImage({ commit, state }, data) {
      // 图片字段保存
      let userInfo = getUserInfo();
      let num =
         state.imagesListState.data && state.imagesListState.data.ImageMaxNum
            ? parseInt(state.imagesListState.data.ImageMaxNum)
            : 0;
      let sendData = {
         InterfaceCode: "60102011601",
         CompanyId: userInfo.CompanyID,
         Type: 3, // 0=微信活动，1=推荐有礼，2=微信会员卡，3微信商城
         Image: data.Image,
         SmallImage: data.SmallImage ? data.SmallImage : "",
         ImageNum: num + 1
      };
      if (data.Id) {
         sendData.Id = data.Id;
      }
      selected = { type: "edit" };
      commonSend.commonSend(
         "get",
         data => {
            commit(DEAL_IMAGE, { data });
         },
         sendData
      );
   },
   getImagesList({ commit }, type) {
      // 图片列表
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "60102011602",
         CompanyId: userInfo.CompanyID,
         Type: 3 // 0=微信活动，1=推荐有礼，2=微信会员卡，3微信商城
      };
      commonSend.commonSend(
         "get",
         data => {
            commit(GET_IMAGES_LIST, { data });
         },
         sendData
      );
   },
   delImage() {
      // 图片删除
      let userInfo = getUserInfo();
      let sendData = {
         InterfaceCode: "60102011603",
         CompanyId: userInfo.CompanyID,
         Id: data.Id
      };
      selected = { type: "del" };
      commonSend.commonSend(
         "get",
         data => {
            commit(DEAL_IMAGE, { data });
         },
         sendData
      );
   }
};

const mutations = {
   [UPLOAD_STATE](state, { data }) {
      state.goodsImgUploadState = Object.assign({}, data);
   },
   [GET_IMAGES_LIST](state, { data }) {
      if (data.success) {
         state.imagesList = [...data.data.List];
      }
      state.imagesListState = Object.assign({}, data);
   },
   [DEAL_IMAGE](state, { data }) {
      state.imagesState = Object.assign({}, data, selected);
      selected = {};
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};
