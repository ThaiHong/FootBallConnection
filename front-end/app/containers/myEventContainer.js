/**
 * Created by ltphuc on 1/7/2017.
 */
import React from 'react'
import {connect} from 'react-redux'

import MyEvent from '../components/myEvent'
import {
    getSizeListLiveEventByUserId,
    getListPassEventByUserId,
    getListLiveEventByUserId,
    getSizeListPassEventByUserId,
    updateStatusEventByUserId
} from '../actions/myEventAction'

const mapStateToMyEventProps = (state, ownProps) => {
    return {
        liveEvents: state.liveEvents,
        passEvents: state.passEvents,
        sizeOfLiveEvents: state.sizeOfLiveEvents,
        sizeOfPassEvents: state.sizeOfPassEvents,
    }
}

const mapDispatchToMyEventProps = (dispatch, ownProps) => {
    return {
        updateStatusEventByUserId: (id, status) => updateStatusEventByUserId(id, status),
        getListLiveEventByUserId: (num) => getListLiveEventByUserId(num),
        getListPassEventByUserId: (num) => getListPassEventByUserId(num),
        getSizeListLiveEventByUserId: () => getSizeListLiveEventByUserId(),
        getSizeListPassEventByUserId: () => getSizeListPassEventByUserId(),
    }
}

const MyEventContainer = connect(
    mapStateToMyEventProps,
    mapDispatchToMyEventProps
)(MyEvent)

export default MyEventContainer
