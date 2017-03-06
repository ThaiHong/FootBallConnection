/**
 * Created by dctruc on 12/26/2016.
 */
import axios from "axios";
import * as ACTION from '../actions/userAction'
import {APP_URL} from '../config/appConfig.js'
import {notification} from '../config/appConfig'

const BASE_URL = `${APP_URL}/api/enrollments`;

export const becomeParticipant = (eventId, userId, cb, fcb) => {
    axios.post(BASE_URL + "/join", {
        event: eventId,
        user: userId
    }, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data)
            ACTION.getMyEvents();
            ACTION.getMyEventsHomePage();
            notification('success','Joined Successfully','');
        })
        .catch(function (error) {
            console.log(error);
        });
}

export const getUpComingTicket = (num, cb, fcb) => {
    console.log("URL: ", BASE_URL);
    axios(BASE_URL + "/up-coming/" + num, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            console.log(response.data);
            cb(response.data);
        })
        .catch(function (error) {
            //location.href = '/error'
            console.log(error);
        })
}

export const getPassingTicket = (num, cb, fcb) => {
    axios(BASE_URL + "/passing/" + num, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data)
        })
        .catch(function (error) {
            //location.href = '/error'
            console.log(error)
        })
}

export const getEnrollmentsByEventId = (eventId, cb, fcb) => {
    axios(BASE_URL + "/" + eventId + "/list-participants", {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data)
        })
        .catch(function (error) {
            location.href = '/access-denied';
            console.log(error)
        })
}

export const getEnrollmentsByEventIdRange = (eventId, start, num, cb, fcb) => {
    axios(BASE_URL + "/" + eventId + "/list-participants/" + start + "/" + num, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data)
        })
        .catch(function (error) {
            location.href = '/access-denied';
            console.log(error)
        })
}

export const getEnrollmentsByUserEvent = (eventId, userId, cb, fcb) => {
    axios.post(BASE_URL + "/find-user", {
        event: eventId,
        user: userId
    }, {headers: {Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data)
        })
        .catch(function (error) {
            console.log(error)
        })
}

export const changeStatusOfEmailReminder = (eventId, status, cb, fcb) => {
    $.blockUI(loading);
    axios.post(BASE_URL + "/email-reminder", {
        eventId: eventId,
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
