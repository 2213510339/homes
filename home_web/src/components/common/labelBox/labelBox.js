/**
 * @file 数据集检测类型标注
 * @author dingyang(dingyang@baidu.com)

 * @props {object} data 图片数据对象（关键数据）
 * @props {array} labels 右侧标签列表
 * @props {function} onOk 确认按钮回调函数
 * @props {string} okText 确认按钮文案
 * @props {react node | string} tip 底部工具栏右侧tip文案
 * @props {string} wrapClassName 标注区间包裹的class名称（设置宽度、高度等）
 */

import React from 'react';
import {Icon, Checkbox, Button, Radio, message, Modal} from 'antd';
import gDBox from 'gdbox';

import {formatRectLabelPoints} from './tool';

import './labelBox.less';

// 矢量数据／文本样式对象
const GFEATURE_STYLE = new gDBox.Style({strokeColor: '#0000FF'}); // 绘制标注样式实例化
const GTEXT_STYLE = new gDBox.Style({fontColor: '#FFFFFF', fontSize: 12, bgColor: '#1890FF'}); // 标签文字样式标签对象
// 相关属性配置
const CONTAINERID = 'mapContainer'; // 图片显示容器id名称
const NO_LABEL_FLAG = 'EMPTY'; // 无标签时的标志符
const LABEL_CONTENTS_FIELD = 'labelContents'; // props.data中标注集合对应的key值
// 资源引入
const DELETE_ICON = 'https://multimedia.bj.bcebos.com/icon/delete.png';

export default class LabelBox extends React.Component {
    gMap = null; // 标注对象
    shouldInstance = false; // 用以标记在didupdate之时是否需要进行gdbox实例化操作
    state = {
        toolBar: 'pan', // 标记激活左侧工具条‘draw’ 'pan'
        labelId: '', // 当前选中的labelid
        noLabelValue: false, // ‘无标签’复选框value值
        noneLabelName: '无标签', // 底部复选框无标签时展示文案
        featuresCount: 0 // 当前矢量图层上矢量数据个数，协同noLabelValue控制‘保存’按钮是否disabled
    };
    UNSAFE_componentWillReceiveProps(nextProps) {
        // 首先判断props.data 和 nextProps.data是否一致，决定后续是否需要进行重新实例化操作
        if (this.props.data !== nextProps.data) {
            this.shouldInstance = true;
        }
        // 如果labels标签列表发生变化，此时需要同步判断是否需要重置labelId=‘’
        if (this.state.labelId && this.props.labels !== nextProps.labels) {
            this.setCLabelId(this.state.labelId, nextProps.labels);
        }
    }
    componentDidMount() {
        if (this.props.data) { // 如果存在数据，则此时需要首次对其进行实例化，否则不做任何处理
            this.shouldInstance = false;
            this.initGDBox();
        }
    }
    componentDidUpdate() {
        // 如果此时被告知需要进行实例化操作并且存在实例化操作数据
        if (this.shouldInstance && this.props.data) {
            // 此时需要进行实例化操作
            this.shouldInstance = false;
            this.initGDBox();
        }
    }

