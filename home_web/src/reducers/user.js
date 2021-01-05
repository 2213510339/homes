/**
 * @file reducers/user.js
 * @author zhangzhe
 */

import {combineReducers} from 'redux';

import {
    USER_ALL_LIST, USER_DETAIL
} from '../constants/ActionTypes';

const initialState = {
    list: [],
    detail: {},
    page: {totalCount: 0, error: false, result: []}

};
const userAll = (state = initialState.list, action) => {
    switch (action.type) {
        case USER_ALL_LIST:
            return action.result || Object.assign({}, initialState, {error: true});
        default:
            return state;
    }
};
const userDetail = (state = initialState.detail, action) => {
    switch (action.type) {
        case USER_DETAIL:
            return action.result || Object.assign({}, initialState, {error: true});
        default:
            return state;
    }
};
export default combineReducers({
    userAll,
    userDetail
});
