/**
 * @file Action for layout
 * @author zhangzhe(zhangzhe@baidu.com)
 */

import {UPDATE_LAYOUT} from '../constants/ActionTypes';

export function updateLayout(layout) {
    return {
        type: UPDATE_LAYOUT,
        layout
    };
}
