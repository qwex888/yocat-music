import Vue from "vue";
import Antd from "ant-design-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "normalize.css";
import utils from "./utils/util";

//注意antd样式的引入必须由css改为less引入
import "./styles/theme/index.less";
import "./common/axios";
import md5 from "js-md5";
import VueLazyload from "vue-lazyload";

// 配置项
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: "",
  loading: "",
  attempt: 1,
});
Vue.prototype.$ipc = window.electron.ipcRenderer;
// 初始化接受ipc传来的缓存数据,并存入store中
Vue.prototype.$ipc.on("electron-store-get", (event, arg) => {
  store.commit("setElectronStore", arg);
});
Vue.use(Antd);
Vue.prototype.$u = utils;
Vue.prototype.$md5 = md5;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
