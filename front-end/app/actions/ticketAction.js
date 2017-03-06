/**
 * Created by LongDo on 1/2/2017.
 */
import {
    GET_UP_COMING_TICKET,
    GET_PASSING_TICKET
} from '../constants'
import * as API from '../api/enrollmentAPI'
import {dispatch} from '../store'

export const getUpComingTicket = (num) => {
    API.getUpComingTicket(num,
        (upComingTicket) => {
            dispatch({
                type: GET_UP_COMING_TICKET,
                upComingTicket: upComingTicket
            })
        })
}

export const getPassingTicket = (num) => {
    API.getPassingTicket(num,
        (passingTicket) => {
            dispatch({
                type: GET_PASSING_TICKET,
                passingTicket: passingTicket
            })
        })
}