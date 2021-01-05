/**
 * @file 标注组件-目标检测
 * @author dingyang(dingyang@baidu.com)
 */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {message, Modal} from 'antd';

import ToolBar from '../ToolBar';
import LabelCore from '../Core';
import Labels from '../Labels';
import StatusBar from '../StatusBar';
import LabelEmpty from '../LabelEmpty';

import {LABEL_DEFAULT_CONFIG, STATUS_DEFAULT_CONFIG, LABEL_EMPTY_DEFAULT_CONFIG} from '../constants/config';

import './index.less';

export default class OcrDetection extends React.Component {

    propTypes = {
        wrapClassName: PropTypes.string, // wrapClassName 标注区间包裹的class名称（设置宽度、高度等）
        data: PropTypes.object.isRequired, // 标注数据
        label: PropTypes.object, // {data:[{text:, value:}], value:, onChange, title: '', tip: ''}
        status: PropTypes.object, // {okText: '保存', onOk: , leftTip: '', rightTip: ''}
        labelEmpty: PropTypes.object // {wrapClassName: '', checked: true, name: '', onChange:, onOk: }
    };

    static defaultProps = {
        wrapClassName: '',
        data: null,
        label: LABEL_DEFAULT_CONFIG,
        status: STATUS_DEFAULT_CONFIG,
        labelEmpty: LABEL_EMPTY_DEFAULT_CONFIG
    };

    state = {
        features: [],
        activeTool: 'pan'
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        const {label, status, labelEmpty, wrapClassName = '', data = null} = nextProps;
        const labelConfig = _.extend(LABEL_DEFAULT_CONFIG, label);
        const statusConfig = _.extend(STATUS_DEFAULT_CONFIG, status);
        const labelEmptyConfig = _.extend(LABEL_EMPTY_DEFAULT_CONFIG, labelEmpty);

        return {
            wrapClassName,
            data,
            labelConfig,
            statusConfig,
            labelEmptyConfig
        };
    }

    // 工具栏change事件监听
    handleToolBarChange = type => {
        switch (type) {
            case 'drawRect':
            case 'pan':
                this.setState({activeTool: type});
                break;
            case 'zoomin':
            case 'zoomout':
                this.labelCoreChild && this.labelCoreChild.zoom(type);
                break;
        }
    }

    /** 标签选择栏选中label-change事件
     *
     * @method handleLabelChange
     * @param {string} labelId label-change的接收value
     */
    handleLabelChange = labelId => {
        // 设置labels列表的选中值
        this.setLabelId(labelId);

        // 判断是否存在选中的feature,如果存在，需要对更新其属性数据
        const labelName = this.getLabelNameWithId(labelId);
        const newFeatureInfo = {labelId, labelName};
        this.labelCoreChild && this.labelCoreChild.updateSelectedFeatureInfo(newFeatureInfo);
    }
    // 设置labels列表选中的label
    setLabelId = labelId => {
        // 设置labels列表的选中值
        const labelConfig = this.state.labelConfig;
        const labels = labelConfig.data;
        const filterLabels = labels.filter(label => label.value === labelId);
        const activeLabel = filterLabels.length ? labelId : ''; // 重置labels列表中选中项
        labelConfig.onChange(activeLabel);
    }
    // 根据标注id获取
    getLabelNameWithId = labelId => {
        const labels = this.state.labelConfig.data;
        const filterLabels = labels.filter(label => label.value === labelId);
        const labelName = filterLabels.length ? filterLabels[0].text : '';
        return labelName;
    }

    // core子组件相关方法

    /** 在绘制的举行添加到图层之前进行合法性校验
     *
     * @method isGeometryValid
     * @param {Array} points 绘制的坐标数值
     * @return {Bool} 校验结果返回
     */
    isGeometryValid(points) {
        const checkboxValue = this.state.labelEmptyConfig.checked;
        const activeLabel = this.state.labelConfig.value;
        // 1、首先进行是否选择标签进行绘制校验
        let minX = points[0].x;
        let maxX = points[0].x;
        let minY = points[0].y;
        let maxY = points[0].y;
        points.forEach(point => {
            const {x, y} = point.x;
            minX = x <= minX ? x : minX;
            maxX = x >= maxX ? x : maxX;
            minY = y <= minY ? y : minY;
            maxY = y >= maxY ? y : maxY;
        });
        const dltx = maxX - minX;
        const dlty = maxY - minY;
        if (dltx < 10 || dlty < 10) {
            // [TODO]  说明绘制的矩形太小【此处待后续调整-暂时先做放行】
        }

        // 2、其次进行举行大小逻辑限制
        if (!activeLabel) {
            return {flag: false, msg: '请首先选择标签'};
        }

        // 3、验证‘无标注’标签是否被选中【如果被选中，不允许进行绘制】
        if (checkboxValue) {
            return {flag: false, msg: '请首先关闭‘无标注’标签'};
        }

        return {flag: true, msg: ''};
    }

    /** 在绘制矩形框完成之前触发过滤函数
     *
     * @method beforeDrawGeometryAdd
     * @param {Array} points 绘制的坐标数值
     * @return {Object} {flag:,info:} 固定返回格式，flag标识是否继续进行要素添加，info为要素插入属性数据
     */
    beforeDrawGeometryAdd(points) {
        const validGeometry = this.isGeometryValid(points);
        const {flag, msg} = validGeometry;
        const labelId = this.state.labelConfig.value;
        const labelName = this.getLabelNameWithId(labelId);
        const featureInfo = {labelId, labelName};
        if (!flag) {
            message.warning(msg);
        }
        return {flag, info: featureInfo};
    }

