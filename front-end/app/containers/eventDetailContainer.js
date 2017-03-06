/**
 * Created by ltphuc on 12/23/2016.
 */
import React from 'react'
import {connect} from 'react-redux'

import EventDetail from '../components/eventDetail'

const mapStateToEventProps = (state, ownProps) => {
    return {
        eventDetail: state.eventDetail,
        eventId : state.routing.locationBeforeTransitions.query.eventId,
        userLogined : state.userLogined.userLogined,
        myEvents : state.myEvent
    }

}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch : dispatch,
    }
}
const EventDetailContainer = connect(
    mapStateToEventProps,
    mapDispatchToProps
)(EventDetail)

export default EventDetailContainer;