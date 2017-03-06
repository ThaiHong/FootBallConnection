/**
 * Created by Dell on 1/7/2017.
 */
import {
    GET_MY_EVENT_LIVE,
    GET_MY_EVENT_PASS,
    GET_SIZE_MY_EVENT_LIVE,
    GET_SIZE_MY_EVENT_PASS,
    UPDATE_STATUS_EVENT
} from '../constants'
import * as API from '../api/myEventAPI'
import {dispatch} from '../store'

export const getListLiveEventByUserId = (num) => {
    API.getListLiveEventByUserId(num,
        (liveEvents) => {
            dispatch({
                type: GET_MY_EVENT_LIVE,
                liveEvents: liveEvents
            })
        })
}

export const getSizeListLiveEventByUserId = () => {
    API.getSizeListLiveEventByUserId(
        (sizeOfLiveEvents) => {
            dispatch({
                type: GET_SIZE_MY_EVENT_LIVE,
                sizeOfLiveEvents: sizeOfLiveEvents
            })
        })
}

export const getListPassEventByUserId = (num) => {
    API.getListPassEventByUserId(num,
        (passEvents) => {
            dispatch({
                type: GET_MY_EVENT_PASS,
                passEvents: passEvents
            })
        })
}

export const getSizeListPassEventByUserId = () => {
    API.getSizeListPassEventByUserId(
        (sizeOfPassEvents) => {
            dispatch({
                type: GET_SIZE_MY_EVENT_PASS,
                sizeOfPassEvents: sizeOfPassEvents
            })
        })
}

export const updateStatusEventByUserId = (id, status) => {
    API.updateStatusEventByUserId(id, status,
        (data) => {
            dispatch({
                type: UPDATE_STATUS_EVENT,
                id: id,
                status: data
            })
        })
}