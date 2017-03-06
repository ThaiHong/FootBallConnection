/**
 * Created by Dell on 1/7/2017.
 */
import axios from "axios";
import {APP_URL} from '../config/appConfig.js'

const BASE_URL =`${APP_URL}/api/event`;

export const getListLiveEventByUserId = (num, cb, fcb) => {

    axios(BASE_URL + "/live/" + num, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            console.log("Live: ", response.data);
            cb(response.data);
        })
        .catch(function (error) {
            //location.href = '/access-denied'
            console.log("Live Error: ", error);
        })
}

export const getSizeListLiveEventByUserId = (cb, fcb) => {

    axios(BASE_URL + "/live/size", {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            console.log("Size Live: ", response.data);
            cb(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
}

export const getListPassEventByUserId = (num, cb, fcb) => {

    axios(BASE_URL + "/pass/" + num, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            console.log("Pass: ", response.data);
            cb(response.data);
        })
        .catch(function (error) {
            //location.href = '/access-denied'
            console.log("Pass Error: ", error);
        })
}

export const getSizeListPassEventByUserId = (cb, fcb) => {

    axios(BASE_URL + "/pass/size", {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            console.log("Size Pass: ", response.data);
            cb(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
}

export const updateStatusEventByUserId = (id, status, cb, fcb) => {
    $.blockUI(loading);
    axios(BASE_URL + "/" + id + "/status/" + status, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            console.log("Status: ", response.data);
            cb(response.data);
            $.unblockUI();
        })
        .catch(function (error) {
            console.log(error);
            $.unblockUI();
        })
}