    // 对数据进行实例化操作
    initGDBox() {
        const data = this.props.data;
        const {width: imgWidth, height: imgHeight} = data;
        // 首先计算合适的zoom值
        const zoom = this.getGDBoxZoomValue();
        // 进行实例化-实例化之前首先进行实例销毁
        this.gMap && this.gMap.destroy();
        this.gMap = new gDBox.Map(CONTAINERID, {zoom: zoom, cx: 0, cy: 0});
        if (this.state.toolBar === 'draw') {
            // 保留用户上次激活工具状态
            this.gMap.setMode('drawRect', GFEATURE_STYLE);
        }
        // 图层声明、事件监听添加
        const gImageLayer = new gDBox.Layer.Image('img', data.path, {w: imgWidth, h: imgHeight}, {zIndex: 1});
        this.gFeatureLayer = new gDBox.Layer.Feature('featureLayer', {zIndex: 2, transparent: true});
        this.gTextLayer = new gDBox.Layer.Text('textLayer');
        this.gMap.addLayer(gImageLayer);
        this.gMap.addLayer(this.gFeatureLayer);
        this.gMap.addLayer(this.gTextLayer);
        this.addFeatures(data); // 标注对象添加
        this.attachEventsToGDBox(); // 事件监听
    }
    // 为gdbox计算zoom值，保证图片初始化能够全contain在容器中
    getGDBoxZoomValue() {
        const data = this.props.data;
        const eLabelBoxContainer = document.getElementById(CONTAINERID);
        const {clientWidth: labelBoxWidth, clientHeight: labelBoxHeight}  = eLabelBoxContainer;
        const {width: imgWidth, height: imgHeight} = data;

        let zoom = imgWidth;
        if ((labelBoxWidth / labelBoxHeight) >= (imgWidth / imgHeight)) {
            const scale = imgHeight / labelBoxHeight;
            zoom = labelBoxWidth * scale;
        }
        return zoom;
    }
    // 为gdbox绑定事件回调
    attachEventsToGDBox() {
        this.gMap.events.on('featureStatusReset', () => this.gMapReset());
        // 添加事件监听，绘制结束后，数据添加
        this.gMap.events.on('geometryDrawDone', (type, points) => this.handleDrawGeometryDone(points));
        // 图片编辑完成
        this.gMap.events.on('geometryEditDone', (type, activeFeature, points) => {
            const isValidFea = this.filterValidFeature(points);
            if (!isValidFea) {
                message.warning('请在‘样本图片区域内’进行标注编辑！');
                // 重设左上角文本对象+右上角delete-icon
                this.handleGeometryEditing(activeFeature, activeFeature.points);
                activeFeature.show();
                return;
            }
            activeFeature.update({points});
            activeFeature.show();
        });
        // 要素编辑中（即鼠标拖拽矩形或者节点）
        this.gMap.events.on('geometryEditing', (type, feature, points) => this.handleGeometryEditing(feature, points));
        // 要素选择完成回调事件
        this.gMap.events.on('featureSelected', features => this.handleFeatureSelected(features));
    }
    // 绘制矩形框结束事件回调
    handleDrawGeometryDone(points) {
        const {noneLabelValue, labelId} = this.state;
        const gMapMode = this.gMap.getMode();

        // 首先需要判断绘制的图形是否已选中标签
        if (noneLabelValue && gMapMode === 'drawRect') {
            // 说明此时不能进行绘制
            message.warning('请首先关闭‘无标注’开关，再进行绘制！');
            return false;
        }
        if (!labelId && gMapMode === 'drawRect') { // 说明没有进行标注标签类型选择，此时需要提醒用户进行选择
            message.warning('请首先选择进行标注的标签类型');
            return false;
        }

        // 生成元素唯一标志（时间戳）
        const timestamp = new Date().getTime(); // 保持feature 与 label-text标注的一致性
        // 元素添加展示
        let fea = new gDBox.Feature.Polygon(`feature-${timestamp}`, points, {
            labelId: labelId,
            name: this.getCurrentLabelName(labelId),
            key: timestamp
        }, GFEATURE_STYLE);
        // 验证绘制的图形是否位于图片区域内，如果不在，则toast提示并返回
        const isValidFea = this.filterValidFeature(fea.points);
        if (!isValidFea) {
            message.warning('请在‘样本图片区域内’进行标注绘制！');
            return;
        }
        this.gFeatureLayer && this.gFeatureLayer.addFeature(fea);

        // 元素对应标签展示
        const featureBounds = fea.getBounds(); // 获取fetaure元素最小外接矩形
        const leftTopPoint = featureBounds[0]; // 边界右上角坐标
        let featureLable = new gDBox.Text(`label-${fea.data.key}`,
            {
                pos: {
                    x: leftTopPoint.x,
                    y: leftTopPoint.y
                },
                offset: {
                    x: -1,
                    y: -14
                },
                width: 100,
                text: fea.data.name
            }, GTEXT_STYLE);
        this.gTextLayer && this.gTextLayer.addText(featureLable);
        this.setFeaturesCount(); // 计算矢量数据个数
    }
    handleGeometryEditing(feature, points) {
        if (!this.gMap) {
            return;
        }
        const bounds = gDBox.Util.getBounds(points);
        const [leftTopPoint, rightTopPoint] = bounds; // 边界左上角坐标、边界右上角坐标
        const marker = this.gMap.mLayer.getMarkerById(`marker-${feature.data.key}`);
        const label = this.gTextLayer.getTextById(`label-${feature.data.key}`);

        if (marker) {
            marker.update({x: rightTopPoint.x, y: rightTopPoint.y});
        }
        if (label) {
            label.update({pos: leftTopPoint});
        }
    }
    // feture选择回调事件监听
    handleFeatureSelected(cFeature) {
        // 删除按钮添加
        const featureBounds = cFeature.getBounds();
        const rightTopPoint = featureBounds[1]; // 边界右上角坐标
        let deleteMarker = new gDBox.Marker(`marker-${cFeature.data.key}`,
            {
                src: DELETE_ICON,
                x: rightTopPoint.x,
                y: rightTopPoint.y,
                offset: {
                    x: -18,
                    y: 2
                },
                fea: cFeature
            });
        this.gMap.mLayer.addMarker(deleteMarker);
        deleteMarker.regEvent('click', () => {
            // 执行选中元素删除
            this.gFeatureLayer.removeFeatureById(this.info.fea.id);
            // 对应删除其标签文字
            this.gTextLayer.removeTextById(`label-${this.info.fea.data.key}`);
            // 对应删除标注层中删除（x）icon
            this.gMap.mLayer.removeAllMarkers();
            this.setFeaturesCount(); // 计算矢量数据个数
        });
        // 同步更改标签列表中的值
        this.setCLabelId(cFeature.data.labelId, this.props.labels);
    }
    gMapReset() {
        this.gMap && this.gMap.mLayer.removeAllMarkers(); // 最后，清空标注层
    }
    addFeatures(data) {
        const cLabelContents = data[LABEL_CONTENTS_FIELD] || [];
        const newFeatures = formatRectLabelPoints(data, LABEL_CONTENTS_FIELD);
        if (cLabelContents.length && cLabelContents[0].labelId === NO_LABEL_FLAG) {
            // 说明当前图片为‘无标签’状态
            this.setState({noLabelValue: true});
        }
        else {
            this.setState({noLabelValue: false});
        }
        for (let i = 0, len = newFeatures.length; i < len; i++) {
            // 生成元素唯一标志（时间戳）-- 保持feature 与 label-text标注的一致性
            const timestamp = new Date().getTime() + i;
            const tmpFeature = new gDBox.Feature.Polygon(`feature-${timestamp}`, newFeatures[i].points, {
                labelId: newFeatures[i].labelId,
                name: newFeatures[i].labelName,
                key: timestamp
            }, GFEATURE_STYLE);
            this.gFeatureLayer.addFeature(tmpFeature);

            // 标签添加逻辑
            const featureBounds = tmpFeature.getBounds(); // 获取fetaure元素最小外接矩形
            const leftTopPoint = featureBounds[0]; // 边界左上角坐标
            let featureLable = new gDBox.Text(`label-${timestamp}`,
                {
                    pos: {
                        x: leftTopPoint.x,
                        y: leftTopPoint.y
                    },
                    offset: {
                        x: -1,
                        y: -14
                    },
                    width: 100,
                    text: newFeatures[i].labelName
                }, GTEXT_STYLE);
            this.gTextLayer.addText(featureLable);
        }
        this.setFeaturesCount(); // 计算矢量数据个数
    }
    // 当矢量层上数据个数变化时需要重新计算，为了控制‘保存’按钮是否可用
    setFeaturesCount() {
        const featuresCount = this.gFeatureLayer ? this.gFeatureLayer.getAllFeatures().length : 0;
        this.setState({featuresCount});
    }

