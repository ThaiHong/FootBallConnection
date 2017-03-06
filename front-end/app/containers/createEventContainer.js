/**
 * Created by hvthien on 12/12/2016.
 */
import React from 'react'
import {connect} from 'react-redux'

import {addEvent} from '../actions/eventAction'
import CreateEventForm from '../components/createEventForm'

const mapStateToNewUserProps = (state, ownProps) => {
    return {
        cats: state.categories
    }
}

const mapDispatchToNewUserProps = (dispatch, ownProps) => {
    return {
        addEvent: (event) => addEvent(event),
    }
}

const CreateEventContainer = connect(
    mapStateToNewUserProps,
    mapDispatchToNewUserProps
)(CreateEventForm)

export default CreateEventContainer