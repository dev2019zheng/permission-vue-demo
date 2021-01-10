/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent() {
  const event = document.createEvent("HTMLEvents");
  event.initEvent("resize", true, true);
  event.eventType = "message";
  window.dispatchEvent(event);
}

export function handleScrollHeader(callback) {
  let timer = 0;

  let beforeScrollTop = window.pageYOffset;
  callback = callback || function() {};
  window.addEventListener(
    "scroll",
    () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        let direction = "up";
        const afterScrollTop = window.pageYOffset;
        const delta = afterScrollTop - beforeScrollTop;
        if (delta === 0) {
          return false;
        }
        direction = delta > 0 ? "down" : "up";
        callback(direction);
        beforeScrollTop = afterScrollTop;
      }, 50);
    },
    false
  );
}

export function isIE() {
  const bw = window.navigator.userAgent;
  const compare = s => bw.indexOf(s) >= 0;
  const ie11 = (() => "ActiveXObject" in window)();
  return compare("MSIE") || ie11;
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate(id = "", timeout = 1500) {
  if (id === "") {
    return;
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id));
  }, timeout);
}

/**
 * 重定向到target
 * @param target
 */
export const redirectTo = target => {
  console.log("%c redirect to :", "color:blue;", target);
  window.location.href = target;
};

/**
 * 路由映射成菜单
 * @param _routes
 * @returns {[]}
 */
export const executeMenus = _routes => {
  const _menus = [];
  _routes.forEach(item => {
    if (!item.hideInMenus) {
      const newItem = { ...item };
      delete newItem.children;
      if (item.children && !item.hideChildrenInMenu) {
        newItem.children = executeMenus(item.children);
      }
      _menus.push(newItem);
    } else if (item.hideInMenus && !item.hideChildrenInMenu && item.children) {
      _menus.push(...executeMenus(item.children));
    }
  });
  _menus.forEach(flatPaths);
  return _menus;
};

/**
 * 提取菜单路由路径
 * @param _route
 * @returns {[]}
 */
export const flatPaths = _route => {
  const _paths = [];
  _paths.push(_route.path);
  if (_route.children) {
    _route.children.forEach(_r => {
      Array.prototype.push.apply(_paths, (_r.menuPaths = flatPaths(_r)));
    });
  }
  _route.menuPaths = _paths;
  return _paths;
};

/**
 * 提取祖先菜单
 * @param menus
 * @returns {function(*=): []}
 */
export const extractParents = menus => path => {
  const parents = [];
  let nextMenu = menus[0];
  let curMenus = menus;
  while (nextMenu) {
    if (nextMenu.menuPaths.includes(path)) {
      parents.push(nextMenu);
      curMenus = nextMenu.children;
      if (curMenus && curMenus.length) {
        nextMenu = curMenus[0];
      } else {
        nextMenu = null;
      }
    } else {
      const nowIndex = curMenus.indexOf(nextMenu);
      if (nowIndex < curMenus.length) {
        nextMenu = curMenus[nowIndex + 1];
      } else {
        nextMenu = null;
      }
    }
  }
  return parents;
};

/**
 * @param {Array.<any>} tree
 * @param {{
 *   id?: string ,
 *   pid?: string,
 *   children?: string,
 *   emptyChildren? : boolean
 * }} option - {
 *   id: 'id',
 *   pid: 'pid',
 *   children: 'children',
 *   emptyChildren: true
 * }
 */
export const treeToList = (tree = [], option) => {
  const defaultOption = {
    id: "id",
    pid: "pid",
    children: "children",
    emptyChildren: true
  };
  option = Object.assign({}, defaultOption, option);
  const { id, pid, children } = option;
  const _list = [];
  function _composeTreeToList(nodes, _pid) {
    for (const node of nodes) {
      const _node = Object.assign({}, node);
      _node[pid] = _pid;
      _list.push(_node);
      if (_node[children] && _node[children].length > 0) {
        _composeTreeToList(_node[children], _node[id]);
      }
      delete _node[children];
    }
  }

  _composeTreeToList(tree);
  return _list;
};

/**
 * @param {Array.<any>} list
 * @param {{
 *   id?: string ,
 *   pid?: string,
 *   children?: string,
 *   emptyChildren? : boolean,
 *   isRoot? : function(item: Object): boolean
 * }} option - {
 *   id: 'id',
 *   pid: 'pid',
 *   children: 'children',
 *   emptyChildren: true,
 *   isRoot: item => item.id == null
 * }
 * @returns {[]}
 */
export const listToTree = (list, option) => {
  const defaultOption = {
    id: "id",
    pid: "pid",
    children: "children",
    emptyChildren: false
  };
  option = Object.assign({}, defaultOption, option);
  const {
    id,
    pid,
    children,
    emptyChildren,
    isRoot = item => item[option.pid] == null
  } = option;
  let nodeMap = Object.create(null);
  const _tree = [];
  for (const _node of list) {
    _node[children] || (_node[children] = emptyChildren ? null : []);
    nodeMap[_node[id]] = _node;
  }

  for (const _node of list) {
    if (isRoot(_node)) {
      _tree.push(_node);
    } else {
      const _parent = nodeMap[_node[pid]];
      if (_parent) {
        (_parent[children] || (_parent[children] = [])).push(_node);
      }
    }
  }
  nodeMap = null;
  return _tree;
};
