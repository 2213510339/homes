/**
 * @file 标注标签栏-复选框
 * @author dingyang(dingyang@baidu.com)

 * @props {array} labels 标签列表选择项[{text: ,value: }, ...]
 * @props {string} activeLabel 当前激活的选中项
 * @props {string || react-node} title 标题
 * @props {string || react-node} tip 标题右侧tip提示
 * @props {function} onChange 当标签发生变化时触发
 */

import React from 'react';
import {Checkbox} from 'antd';

import './Checkbox.less';

export default class Labels extends React.Component {
    // 获取当前激活的classname
    getActiveClassName(label) {
        const activeLabel = this.props.activeLabel || '';
        return activeLabel === label ? 'labels-item-active' : '';
    }

    // 获取disable之classname
    getDisabledClassName(disabled) {
        return disabled ? 'labels-item-disabled' : '';
    }

    // labels选中项change触发
    onLabelChange = values => {
        const onLabelChange = this.props.onChange;
        onLabelChange && onLabelChange(values);
    }

    render() {
        const {labels = [], activeLabel = [], title, tip} = this.props;

        return (
            <div className="gdbox-labels-inner gdbox-labels-radio">
                <div className="gdbox-labels-box">
                    <div className="labels-title-container">
                        <span className="labels-title">{title || '选择标签'}</span>
                        <span className="labels-tip">{tip}</span>
                    </div>
                    <div className="labels-items">
                        <Checkbox.Group
                            className="labels-all"
                            value={activeLabel}
                            onChange={this.onLabelChange}
                        >{
                            labels.map(item => {
                                const {value, disabled} = item;
                                const activeClassName = this.getActiveClassName(value);
                                const disabledClassName = this.getDisabledClassName(!!disabled);
                                return (<Checkbox
                                    key={item.value}
                                    disabled={!!disabled}
                                    className={`labels-item ${activeClassName} ${disabledClassName}`}
                                    value={item.value}
                                >{item.text}</Checkbox>);
                            })
                        }
                        </Checkbox.Group>
                    </div>
                </div>
            </div>
        );
    }
}
