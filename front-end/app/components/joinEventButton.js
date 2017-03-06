import React, {Component} from 'react'
import {becomeParticipant} from '../actions/enrollmentAction'

class JoinEventButton extends Component {
    constructor(props) {
        super(props);
        this.handleButtonClick= this.handleButtonClick.bind(this);
        this.handleJoinDirectly = this.handleJoinDirectly.bind(this);
    }

    handleButtonClick(){
        this.props.onClick(this.props.eventId);
        if(this.props.idJoinButton == "signInSignUpForm"){
            localStorage.setItem('REMEMBER_ACTION', "JOIN");
        }
    }

    handleJoinDirectly(){
        becomeParticipant(this.props.eventId, 0);
    }

    render() {
        return (
            <div>
                {(!this.props.joined && !this.props.created && !this.props.user.ignoreJoin) ? (
                    <button type="button" className="btn btn-join" data-toggle="modal"
                            data-target={"#" + this.props.idJoinButton}
                            style={{float: "right", margin: 10}}
                            onClick={this.handleButtonClick}>Join Us

                    </button>) :
                    (!this.props.joined && !this.props.created && this.props.user.ignoreJoin) ? (
                        <button type="button" className="btn btn-join"
                                style={{float: "right", margin: 10}}
                                onClick={this.handleJoinDirectly}>Join Us
                        </button>
                    ) : (
                    <button type="button" className="btn btn-default" style={{float: "right", margin: 10, border: "0.5px solid #777777"}} disabled="disabled">
                        {this.props.joined ?
                            "Joined"
                            :
                            "Created"
                        }
                    </button>)
                }
            </div>
        );

    }

}
export default JoinEventButton;
