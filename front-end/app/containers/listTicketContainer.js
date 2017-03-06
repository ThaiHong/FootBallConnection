/**
 * Created by LongDo on 1/2/2017.
 */
import React from 'react'
import {connect} from 'react-redux'
import {getUpComingTicket, getPassingTicket} from '../actions/ticketAction'
import {changeStatusEmailReminder} from  '../actions/enrollmentAction'


import ListTicket from '../components/listTicket'

const mapStateToTicketProps = (state, ownProps) => {
    return {
        upComingTicket: state.upComingTicket,
        passingTicket: state.passingTicket,
    }
}

const mapDispatchToTicketProps = (dispatch, ownProps) => {
    return {
        getUpComingTicket: (num) => getUpComingTicket(num),
        getPassingTicket: (num) => getPassingTicket(num),
        changeStatusEmailReminder: (eventId,status) => changeStatusEmailReminder(eventId,status)
    }
}

const MyListTicketContainer = connect(
    mapStateToTicketProps,
    mapDispatchToTicketProps
)(ListTicket)

export default MyListTicketContainer