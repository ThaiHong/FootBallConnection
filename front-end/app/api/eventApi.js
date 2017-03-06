/**
 * Created by hvthien on 12/22/2016.
 */
import axios from "axios";
import * as EVENT_ACTION from "../actions/eventAction"
import * as ACTION from '../actions/userAction'
import {APP_URL} from '../config/appConfig.js'

const BASE_URL = `${APP_URL}/api/event`;

export const getAllEvents = (cb, fcb) => {
    axios(BASE_URL)
        .then(function (response) {
            console.log("OK");
            cb(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
}

export const addEvent = (event, cb, fcb) => {
    axios.post(BASE_URL+"/quick", event, {headers: { Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
            ACTION.getMyEvents();
            ACTION.getMyEventsHomePage();
            location.href = "/event/"+response.data+"/manage/description";
            // EVENT_ACTION.getAllEvents();
        })
        .catch(function (error) {
            console.log(error);
        });

}

export const updateEvent = (event, cb, fcb) => {
    $.blockUI(loading);
    axios.post(BASE_URL+"/update", event, {headers: { Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
            $.unblockUI();
           location.href = '/event/'+event.get("id")+'/manage/speaker';
            // ACTION.getMyEvents();
            // EVENT_ACTION.getAllEvents();
        })
        .catch(function (error) {
            console.log(error);
            $.unblockUI();
        });
}

export const getEventDetail = (eventId, cb, fcb) => {
    axios(BASE_URL+"/"+eventId)
        .then(function (response) {
            cb(response.data)
        })
        .catch(function (error) {
            location.href = '/404';
            console.log(error);
        });
}

export const getUpcomingEvents = (num, cb, fcb) => {
    $.blockUI(loading);
    axios(BASE_URL+"/upcoming/"+num)
        .then(function (response) {
            cb(response.data, num);
            $.unblockUI();

        })
        .catch(function (error) {
            console.log(error);
            $.unblockUI();
        });
}

export const getSlideShowEvent = (cb, fcb) => {
    axios(BASE_URL+"/slide-show")
        .then(function (response) {
            cb(response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
}


export const getEventCreated = (id, cb, fcb) => {
    axios(BASE_URL+"/created/"+id, {headers: { Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data)
        })
        .catch(function (error) {
            location.href = '/access-denied';
            console.log(error);
        });
}

export const getEventTitle = (eventId, cb, fcb) => {
    axios(BASE_URL+"/"+eventId+"/title")
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
}

export const checkJoinedCreated = (eventId, cb, fcb) => {
    axios(BASE_URL+"/"+eventId+"/check-join", {headers: { Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
}
