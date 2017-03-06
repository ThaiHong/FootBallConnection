/**
 * Created by pvdinh on 12/19/2016.
 */
import React from 'react'
import {connect} from 'react-redux'
import SignUpComponent from '../components/signUpComponent'
import { actions } from 'react-redux-form';
import {signUpAccount} from '../api/signUpAPI';
const mapStateToProps = (state, ownProps) => {
    console.log(state);
    return {
        signUpAccount : state.AppForm.signUpAccount,
        validation : state.AppForm.forms.signUpAccount
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch : dispatch,
        signUpAccountFunction: (account, cb, fcb) => signUpAccount(account,cb,fcb)
        }
    }

const SignUpContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUpComponent)
export default SignUpContainer;
