/**
 * Created by pvdinh on 1/3/2017.
 */
import axios from 'axios';
import {APP_URL} from '../config/appConfig.js'

const BASE_URL = `${APP_URL}/api/speakers`;

export const createSpeaker = (eventId,data,cb,fcb)=>{
  axios.post(`${BASE_URL}/${eventId}`, data, {headers: { Authorization: localStorage.getItem('token')}})
          .then(function(response){
            cb(response);
          }).catch(function(err){
            fcb(err);
          });
}

export const getSpeakerByEventId = (eventId,cb,fcb) => {
  axios.get(`${BASE_URL}/events/${eventId}`,{headers: { Authorization: localStorage.getItem('token')}})
          .then(function(response){
            cb(response);
          }).catch(function(err){
            fcb(err);
          });
}

export const getSpeakerById = (speakerId,cb,fcb) => {
  axios.get(`${BASE_URL}/${speakerId}`, {headers: { Authorization: localStorage.getItem('token')}})
          .then(function(response){
            cb(response);
          }).catch(function(err){
            fcb(err);
          });
}

export const updateSpeaker = (speakerId,data,cb,fcb) => {
  axios.put(`${BASE_URL}/${speakerId}`,data, {headers: { Authorization: localStorage.getItem('token')}})
          .then(function(response){
            cb(response);
          }).catch(function(err){
            fcb(err);
          });
}

export const deleteSpeaker = (speakerId,cb,fcb) => {
  axios.delete(`${BASE_URL}/${speakerId}`, {headers: { Authorization: localStorage.getItem('token')}})
          .then(function(response){
            cb(response);
          }).catch(function(err){
            fcb(err);
          });
}
