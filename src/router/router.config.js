import _ParentWrapper from "../components/ParentWrapper/Index.vue";
import _BasicLayout from "../core/Layout/index.vue";

const ParentWrapper = () => import("../core/Layout/index.vue");

function resolveViewComponent(filePath) {
  return () => import(`@/views/${filePath || "Parent/default"}.vue`);
}

const menuPatchViewComponent = menu => {
  if (menu.is_route || menu.children.length) {
    return {
      path: menu.path,
      component: ParentWrapper
    };
  } else {
    return {
      path: menu.path,
      component: resolveViewComponent(menu.file)
    };
  }
};
/**
 * 菜单生成路由
 * @param menusTree
 * @returns {*}
 */
export const generateRoutes = menusTree => {
  function recursiveFn(menus) {
    return menus.map(menu => {
      const _r = menuPatchViewComponent(menu.file);
      const _route = {
        ..._r,
        meta: { title: menu.title, icon: menu.icon },
        children: []
      };
      if (menu.children && menu.children.length) {
        _route.children = recursiveFn(menu.children);
      }
      return _route;
    });
  }
  return recursiveFn(menusTree);
};

export const asyncRouterMap = [
  {
    path: "/",
    component: _BasicLayout,
    redirect: "/home",
    hidden: true,
    hideInMenus: true,
    children: [
      {
        path: "/home",
        component: () => import("@/views/Home/Home.vue"),
        meta: { title: "首页", icon: "管理驾驶舱" },
        children: []
      }
    ]
  }
];

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  ...asyncRouterMap,
  {
    path: "/user",
    component: _ParentWrapper,
    redirect: "/user/login",
    hideInMenus: true,
    hideChildrenInMenu: true,
    hidden: true,
    children: [
      {
        path: "/user/login",
        name: "login",
        component: () => import("@/views/Login/Login.vue")
      }
    ]
  }
];
