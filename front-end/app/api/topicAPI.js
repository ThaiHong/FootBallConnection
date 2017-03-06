/**
 * Created by phanvudinh on 1/4/2017.
 */
import axios from 'axios';
import {APP_URL} from '../config/appConfig.js'
const BASE_URL = `${APP_URL}/api/topics`;

export const createTopic = (eventId,data,cb,fcb)=>{
    axios.post(`${BASE_URL}/${eventId}`, data,{headers: { Authorization: localStorage.getItem('token')}})
        .then(function(response){
            getTopicById(response.data.id, (res) => cb(res), (err) => fcb(err));
        }).catch(function(err){
            fcb(err);
    });
}

export const getTopicsByEventId = (eventId,cb,fcb) => {
    axios.get(`${BASE_URL}/events/${eventId}`,{headers: { Authorization: localStorage.getItem('token')}})
        .then(function(response){
            cb(response);
        }).catch(function(err){
        fcb(err);
    });
}


export const getTopicById = (topicId,cb,fcb) => {
    axios.get(`${BASE_URL}/${topicId}`,{headers: { Authorization: localStorage.getItem('token')}})
        .then(function(response){
            cb(response);
        }).catch(function(err){
            fcb(err);
    });
}
//
export const updateTopic = (topicId,data,cb,fcb) => {
    axios.put(`${BASE_URL}/${topicId}`,data,{headers: { Authorization: localStorage.getItem('token')}})
        .then(function(response){
            cb(response);
        }).catch(function(err){
        fcb(err);
    });
}

export const deleteTopic = (topicId,cb,fcb) => {
    axios.delete(`${BASE_URL}/${topicId}`,{headers: { Authorization: localStorage.getItem('token')}})
        .then(function(response){
            cb(response);
        }).catch(function(err){
          fcb(err);
    });
}

export const getMaxDateByEvent = (eventId, cb, fcb) => {
    axios(BASE_URL+"/max-date/"+eventId, {headers: { Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (err) {
            console.log(err);
        })
}

export const getMinDateByEvent = (eventId, cb, fcb) => {
    axios(BASE_URL+"/min-date/"+eventId, {headers: { Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (err) {
            console.log(err);
        })
}