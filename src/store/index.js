import Vue from "vue";
import Vuex from "vuex";
import { fetchUserInfo, login, tokens } from "../api/auth";
import { executeMenus, listToTree } from "../utils/util";
import storage from "store";
import { ACCESS_TOKEN } from "./multation-types.js";

import { constantRouterMap } from "../router/router.config";
const lastToken = storage.get(ACCESS_TOKEN) || "";

Vue.use(Vuex);
const notFoundRoute = [
  {
    path: "/*",
    hideInMenus: true,
    component: () => import("@/views/Exception/404/404.vue")
  }
];
export default new Vuex.Store({
  state: {
    login: !!lastToken,
    token: lastToken,
    name: "",
    role: [],
    permissions: [],
    menus: []
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_LOGIN(state, value) {
      state.login = value;
    },
    SET_NAME(state, name) {
      state.name = name;
    },
    SET_ROLE(state, role) {
      state.role = role;
    },
    SET_MENUS(state, menus) {
      state.menus = menus;
    },
    SET_PERMISSIONS(state, permissions) {
      state.permissons = permissions;
    },
    SET_ROUTERS: (state, routers) => {
      const newRoutes = routers.concat(notFoundRoute);
      state.addRouters = newRoutes;
      const _routes = (state.routers = constantRouterMap.concat(newRoutes));
      state.menus = executeMenus(_routes);
    }
  },
  actions: {
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then(response => {
            const { access_token: accessToken } = response;
            storage.set(ACCESS_TOKEN, accessToken, 24 * 60 * 60 * 1000);
            commit("SET_TOKEN", accessToken);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    getUserInfo({ commit, state }, token) {
      return new Promise((resolve, reject) => {
        fetchUserInfo(token, state.token === tokens.admin ? "admin" : "other")
          .then(([error, model]) => {
            if (!error) {
              const { name, role = [], menus = [], permissions = [] } = model;
              commit("SET_LOGIN", true);
              commit("SET_NAME", name);
              commit("SET_ROLE", role);
              const _tree = listToTree(menus, {
                isRoot: x => x.pid === "" || x.pid == null
              });
              const routes = executeMenus(_tree);
              commit("SET_MENUS", menus);
              commit("SET_PERMISSIONS", permissions);
              resolve(routes);
            } else {
              reject();
            }
          })
          .catch(e => {
            console.log(e);
            reject([]);
          });
      });
    },
    doLogout({ commit }) {
      return new Promise(resolve => {
        commit("SET_LOGIN", false);
        storage.remove(ACCESS_TOKEN);
        resolve({});
      });
    }
  },
  getters: {
    isLogin: state => state.login,
    hasInfo: state => !!state.name,
    token: state => state.token,
    name: state => state.name,
    roles: state => state.role,
    menus: state => state.menus,
    permissions: state => state.permissions
  },
  modules: {}
});
