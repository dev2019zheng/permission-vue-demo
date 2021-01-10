import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "view-design/dist/styles/iview.css";
import "./core/lazy/lazy.js";
import { createPermission } from "@/core/permission";
Vue.config.productionTip = false;
createPermission(router)();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
