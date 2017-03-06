import React, {Component} from 'react'
import { Form , Control, Field, Errors, actions} from 'react-redux-form';
import { browserHistory } from 'react-router';
import SignUpContainer from '../containers/signUpContainer';

class AlertFormSignUpButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
      return (
        <div>
          <div className="modal fade" id="signUp" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <SignUpContainer/>
              </div>
            </div>
          </div>
        </div>
      );
    }
}
export default AlertFormSignUpButton;
