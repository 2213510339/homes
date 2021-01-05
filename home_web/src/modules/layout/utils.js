/**
 * @file modules/layout/utils.js
 * @author zhangzhe(zhangzhe@baidu.com)
 */

import _ from 'lodash';
import {matchPath} from 'react-router';

export function getRealPathname(layout, pathname) {
    if (pathname === '/' && layout && layout.defaultIndex) {
        return layout.defaultIndex;
    }
    return pathname;
}

// 获取当前的头部项
export function getCurrentHeader(layout, pathname) {
    if (!layout.header) {
        return null;
    }
    let currentHeader = null;
    // 根据pathname获得当前选中的header项
    _.each(layout.header, header => {
        const reg = new RegExp('^/' + header.key);
        if (reg.test(pathname)) {
            currentHeader = header;
        }
    });
    return currentHeader;
}

// 根据pathname查找当前的侧边栏配置
export function getCurrentSidebarConfig(layout, pathname) {
    const currentHeader = getCurrentHeader(layout, pathname);
    // 排除不需要侧边栏的页面
    if (layout.hideSidebarLinks
        && _.find(layout.hideSidebarLinks, hideLink => RegExp('^' + hideLink).test(pathname))) {
        return null;
    }
    // 根据头部项找到对应的侧边栏
    if (currentHeader && currentHeader.sidebarKey && layout.sidebars) {
        const sidebar = _.find(layout.sidebars, sidebar => sidebar.key === currentHeader.sidebarKey);
        return sidebar ? sidebar.content : null;
    }
    // 只有一个侧边栏情况
    if (layout.sidebar) {
        return layout.sidebar;
    }
    return null;
}

// 获取当前侧边栏的层级
export function getSidebarLevel(sidebarConfig) {
    for (let i = 0; i < sidebarConfig.length; i++) {
        if (sidebarConfig[i].subMenus) {
            return 2;
        }
    }
    return 1;
}

// 获取当前选中的侧边栏项
export function getCurrentSidebarItem(sidebarConfig, pathname) {
    let currentSidebar = null;
    _.each(sidebarConfig, sidebar => {
        if (sidebar.subMenus) {
            _.each(sidebar.subMenus, subMenu => {
                const reg = new RegExp('^' + subMenu.key);
                if (reg.test(pathname)) {
                    currentSidebar = subMenu;
                }
            });
        }
        else {
            const reg = new RegExp('^' + sidebar.key);
            if (reg.test(pathname)) {
                currentSidebar = sidebar;
            }
        }
    });
    return currentSidebar;
}

// 获取侧边栏的默认打开项
export function getDefaultSidebarOpenKeys(sidebarConfig, pathname) {
    const openMenus = _.filter(sidebarConfig, sidebar => sidebar.defaultOpen);
    const defaultOpenKeys = _.map(openMenus, 'key');
    // 当前选中的侧边栏父节点必须打开
    const currentSidebarParentKey = getCurrentSidebarParentKey(sidebarConfig, pathname);
    return currentSidebarParentKey ? [...defaultOpenKeys, currentSidebarParentKey] : defaultOpenKeys;
}

// 获得当前页面所属的父亲侧边栏key
export function getCurrentSidebarParentKey(sidebarConfig, pathname) {
    const currentSidebarItem = getCurrentSidebarItem(sidebarConfig, pathname);
    let currentSidebarParentKey = '';
    _.each(sidebarConfig, sidebar => {
        _.each(sidebar.subMenus, subMenu => {
            if (currentSidebarItem && subMenu.key === currentSidebarItem.key) {
                currentSidebarParentKey = sidebar.key;
            }
        });
    });
    return currentSidebarParentKey;
}

// 根据pathname判断是否隐藏面包屑
export function isHideBreadcrumb(hideBreadcrumbLinks, pathname) {
    return _.filter(hideBreadcrumbLinks, hideLink => (
        hideLink === pathname || matchPath(pathname, {path: hideLink, exact: true})
    )).length > 0;
}

// 根据pathname查找面包屑的对应项
export function getBreadcrumbByLink(breadcrumbNameMap, pathname) {
    let currentBreadcrumb = breadcrumbNameMap[pathname];
    if (!currentBreadcrumb) {
        _.each(breadcrumbNameMap, (breadcrumbConfig, breadcrumbKey) => {
            if (breadcrumbConfig.match) {
                const matchResult = matchPath(pathname, {path: breadcrumbKey, exact: true});
                if (matchResult) {
                    currentBreadcrumb = _.extend({}, breadcrumbConfig, {matchResult});
                }
            }
        });
    }
    return currentBreadcrumb;
}

// 根据link从当前侧边栏中查找相应项
export function getSidebarByLink(layout, pathname, link) {
    const currentSidebarConfig = getCurrentSidebarConfig(layout, pathname);
    let currentSidebar = null;
    _.each(currentSidebarConfig, sidebar => {
        if (sidebar.subMenus) {
            _.each(sidebar.subMenus, subMenu => {
                if (subMenu.link === link) {
                    currentSidebar = subMenu;
                }
            });
        }
        else if (sidebar.link === link) {
            currentSidebar = sidebar;
        }
    });
    return currentSidebar;
}

export function getHeaderByLink(layout, link) {
    if (!layout.header) {
        return null;
    }
    return _.find(layout.header, headerConfig => headerConfig.link === link);
}

// 是否显示titleContainer
export function hasHeader(layout, pathname) {
    if (layout.hideHeaderLinks
        && _.find(layout.hideHeaderLinks, hideLink => RegExp('^' + hideLink).test(pathname))) {
        return false;
    }
    return true;
}

