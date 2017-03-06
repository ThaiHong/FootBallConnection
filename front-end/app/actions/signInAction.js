import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
} from '../constants'

import * as API from '../api/userAPI'
import {dispatch} from '../store'

export const loginWithSystemAccount = (user) => {
    API.loginWithSystemAccount(user);
};

export const loginSuccess = (message,data) =>{
    return {
        type: LOGIN_SUCCESS,
        //save token here
        message
    }
}

export const loginError = (message) =>{
    return{
        type: LOGIN_ERROR,
        message
    }
}