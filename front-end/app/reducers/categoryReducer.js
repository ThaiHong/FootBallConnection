/**
 * Created by Admin on 12/24/2016.
 */
import {
    GET_ALL_CATEGORY
} from '../constants'

export const categories = (state = [], action) => {
    switch (action.type) {
        case GET_ALL_CATEGORY:
            return action.cats
        default:
            return state;
    }
};