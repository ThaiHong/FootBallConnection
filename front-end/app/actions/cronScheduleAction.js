/**
 * Created by XuanVinh on 1/2/2017.
 */
import{
    ADD_CRON_SCHEDUlE,
    GET_CRON_OF_EVENT,
    DELETE_CRON
} from '../constants'

import * as API from '../api/cronScheduleAPI'
import {dispatch} from '../store'

export const addCronSchedule = (cronSchedule)=> {
    API.addCronSchedule(cronSchedule, (newCronSchedule)=>{
        dispatch({
            type: ADD_CRON_SCHEDUlE,
            newCronSchedule: newCronSchedule
        })
    })
}

export const getCrons = (eventId)=>{
    API.getCrons(eventId,(crons)=>{
        dispatch({
            type: GET_CRON_OF_EVENT,
            crons: crons,
            eventId: eventId
        })
    })
}

export const deleteCron = (cronId, eventId) => {
    API.deleteCron(cronId, () =>{
        dispatch({
            type: DELETE_CRON,
            eventId: eventId
        })
    })
}
