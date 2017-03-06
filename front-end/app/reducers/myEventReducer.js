/**
 * Created by ltphuc on 1/7/2017.
 */
import {
    GET_MY_EVENT_LIVE,
    GET_SIZE_MY_EVENT_LIVE,
    GET_MY_EVENT_PASS,
    GET_SIZE_MY_EVENT_PASS,
    UPDATE_STATUS_EVENT
} from '../constants'

export const liveEvents = (state = [], action) => {
    switch (action.type) {
        case GET_MY_EVENT_LIVE:
            return action.liveEvents

        case UPDATE_STATUS_EVENT: {

            var events = [];
            state.forEach(function (event) {
                if (event.id == action.id) {
                    event.status = action.status;
                }
                events.push(event);
            });

            return events;

        }

        default:
            return state;
    }
};

export const sizeOfLiveEvents = (state = 0, action) => {
    switch (action.type) {
        case GET_SIZE_MY_EVENT_LIVE:
            return action.sizeOfLiveEvents
        default:
            return state;
    }
};

export const passEvents = (state = [], action) => {
    switch (action.type) {
        case GET_MY_EVENT_PASS:
            return action.passEvents

        case UPDATE_STATUS_EVENT: {
            var events = [];
            state.forEach(function (event) {
                if (event.id == action.id) {
                    event.status = action.status;
                }
                events.push(event);
            });

            return events;

        }

        default:
            return state;
    }
};

export const sizeOfPassEvents = (state = 0, action) => {
    switch (action.type) {
        case GET_SIZE_MY_EVENT_PASS:
            return action.sizeOfPassEvents
        default:
            return state;
    }
};