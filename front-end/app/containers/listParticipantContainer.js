/**
 * Created by hvthien on 1/9/2017.
 */
import React from 'react'
import {connect} from 'react-redux'

import {updateEvent} from '../actions/eventAction'
import ListParticipant from '../components/event-participants/listParticipant'

const mapStateToNewUserProps = (state, ownProps) => {
    return {
        enrollments: state.listParticipant,
        eventId : state.routing.locationBeforeTransitions.query.id
    }
}

const mapDispatchToNewUserProps = (dispatch, ownProps) => {
    return {
        updateEvent: (event) => updateEvent(event)
    }
}

const ListParticipantContainer = connect(
    mapStateToNewUserProps,
    mapDispatchToNewUserProps
)(ListParticipant)

export default ListParticipantContainer