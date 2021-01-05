/**
 * @file 组件相关配置
 * @author dingyang
 */

// Classify Detection两类组件公共基础默认配置项
// 标签栏默认配置项
export const LABEL_DEFAULT_CONFIG = {
    wrapClassName: '',
    title: '选择标签',
    data: [],
    value: '',
    show: 'flow', // 'normal' || 'flow'
    tip: '',
    mode: 'single', // 'multiple' || 'single'
    onChange: () => {}
};

// 状态栏默认配置项
export const STATUS_DEFAULT_CONFIG = {
    wrapClassName: '',
    okText: '保存',
    leftTip: '',
    rightTip: '',
    checked: false, // 未标注复选框的value值
    onChange: () => {}, // checkbox-change-trigger
    onOk: () => {} // okButton-click-trigger
};

// LabelEmpty 无标注默认
export const LABEL_EMPTY_DEFAULT_CONFIG = {
    wrapClassName: '',
    name: '无标注',
    checked: false, // 未标注复选框的value值
    onChange: () => {} // checkbox-change-trigger
};
