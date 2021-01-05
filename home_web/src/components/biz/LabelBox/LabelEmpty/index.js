/**
 * @file 无标注子组件
 * @author dingyang(dingyang@baidu.com)

 * @props {string} wrapClassName 包裹的class名称 供自定义样式
 * @props {string} checked 无标注复选框的checked值
 * @props {string} name 复选框名称
 * @props {function} onChange checkbox-change-trigger
 */

import React from 'react';
import {Checkbox} from 'antd';

import './index.less';

export default class Labels extends React.Component {
    // checkbox-change trigger
    handleCheckboxValueChange = e => {
        const checked = e.target.checked;
        const onChange = this.props.onChange;
        onChange && onChange(checked);
    }

    render() {
        const {wrapClassName, checked, name} = this.props;

        return (
            <div className={`gdbox-empty-label ${wrapClassName}`}>
                <span className="label-none-check">
                    <Checkbox
                        checked={checked}
                        onChange={this.handleCheckboxValueChange}
                    >{name || '无标注'}</Checkbox>
                </span>
            </div>
        );
    }
}
