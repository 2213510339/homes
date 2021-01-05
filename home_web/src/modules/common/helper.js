/**
 * @file common/common
 * @author sunwen05
 */
import {
    Button
} from 'antd';
import _ from 'lodash';

export function getCookie(name) {
    let cookies = document.cookie;
    let result = 1;
    if (cookies.indexOf(name) > -1) {
        let cookieArr = cookies.split(';');
        for (let cook of cookieArr) {
            if (cook.indexOf(name) > -1) {
                result = cook.split('=')[1];
            }
        }
    }
    return result;
}
export function getPagination(tabData, pageSize) {
    return (tabData ? {
        total: tabData.totalCount,
        pageSize: pageSize,
        pageSizeOptions: ['10', '20', '30', '50', '100'],
        defaultPageSize: pageSize,
        showSizeChanger: true,
        showTotal() {
            return '共 ' + tabData.totalCount + ' 条数据';
        }
    } : {});
}
export function getFooter(submit, handle) {
    return (<div className="modal-footer">
        <div className="tip">
        </div>
        <div className="btn">
            <Button type="primary" onClick={submit}>确定</Button>
            <Button onClick={handle}>取消</Button>
        </div>
    </div>);
}
export function formatRegionconf(param, fun) {
    _.each(param, function (val) {
        val.value = val.id;
        val.key = 'val.id' + val.id + val.text;
        val.title = val.text;
        if (_.has(val, 'children')) {
            formatRegionconf(val.children, fun);
        }
    });
}
export function getRegionIds(regionConf, list, fun) {
    let nameList = [];
    const flag = list.length > 0;
    _.each(regionConf, function (val) {
        if (flag) {
            if (list.indexOf(val.id) > -1) {
                nameList.push(val.id);
                // 遍历children
                let child = getChildren(val.children, fun);
                nameList = nameList.concat(child);
            }
            if (val.children) {
                let child = getRegionIds(val.children, list, fun);
                nameList = nameList.concat(child);
            }
        }
        else {
            nameList.push(val.id);
            let child = getRegionIds(val.children, [], fun);
            nameList = nameList.concat(child);
        }
    });
    return nameList;
}
export function getChildren(param, fun) {
    let idList = [];
    _.each(param, function (val) {
        idList.push(val.id);
        let child = getChildren(val.children, fun);
        idList = idList.concat(child);
    });
    return idList;
}