    // 校验当前绘制的feature矢量对象是否覆盖在标注样本图片范围内
    filterValidFeature = points => {
        const feaBounds = gDBox.Util.getBounds(points);
        const ltPoint = feaBounds[0];
        const rbPoint = feaBounds[2];
        const halfImageWidth = this.props.data.width / 2;
        const halfImageHeight = this.props.data.height / 2;
        const isLTvalid = ltPoint.x >= -halfImageWidth
            && ltPoint.x <= halfImageWidth
            && ltPoint.y >= -halfImageHeight
            && ltPoint.y <= halfImageHeight;
        const isRBvalid = rbPoint.x >= -halfImageWidth
            && rbPoint.x <= halfImageWidth
            && rbPoint.y >= -halfImageHeight
            && rbPoint.y <= halfImageHeight;
        return isLTvalid && isRBvalid;
    }
    // 根据labelId获取labelName
    getCurrentLabelName(labelId) {
        const labels = this.props.labels || [];
        const cLabel = labels.find(item => labelId === item.id);
        return cLabel ? cLabel.labelName : '';
    }
    setCLabelId(labelId, labels) {
        const cLabel = labels.find(item => labelId === item.id);
        const cLabelId = cLabel ? labelId : '';
        this.setState({
            labelId: cLabelId
        });
    }

