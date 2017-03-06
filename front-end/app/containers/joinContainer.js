import React from 'react'
import {connect} from 'react-redux'

import {joinDetailEvent} from '../actions/joinAction.js'
import {becomeParticipant} from '../actions/enrollmentAction'
import {updateUser} from '../actions/userAction'
import JoinComponent from '../components/joinComponents'

const mapStatetoLinkProps = (state,ownProps) =>{
    return {
        userLogined: state.userLogined.userLogined,
        user: state.userLogined.user,
        eventId: state.joinEventId
    };
};

const mapDispatchToLinkProps = (dispatch, ownProps) =>{
    return {
        becomeParticipant: (eventId, userId) => becomeParticipant(eventId, userId),
        updateUser: (user) => updateUser(user),
        joinDetailEvent: (user) => joinDetailEvent(user)
    }
}

const JoinContainer = connect(mapStatetoLinkProps, mapDispatchToLinkProps)(JoinComponent)

export default JoinContainer