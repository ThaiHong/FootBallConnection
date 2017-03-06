/**
 * Created by hvthien on 12/27/2016.
 */
import React from 'react'
import {connect} from 'react-redux'

import {addEvent} from '../actions/eventAction'
import HomePage from '../components/homePage'

const mapStateToNewUserProps = (state, ownProps) => {
    return {
        userLogined: state.userLogined.userLogined,
        user: state.userLogined.user,
        events: state.listEvent,
        myEvents: state.myEvent,
        myEventsHome: state.myEventsHome,
        numberEvents: state.numberEvents
    }
}

const mapDispatchToNewUserProps = (dispatch, ownProps) => {
    return {
        addEvent: (event) => addEvent(event),
    }
}

const HomePageContainer = connect(
    mapStateToNewUserProps,
    mapDispatchToNewUserProps
)(HomePage)

export default HomePageContainer