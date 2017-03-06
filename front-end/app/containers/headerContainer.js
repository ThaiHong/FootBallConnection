/**
 * Created by pvdinh on 12/27/2016.
 */
import React from 'react'
import {connect} from 'react-redux'
import Header from '../components/header'
import {userNotLogined} from '../actions/userLoginedAction'

const mapStateToProps = (state, ownProps) => {
    return {
        userLogined: state.userLogined.userLogined,
        user: state.userLogined.user
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch: dispatch,
        logOut: () => dispatch(userNotLogined())
    }
}

const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)

export default HeaderContainer
