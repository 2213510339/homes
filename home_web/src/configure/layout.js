/**
 * @file configure/layout
 * @author zhangzhe(zhangzhe@baidu.com)
 */

import {Icon} from 'antd';

export default {
    defaultIndex: '/login',
    headerTitle: 'DSPBIZ',
    hideHeaderLinks: [
        '/login',
        '/dspbiz/login.html',
        '/userList'
        // '/userDetail'
        // '/agencyDetail'
    ], // 需要隐藏头部的url
    hideSidebarLinks: [
        '/login',
        '/dspbiz/login.html',
        '/userDetail',
        '/userList',
        '/agencyDetail'
    ], // 需要隐藏侧边栏的url
    hideBreadcrumbLinks: [
        '/home',
        '/userList',
        '/userDetail',
        '/agencyDetail'
    ], // 需要隐藏面包屑的url
    sidebar: [
        {
            key: '/home',
            title: (<span><Icon type="home" /><span>首页</span></span>),
            link: '/home'
        },
        {
            key: 'adlib',
            title: (<span><Icon type="table" /><span>投放管理</span></span>),
            defaultOpen: true,
            subMenus: [
                {
                    key: '/adlib/plan/list',
                    title: '投放计划',
                    link: '/adlib/plan/list'
                },
                {
                    key: '/adlib/unit/list',
                    title: '投放单元',
                    link: '/adlib/unit/list'
                },
                {
                    key: '/adlib/idea/list',
                    title: '投放创意',
                    link: '/adlib/idea/list'
                },
                {
                    key: '/adlib/keyword/list',
                    title: '关键词',
                    link: '/adlib/keyword/list'
                }
            ]
        },
        {
            key: '/summary',
            title: (<span><Icon type="account-book" /><span>账单明细</span></span>),
            link: '/summary'
        },
        {
            key: '/report',
            title: (<span><Icon type="fund" /><span>数据报表</span></span>),
            defaultOpen: true,
            subMenus: [
                {
                    key: '/report/all',
                    title: '总体数据',
                    link: '/report/all'
                },
                {
                    key: '/report/plan',
                    title: '投放计划数据',
                    link: '/report/plan'
                },
                {
                    key: '/report/unit',
                    title: '投放单元数据',
                    link: '/report/unit'
                },
                {
                    key: '/report/idea',
                    title: '投放创意数据',
                    link: '/report/idea'
                },
                {
                    key: '/report/action',
                    title: '转化数据',
                    link: '/report/action'
                },
                {
                    key: '/report/custom',
                    title: '自定义报表',
                    link: '/report/custom'
                }
            ]
        }
    ],
    // 面包屑
    breadcrumbNameMap: {
        '/home': {
            text: '首页',
            link: '/home'
        },
        '/adlib/idea/ideaForm': {
            text: '创意详情',
            link: true
        },
        '/adlib': {
            text: '投放管理',
            link: '/adlib/plan/list'
        },
        '/adlib/plan/list': {
            text: '计划列表',
            link: true
        },
        '/adlib/unit/list': {
            text: '单元列表',
            link: true
        },
        '/adlib/idea/list': {
            text: '创意列表',
            link: true
        },
        '/adlib/keyword/list': {
            text: '关键词列表',
            link: true
        },
        '/report': {
            text: '数据报表',
            link: '/report/all'
        },
        '/report/all': {
            text: '总体报表',
            link: true
        },
        '/report/plan': {
            text: '投放计划',
            link: true
        },
        '/report/unit': {
            text: '投放单元',
            link: true
        },
        '/report/idea': {
            text: '投放创意',
            link: true
        },
        '/report/action': {
            text: '转化数据',
            link: true
        },
        '/report/custom': {
            text: '自定义报表',
            link: true
        }
    }
};
