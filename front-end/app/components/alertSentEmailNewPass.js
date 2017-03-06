/**
 * Created by tthong on 12/27/2016.
 */
import React, {Component} from 'react'
import {Form, Control, Field, Errors, actions} from 'react-redux-form';
import {browserHistory} from 'react-router';
import SentEmailNewPass from './sentEmailNewPass';

class AlertSentEmailNewPass extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (

            <div>
                <div className="modal fade" id="successfulProcess" role="dialog">
                    <div className="modal-dialog" style={{width: "350px"}}>
                        <div className="">
                            <SentEmailNewPass />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default AlertSentEmailNewPass;