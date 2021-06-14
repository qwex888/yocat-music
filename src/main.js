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

Vue.use(Antd);
Vue.prototype.$u = utils;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
