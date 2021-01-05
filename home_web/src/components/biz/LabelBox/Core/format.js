/**
 * @file core组件相关格式化方法【可自定义】
 * @author dingyang(dingyang9642@126.com)
 * @return {
 *    formatRectLabelPoints
 * }
 * @desc 定义了多种类型的数据格式化方法，主要是为了core组件中的数据格式统一化处理
 * @desc 格式化之后数据要求 => {
 *      img: {url: , width: , height: }, ------ // 图片信息数据
 *      features: [{ -------------------------- // 标注框集合【可为空】
 *          points: [{x:,y:}, {x:,y:}, ...], -- // 每个标注框的空间信息
 *          info: {name, title, ...} ---------- // 每个标注框携带的属性信息
 *      }, ...]
 *   }
 */

// 标注坐标转换方法
const formatPoints = (left, top, width, height, imageWidth, imageHeight) => {
    return [{
        x: left - imageWidth / 2,
        y: -(top - imageHeight / 2)
    }, {
        x: left + width - imageWidth / 2,
        y: -(top - imageHeight / 2)
    }, {
        x: left + width - imageWidth / 2,
        y: -(top + height - imageHeight / 2)
    }, {
        x: left - imageWidth / 2,
        y: -(top + height - imageHeight / 2)
    }];
};

export default {

    formatPoints, // 标注坐标转换方法

    /**
     * 标注元素格式转换
     *
     * @param {Object} data 入参数据
     * @example {
     *       path: , -------------------- // 图片地址
     *       width: , --------------- // 图片宽度
     *       height: , -------------- // 图片高度
     *       labelContents: [{ ------------ // 标注框信息
     *          labelId: '',
     *          labelName: '',
     *          location: [left, top, width, height] --- // 相关标注信息
     *       }]
     * }
     * @return {Object} core组件要求格式数据，如本文件开始部分描述所示
     */
    formatRectLabelPoints(data) {
        const {path, width: imageWidth, height: imageHeight, labelContents} = data;
        let features = [];
        for (let i = 0, len = (labelContents || []).length; i < len; i++) {
            const labelItem = labelContents[i];
            const {location, labelId, labelName} = labelItem; // 首先进行坐标转换
            const [left, top, width, height] = location;
            if (location && location.length) {
                const points = formatPoints(left, top, width, height, imageWidth, imageHeight);
                features.push({
                    points,
                    info: {
                        labelId,
                        labelName
                    }
                });
            }
        }
        return {
            img: {
                url: path,
                width: imageWidth,
                height: imageHeight
            },
            features
        };
    },

    /**
     * 标注元素格式转换
     *
     * @param {Object} data 入参数据
     * @example {
     *       image: , -------------------- // 图片地址
     *       width: , -------------------- // 图片宽度
     *       height: , ------------------- // 图片高度
     *       annotations: [{ ------------- // 标注框信息
     *          name: '',
     *          top: 10,
     *          left: 10,
     *          width: 10,
     *          height: 10
     *       }]
     * }
     * @return {Object} core组件要求格式数据，如本文件开始部分描述所示
     */
    formatRectLabelPoints2(data) {
        const {image: path, width: imageWidth, height: imageHeight, annotations} = data;
        let features = [];
        for (let i = 0, len = (annotations || []).length; i < len; i++) {
            const labelItem = annotations[i];
            const {left, top, width, height, name: labelName} = labelItem; // 首先进行坐标转换
            if (width && height) {
                const points = formatPoints(left, top, width, height, imageWidth, imageHeight);
                features.push({
                    points,
                    info: {
                        labelName
                    }
                });
            }
        }
        return {
            img: {
                url: path,
                width: imageWidth,
                height: imageHeight
            },
            features
        };
    }
};
