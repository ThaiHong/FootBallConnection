/**
 * Created by pvdinh on 1/3/2017.
 */
import React from 'react'
import {connect} from 'react-redux'
import ScheduleFormComponent from '../../components/event-manage/scheduleFormComponent'

const mapStateToProps = (state, ownProps) => {
    return {
      topic : state.AppForm.topic,
      validation : state.AppForm.forms.topic,
      speakerLists : state.speaker.speakerLists
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch : dispatch
    }
}

const ScheduleFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ScheduleFormComponent)

export default ScheduleFormContainer;
