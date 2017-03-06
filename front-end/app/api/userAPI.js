import axios from "axios";
import { joinSuccess, joinError } from "../actions/joinAction.js"
import { dispatch } from '../store'
import { loginSuccess, loginError } from "../actions/signInAction.js"
import {userLogined, userNotLogined} from '../actions/userLoginedAction.js'
import * as ACTION from '../actions/userAction'
import {handleExpiredToken} from '../actions/commonAction';
import {APP_URL} from '../config/appConfig.js'

const BASE_URL = `${APP_URL}/auth/login`;
const USER_URL = `${APP_URL}/api/users`;
const ENROLL_URL = `${APP_URL}/api/enrollments`;

export const joinDetailEvent = (user, fcb) => {
    console.log(user);
    axios.post(BASE_URL, user)
        .then(function (response) {
            dispatch(joinSuccess("Join Success", response.data));
            console.log(response);
        })
        .catch(function (error) {
            dispatch(joinError({message: "Something is incorrect"}));
            console.log(error);
        });
}

export const loginWithSystemAccount = (user, fcb) => {
    $.blockUI(loading);

    axios.post(BASE_URL, user)
        .then(function (response) {
            let data = response.data;
            if(data.status && data.status == 403){
                dispatch(loginError({message: "Email or Password is incorrect"}));
            }
            else if(data.status && data.status == 401){
                dispatch(userNotLogined());
            }
            else{
                let token = data.token;
                dispatch(loginSuccess("Login success", response.data));
                localStorage.setItem('token', token);
                $('#signInSignUpForm').modal('hide');
                getMyInfo(token, (res)=> { dispatch(userLogined(res))});
            }
            $.unblockUI();

        })
        .catch(function (error) {
            dispatch(userNotLogined());
            $.unblockUI();

        });

}

export const updateUser = (user, fcb) => {
    console.log(user);
    axios.put(USER_URL+"/update", user, {headers: { Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            getMyInfo(localStorage.getItem('token'), (res)=> { dispatch(userLogined(res))});
            console.log(response.data);
        })
        .then(function (error) {
            console.log(error);
        })
}

export const getUserDetail = (cb, fcb) => {
    $.blockUI(loading);
    axios(USER_URL+"/info", {headers: { Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
            $.unblockUI();
        })
        .catch(function (error) {
            console.log(error);
            $.unblockUI();
        });
}

export const getMyEvents = ( cb, fcb) => {
    // $.blockUI(loading);
    axios(USER_URL+"/my-event", {headers: { Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
            // $.unblockUI();
        })
        .catch(function (error) {
            console.log(error);
            // $.unblockUI();
        })
}

export const updateProfile = (data, cb, fcb) => {
    axios.put(USER_URL+"/profile", data,{headers: { Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);

        })
        .catch(function (error) {
            console.log(error);
        })
}

export const update = (data, cb, fcb) => {
    axios.put(USER_URL+"/update", data,{headers: { Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);

        })
        .catch(function (error) {
            console.log(error);
        })
}

export const updateJoin = (data, cb, fcb) => {
    console.log(data);
    axios.put(USER_URL+"/update-join", data, {headers: { Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            // cb(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
}

export const getMyInfo = (token, cb, fcb) => {
    axios.get(USER_URL+"/info",{
        headers: {
            "Authorization": token
        }
    })
        .then(function (response) {
            cb(response.data)
        })
        .catch(function (error) {
            console.log(error)
        })
}

export const getMyEventsHomePage = (cb, fcb) => {
    $.blockUI(loading);
    axios(ENROLL_URL+"/my-event-home", {headers: { Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
            $.unblockUI();
        })
        .catch(function (error) {
            console.log(error);
            $.unblockUI();
        })
}

export const changeStatusOfAllEmailReminder = (status, cb, fcb) => {
    $.blockUI(loading);
    axios.post(USER_URL + "/all-email-reminder", {
        status: status
    }, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
            $.unblockUI();
        })
        .catch(function (error) {
            console.log(error)
            $.unblockUI();
        })
}


export const updatePassword = (data, cb, fcb) => {
    axios.post(USER_URL+"/profile/changePassword", data,{headers: { Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data)
        })
        .catch(function (error) {
            fcb(error)
        })
}