    // 工具栏部分‘无标注’checkbox事件触发
    handleNoneLabelCheckChange = e => {
        const emptyFlag = e.target.checked; //  无标注标志
        const featuresCount = this.state.featuresCount;
        if (featuresCount > 0 && emptyFlag) {
            Modal.confirm({
                title: '清空确认',
                content: '勾选‘无标注’将导致已标注的标签被清空，是否确定无标注？',
                onOk: () => {
                    // 清空标注
                    this.gFeatureLayer && this.gFeatureLayer.removeAllFeatures();
                    this.setFeaturesCount(); // 计算矢量数据个数
                    // 将对应变量复原
                    this.gMapReset();
                    // 标注层标签名删除
                    this.gTextLayer && this.gTextLayer.removeAllTexts();
                    this.setState({noLabelValue: emptyFlag});
                }
            });
        }
        else {
            this.setState({noLabelValue: emptyFlag});
        }
    }

    getCtoolBarClassName = type => {
        const toolBar = this.state.toolBar;
        return toolBar === type ? 'label-tool-item label-tool-item-active' : 'label-tool-item';
    }

    handleToolBar = type => {
        switch (type) {
            case 'draw':
                if (!this.state.labelId) { // 说明没有进行标注标签类型选择，此时需要提醒用户进行选择
                    message.warning('请首先选择进行标注的标签类型');
                    return;
                }
                // 此时说明用户已选择标注标签类型
                this.setState({toolBar: type});
                // 修改状态为‘draw’绘制状态
                this.gMap && this.gMap.setMode('drawRect', GFEATURE_STYLE);
                break;
            case 'pan':
                this.gMapReset();
                this.setState({toolBar: type});
                this.gMap && this.gMap.setMode('pan');
                break;
            case 'zoomin':
                this.gMap && this.gMap.zoomIn();
                break;
            case 'zoomout':
                this.gMap && this.gMap.zoomOut();
                break;
        }
    }

