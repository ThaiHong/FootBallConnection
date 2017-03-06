/**
 * Created by hvthien on 12/22/2016.
 */
import {
    GET_ALL_EVENT,
    GET_UPCOMING_EVENT,
    QUICK_CREATE_EVENT,
    GET_EVENT_DETAIL,
    CHANGE_JOIN_EVENT_ID,
    GET_SLIDE_SHOW_EVENT,
} from '../constants'
import * as API from '../api/eventApi'
import * as myEventAPI from '../api/myEventAPI'
import {dispatch} from '../store'

export const getAllEvents = () => {
    API.getAllEvents(
        (events) => {
            dispatch({
                type: GET_ALL_EVENT,
                events: events
            })
        })
}

export const getEventDetail = (eventId) => {
    API.getEventDetail(eventId, (event) => {
        dispatch({
            type: GET_EVENT_DETAIL,
            event: event
        })
    })
}

export const addEvent = (event) => {
    API.addEvent(event, (newUser) => {
        console.log(newUser);
        dispatch({
            type: QUICK_CREATE_EVENT,
            event: newUser
        })
    })
}

export const updateEvent = (event) => {
    API.updateEvent(event, (updated) => {
    })
}

export const getUpcomingEvents = (num) => {
    API.getUpcomingEvents(num, (events, newNum) => {
        dispatch({
            type: GET_UPCOMING_EVENT,
            events: events,
            num: newNum
        })
    })
}


export const changeJoinEventId = (eventId) => {
    dispatch({
        type: CHANGE_JOIN_EVENT_ID,
        eventId: eventId
    })

}

export const getSlideShowEvents = () => {
    API.getSlideShowEvent((events) => {
        dispatch({
            type: GET_SLIDE_SHOW_EVENT,
            events: events
        })
    })
}


export const updateStatusEventByUserId = (id, status) => {
    myEventAPI.updateStatusEventByUserId(id, status,
        (data) => {
            getEventDetail(id);
        })
}

