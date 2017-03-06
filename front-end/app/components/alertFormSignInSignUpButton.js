/**
 * Created by pvding on 12/24/2016.
 */
import React, {Component} from 'react'
import { Form , Control, Field, Errors, actions} from 'react-redux-form';
import { browserHistory } from 'react-router';
import SignInSignUpComponent from './signInSignUpComponent';


class AlertFormSignInSignUpButton extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {
        return (
          <SignInSignUpComponent />
        );
    }
}
export default AlertFormSignInSignUpButton;
