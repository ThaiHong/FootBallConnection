/**
 * Created by vdhong on 1/9/2017.
 */
import React from 'react'
import {connect} from 'react-redux'
import {getUserDetail} from '../actions/userAction'


import ProfileComponent from '../components/profile/profileComponent'

const mapStateToProfileProps = (state, ownProps) => {
    console.log("HELLO STATE",state);
    return {
        profile : state.AppForm.profile,
        validation : state.AppForm.forms.profile,
        userLogined: state.userLogined.userLogined,
        user: state.userLogined.user
    }
}


const mapDispatchToProfileProps = (dispatch, ownProps) => {
    return {
        dispatch : dispatch
    }
}

const ProfileContainer = connect(
    mapStateToProfileProps,
    mapDispatchToProfileProps
)(ProfileComponent)

export default ProfileContainer