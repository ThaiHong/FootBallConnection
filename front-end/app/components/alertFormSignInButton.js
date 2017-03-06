/**
 * Created by nmtri on 12/22/2016.
 */
import React, {Component} from 'react'
import { Form , Control, Field, Errors, actions} from 'react-redux-form';
import { browserHistory } from 'react-router';
import SignInContainer from '../containers/signInContainer';

class AlertFormSignInButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var linkStyle = {
            textAlign: "right",
            marginBottom: 20,
            paddingRight: 0,
            fontSize: 13,
            fontWeight: 600
        }

        var btnStyle = {
            borderRadius: 0
        }

        var modalBodyStyle = {
            marginTop: 20,
            marginBottom: 30
        }

        var modalTitleStyle = {
            textAlign: "center",
            color: "#0096D6",
            backgroundColor: "#EFEFEF",
        }

        var titleStyle = {
            fontSize: 25,
            fontWeight: 500
        }

        var inputStyle = {
            borderRadius: 0
        }

        return (
            <div>
                <div className="modal fade" id="signIn" role="dialog">
                    <div className="modal-dialog">

                        <div className="modal-content">
                            <div className="modal-header" style={modalTitleStyle}>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title" style={titleStyle}>SIGN IN</h4>
                            </div>
                            <div className="modal-body" style={modalBodyStyle}>
                                <SignInContainer />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default AlertFormSignInButton;
