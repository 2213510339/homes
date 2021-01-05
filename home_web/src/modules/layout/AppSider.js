/**
 * @file AppSider
 * @author zhangzhe
 * @author chenbo09
 */

import {Link} from 'react-router-dom';
import {Layout, Menu, Icon} from 'antd';
import _ from 'lodash';
import {utils} from 'baidu-acu-react-common';

import {
    getCurrentSidebarConfig,
    getSidebarLevel,
    getDefaultSidebarOpenKeys,
    getCurrentSidebarItem,
    getCurrentSidebarParentKey
} from './utils';

const SubMenu = Menu.SubMenu;
const Sider = Layout.Sider;
const isAbsolutePath = utils.browserUtil.isAbsolutePath;

function createMenuItem(menu) {
    return (
        <Menu.Item key={menu.key}>
            {isAbsolutePath(menu.link) || menu.external ? (
                <a href={menu.link} target={menu.target}>{menu.title}</a>
            ) : (
                <Link to={menu.link} target={menu.target}>{menu.title}</Link>
            )}
        </Menu.Item>
    );
}

/* globals React */
export default class AppSider extends React.Component {

    state = {
        openKeys: []
    }

    getSidebarInfo(layout, pathname) {
        // 获取当前侧边栏的配置
        const sidebarConfig = getCurrentSidebarConfig(layout, pathname);
        if (sidebarConfig) {
            // 当前侧边栏的层级
            const level = getSidebarLevel(sidebarConfig);
            // 当前选中的侧边栏
            const currentSidebarItem = getCurrentSidebarItem(sidebarConfig, pathname);
            // 默认打开项
            const defaultOpenKeys = level > 1 ? getDefaultSidebarOpenKeys(sidebarConfig, pathname) : [];
            return {
                sidebarConfig,
                currentSidebarItem,
                defaultOpenKeys
            };
        }
        return null;
    }

    componentDidMount() {
        const {layout, pathname} = this.props;
        if (!_.isEmpty(layout)) {
            const sidebarInfo = this.getSidebarInfo(layout, pathname);
            this.initOpenKeys(sidebarInfo);
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        // 初始化openKeys
        const {layout: currentLayout, pathname: currentPathname} = this.props;
        const {layout: nextLayout, pathname: nextPathname, collapsed} = nextProps;
        const currentSidebarInfo = this.getSidebarInfo(currentLayout, currentPathname);
        const nextSidebarInfo = this.getSidebarInfo(nextLayout, nextPathname);
        if (!collapsed && (!_.isEqual(currentLayout, nextLayout)
            || (!currentSidebarInfo && nextSidebarInfo)
            || (currentSidebarInfo && !nextSidebarInfo)
            || (currentSidebarInfo && nextSidebarInfo
                && !_.isEqual(currentSidebarInfo.sidebarConfig, nextSidebarInfo.sidebarConfig)))
        ) {
            this.initOpenKeys(nextSidebarInfo);
        }

        // 当前页面的父节点必须打开
        if (!collapsed && nextPathname !== currentPathname && nextSidebarInfo) {
            const currentSidebarParentKey = getCurrentSidebarParentKey(nextSidebarInfo.sidebarConfig, nextPathname);
            const openKeys = this.state.openKeys;
            if (currentSidebarParentKey && !_.includes(openKeys, currentSidebarParentKey)) {
                this.setState({openKeys: [...openKeys, currentSidebarParentKey]});
            }
        }
    }

    initOpenKeys(sidebarInfo) {
        const defaultOpenKeys = sidebarInfo ? sidebarInfo.defaultOpenKeys : [];
        this.setState({openKeys: defaultOpenKeys});
        // 同时需要更新hasSidebar值 zhangzhe 2018-01-15
        const onSidebarChange = this.props.onSidebarChange;
        const hasSidebar = !!sidebarInfo;
        onSidebarChange(hasSidebar);
    }

    onOpenChange = openKeys => {
        this.setState({openKeys});
    }

    onCollapse = collapsed => {
        const onCollapse = this.props.onCollapse;
        if (collapsed) {
            this.setState({openKeys: []});
        }
        onCollapse(collapsed);
    }

    render() {
        const {layout, pathname, collapsed} = this.props;
        const sidebarInfo = this.getSidebarInfo(layout, pathname);
        const openKeys = this.state.openKeys;

        const titleContainer = (
            <div className="title-container">
                <Link to="/">
                    <div className="logo" />
                    {layout.headerTitle && (
                        <div className="title">{layout.headerTitle}</div>
                    )}
                </Link>
            </div>
        );
        const triggerIcon = collapsed ? <Icon type="menu-unfold" /> : (
            <div>
                <Icon type="menu-fold" />
                <span>展开/收起</span>
            </div>
        );
        if (sidebarInfo) {
            const {sidebarConfig, currentSidebarItem} = sidebarInfo;
            return (
                <Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={this.onCollapse}
                    trigger={triggerIcon}
                >
                    {titleContainer}
                    <Menu
                        theme="light"
                        mode="inline"
                        openKeys={openKeys}
                        selectedKeys={currentSidebarItem ? [currentSidebarItem.key] : []}
                        style={{height: '100%', borderRight: 0}}
                        onOpenChange={this.onOpenChange}
                    >
                        {_.map(sidebarConfig, sidebar => {
                            if (sidebar.subMenus) {
                                return (
                                    <SubMenu
                                        key={sidebar.key}
                                        title={sidebar.title}
                                    >
                                        {_.map(sidebar.subMenus, subMenu => createMenuItem(subMenu))}
                                    </SubMenu>
                                );
                            }
                            return createMenuItem(sidebar);
                        })}
                    </Menu>
                </Sider>
            );
        }
        return titleContainer;
    }
}
