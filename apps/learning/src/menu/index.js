//查找父级菜单key列表
export function findFatherKeysListByKey(key) {
    var list = key.split('/');
    list.pop();
    return list.reduce(function (acc, item, index) {
        if (item) {
            var newItem = "".concat(index > 1 ? acc[index - 2] : '', "/").concat(item);
            acc.push(newItem);
        }
        return acc;
    }, []);
}
//查找菜单项 通过name
export function findMenuItemByName(menuList, name) {
    // 递归查找routesWithKeys中name等于传入name的项，找到则返回该项，否则返回undefined
    function findInRoutes(routes, name) {
        for (var _i = 0, routes_1 = routes; _i < routes_1.length; _i++) {
            var route = routes_1[_i];
            if (route.name === name) {
                return route;
            }
            if (route.children) {
                var found = findInRoutes(route.children, name);
                if (found)
                    return found;
            }
        }
        return undefined;
    }
    return findInRoutes(menuList, name);
}
//重置菜单项匹配状态 具有副作用
/*
* 重置菜单项匹配状态
* @param data 菜单项列表
* @param callback 回调函数
* @returns
*/
export function reWashMenus(data, callback) {
    var cb = callback
        ? callback
        : function (i) {
            i.match = false;
        };
    var wash = function (data) {
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var i = data_1[_i];
            if (i.match) {
                cb(i);
            }
            if (i.children) {
                wash(i.children);
            }
        }
    };
    wash(data);
}
/*
* 查找匹配的项并改变菜单项的label 返回openKeys和selectedKeys 具有副作用
* @param routes 菜单项列表
* @param value 搜索值
* @returns { Keys }
*/
export function findMatchingLabels(routes, value) {
    var result = [];
    var newValue = value.toLocaleLowerCase(); //搜索值大小写处理
    // 先重置菜单项的label（恢复默认颜色）和match状态
    reWashMenus(routes);
    //递归查找匹配的项
    function search(routes) {
        for (var _i = 0, routes_2 = routes; _i < routes_2.length; _i++) {
            var route = routes_2[_i];
            var text = route.label.toLocaleLowerCase();
            var id = route.id;
            if (text === null || text === void 0 ? void 0 : text.includes(newValue)) {
                route.match = true;
                result.push({ id: id, path: route.path });
                text = null;
                id = null;
            }
            if (route.children) {
                search(route.children);
            }
        }
    }
    search(routes);
    var set = new Set();
    var selectedKeys = [];
    result.forEach(function (r) {
        var list = findFatherKeysListByKey(r.path);
        selectedKeys.push(r.path);
        list.forEach(function (l) { return set.add(l); });
    });
    var openKeys = Array.from(set);
    set.clear();
    result.length = 0;
    return { openKeys: openKeys, selectedKeys: selectedKeys };
}
/*
* 删除子菜单 副作用
* @param routes 菜单项列表
* @param name 菜单项名称
* @returns
*/
export var deleteChild = function (routes, name) {
    var recursion = function (routes) {
        return routes.forEach(function (route) {
            if (route.name === name) {
                route.children = [];
            }
            else {
                if (route.children) {
                    recursion(route.children);
                }
            }
        });
    };
    recursion(routes);
};
/*
* 加子菜单 具有副作用
* @param routes 菜单项列表
* @param name 菜单项名称
* @param child 子菜单项列表
* @returns
*/
export var addChild = function (routes, name, child) {
    var recursion = function (routes) {
        routes.forEach(function (route) {
            if (route.name === name) {
                route.children = child;
            }
            if (route.children) {
                recursion(route.children);
            }
        });
    };
    recursion(routes);
};
/*
* 改变菜单单项加载状态 副作用
* @param routes 菜单项列表
* @param name 菜单项名称
* @param loading 加载状态
* @returns
*/
export var changeLoading = function (routes, name, loading) {
    var recursion = function (routes) {
        routes.forEach(function (route) {
            if (route.name === name) {
                if (loading) {
                    route.label = route.label + '加载中';
                }
                else {
                    route.label = route.label.replace('加载中', '');
                }
                return;
            }
            if (route.children) {
                recursion(route.children);
            }
        });
    };
    recursion(routes);
};
