/**
 * @file modules/report/finance
 * @author shj
 */

import _ from 'lodash';
import {
    Table,
    Button,
    Modal,
    message,
    Tabs,
    Select,
    Typography,
    Divider,
    Dropdown
} from 'antd';
import React from 'react';
import {
    AdvertiserAuditStatus,
    AdvertiserStatus,
    INIT_PAGESIZE
} from '../../constants/constants';
import {getPagination} from '../common/helper';


import './user.less';


const {confirm} = Modal;
const {TabPane} = Tabs;
const {Option} = Select;
const {Paragraph} = Typography;
const silenceOptions = {'X-silence': true};

/* globals React */
export default class UserList extends React.Component {

    state = {
        tabData: [],
        userList: [],
        userAgency: [],
        agencyList: [],
        messageList: [],
        pageNo: 1,
        chargeStatus: true,
        chargeItem: {},
        pageSize: INIT_PAGESIZE,
        order: 'descend',
        activeKey: 'user',
        orderBy: 'accountId',
        userInfo: {},
        userButton: {
            delete: true,
            stop: true,
            start: true
        },
        defaultSelectValue: 'ALL'
    }
    componentDidMount() {
        this.loadUserList();
        this.loadColumn();
    }
    loadUserAgency() {
        const actions = this.props.actions;
        actions.getUserAgencyList(silenceOptions).then(res => {
            this.setState({userAgency: res});
        });
    }
    // 初始化参数
    loadUserList = () => {
        const actions = this.props.actions;
        const {pageSize, pageNo, agencyId, status, orderBy, order} = this.state;
        const {accountName} = this.state;
        let param = {
            order: order === 'descend' ? 'desc' : 'asc',
            orderBy,
            pageSize,
            accountStatus: status,
            pageNo,
            status: status,
            accountName
        };
        if (agencyId !== 'ALL') {
            param.agencyId = agencyId;
        }
        actions.getUserList(param).then(result => {
            result.result.map(d => {
                if (d.balance > 0) {
                    d.balance = Math.floor(d.balance * 100) / 100;
                }
                else {
                    d.balance = -Math.floor(d.balance * -100) / 100;
                }
                return d;
            });
            this.setState({
                tabData: result
            });
        });
    }
    toHome = item => {
        // 跳转到index之前,查询basicINfo
        const {actions} = this.props;
        actions.loginAs({id: item.accountId});
        Promise.all([
            actions.loginAs({id: item.accountId}),
            actions.getAccountBasic({})
        ]).then(res => {
            sessionStorage.basicInfo = JSON.stringify(res[1]);
            this.props.history.push({pathname: '/home', parent: this, state: {item}});
        });
    }
    changeEdit = (e, item) => {
        // 改变利润率
        // 校验数字的格式
        if (!/^(0|([1-9][0-9]{0,2})|([0-9]{1,3}\.[0-9]{1,2}))$/.test(e)) {
            message.error('必须为非负数，整数部分最多3位，小数部分最多2位');
            return;
        }
        // 重新命名
        const {actions} = this.props;
        actions.changeProfitRate({accountId: item.accountId, profitRate: e / 100}).then(() => {
            this.loadUserList();
        });
    }
    loadColumn() {
        const userColumn = [
            {
                title: '账户',
                key: 'accountName',
                render: item => {
                    return (<div
                        title={item.accountName}
                        style={{maxWidth: '100px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden',
                            wordWrap: 'break-word', wordBreak: 'break-all'}}
                    >
                        <a onClick={() => this.toHome(item)}> {item.accountName}</a>
                    </div>);
                }
            },
            {
                title: '审核状态',
                key: 'auditStatus',
                render: item => {
                    const statusObj = AdvertiserAuditStatus.fromValue(item.auditStatus);
                    return (
                        <div
                            title={item.accountName}
                            style={{maxWidth: '100px', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
                                overflow: 'hidden', wordWrap: 'break-word', wordBreak: 'break-all'}}
                            className={`status ${statusObj.klass}`}
                        >
                            {statusObj.text}
                        </div>
                    );
                }
            },
            {
                title: '启用状态',
                key: 'status',
                filters: [
                    {text: '全部', value: 'ALL'},
                    {text: '启用', value: 'ENABLED'},
                    {text: '暂停', value: 'DISABLED'}
                ],
                filterMultiple: false, // 设置单选
                render: item => {
                    const statusObj = AdvertiserStatus.fromValue(item.status);
                    return (
                        <div
                            title={item.accountName}
                            style={{maxWidth: '100px', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
                                overflow: 'hidden', wordWrap: 'break-word', wordBreak: 'break-all'}}
                            className={`status ${statusObj.klass}`}
                        >
                            {statusObj.text}
                        </div>
                    );
                }
            },
            {
                title: '公司名称',
                key: 'company',
                render: item => {
                    return (<div
                        title={item.company}
                        style={{maxWidth: '100px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden',
                            wordWrap: 'break-word', wordBreak: 'break-all'}}
                    >
                        {item.company || '-'}
                    </div>);
                }
            },
            {
                title: '联系人',
                key: 'contact',
                render: item => {
                    return (<div
                        title={item.contact}
                        style={{maxWidth: '100px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden',
                            wordWrap: 'break-word', wordBreak: 'break-all'}}
                    >
                        {item.contact || '-'}
                    </div>);
                }
            },
            {
                title: '代理商',
                key: 'parentName',
                render: item => {
                    return item.parentName || '-';
                }
            },
            {
                title: '利润率',
                key: 'profitRate',
                render: item => {
                    return (<Paragraph editable={{onChange: e => this.changeEdit(e, item)}}>
                        {item.profitRate * 100} %
                    </Paragraph>);
                }
            },
            {
                title: '昨日消费(元)',
                sorter: true,
                key: 'yesterdayCharge',
                render: row => {
                    if (row.chargeTrend === 'UP') {
                        // 提高
                        return (<span>{row.yesterdayCharge}
                            <span style={{color: 'green', fontSize: 15, textAlign: 'center'}}>↑</span></span>);
                    }
                    else if (row.chargeTrend === 'DOWN') {
                        // 减少
                        return (<span>{row.yesterdayCharge}
                            <span style={{color: 'red', fontSize: 15, textAlign: 'center'}}>↓</span></span>);
                    }
                    else {
                        return (<span>{row.yesterdayCharge}
                            <span style={{color: 'gray', fontSize: 15, textAlign: 'center'}}>→</span></span>);

                    }
                }
            },
            {
                title: '当前余额(元)',
                sorter: true,
                key: 'balance',
                dataIndex: 'balance',
                render: item => item.toFixed(2)
            },
            {
                title: '操作',
                key: 'operate',
                render: item => {
                    const isShow = item.balance < 0.01;
                    return (<span>
                        <span ><a onClick={() => this.doAction('charge', item)}>充值 </a></span>
                        <span ><a disabled={isShow} onClick={() => this.doAction('withdraw', item)}>退款 </a></span>
                        <span ><a onClick={() => this.doAction('detail', item)}>详情 </a></span>
                    </span>);
                }
            }
        ];
        let basicInfo = {};
        if (sessionStorage.basicInfo) {
            basicInfo = JSON.parse(sessionStorage.basicInfo);
        }
        if (basicInfo.role === 'AGENCY') {
            userColumn.splice(6, 1);
        }
        this.setState({
            userColumn
        });
    }
    onTableChange(pagination, filter, sorters) {
        const {current, pageSize} = pagination;
        const {status, order, orderBy} = this.state;
        let param = {
            status
        };
        _.each(['status'], item => {
            if (filter[item]) {
                if (filter[item][0] === 'ALL') {
                    delete param[item];
                }
                else {
                    param[item] = filter[item][0];
                }
            }
        });
        if (sorters.order) {
            param.orderBy = sorters.column.key;
            param.order = sorters.order;
        }
        else {
            param.orderBy = orderBy;
            param.order = order;
        }
        this.setState({
                pageSize: pageSize,
                pageNo: current,
                status: param.status,
                orderBy: param.orderBy,
                order: param.order
            },
            () => {
                this.loadUserList();
            });
    }
    addModal = () => {
        this.setState({showAddModel: true});
    }
    addAgencyModal = () => {
        this.setState({showAddAgency: true});
    }
    addMessageModal = () => {
        this.setState({showAddMessage: true});
    }
    editModal = item => {
        this.setState({showModal: true});
    }
    handleCancel = () => {
        this.setState({
            showAddModel: false,
            showModal: false,
            showAddAgency: false,
            showAddMessage: false,
            showChargeModel: false,
            showWthdrawModel: false,
            errorMsg: ''
        });
    }
    doAction = (d, item) => {
        const _this = this;
        if (d === 'charge') {
            // 充值
            this.setState({chargeItem: item, showChargeModel: true});
            this.loadUserList();
        }
        else if (d === 'withdraw') {
            this.setState({chargeItem: item, showWthdrawModel: true});
            this.loadUserList();
        }
        else if (d === 'detail') {
            this.props.history.push({pathname: '/userDetail', state: {item}});
        }
        else if (d === 'agency') {
            this.props.history.push({pathname: '/agencyDetail', parent: this, state: {item}});
        }
        else if (d === 'showUser') {
            this.changeTabs('user');
            this.setState({agencyId: item.accountId, defaultSelectValue: item.accountId},
                () => {
                    this.loadUserList();
                    this.loadUserAgency();
                });
        }
        else if (d === 'showAgency') {
            this.props.history.push({pathname: '/userList', activeKey: 'agency'});
        }
    }
    filterOptions = (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

    initSelected = () => {
        this.setState({selectedRowKeys: [], userButton: {
                delete: true,
                stop: true,
                start: true
            }});
    }
    deleteConfirm = () => {
        const {selectedRowKeys} = this.state;
        const _this = this;
        confirm({
            title: ' ',
            content: '您是否确定删除该账户？',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                const actions = _this.props.actions;
                // 获取到所选择的id
                actions.deleteUser({idList: selectedRowKeys}).then(() => {
                    _this.loadUserList();
                    _this.initSelected();
                });
            }
        });
    }
    startConfirm = () => {
        const _this = this;
        const {selectedRowKeys} = this.state;
        confirm({
            title: ' ',
            content: '您是否确定启用该账户？',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                const actions = _this.props.actions;
                // 获取到所选择的id
                actions.startUser({idList: selectedRowKeys}).then(() => {
                    _this.loadUserList();
                    _this.initSelected();
                });
            }
        });
    }
    stopConfirm() {
        const _this = this;
        confirm({
            title: ' ',
            content: '您是否确定停止该账户使用？',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                const actions = _this.props.actions;
                // 获取到所选择的id
                const selectedRowKeys = _this.state.selectedRowKeys;
                actions.stopUser({idList: selectedRowKeys}).then(() => {
                    _this.loadUserList();
                    _this.initSelected();
                });
            }
        });
    }
    onRowChange = (selectedRowKeys, selectedRows) => {
        if (selectedRows[0]) {
            let deleteStatus = false;
            let stopStatus = false;
            let startStatus = false;
            _.each(selectedRows, function (val) {
                const {status, balance} = val;
                if (status === 'DISABLED') {
                    stopStatus = true;
                }
                if (status === 'ENABLED') {
                    startStatus = true;
                }
                if (balance > 0) {
                    deleteStatus = true;
                }
            });
            let userButton = {
                delete: deleteStatus,
                stop: stopStatus,
                start: startStatus
            };
            this.setState({
                selectedRowKeys,
                userButton
            });
        }
        else {
            const userButton = {
                delete: true,
                start: true,
                stop: true
            };
            this.setState({
                selectedRowKeys,
                userButton
            });
        }
    }
    changeSelect = e => {
        // 重新加载数据
        this.setState({agencyId: e},
            () => {
                this.loadUserList();
            });
    }
    changeCharge = e => {
        const errorMsg = '范围[0.01, 100,000,000]，最多可输入2位小数';
        const value = e.target.value;
        const reg = /^\d+(.\d{1,2})?$/;
        if (reg.test(value)) {
            // 数字
            const doubleValue = parseFloat(value).toFixed(2);
            // 判断范围
            if (doubleValue >= 0.01 && doubleValue <= 100000000) {
                // 范围[0.01, 100,000,000]
                this.setState({errorMsg: '', chargeStatus: false, amount: doubleValue * 100000});
            }
            else {
                this.setState({errorMsg, chargeStatus: true});
            }
        }
        else {
            this.setState({errorMsg, chargeStatus: true});
            // 不是数字
        }
    }
    doCharge = () => {
        const {actions} = this.props;
        const {chargeItem, amount} = this.state;
        const param = {
            amount: amount,
            accountId: chargeItem.accountId,
            more: true
        };
        actions.accountCharge(param).then(res => {
                message.success('充值成功');
                // 关闭modal
                this.handleCancel();
                // 刷新列表
                this.loadUserList();
            },
            res => {
                message.error(res.global);
            });
    }
    changeWithdraw = e => {
        const {chargeItem} = this.state;
        const errorMsg = '范围[0.01, 100,000,000]，最多可输入2位小数,不可超过余额';
        const value = e.target.value;
        const reg = /^\d+(.\d{1,2})?$/;
        if (reg.test(value)) {
            // 数字
            const doubleValue = parseFloat(value);
            // 判断范围
            if (doubleValue >= 0.01 && doubleValue <= 100000000 && doubleValue <= chargeItem.balance) {
                // 范围[0.01, 100,000,000]
                this.setState({errorMsg: '', chargeStatus: false, amount: doubleValue * 100000});
            }
            else {
                this.setState({errorMsg, chargeStatus: true});
            }
        }
        else {
            this.setState({errorMsg, chargeStatus: true});
            // 不是数字
        }
    }
    doWithdraw = () => {
        const {actions} = this.props;
        const {chargeItem, amount} = this.state;
        const param = {
            amount: -amount,
            accountId: chargeItem.accountId,
            more: false
        };
        actions.accountCharge(param).then(res => {
                message.success('提现成功');
                // 关闭modal
                this.handleCancel();
                // 刷新列表
                this.loadUserList();
            },
            res => {
                message.error(res.global);
            });
    }
    changeTabs = e => {
        console.log(e);
        this.setState({activeKey: e});
        if (e === 'user') {
            this.loadUserAgency();
        }
    }
    render() {
        // tab数据
        const {userColumn, userInfo, tabData, pageSize, errorMsg} = this.state;
        const {selectedRowKeys, userButton, chargeItem, userAgency, agencyId} = this.state;
        const {chargeStatus, activeKey} = this.state;
        const listData = tabData.result;
        const pagination = getPagination(tabData, pageSize);
        let agencySelect = userAgency.map(d => <Option key={d.id} value={d.id}>{d.name}</Option>);
        agencySelect.unshift(<Option value='ALL'>全部</Option>);
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onRowChange
        };
        let basicInfo = {};
        return (
            <div>
                <Tabs activeKey={activeKey} onChange={this.changeTabs} type='card'>
                    <TabPane tab={<span style={{fontSize: 16}}>广告主管理</span>} key="user">
                        <span className='head-title'>广告主列表</span>
                        <Divider />
                        <Table
                            style={{marginTop: 10}}
                            dataSource={listData}
                            rowSelection={rowSelection}
                            columns={userColumn}
                            pagination={pagination}
                            onChange={(e, a, b) => this.onTableChange(e, a, b)}
                            rowKey='accountId'
                        />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
