/**
 * Created by pvdinh on 1/3/2017.
 */
import React from 'react'
import {connect} from 'react-redux'
import RemindComponent from "../../components/event-manage/remindComponent"
import {addCronSchedule, getCrons, deleteCron} from '../../actions/cronScheduleAction'

const mapStateToProps = (state, ownProps) => {
    return {
        eventId : state.routing.locationBeforeTransitions.query.eventId,
        eventCrons : state.eventCrons,
        eventDetail: state.eventDetail
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addCronSchedule: (cronSchedule) => addCronSchedule(cronSchedule),
        getCrons: (eventId) => getCrons(eventId),
        deleteCron: (cronId, eventId) => deleteCron(cronId, eventId)
    }
}

const RemindContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(RemindComponent)

export default RemindContainer;
