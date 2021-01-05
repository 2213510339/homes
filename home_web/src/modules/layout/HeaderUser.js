/**
 * @file HeaderUser
 * @author sunwen05
 */

import _ from 'lodash';
import {Avatar, Dropdown, Menu, Icon, message, Button} from 'antd';

import './HeaderUser.less';
/* globals React */
export default class HeaderUser extends React.Component {

    handleLogout = () => {
        const actions = this.props.actions;
        actions.userLogout().then(() => {
            this.props.history.push('/dsp/login.html');
        });
    }

    render() {
        return (
            <span className='top-right'>
                <a style={{fontSize: 15}} onClick={this.handleLogout}>
                    <Icon type="poweroff" />退出
                </a>
            </span>
        );
    }
}
