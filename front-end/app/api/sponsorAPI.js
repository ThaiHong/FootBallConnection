/**
 * Created by dctruc on 1/3/2017.
 */
import axios from "axios";
import * as SPONSOR_ACTION from "../actions/sponsorAction"
import {APP_URL} from '../config/appConfig.js'
import {notification} from '../config/appConfig'

const BASE_URL = `${APP_URL}/api/sponsor`;

export const addSponsor = (id, formData, cb, fcb) =>{
    $.blockUI(loading);
    axios.post(BASE_URL+"/"+id+"/addsponsor", formData, {headers: { Authorization: localStorage.getItem('token')}})
        .then(function(response){
            cb(response.data);
            $.unblockUI();
            notification('success','Add sponsor successfully','');
        })
        .catch(function (error) {
            console.log(error);
            $.unblockUI();
            notification('warning','Something went wrong','')
        });
}

export const updateSponsor = (eventId,id, formData, cb, fcb) => {
    $.blockUI(loading);
    axios.put(BASE_URL+"/"+eventId+"/update/"+id, formData,{headers: { Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data)
            $.unblockUI();
            notification('success','Update sponsor successfully','');
        })
        .catch(function (error) {
            location.href = '/access-denied';
            console.log(error);
            $.unblockUI();
            notification('warning','Something went wrong','')
        });
}

export const getSponsors = (id,cb, fcb) =>{
    axios(BASE_URL+"/"+id, {headers: { Authorization: localStorage.getItem('token')}})
        .then(function (response){
           if(response.data.status == 401){
               location.href = '/access-denied';
           }
            cb(response.data);
        })
        .catch(function (error) {
            location.href = '/access-denied';
            console.log(error);
        });
}

export const getOneSponsor = (id,cb, fcb) =>{
    axios(BASE_URL+"/one-sponsor/"+id)
        .then(function (response){
            cb(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export const deleteUser = (id, evenId, cb, fcb) => {
    axios.delete(BASE_URL+"/"+evenId+"/delete"+"/"+id,{headers: { Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb(response.data)
            notification('success','Delete sponsor successfully','');
        })
        .catch(function (error) {
            location.href = '/access-denied';
            console.log(error);
            notification('warning','Something went wrong','')
        });
}

