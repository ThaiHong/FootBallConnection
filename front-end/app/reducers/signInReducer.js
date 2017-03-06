import * as ActionConstants from '../constants';

export const auth = (state = {message: ''}, action) => {
    switch (action.type) {
      case ActionConstants.LOGIN_SUCCESS:
      return {
      message: "Login success"
    }

    case ActionConstants.LOGIN_ERROR:
      return {
      message: action.message
    }
    default:
      return state;
    }
};
