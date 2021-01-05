/**
 * @file 标注组件-视频|图像分类
 * @author dingyang(dingyang@baidu.com)
 */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {components} from 'baidu-acu-react-common';

import Labels from '../Labels';
import LabelCore from '../Core';
import StatusBar from '../StatusBar';
import LabelEmpty from '../LabelEmpty';

import {LABEL_DEFAULT_CONFIG, STATUS_DEFAULT_CONFIG, LABEL_EMPTY_DEFAULT_CONFIG} from '../constants/config';

import './index.less';

const Cyberplayer = components.Cyberplayer;

export default class LabelBox extends React.Component {

    propTypes = {
        wrapClassName: PropTypes.string, // 标注区间包裹的class名称（设置宽度、高度等）
        type: PropTypes.string, // 分类标注的类型【'ocr'||'video'】
        data: PropTypes.object.isRequired, // 显示数据【如果是是视频数据包含播放地址 {url: ''}】
        label: PropTypes.object, // {wrapClassName: '', data:[{text:, value:}], value:, onChange, title: '', tip: '', show: '', mode: ''}
        status: PropTypes.object, // {wrapClassName: '', okText: '保存', onOk: leftTip: '', rightTip: '',}
        labelEmpty: PropTypes.object // {wrapClassName: '', checked: true, name: '', onChange:, onOk: }
    };

    static defaultProps = {
        wrapClassName: '',
        type: 'ocr',
        data: null,
        label: LABEL_DEFAULT_CONFIG,
        status: STATUS_DEFAULT_CONFIG,
        labelEmpty: LABEL_EMPTY_DEFAULT_CONFIG
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        const {label, status, labelEmpty, wrapClassName = '', type = 'ocr', data = null} = nextProps;
        const labelConfig = _.extend(LABEL_DEFAULT_CONFIG, label);
        const statusConfig = _.extend(STATUS_DEFAULT_CONFIG, status);
        const labelEmptyConfig = _.extend(LABEL_EMPTY_DEFAULT_CONFIG, labelEmpty);

        return {
            wrapClassName,
            type,
            data,
            labelConfig,
            statusConfig,
            labelEmptyConfig
        };
    }

    /** 标签选择栏选中label-change事件
     *
     * @method handleLabelChange
     * @param {string | Array} labelId label-change的接收value,如果为多选，此处为数组
     */
    handleLabelChange = labelId => {
        // 设置labels列表的选中值
        const {labelConfig, labelEmptyConfig} = this.state;
        labelConfig.onChange(labelId);

        // 如果存在选中项
        const validLabelId = labelId instanceof Array ? labelId.length : labelId;
        if (validLabelId || labelId === 0) {
            labelEmptyConfig.onChange(false);
        }
    }

    // 根据标注id获取
    getLabelNameWithId = labelId => {
        const labels = this.state.labelConfig.data;
        const filterLabels = labels.filter(label => label.value === labelId);
        const labelName = filterLabels.length ? filterLabels[0].text : '';
        return labelName;
    }

    // statusBar子组件相关方法

    // 无标注复选框change事件
    handleNoLabelChange = checked => {
        const {labelConfig, labelEmptyConfig} = this.state;
        labelEmptyConfig.onChange(checked);
        if (checked) {
            // 如果被选中，则需要将labels清空【因为二者选其一】
            const labelMode = labelConfig.mode;
            labelConfig.onChange(labelMode === 'single' ? '' : []);
        }
    }

    // 保存事件触发
    handleSave = () => {
        const {labelConfig, labelEmptyConfig, statusConfig} = this.state;
        const data = this.state.data;
        const result = {
            data,
            noLabel: labelEmptyConfig.checked,
            labelId: labelConfig.value
        };
        statusConfig.onOk(result);
    }

    // 获取主展示区组件，type=='ocr'则为Core，type=='video'则为Cyberplayer
    getDisplayComponent() {
        const {type, data} = this.state;
        if (type === 'video') {
            // 如果type=='ocr',则videoUrl为undefined
            const videoUrl = data ? data.url : '';
            return (<div className="gdbox-video-wrap">
                <Cyberplayer
                    width="100%"
                    height="100%"
                    file={videoUrl}
                />
            </div>);
        }
        else if (type === 'ocr') {
            return (<LabelCore
                wrapClassName="gdbox-core-wrap"
                data={data}
                format="formatRectLabelPoints" // core-format.js中，供对data进行格式化【可不选，则不进行格式化】
                activeTool="pan" // 当前图片状态（绘制／浏览）
                displayField="labelName" // 标注框展示名称
            />);
        }
        return null;
    }

    render() {
        const wrapClassName = this.state.wrapClassName;
        const {
            wrapClassName: labelWrapClassName,
            value: activeLabel,
            title: labelsTitle,
            show: labelShow,
            tip: labelTip,
            data: labels,
            mode: labelMode
        } = this.state.labelConfig;
        const {
            checked: checkboxValue,
            wrapClassName: labelEmptyWrapClassName,
            name: labelEmptyName
        } = this.state.labelEmptyConfig;
        const {
            wrapClassName: statusWrapClassName,
            okText,
            leftTip,
            rightTip
        } = this.state.statusConfig;
        const displayComponent = this.getDisplayComponent();

        // 无标注配置项
        const LabelEmptyOptions = {
            wrapClassName: `gdbox-label-empty-wrap ${labelEmptyWrapClassName}`,
            checked: checkboxValue,
            name: labelEmptyName,
            onChange: value => this.handleNoLabelChange(value)
        };

        // 标注标签子组件
        const labelsOptions = {
            wrapClassName: `gdbox-labels-wrap ${labelWrapClassName}`,
            labels,
            show: labelShow,
            mode: labelMode,
            activeLabel,
            tip: labelTip,
            title: labelsTitle,
            onChange: label => this.handleLabelChange(label)
        };

        // 标注状态栏组件
        const validActiveLabel = activeLabel instanceof Array ? activeLabel.length : activeLabel;
        const statusBarOptions = {
            wrapClassName: `gdbox-statusbar-wrap ${statusWrapClassName}`,
            okText,
            leftTip, // 支持sting||react-node
            rightTip, // 支持sting||react-node
            okButtonDisabled: !checkboxValue && !(validActiveLabel || activeLabel === 0), // 意为当勾选‘无标注’|选中某个标签
            onOk: this.handleSave
        };

        return (
            <div className={`gdbox-labelbox-classify ${wrapClassName}`}>
                <div className="gdbox-labelbox-main">
                    <div className="gdbox-labelbox-core">
                        {displayComponent}
                        <StatusBar {...statusBarOptions} />
                    </div>
                    <Labels {...labelsOptions} />
                </div>
                <LabelEmpty {...LabelEmptyOptions} />
            </div>
        );
    }
}
