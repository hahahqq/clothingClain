// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store'
import iView from 'iview'
import i18n from '@/locale'
import config from '@/config'
import importDirective from '@/directive'
import { directive as clickOutside } from 'v-click-outside-x'
import installPlugin from '@/plugin'
import './index.less'
import '../src/static/css/index.css'
import '../src/static/css/styles.css'
import '../src/static/css/default.css'
import '@/assets/icons/iconfont.css'
import TreeTable from 'tree-table-vue'
import VOrgTree from 'v-org-tree'
import 'v-org-tree/dist/v-org-tree.css'

import axios from "axios";
import VueAxios from "vue-axios";
import Vuex from "vuex";
import VueRouter from "vue-router";
import ElementUI from "element-ui";
import filter from "./filter";

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(ElementUI);
Vue.use(filter);

import BaiduMap from "vue-baidu-map";

Vue.use(BaiduMap, {
   ak: "w0p653goQSLC91ld7SxoGsfNcgWfCP48"
});

import { isPurViewFun } from "@/util/com/common.js";
Vue.prototype.isPurViewFun = isPurViewFun;

axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
axios.defaults.withCredentials = true; //让ajax携带cookie


// 实际打包时应该不引入mock
/* eslint-disable */
// if (process.env.NODE_ENV !== 'production') require('@/mock')

Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(TreeTable)
Vue.use(VOrgTree)
/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false


/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
/**
 * 注册指令
 */
importDirective(Vue)
Vue.directive('clickOutside', clickOutside)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
