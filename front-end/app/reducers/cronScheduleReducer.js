/**
 * Created by XuanVinh on 1/2/2017.
 */
import{
    ADD_CRON_SCHEDUlE,
    GET_CRON_OF_EVENT,
    DELETE_CRON
} from '../constants'

import {getCrons} from "../actions/cronScheduleAction"

import {getEventDetail} from "../actions/eventAction"

export const addCronSchedule = (state=[], action) => {
    switch (action.type){
        case ADD_CRON_SCHEDUlE:
            getCrons(action.newCronSchedule.event.id);
            return action.newCronSchedule;
        case DELETE_CRON:
            getCrons(action.eventId);
            return state;
        default:
            return state;
    }
};

export const eventCrons = (state=[], action)=>{
    switch(action.type){
        case GET_CRON_OF_EVENT:
            getEventDetail(action.eventId);
            return action.crons;
        default:
            return state;
    }
}
