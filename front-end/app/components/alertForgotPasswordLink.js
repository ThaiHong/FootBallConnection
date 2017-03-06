/**
 * Created by tthong on 12/27/2016.
 */
import React, {Component} from 'react'
import { Form , Control, Field, Errors, actions} from 'react-redux-form';
import { browserHistory } from 'react-router';
import ForgotPassword from './forgotPasswordComponent';

class AlertForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.hideSignIn = this.hideSignIn.bind(this);

    }

    hideSignIn() {
        $("#signInSignUpForm").modal('hide');
    }

    render() {
        return (
            <div>
            <a href="#" data-toggle="modal" data-target="#forgotPassword" onClick={this.hideSignIn}>Forgot password?</a>
            </div>
    );
    }
}

export default AlertForgotPassword;
