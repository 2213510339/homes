/**
 * @file 标注工具栏
 * @author dingyang(dingyang@baidu.com)

 * @props {string} wrapClassName 包裹的class名称 供自定义样式
 * @props {string} show 展示样式 'normal' || 'flow' 普通布局 || 流布局
 * @props {string} mode 模式选择 'multiple' || 'single' 支持多选或单选
 * @props {array} labels 标签列表选择项[{text: ,value: }, ...]
 * @props {string} activeLabel 当前激活的选中项
 * @props {string || react-node} title 标题
 * @props {string || react-node} tip 标题右侧tip提示
 * @props {function} onChange 当标签发生变化时触发
 */

import React from 'react';
import RadioLabels from './show/Radio';
import CheckboxLabels from './show/Checkbox';
import RadioCheckboxLabels from './show/RadioCheckbox';

import './index.less';

export default class Labels extends React.Component {

    // labels选中项change触发
    onLabelChange = label => {
        const onLabelChange = this.props.onChange;
        onLabelChange && onLabelChange(label);
    }

    render() {
        const {wrapClassName, labels = [], show = 'normal', mode = 'single', activeLabel, title, tip} = this.props;
        const labelOptions = {
            labels,
            mode,
            activeLabel,
            title,
            tip,
            onChange: label => this.onLabelChange(label)
        };
        return (
            <div className={`gdbox-labels ${wrapClassName}`}>
                {(show === 'normal' && mode === 'single') && <RadioLabels {...labelOptions} />}
                {(show === 'normal' && mode === 'multiple') && <CheckboxLabels {...labelOptions} />}
                {show === 'flow' && <RadioCheckboxLabels {...labelOptions} />}
            </div>
        );
    }
}
