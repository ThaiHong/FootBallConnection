import React from 'react'
import {connect} from 'react-redux'

import {loginWithSystemAccount} from '../actions/signInAction.js'
import SignInComponent from '../components/signInComponent'

const mapStateToLinkProps = (state, ownProps) => {
    return {auth: state.auth};
};

const mapDispatchToLinkProps = (dispatch, ownProps) => {
    return {
        loginWithSystemAccount: (user) => loginWithSystemAccount(user)
    }
}

const SignInContainer = connect(mapStateToLinkProps, mapDispatchToLinkProps)(SignInComponent)

export default SignInContainer