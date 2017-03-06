/**
 * Created by dtnha on 12/30/2016.
 */
import {
    QUICK_SEARCH
} from '../constants/index'
import * as ACTION from '../actions/searchAction'

export const listEventSearched = (state = [], action) => {
    switch (action.type) {
        case QUICK_SEARCH:
            return action.listEventSearched
        default:
            return state;
    }
};
