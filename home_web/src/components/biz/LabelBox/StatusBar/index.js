/**
 * @file 标注状态栏
 * @author dingyang(dingyang@baidu.com)

 * @props {string} wrapClassName 包裹的class名称 供自定义样式
 * @props {string} okText 按钮文案
 * @props {string} leftTip 左侧其他自定义文案或react-node
 * @props {string} leftTipClassName 左侧tip框class
 * @props {string} rightTip 右侧其他自定义文案或react-node
 * @props {string} rightTipClassName 右侧tip框class
 * @props {string} okButtonDisabled 保存按钮是否disable
 * @props {string} onOk ok按钮触发
 */

import React from 'react';
import {Button} from 'antd';

import './index.less';

export default class Labels extends React.Component {

    // 状态栏‘保存’按钮事件
    handleOnOk = () => {
        const onOk = this.props.onOk;
        onOk && onOk();
    }

    render() {
        const {
            wrapClassName,
            okText,
            leftTip,
            leftTipClassName,
            rightTip,
            rightTipClassName,
            okButtonDisabled
        } = this.props;

        return (
            <div className={`gdbox-statusbar ${wrapClassName}`}>
                <div className="gdbox-statusbar-box">
                    {leftTip && (<span className={`statusbar-tip tip-left ${leftTipClassName}`} >{leftTip}</span>)}

                    <div className="statusbar-ok-button">
                        <Button
                            type="primary"
                            disabled={!!okButtonDisabled}
                            onClick={this.handleOnOk}
                        >{okText || '保存'}</Button>
                    </div>

                    {rightTip && (<span className={`statusbar-tip tip-right ${rightTipClassName}`} >{rightTip}</span>)}
                </div>
            </div>
        );
    }
}
