import axios from "axios";
import {APP_URL} from '../config/appConfig.js'
const BASE_URL = `${APP_URL}/api/cronSchedules`;
import {notification} from '../config/appConfig'

export const addCronSchedule = (cronSchedule, cb, fcb) =>{
    axios.post(BASE_URL, cronSchedule, {headers: { Authorization: localStorage.getItem('token')}})
        .then(function(response){
            cb(response.data);
            notification('success','Set remind schedule successfully','');
        })
        .catch(function (error) {
            notification('warning','Something went wrong','')
            console.log(error);
        });
}

export const getCrons = (eventId,cb, fcb) =>{
    axios(BASE_URL+"/events/"+eventId, {headers: { Authorization: localStorage.getItem('token')}})
        .then(function (response){
            cb(response.data);
        })
        .catch(function (error) {
            // location.href = '/access-denied';
            console.log(error);
        });
}

export const deleteCron = (cronId, cb, fcb) => {
    axios.delete(BASE_URL+"/"+cronId,{headers: { Authorization: localStorage.getItem('token')}})
        .then(function (response) {
            cb();
            notification('success','Remove remind from schedule successfully','');
        })
        .catch(function (error) {
            notification('warning','Something went wrong','')
            console.log(error);
        });
}
