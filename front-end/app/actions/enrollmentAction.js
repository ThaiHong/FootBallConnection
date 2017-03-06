/**
 * Created by dctruc on 12/26/2016.
 */
import {
    JOIN_ERROR,
    JOIN_EVENT,
    JOIN_SUCCESS,
    LIST_PARTICIPANT,
    CHANGE_STATUS_EMAIL_REMINDER,
    CHANGE_STATUS_ALL_EMAIL_REMINDER
} from '../constants'
import * as API from '../api/enrollmentAPI'
import {dispatch} from '../store'

export const becomeParticipant = (eventId, userId) => {
    API.becomeParticipant(eventId, userId, (enrollment) => {
        dispatch({
            type: JOIN_SUCCESS,
            enrollment: enrollment
        })
    });
}

export const getEnrollmentsByEventId = (eventId) => {
    API.getEnrollmentsByEventId(eventId, (enrollments) => {
        dispatch({
            type: LIST_PARTICIPANT,
            enrollments: enrollments
        })
    })
}

export const changeStatusEmailReminder = (eventId,status) => {
    API.changeStatusOfEmailReminder(eventId ,status, () => {
        dispatch({
            type: CHANGE_STATUS_EMAIL_REMINDER,
            id: eventId
        })
    })
}

export const getEnrollmentsByEventIdRange = (eventId, start, num) => {
    API.getEnrollmentsByEventIdRange(eventId, start, num, (enrollments) => {
        dispatch({
            type: LIST_PARTICIPANT,
            enrollments: enrollments
        })
    })
}