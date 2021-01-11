import store from "../store";
import storage from "store";
import { domTitle, setDocumentTitle } from "@/utils/domUtil";
import ViewUI from "view-design";
import { ACCESS_TOKEN } from "@/store/multation-types";

function makeMap(str) {
  const map = Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return function(val) {
    return map[val];
  };
}

export function createPermission(router) {
  const loginRoutePath = "/user/login";
  const defaultRoutePath = "/home";
  const whiteList = ["login", "register", "registerResult"]; // no redirect whitelist
  const isWhiteList = makeMap(whiteList.join(","));
  return function() {
    console.log("%c set beforeEach ", "color:blue;");
    // before each
    router.beforeEach((to, from, next) => {
      ViewUI.LoadingBar.start();
      // console.log('%c before route :>>> ', 'color: #007fff;', to)
      to.meta &&
        typeof to.meta.title !== "undefined" &&
        setDocumentTitle(`${to.meta.title} - ${domTitle}`);
      /* has token */
      if (storage.get(ACCESS_TOKEN)) {
        // console.log('%c has permission ', 'color:blue;')
        if (to.path === loginRoutePath) {
          next({ path: defaultRoutePath });
          ViewUI.LoadingBar.finish();
        } else {
          // console.log('%c has permission ', 'color:blue;')
          // check login user.roles is null
          if (!store.getters.hasInfo) {
            // request login userInfo
            store
              .dispatch("getUserInfo", store.getters.token)
              .then(() => {
                // generate dynamic router
                // 根据roles权限生成可访问的路由表
                // 动态添加可访问路由表
                router.addRoutes(store.getters.addRouters);
                // 请求带有 redirect 重定向时，登录自动重定向到该地址
                const redirect = decodeURIComponent(
                  from.query.redirect || to.path
                );
                if (to.path === redirect) {
                  // set the replace: true so the navigation will not leave a history record
                  next({ path: redirect, replace: true });
                } else {
                  // 跳转到目的路由
                  next({ path: redirect });
                }
              })
              .catch(() => {
                ViewUI.Message.error("请求用户信息失败，请重试");
                // 失败时，获取用户信息失败时，调用登出，来清空历史保留信息
                store.dispatch("doLogout").then(() => {
                  next({
                    path: loginRoutePath,
                    query: { redirect: to.fullPath }
                  });
                });
                // redirectTo(loginRoutePath)
              });
          } else {
            next();
          }
        }
      } else {
        if (isWhiteList(to.name)) {
          // 在免登录白名单，直接进入
          next();
        } else {
          // redirectTo(loginRoutePath)
          next({ path: loginRoutePath, query: { redirect: to.fullPath } });
          // ViewUI.LoadingBar.finish();
        }
      }
    });
    router.beforeResolve((to, from, next) => {
      store.dispatch("UpdatePath", to.fullPath);
      next();
    });
    router.afterEach(() => {
      ViewUI.LoadingBar.finish();
    });
  };
}
