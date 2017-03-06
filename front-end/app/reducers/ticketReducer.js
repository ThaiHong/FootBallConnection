/**
 * Created by LongDo on 1/2/2017.
 */
import {
    GET_UP_COMING_TICKET,
    GET_PASSING_TICKET,
    CHANGE_STATUS_EMAIL_REMINDER,
    CHANGE_STATUS_ALL_EMAIL_REMINDER
} from '../constants'

import * as ACTION from '../actions/ticketAction'

export const upComingTicket = (state = [], action) => {
    switch (action.type) {
        case GET_UP_COMING_TICKET:
            return action.upComingTicket
        case CHANGE_STATUS_EMAIL_REMINDER: {
            var tickets = [];
            state.forEach(function (ticket) {
                if (ticket.event.id == action.id) {
                    ticket.optionalEmailReminder = 1 - ticket.optionalEmailReminder;
                }
                tickets.push(ticket);
            });

            return tickets;
        }
        case CHANGE_STATUS_ALL_EMAIL_REMINDER:
            var tickets = [];
            state.forEach(function (ticket) {

                ticket.optionalEmailReminder = 1 - ticket.optionalEmailReminder;

                tickets.push(ticket);
            });

            return tickets;
        default:
            return state;
    }
};

export const passingTicket = (state = [], action) => {
    switch (action.type) {
        case GET_PASSING_TICKET:
            return action.passingTicket;
        case CHANGE_STATUS_EMAIL_REMINDER:
            var tickets = [];
            state.forEach(function (ticket) {
                if (ticket.event.id == action.id) {
                    ticket.optionalEmailReminder = 1 - ticket.optionalEmailReminder;
                }
                tickets.push(ticket);
            });

            return tickets;
        case CHANGE_STATUS_ALL_EMAIL_REMINDER:
            var tickets = [];
            state.forEach(function (ticket) {

                    ticket.optionalEmailReminder = 1 - ticket.optionalEmailReminder;

                tickets.push(ticket);
            });

            return tickets;
        default:
            return state;
    }
};