    onLabelChange = e => {
        const cLabelId = e.target.value;
        const oldLabelId = this.state.labelId; // 记录change之前的labelid
        this.setState({
            labelId: cLabelId
        }, () => {
            if (!oldLabelId && this.gMap && this.gMap.getMode() !== 'drawRect') {
                // 当首次选中标签时，将左侧工具栏自动切换至框选状态
                this.handleToolBar('draw');
            }
        });
        const activeFeatures = this.gFeatureLayer.getActiveFeatures();
        const activeFeature = activeFeatures.length ? activeFeatures[0] : null;
        if (activeFeature && activeFeature.data.labelId !== cLabelId) {
            // 说明存在被选中要素，此时执行属性修改
            activeFeature.update({
                data: {
                    labelId: cLabelId,
                    name: this.getCurrentLabelName(cLabelId),
                    key: activeFeature.data.key
                }
            });
            const cFeatureLable = this.gTextLayer.getTextById(`label-${activeFeature.data.key}`);
            cFeatureLable && cFeatureLable.setText(this.getCurrentLabelName(cLabelId));
        }
    }
    // 执行保存按钮
    handleLabelSave = () => {
        const id = this.props.data.id;
        let params = {
            id,
            data: this.props.data,
            flag: !!this.state.noLabelValue
        };
        if (!this.state.noLabelValue) {
            params.labelContents = this.getLabelContentsParam();
        }
        this.props.onOk && this.props.onOk(params);
    }
    getLabelContentsParam() {
        let labelContents = [];
        if (!this.gFeatureLayer) {
            return labelContents;
        }
        const allFeatures = this.gFeatureLayer.getAllFeatures();
        const {width: imageWidth, height: imageHeight}  = this.props.data;
        for (let i = 0, len = allFeatures.length; i < len; i++) {
            const labelId = allFeatures[i].data.labelId;
            const featureBounds = allFeatures[i].getBounds(); // 获取fetaure元素最小外接矩形
            const leftTopPoint = featureBounds[0]; // 边界左上角坐标
            const rightBottomPoint = featureBounds[2]; // 边界右上角坐标
            labelContents.push({
                location: {
                    left: leftTopPoint.x + imageWidth / 2,
                    top: -(leftTopPoint.y - imageHeight / 2),
                    width: rightBottomPoint.x - leftTopPoint.x,
                    height: leftTopPoint.y - rightBottomPoint.y
                },
                labelId
            });
        }
        return labelContents;
    }
    render() {
        const wrapClassName = this.props.wrapClassName || '';
        const {labelId, noLabelValue, noneLabelName, featuresCount} = this.state;
        const saveBtnDisabled = !(noLabelValue || featuresCount); // 保存按钮是否可用

        return (
            <div className={`gdbox-labelbox ${wrapClassName}`}>
                <div className="gdbox-labelbox-main">
                    <div className="label-box-item label-box-l">
                        <div className={this.getCtoolBarClassName('draw')} onClick={() => this.handleToolBar('draw')}>
                            <Icon type="form" theme="outlined" />
                            <span className="tool-tip">框选</span>
                        </div>
                        <div className={this.getCtoolBarClassName('pan')} onClick={() => this.handleToolBar('pan')}>
                            <Icon type="drag" theme="outlined" />
                            <span className="tool-tip">移动</span>
                        </div>
                        <div className="label-tool-item" onClick={() => this.handleToolBar('zoomin')}>
                            <Icon type="zoom-in" theme="outlined" />
                            <span className="tool-tip">放大</span>
                        </div>
                        <div className="label-tool-item" onClick={() => this.handleToolBar('zoomout')}>
                            <Icon type="zoom-out" theme="outlined" />
                            <span className="tool-tip">缩小</span>
                        </div>
                    </div>
                    <div className="label-box-item label-box-r">
                        <div className="label-r-title">选择标签</div>
                        <div className="label-r-labels-box">
                            <Radio.Group value={labelId} onChange={this.onLabelChange}>{
                                this.props.labels && this.props.labels.map((item, index) =>
                                    <Radio key={item.id} className="label-item" value={item.id}>{item.labelName}</Radio>
                                )
                            }
                            </Radio.Group>
                        </div>
                    </div>
                    <div className="label-box-c">
                        <div
                            id={CONTAINERID}
                            className="label-box-item label-box-label"
                        ></div>
                        <div className="label-tool-bar">
                            <span className="label-none-check">
                                <Checkbox
                                    checked={noLabelValue}
                                    onChange={this.handleNoneLabelCheckChange}
                                >{noneLabelName}</Checkbox>
                            </span>
                            <Button
                                type="primary"
                                disabled={saveBtnDisabled}
                                onClick={() => this.handleLabelSave(false)}
                            >
                                {this.props.okText || '保存'}
                            </Button>
                            <span className="label-tool-tip">{this.props.tip || ''}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
