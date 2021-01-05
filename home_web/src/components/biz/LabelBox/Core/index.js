/**
 * @file 标注组件-核心模块
 * @author dingyang(dingyang@baidu.com)

 * @props {function} onRef 对象外传父组件，供父组件调用自组件方法
 * @props {string} wrapClassName 包裹的class名称 供自定义样式
 * @props {object} data 图像、标注相关信息
 * @props {string} format 对data进行格式化的方法名，此方法位于format.js中
 * @props {string} activeTool 当前激活的工具
 * @props {string} displayField 绘制要素显示的名称字段，此字段位于要素属性数据中
 * @props {function} beforeDrawGeometryAdd 在绘制完成之前的用户自定义函数,要求返回值{flag:, info:}
 * @props {function} onFeatureSelected 要素被选中时触发
 * @props {function} onChange 当标注容器上元素数量或内容变化时触发
 */

import React from 'react';
import {message} from 'antd';

import FORMAT_FUNCTION from './format';
import gDBox from 'gdbox';

import './index.less';

const CONTAINERID = 'mapContainer'; // 图片显示容器id名称
const GFEATURE_STYLE = new gDBox.Style({strokeColor: '#0000FF'}); // 绘制标注样式实例化
const GTEXT_STYLE = new gDBox.Style({fontColor: '#FFF', fontSize: 12, bgColor: '#1890FF'}); // 标签文字样式标签对象

// 资源引入
const DELETE_ICON = 'https://multimedia.bj.bcebos.com/icon/delete.png';

export default class Core extends React.Component {
    // 对传入数据进行格式化操作
    setFormatData(data, format) {
        if (!data) {
            this.formatData = null; // 如果不存在data，则需要置空，避免影响后续逻辑
            return;
        }
        this.formatData = format && FORMAT_FUNCTION[format] ? FORMAT_FUNCTION[format](data) : data;
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        // 首先判断props.data 和 nextProps.data是否一致 || 格式化方法format有更改，决定后续是否需要进行重新实例化操作
        if (this.props.data !== nextProps.data || this.props.format !== nextProps.format) {
            this.setFormatData(nextProps.data, nextProps.format);
            this.shouldInstance = true;
        }

        // 如果当前工具发生变化，需要重设
        if (this.props.activeTool !== nextProps.activeTool && this.gMap) {
            this.gMap.mLayer.removeAllMarkers();
            this.gMap.setMode(nextProps.activeTool, GFEATURE_STYLE);
        }
    }

    componentDidMount() {
        const {data, format, onRef} = this.props;
        this.setFormatData(data, format); // 在实例化之前需要首先对数据进行格式化操作
        if (this.formatData) { // 如果存在数据，则此时需要首次对其进行实例化，否则不做任何处理
            this.shouldInstance = false; // 将实例化标识做复原操作
            this.initGDBox(); // 格式化数据之后，进行实例化操作
        }
        onRef && onRef(this);
    }
    componentDidUpdate() {
        // 进行实例化操作
        if (this.shouldInstance && this.formatData) {
            this.shouldInstance = false;
            this.initGDBox();
        }
    }

    // 更新选中要素的属性信息【供组件外部通过ref形式调用】
    updateSelectedFeatureInfo(newInfo = {}) {
        const activeFeatures =  this.gFeatureLayer ? this.gFeatureLayer.getActiveFeatures() : [];
        const activeFeature = activeFeatures.length ? activeFeatures[0] : null;
        if (activeFeature) { // 说明存在被选中要素，此时执行属性修改
            const featureId = activeFeature.id;
            const relateKey = featureId.split('-')[1]; // 获取关联feature\marker\name的唯一值
            activeFeature.update({
                data: newInfo
            });
            const cFeatureLabel = this.gTextLayer.getTextById(`name-${relateKey}`);
            const newFeatureName = this.getFeatureDisplayname(newInfo);
            cFeatureLabel && cFeatureLabel.setText(newFeatureName);
        }
    }
    // 清空所有对象【供组件外部通过ref形式调用】
    removeAllFeatures() {
        this.gFeatureLayer && this.gFeatureLayer.removeAllFeatures();
        this.gTextLayer && this.gTextLayer.removeAllTexts();
        this.gMap && this.gMap.mLayer.removeAllMarkers();
        this.handleFeaturesChange(); // featuresChange事件触发
    }

    // 获取要素显示名
    getFeatureDisplayname(featureInfo = {}) {
        const displayField = this.props.displayField;
        return featureInfo[displayField] || '--';
    }

