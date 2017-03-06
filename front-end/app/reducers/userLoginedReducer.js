import * as ActionConstants from '../constants';
import * as ACTION from '../actions/userAction'

export const userLogined = (state = {userLogined: false, user: {}}, action) => {
    switch (action.type) {
        case ActionConstants.USER_LOGINED:

            ACTION.getMyEvents();
            ACTION.getMyEventsHomePage();

            if (localStorage.getItem('REMEMBER_ACTION') == "CREATE") {
                $('#createEvent').modal('toggle');
            }
            else if (localStorage.getItem('REMEMBER_ACTION') == "JOIN") {
                $('#joinEvent').modal('toggle');
            }
            delete localStorage['REMEMBER_ACTION'];
            return Object.assign({}, state, {
                userLogined: true,
                user: action.user
            })

        case ActionConstants.USER_NOT_LOGINED:
            return Object.assign({}, state, {
                userLogined: false,
                user: {}
            })

        default:
            return state;
    }
};
