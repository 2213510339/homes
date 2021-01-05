/**
 * @file 标注工具栏
 * @author dingyang(dingyang@baidu.com)

 * @props {array} labels 标签列表选择项[{text: ,value: }, ...]
 * @props {string} mode 模式选择 'multiple' || 'single' 支持多选或单选
 * @props {string || array} activeLabel 当前激活的选中项，兼容单选或者多选
 * @props {string || react-node} title 标题
 * @props {string || react-node} tip 标题右侧tip提示
 * @props {function} onChange 当标签发生变化时触发
 */

import React from 'react';

import './RadioCheckbox.less';

export default class Labels extends React.Component {

    // 判断当前label是否处于active态
    isActiveLabel(label) {
        const mode = this.props.mode || 'single';
        const activeLabel = this.props.activeLabel;
        if (mode === 'single') {
            return activeLabel === label;
        }
        const activeLabels = activeLabel instanceof Array ? activeLabel : [];
        return activeLabels.includes(label);
    }

    // 获取当前激活的classname
    getActiveClassName(label) {
        return this.isActiveLabel(label) ? 'labels-item-active' : '';
    }

    // 获取disable之classname
    getDisabledClassName(disabled) {
        return disabled ? 'labels-item-disabled' : '';
    }

    // labels选中项change触发
    onLabelChange = labelValue => {
        const onLabelChange = this.props.onChange;
        onLabelChange && onLabelChange(labelValue);
    }

    // 标签项单击触发
    handleLabelItemCheck = value => {
        const isActiveLabel = this.isActiveLabel(value);
        const mode = this.props.mode || 'single';
        const activeLabel = this.props.activeLabel;

        if (isActiveLabel && mode === 'single') {
            // 说明当前label处于选中态，并且是单选再次单击，此时并未触发change事件
            return;
        }
        if (isActiveLabel && mode === 'multiple') {
            // 说明当前label处于选中态，并且是单选再次单击，此时应该删除该标签并触发onchange
            const activeLabels = activeLabel instanceof Array ? activeLabel : [];
            const changeActiveLabels = activeLabels.filter(label => label !== value);
            this.onLabelChange(changeActiveLabels);
            return;
        }

        if (!isActiveLabel && mode === 'single') {
            // 说明当前label处于未选中态，并且是单选再次单击，此时触发change事件
            this.onLabelChange(value);
            return;
        }

        if (!isActiveLabel && mode === 'multiple') {
            const activeLabels = activeLabel instanceof Array ? activeLabel : [];
            const changeActiveLabels = [...activeLabels, value];
            this.onLabelChange(changeActiveLabels);
        }
    }

    render() {
        const {labels = [], title, tip} = this.props;

        return (
            <div className="gdbox-labels-inner gdbox-labels-radio-checkbox">
                <div className="gdbox-labels-box">
                    <div className="labels-title-container">
                        <span className="labels-title">{title || '选择标签'}</span>
                        <span className="labels-tip">{tip}</span>
                    </div>
                    <div className="labels-items">
                        <ul className="labels-all">{
                            labels.map(item => {
                                const {value, disabled} = item;
                                const activeClassName = this.getActiveClassName(value);
                                const disabledClassName = this.getDisabledClassName(!!disabled);
                                const eventOptions = disabled ? {} : {onClick: () => this.handleLabelItemCheck(value)};

                                return (<li
                                    key={item.value}
                                    disabled={!!disabled}
                                    className={`labels-item ${activeClassName} ${disabledClassName}`}
                                    value={item.value}
                                    {...eventOptions}
                                >{item.text}</li>);
                            })
                        }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
