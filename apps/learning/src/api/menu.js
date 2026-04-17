import { request } from '@/request';
/**
 * @param params - Query parameters
 */
export function getApiMenus(params) {
    return request({
        url: "/api/menus",
        method: 'get',
        params: params,
    });
}
/**
 * @param data - Request body
 */
export function postApiMenus(data) {
    return request({
        url: "/api/menus",
        method: 'post',
        data: data,
    });
}
/**
 */
export function getApiMenusId(id) {
    return request({
        url: "/api/menus/".concat(encodeURIComponent(String(id))),
        method: 'get',
    });
}
/**
 * @param data - Request body
 */
export function putApiMenusId(id, data) {
    return request({
        url: "/api/menus/".concat(encodeURIComponent(String(id))),
        method: 'put',
        data: data,
    });
}
/**
 */
export function deleteApiMenusId(id) {
    return request({
        url: "/api/menus/".concat(encodeURIComponent(String(id))),
        method: 'delete',
    });
}
/**
 */
export function getApiMenusIdChildren(id) {
    return request({
        url: "/api/menus/".concat(encodeURIComponent(String(id)), "/children"),
        method: 'get',
    });
}
/**
 * 搜索菜单，返回匹配项及其父链
 */
export function getApiMenusSearch(params) {
    return request({
        url: "/api/menus/search",
        method: 'get',
        params: params,
    });
}
