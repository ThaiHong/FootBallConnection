/**
 * Created by pvdinh on 12/27/2016.
 */
import React from 'react'
import {connect} from 'react-redux'
import UserCorner from '../components/userCorner'
import {userNotLogined} from '../actions/userLoginedAction'

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.userLogined.user
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch : dispatch,
        logOut : () => dispatch(userNotLogined())
    }
}

const UserCornerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserCorner)

export default UserCornerContainer;
