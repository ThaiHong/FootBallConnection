import {
    JOIN,
    JOIN_SUCCESS,
    JOIN_ERROR,
} from '../constants'


import * as API from '../api/userAPI'
import {dispatch} from '../store'

export const  joinDetailEvent = (user) => {
    API.joinDetailEvent(user);
};
export const joinSuccess = (message,data) =>{
    return {
        type:JOIN_SUCCESS,

        message
    }
}

export  const joinError = (message) =>{
    return {
        type: JOIN_ERROR,
        message
    }
}

