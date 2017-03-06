/**
 * Created by hvthien on 1/3/2017.
 */
import React from 'react'
import {connect} from 'react-redux'

import {updateEvent} from '../actions/eventAction'
import DetailCreate from '../components/create-detail/detailCreate'

const mapStateToNewUserProps = (state, ownProps) => {
    return {
        cats: state.categories,
        eventId : state.routing.locationBeforeTransitions.query.id
    }
}

const mapDispatchToNewUserProps = (dispatch, ownProps) => {
    return {
        updateEvent: (event) => updateEvent(event)
    }
}

const DetailCreateContainer = connect(
    mapStateToNewUserProps,
    mapDispatchToNewUserProps
)(DetailCreate)

export default DetailCreateContainer