    /** 标注框选中触发
     *
     * @method onFeatureSelected
     * @param {gDBox.Feature.Polygon} feature 选中的要素
     */
    onFeatureSelected = feature => {
        const selectedFeatureLabelId = feature.data.labelId || '';
        this.setLabelId(selectedFeatureLabelId);
    }

    /** 在绘制的举行添加到图层之前进行合法性校验
     *
     * @method handleFeaturesChange
     * @param {Array} features 当标注层标注数据变化时返回的标注对象集合
     */
    handleFeaturesChange = features => {
        this.setState({features});
    }

    // statusBar子组件相关方法

    // 无标注复选框change事件
    handleNoLabelChange = checked => {
        const labelEmptyConfig = this.state.labelEmptyConfig;
        const features = this.state.features;

        if (features.length && checked) {
            Modal.confirm({
                title: '清空确认',
                content: '勾选‘无标注’将导致已标注的标签被清空，是否确定无标注？',
                onOk: () => {
                    this.labelCoreChild && this.labelCoreChild.removeAllFeatures();
                    labelEmptyConfig.onChange(checked);
                }
            });
        }
        else {
            labelEmptyConfig.onChange(checked);
        }
    }
    // 格式化features数据转换坐标+属性数据
    formatFeaturesData() {
        const features = this.state.features;
        const {width: imageWidth, height: imageHeight}  = this.state.data;
        let formatDatas = []; // 格式化之后统一返回数据格式

        features.forEach(feature => {
            const labelId = feature.data.labelId;
            const [leftTopPoint, , rightBottomPoint] = feature.getBounds();
            formatDatas.push({
                location: {
                    left: leftTopPoint.x + imageWidth / 2,
                    top: -(leftTopPoint.y - imageHeight / 2),
                    width: rightBottomPoint.x - leftTopPoint.x,
                    height: leftTopPoint.y - rightBottomPoint.y
                },
                labelId
            });
        });
        return formatDatas;
    }
    // 保存事件触发
    handleSave = () => {
        const {statusConfig, labelEmptyConfig, data} = this.state;
        const result = {
            data, // 传入进来的原始数据
            noLabel: labelEmptyConfig.checked, // 是否勾选无标注
            labelContents: this.formatFeaturesData() // 标注框数据
        };
        statusConfig.onOk(result);
    }

    render() {
        const wrapClassName = this.state.wrapClassName;
        const {features, activeTool} = this.state; // 当前父组件应用参数变量
        const {
            wrapClassName: labelWrapClassName,
            value: activeLabel,
            title: labelsTitle,
            data: labels,
            show: labelShow,
            tip: labelTip
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
        // 左侧工具栏组件配置项
        const toolBarOptions = {
            wrapClassName: 'gdbox-toolbar-wrap',
            activeTool,
            onChange: type => this.handleToolBarChange(type)
        };

        // 无标注配置项
        const LabelEmptyOptions = {
            wrapClassName: `gdbox-label-empty-wrap ${labelEmptyWrapClassName}`,
            checked: checkboxValue,
            name: labelEmptyName,
            onChange: value => this.handleNoLabelChange(value)
        };

        // 标注核心子组件
        const labelCoreOptions = {
            wrapClassName: 'gdbox-core-wrap',
            data: this.state.data,
            format: 'formatRectLabelPoints', // core-format.js中，供对data进行格式化【可不选，则不进行格式化】
            activeTool, // 当前图片状态（绘制／浏览）
            displayField: 'labelName', // 标注框展示名称
            onRef: child => {
                this.labelCoreChild = child;
            },
            beforeDrawGeometryAdd: points => this.beforeDrawGeometryAdd(points),
            onFeatureSelected: feature => this.onFeatureSelected(feature),
            onChange: features => this.handleFeaturesChange(features)
        };

        // 标注标签子组件
        const labelsOptions = {
            wrapClassName: `gdbox-labels-wrap ${labelWrapClassName}`,
            labels,
            show: labelShow,
            mode: 'single', // 图像标注不支持复选
            activeLabel,
            tip: labelTip,
            title: labelsTitle,
            onChange: label => this.handleLabelChange(label)
        };

        // 标注状态栏组件
        const statusBarOptions = {
            wrapClassName: `gdbox-statusbar-wrap ${statusWrapClassName}`,
            okText,
            leftTip, // 支持sting||react-node
            rightTip, // 支持sting||react-node
            okButtonDisable: !checkboxValue && !features.length, // 意为当勾选‘无标注’|标注图像中存在标注框
            onOk: this.handleSave
        };

        return (
            <div className={`gdbox-labelbox-ocr-detection ${wrapClassName}`}>
                <div className="gdbox-labelbox-main">
                    <ToolBar {...toolBarOptions} />
                    <div className="gdbox-labelbox-core">
                        <LabelCore {...labelCoreOptions} />
                        <StatusBar {...statusBarOptions} />
                    </div>
                    <Labels {...labelsOptions} />
                </div>
                <LabelEmpty {...LabelEmptyOptions} />
            </div>
        );
    }
}
