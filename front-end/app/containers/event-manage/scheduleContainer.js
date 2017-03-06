/**
 * Created by pvdinh on 1/3/2017.
 */
import React from 'react'
import {connect} from 'react-redux'
import ScheduleComponent from '../../components/event-manage/scheduleComponent'

const mapStateToProps = (state, ownProps) => {
    return {
      topicLists : state.topic.topicLists,
      topic : state.AppForm.topic,
      validation : state.AppForm.forms.topic,
      speakerLists : state.speaker.speakerLists,
      eventDetail : state.eventDetail
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch : dispatch
    }
}

const ScheduleContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ScheduleComponent)

export default ScheduleContainer;