    // 供外部高阶组件调用放大缩小
    zoom(type) {
        switch (type) {
            case 'zoomin':
                this.gMap && this.gMap.zoomIn();
                break;
            case 'zoomout':
                this.gMap && this.gMap.zoomOut();
                break;
            default:
                break;
        }
    }

    handleFeaturesChange() {
        const onFeaturesChange = this.props.onChange;
        const features = this.gFeatureLayer ? this.gFeatureLayer.getAllFeatures() : [];
        onFeaturesChange && onFeaturesChange(features); // onChange事件触发
    }

    // 对数据进行实例化操作
    initGDBox() {
        this.gMap && this.gMap.destroy(); // 进行实例化-实例化之前首先进行实例销毁
        const activeTool = this.props.activeTool;
        const imgInfo = this.formatData.img;
        const {url: imgUrl, width: imgWidth, height: imgHeight} = imgInfo;
        const zoom = this.getGDBoxZoomValue(); // 计算合适的zoom值

        //  实例化 & 模式设置
        const currentMode = typeof activeTool === 'string' ? activeTool : '';
        this.gMap = new gDBox.Map(CONTAINERID, {zoom, cx: 0, cy: 0});
        this.gMap.setMode(currentMode, GFEATURE_STYLE);

        // 图层声明 & 添加至容器
        const gImageLayer = new gDBox.Layer.Image('img', imgUrl, {w: imgWidth, h: imgHeight}, {zIndex: 1});
        this.gFeatureLayer = new gDBox.Layer.Feature('featureLayer', {zIndex: 2, transparent: true});
        this.gTextLayer = new gDBox.Layer.Text('textLayer');
        this.gMap.addLayer(gImageLayer);
        this.gMap.addLayer(this.gFeatureLayer);
        this.gMap.addLayer(this.gTextLayer);

        // 监听事件绑定 & 标注对象添加
        this.attachEventsToGDBox(); // 事件监听
        const initFeatures = this.formatData.features || [];
        initFeatures.forEach(feature => this.addFeature(feature.points, feature.info));
    }

    // 单个元素添加[points: 空间数据，info：属性数据]
    addFeature(points, info) {
        const timestamp = new Date().getTime(); // 生成元素唯一标志（时间戳）【保持feature 与 name marker标注的一致性】
        const feature = new gDBox.Feature.Polygon(`feature-${timestamp}`, points, info || {}, GFEATURE_STYLE);
        this.gFeatureLayer && this.gFeatureLayer.addFeature(feature);

        // 元素对应标签展示
        const featureBounds = feature.getBounds(); // 获取fetaure元素最小外接矩形
        const leftTopPoint = featureBounds[0]; // 边界右上角坐标
        const displayName = this.getFeatureDisplayname(info);
        let featureLable = new gDBox.Text(`name-${timestamp}`, {
            pos: {
                x: leftTopPoint.x,
                y: leftTopPoint.y
            },
            offset: {
                x: -1,
                y: -14
            },
            width: 100,
            text: displayName
        }, GTEXT_STYLE);
        this.gTextLayer && this.gTextLayer.addText(featureLable);

        this.handleFeaturesChange(); // featuresChange事件触发
    }
    // 为gdbox计算zoom值，保证图片初始化能够全contain在容器中
    getGDBoxZoomValue() {
        const imgInfo = this.formatData.img;
        const gDBoxContainer = document.getElementById(CONTAINERID);

        const {width: imgWidth, height: imgHeight} = imgInfo;
        const {clientWidth: containerWidth, clientHeight: containerHeight}  = gDBoxContainer;

        let zoom = imgWidth;
        if ((containerWidth / containerHeight) >= (imgWidth / imgHeight)) {
            const scale = imgHeight / containerHeight;
            zoom = containerWidth * scale;
        }
        return zoom;
    }

