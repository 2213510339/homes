/**
 * @file Action for user list
 * @author chenbo09
 */

import {utils} from 'baidu-acu-react-common';

import {USER_ALL_LIST, USER_DETAIL} from '../constants/ActionTypes';
import api from '../configure/api';
import {MAX_PAGE_SIZE} from '../constants/constants';

const request = utils.request;

export function getUserList() {
    return async dispatch => {
        const page = await request.post(api.userList, {pageNo: 1, pageSize: MAX_PAGE_SIZE});
        dispatch({
            type: USER_ALL_LIST,
            userAllList: page.result
        });
    };
}
export function getUserDetail() {
    return async dispatch => {
        try {
            const userDetail = await request.post(api.userDetail);
            dispatch({
                type: USER_DETAIL,
                userDetail
            });
            return userDetail;
        }
        catch (error) {
            dispatch({
                type: USER_DETAIL,
                userDetail: {}
            });
            throw error;
        }
    };
}

export function userLogout() {
    return () => request.post(api.userLogout);
}

export function userLogin(param) {
    let fd = new FormData();
    fd.append('username', param.username);
    fd.append('password', param.password);
    return () => request.post(api.userLogin, fd);
}
