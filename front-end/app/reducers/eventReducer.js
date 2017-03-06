/**
 * Created by hvthien on 12/22/2016.
 */
import {
    GET_ALL_EVENT,
    GET_UPCOMING_EVENT,
    QUICK_CREATE_EVENT,
    GET_EVENT_DETAIL,
    CHANGE_JOIN_EVENT_ID,
    LIST_PARTICIPANT,
    LIST_PARTICIPANT_SEARCHED
} from '../constants'
import * as ACTION from '../actions/userAction'

export const listEvent = (state = [], action) => {
    switch (action.type) {
        case GET_ALL_EVENT:
            return action.events

        case GET_UPCOMING_EVENT:
            return action.events

        default:
            return state;
    }
};

export const numberEvents = (state = 10, action) => {
    switch (action.type) {
        case GET_UPCOMING_EVENT:
            return action.num;
        default:
            return state;
    }
}

export const eventDetail = (state = {}, action) => {
    switch (action.type) {
        case GET_EVENT_DETAIL:
            return action.event

        case QUICK_CREATE_EVENT:
            return action.event

        default:
            return state;
    }
};

export const joinEventId = (state = '', action) => {
    switch (action.type) {
        case CHANGE_JOIN_EVENT_ID:
            return action.eventId;

        default:
            return state
    }
}

export const listParticipant = (state = [], action) => {
    switch (action.type){
        case LIST_PARTICIPANT:
            return action.enrollments

        case LIST_PARTICIPANT_SEARCHED:
            return action.enrollmentsSearched;
        default:
            return state;
    }
}
