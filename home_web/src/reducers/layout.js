import {UPDATE_LAYOUT} from '../constants/ActionTypes';

const initalState = {};

export default (state = initalState, action) => {
    switch (action.type) {
        case UPDATE_LAYOUT:
            return action.layout;
        default:
            return state;
    }
};
