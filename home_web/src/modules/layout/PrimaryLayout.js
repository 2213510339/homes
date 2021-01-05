/**
 * @file modules/layout/PrimaryLayout
 * @author zhangzhe(zhangzhe@baidu.com)
 */

import {Layout} from 'antd';
import _ from 'lodash';

import layoutConfig from 'configure/layout';

import AppHeader from './AppHeader';
import AppSider from './AppSider';
import AppMain from './AppMain';
import {getRealPathname, hasHeader} from './utils';

/* globals React */
export default class PrimaryLayout extends React.Component {

    state = {
        collapsed: false, // 侧边栏是否收起
        hasSidebar: true
    }

    componentDidMount() {
        console.log('aaa');
        const actions = this.props.actions;
        if (_.isEmpty(this.props.layout)) {
            // 初始化更新layout配置
            actions.updateLayout(layoutConfig);
            if (!sessionStorage.username) {
                this.props.history.push('/dsp/login.html');
            }
        }
    }

    onCollapse = collapsed => {
        this.setState({collapsed});
    }

    onSidebarChange = hasSidebar => {
        this.setState({hasSidebar});
    }

    render() {
        let pathname = this.props.location.pathname;
        const layout = this.props.layout;
        // 如果pathname === '/' 以默认首页pathname复制给它
        pathname = getRealPathname(layout, pathname);
        const {collapsed, hasSidebar} = this.state;
        let layoutClassName = collapsed ? 'primary-layout primary-layout-collapsed' : 'primary-layout';
        layoutClassName += hasSidebar ? ' with-sidebar' : ' without-sidebar';
        // 是否需要显示title
        layoutClassName += hasHeader(layout, pathname) ? ' with-title-container' : ' without-title-container';

        return (
            <Layout className={layoutClassName}>
                <AppSider
                    layout={layout}
                    pathname={pathname}
                    collapsed={collapsed}
                    onCollapse={this.onCollapse}
                    onSidebarChange={this.onSidebarChange}
                />
                <Layout className="main-layout">
                    <AppHeader layout={layout} pathname={pathname} />
                    <AppMain layout={layout} pathname={pathname} />
                </Layout>
            </Layout>
        );
    }
}