    // 为gdbox绑定事件回调
    attachEventsToGDBox() {
        // featureReset之后需要对标注层进行清空
        this.gMap.events.on('featureStatusReset',
            () => this.gMap.mLayer.removeAllMarkers());
        // 要素绘制完成
        this.gMap.events.on('geometryDrawDone',
            (type, points) => this.handleDrawGeometryDone(points));
        // 要素编辑完成
        this.gMap.events.on('geometryEditDone',
            (type, activeFeature, points) => this.handleEditGeometryDone(activeFeature, points));
        // 要素编辑中（即鼠标拖拽矩形或者节点）
        this.gMap.events.on('geometryEditing',
            (type, feature, points) => this.handleGeometryEditing(feature, points));
        // 要素选择完成回调事件
        this.gMap.events.on('featureSelected',
            features => this.handleFeatureSelected(features));
    }
    // 标注绘制完成-callback
    handleDrawGeometryDone(points) {
        // 首先需要进行用户层针对当前绘制标注框的合法性校验【如果检验不通过，则中止添加逻辑】
        const customeBeforeDrawGeometryAdd = this.props.beforeDrawGeometryAdd;
        let featureProperty = {}; // 添加要素的属性数据
        if (customeBeforeDrawGeometryAdd) {
            const resultInfo = customeBeforeDrawGeometryAdd(points); // 要求返回格式{flag: , info:}
            if (!resultInfo.flag) {
                return;
            }
            featureProperty = resultInfo.info || {};
        }

        // 验证绘制的图形是否位于图片区域内，如果不在，则toast提示并返回
        const isValidFea = this.filterValidFeature(points);
        if (!isValidFea) {
            message.warning('请在‘样本图片区域内’进行标注绘制！');
            return;
        }

        // 执行标注对象的添加
        this.addFeature(points, featureProperty);
    }

    // 标注编辑（框平移|节点修改）完成-callback
    handleEditGeometryDone(activeFeature, points) {
        const isValidFea = this.filterValidFeature(points);
        if (!isValidFea) {
            message.warning('请在‘样本图片区域内’进行标注编辑！');
            this.handleGeometryEditing(activeFeature, activeFeature.points); // 重设左上角文本对象+右上角delete-icon
            activeFeature.show(); // 重新展示出来，不进行update操作
            return;
        }
        activeFeature.update({points});
        activeFeature.show();
    }
    // 要素在编辑过程中实时触发
    handleGeometryEditing(feature, points) {
        const bounds = gDBox.Util.getBounds(points);
        const featureId = feature.id;
        const relateKey = featureId.split('-')[1]; // 获取关联marker\name的唯一值
        const [leftTopPoint, rightTopPoint] = bounds; // 边界左上角坐标、边界右上角坐标
        const marker = this.gMap.mLayer.getMarkerById(`marker-${relateKey}`);
        const label = this.gTextLayer.getTextById(`name-${relateKey}`);

        if (marker) {
            marker.update({x: rightTopPoint.x, y: rightTopPoint.y});
        }
        if (label) {
            label.update({pos: leftTopPoint});
        }
    }
    // 要素选择完成函数-删除按钮添加
    handleFeatureSelected(cFeature) {
        const featureId = cFeature.id;
        const relateKey = featureId.split('-')[1]; // 获取关联feature\marker\name的唯一值
        const featureBounds = cFeature.getBounds();
        const rightTopPoint = featureBounds[1]; // 边界右上角坐标
        const deleteMarker = new gDBox.Marker(`marker-${relateKey}`,
            {
                src: DELETE_ICON,
                x: rightTopPoint.x,
                y: rightTopPoint.y,
                offset: {
                    x: -18,
                    y: 2
                }
            });
        this.gMap.mLayer.addMarker(deleteMarker);

        const self = this; // 暂存this
        deleteMarker.regEvent('click', function () {
            self.gFeatureLayer.removeFeatureById(`feature-${relateKey}`); // 执行选中元素删除
            self.gTextLayer.removeTextById(`name-${relateKey}`); // 对应删除其标签文字
            self.gMap.mLayer.removeMarkerById(`marker-${relateKey}`); // 对应删除标注层中删除（x）icon【即本身】
            self.handleFeaturesChange(); // featuresChange事件触发
        });

        // 当元素被选中时触发
        const onFeatureSelected = this.props.onFeatureSelected;
        onFeatureSelected && onFeatureSelected(cFeature);
    }
    // 校验当前绘制的feature矢量对象是否覆盖在标注样本图片范围内
    filterValidFeature = points => {
        const imgInfo = this.formatData.img;
        const {width: imgWidth, height: imgHeight} = imgInfo;
        const [ltPoint,, rbPoint] = gDBox.Util.getBounds(points);
        const halfImageWidth = imgWidth / 2;
        const halfImageHeight = imgHeight / 2;
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

    render() {
        const wrapClassName = this.props.wrapClassName;

        return (
            <div className={`gdbox-core ${wrapClassName}`}>
                <div id={CONTAINERID} className="gdbox-core-container"></div>
            </div>
        );
    }
}
