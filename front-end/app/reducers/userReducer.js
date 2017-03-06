/**
 * Created by hvthien on 12/26/2016.
 */
import {
    GET_USER_DETAIL,
    GET_MY_EVENT,
    USER_NOT_LOGINED,
    GET_MY_EVENT_HOME,
    UPDATE_PASSWORD

} from '../constants'

export const userInfo = (state = [], action) => {
    switch (action.type) {
        case GET_USER_DETAIL:
            return action.user
        default:
            return state;
    }
};

export const myEvent = (state = [], action) => {
    switch (action.type) {
        case GET_MY_EVENT:
            return action.enrollments;
        case USER_NOT_LOGINED:
            return [];
        default:
            return state;
    }
}

export const myEventsHome = (state = [], action) => {
    switch (action.type) {
        case GET_MY_EVENT_HOME:
            return action.enrollments;
        case USER_NOT_LOGINED:
            return [];
        default:
            return state;
    }
}

// export const updatePassword = (state, action) => {
//     switch (action.type) {
//         case UPDATE_PASSWORD:
//             return action.status;
//
//         default:
//             return state;
//     }
// }