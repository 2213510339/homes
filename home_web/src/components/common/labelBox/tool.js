/**
 * @file 标注相关工具方法
 * @author dingyang(dingyang9642@126.com)
 */

/**
 * 标注元素格式转换
 *
 * @param {json} sampleInfo 标注样本（即图片信息）- 包含图片width height labelContents等信息
 * @example {width:, height: , labelContents: [{location: [left, top, width, height], labelId: '001', labelName: 'test'}]}
 * @param {json} key sampleInfo中关于标注集合的字段名（labelContents）
 * @return {Array} 格式转换标注集合(转坏为中心点位于图片中心的坐标系下)
 * @example [{points: [{x: 0, y: 0}, ...], labelId: '', labelName: ''}]
 */
export function formatRectLabelPoints(sampleInfo, key = 'labelContents') {
    let labelContents = sampleInfo[key] || [];
    let result = [];
    for (let i = 0, len = labelContents.length; i < len; i++) {
        const labelItem = labelContents[i];
        // 首先进行坐标转换
        const {width: sampleWidth, height: sampleHeight} = sampleInfo;
        const location = labelItem.location;
        const [left, top, width, height] = location;
        if (location && location.length) {
            const points = [{
                x: left - sampleWidth / 2,
                y: -(top - sampleHeight / 2)
            }, {
                x: left + width - sampleWidth / 2,
                y: -(top - sampleHeight / 2)
            }, {
                x: left + width - sampleWidth / 2,
                y: -(top + height - sampleHeight / 2)
            }, {
                x: left - sampleWidth / 2,
                y: -(top + height - sampleHeight / 2)
            }];
            result.push({
                points,
                labelId: labelItem.labelId || '',
                labelName: labelItem.labelName || ''
            });
        }
    }
    return result;
}
