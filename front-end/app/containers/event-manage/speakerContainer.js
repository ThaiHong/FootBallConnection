/**
 * Created by pvdinh on 1/3/2017.
 */
import React from 'react'
import {connect} from 'react-redux'
import SpeakerComponent from '../../components/event-manage/speakerComponent'

const mapStateToProps = (state, ownProps) => {
    return {
      speaker : state.AppForm.speaker,
      validation : state.AppForm.forms.speaker,
      speakerLists : state.speaker.speakerLists,
      speakerListForm : state.AppForm.speakerListForm,
      validationSpeakerListForm : state.AppForm.forms.speakerListForm
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch : dispatch
    }
}

const SpeakerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SpeakerComponent)

export default SpeakerContainer;
