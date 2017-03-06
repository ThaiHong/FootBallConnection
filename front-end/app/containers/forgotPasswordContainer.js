/**
 * Created by ltvch on 12/27/2016.
 */
import React from 'react'
import {connect} from 'react-redux'
import {forgotPassword} from '../api/forgotPasswordAPI'
import ForgotPassword from '../components/forgotPasswordComponent'

const mapStateToForgotProps = (state, ownProps) => {
    return {auth: state.auth};
};

const mapDispatchToForgotProps = (dispatch, ownProps) => {
    return {
        forgotPassword: (data,cb, fcb) => forgotPassword(data,cb, fcb)
    }
}

const ForgotPasswordContainer = connect(mapStateToForgotProps, mapDispatchToForgotProps)(ForgotPassword)

export default ForgotPasswordContainer

