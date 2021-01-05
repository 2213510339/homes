/**
 * @file 标注工具栏
 * @author dingyang(dingyang@baidu.com)

 * @props {string} wrapClassName 包裹的class名称 供自定义样式
 * @props {string} activeTool 当前处于激活态的工具button('pan'-缩放评议 'drawRect'-绘制矩形)
 * @props {function} onChange 当工具条发生变化时触发
 */

import React from 'react';
import {Icon} from 'antd';

import './index.less';

// 工具条展示项
const TOOLBARS = [{
    type: 'drawRect',
    icon: 'form',
    name: '框选',
    visible: true,
    disable: false
},
{
    type: 'pan',
    icon: 'drag',
    name: '移动',
    visible: true,
    disable: false
},
{
    type: 'zoomin',
    icon: 'zoom-in',
    name: '放大',
    visible: true,
    disable: false
},
{
    type: 'zoomout',
    icon: 'zoom-out',
    name: '缩小',
    visible: true,
    disable: false
}];

export default class ToolBar extends React.Component {
    // 工具栏事件
    handleToolBarClicked = (type, disable) => {
        if (disable) {
            return; // 说明当前toobar是disable状态
        }
        // toolbar组件工具选择内部前置处理（此处暂时做空处理，待后续拓展使用）
        switch (type) {
            case 'drawRect':
                break;
            case 'pan':
                break;
            case 'zoomin':
                break;
            case 'zoomout':
                break;
        }
        const onToolBarChange = this.props.onChange;
        onToolBarChange && onToolBarChange(type);
    }

    // 获取当前激活的classname
    getActiveClassName(type) {
        const activeTool = this.props.activeTool || 'pan'; // 默认平移状态
        return activeTool === type ? 'toolbar-item-active' : '';
    }

    // 获取disable之classname
    getDisabledClassName(disabled) {
        return disabled ? 'toolbar-item-disable' : '';
    }

    render() {
        const wrapClassName = this.props.wrapClassName;

        return (
            <div className={`gdbox-toolbar ${wrapClassName}`}>
                <ul className="gdbox-toolbar-box">
                    {
                        TOOLBARS.map(item => {
                            const {type, icon, name, visible, disabled} = item;
                            // 如果不可见，则忽略此工具条
                            if (!visible) {
                                return null;
                            }
                            const activeClassName = this.getActiveClassName(type);
                            const disabledClassName = this.getDisabledClassName(!!disabled);
                            // 返回循环item<li>
                            return (<li
                                key={type}
                                className={`toolbar-item ${activeClassName} ${disabledClassName}`}
                                onClick={() => this.handleToolBarClicked(type, !!disabled)}
                            >
                                <Icon type={icon} theme="outlined" />
                                <span className="toolbar-tip">{name}</span>
                            </li>);
                        })
                    }
                </ul>
            </div>
        );
    }
}
