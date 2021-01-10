import Vue from "vue";
import VueRouter from "vue-router";
import { constantRouterMap } from "@/router/router.config";
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "hash",
  base: "/",
  // scrollBehavior: () => ({ x: 0, y: 0 }),
  routes: constantRouterMap
});

export default router;
