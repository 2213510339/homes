/**
 * @file modules/layout/renderBreadCrumbs.js
 * @author zhangzhe(zhangzhe@baidu.com)
 */

import {Breadcrumb} from 'antd';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import {generatePath} from 'react-router';

import {isHideBreadcrumb, getBreadcrumbByLink, getSidebarByLink, getHeaderByLink} from './utils';

function getTitleWithoutIcon(title) {
    if (typeof title === 'object' && title.props && title.props.children) {
        if (typeof title.props.children[1] === 'object'
            && typeof title.props.children[1].props.children === 'string') {
            return title.props.children[1].props.children;
        }
        if (typeof title.props.children[1] === 'string') {
            return title.props.children[1];
        }
    }
    return title;
}

export default (layout, pathname) => {
    if (_.isEmpty(layout)
        || (layout.hideBreadcrumbLinks && isHideBreadcrumb(layout.hideBreadcrumbLinks, pathname))) {
        return null;
    }

    // 从breadcrumbNameMap中查找当前pathname的配置
    const breadcrumbConfig = layout.breadcrumbNameMap && getBreadcrumbByLink(layout.breadcrumbNameMap, pathname);

    // 自定义模式下的面包屑（即type为'custom'）
    if (breadcrumbConfig && breadcrumbConfig.type === 'custom') {
        const customBreadcrumbs = breadcrumbConfig.breadcrumbs || [];
        const breadcrumbItems = customBreadcrumbs.map(breadcrumbItem => {
            const {text, link, match} = breadcrumbItem;
            const matchResult = !!link && match && breadcrumbConfig.matchResult;
            const url = matchResult ? generatePath(link, breadcrumbConfig.matchResult.params) : link;
            const content = url ? (<Link to={url}>{text}</Link>) : text;
            return <Breadcrumb.Item key={url || text}>{content}</Breadcrumb.Item>;
        });
        return breadcrumbItems;
    }

    // 通用模式下的面包屑
    const pathSnippets = pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((snippest, index) => {
        const partPathname = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        const breadcrumbItem = layout.breadcrumbNameMap && getBreadcrumbByLink(layout.breadcrumbNameMap, partPathname);
        let content = '';
        if (breadcrumbItem) {
            const {text, link} = breadcrumbItem;
            const url = !!link && (_.isBoolean(link) ? partPathname : link || partPathname);
            content = (url && index !== pathSnippets.length - 1) ? (<Link to={url}>{text}</Link>) : text;
        }
        else {
            // 从侧边栏或者头部配置中查找对应内容
            const crumbsConfig = getSidebarByLink(layout, pathname, partPathname)
                || getHeaderByLink(layout, partPathname);
            // 从头部配置中查找对应内容
            content = crumbsConfig
                ? (index === pathSnippets.length - 1
                    ? getTitleWithoutIcon(crumbsConfig.title)
                    : <Link to={partPathname}>{getTitleWithoutIcon(crumbsConfig.title)}</Link>)
                : null;
        }
        return <Breadcrumb.Item key={partPathname}>{content}</Breadcrumb.Item>;
    });
    return extraBreadcrumbItems;
};
