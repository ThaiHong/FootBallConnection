/**
 * Created by pvdinh on 1/3/2017.
 */
import React from 'react'
import {connect} from 'react-redux'
import EventManageComponent from '../../components/event-manage/eventManageComponent'
import {getEventDetail} from '../../actions/eventAction'


const mapStateToProps = (state, ownProps) => {
      return {
          eventId : state.routing.locationBeforeTransitions.query.id,
          eventDetail: state.eventDetail
      }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch : dispatch,
        getEventDetail: (eventId) => getEventDetail(eventId)
    }
}

const EventManageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(EventManageComponent)

export default EventManageContainer;
