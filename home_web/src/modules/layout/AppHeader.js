/**
 * @file AppHeader
 * @author zhangzhe
 * @author chenbo09
 */

import {Link} from 'react-router-dom';
import {Layout, Menu} from 'antd';

import HeaderUser from 'containers/layout/HeaderUser';

import {getCurrentHeader} from './utils';

const Header = Layout.Header;

export default props => {
    const {layout, pathname} = props;
    // 当前选中header项
    const currentHeader = getCurrentHeader(layout, pathname);

    return (
        <Header className="header">
            {layout.header && (
                <Menu
                    theme="light"
                    mode="horizontal"
                    selectedKeys={currentHeader && currentHeader.key}
                >
                    {layout.header.map(header => (
                        <Menu.Item key={header.key}>
                            <Link to={header.link}>{header.title}</Link>
                        </Menu.Item>
                    ))}
                </Menu>
            )}
            {layout.hideHeaderLinks && (
                <HeaderUser hideHeaderLinks={layout.hideHeaderLinks} />
            )}
        </Header>
    );
};
