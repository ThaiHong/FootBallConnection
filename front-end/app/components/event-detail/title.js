/**
 * Created by ltphuc on 12/23/2016.
 */
import React, {Component} from 'react'
import Calendar from './calendar'
import JoinContainer from '../../containers/joinContainer'
import {changeJoinEventId} from '../../actions/eventAction'
import {getUserDetail} from '../../actions/userAction'


class Title extends Component {

    constructor(props) {
        super(props);
        this.handleJoinEvent = this.handleJoinEvent.bind(this);
    }

    handleJoinEvent() {
        getUserDetail();
        changeJoinEventId(this.props.id);

        if(!this.props.userLogined){
            localStorage.setItem('REMEMBER_ACTION', "JOIN");
        }
    }

    render() {

        var joined = false;
        var created = false;

        for (var i = 0; i < this.props.myEvents.length; i++) {
            if (this.props.myEvents[i].event.id == this.props.id) {
                if (this.props.myEvents[i].type == 1) {
                    created = true;
                }
                else {
                    joined = true;
                }
            }
        }

        const idJoinButton = this.props.userLogined ? "joinEvent" : "signInSignUpForm"
        if(this.props.endDate){
            var endDate = this.props.endDate;
        }else{
            var endDate = "Undecided";
        }

        return (
            <section className="event-detail-title-section">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-14 col-md-16 event-detail-no-padding event-detail-no-margin-left">
                            <div className="row event-detail-margin-top-20">
                                <div className="col-md-4 event-detail-margin-top-20 event-detail-no-padding">
                                    <Calendar startDate={this.props.calendar}/>
                                </div>
                                <div className="col-md-18 event-detail-title-event-name">
                                    <div className="col-sm-24 event-detail-no-margin-left">
                                        <h1>{this.props.title}</h1>
                                    </div>
                                    <div className="col-sm-24 event-detail-title-time">
                                        <div style={{display: "inline-block"}}>
                                            <p className="event-detail-title-time-content"><i
                                                className="glyphicon glyphicon-time event-detail-title-icon-fa"
                                                aria-hidden="true"></i>
                                                From: {this.props.startDate} &nbsp;&nbsp; To: {endDate}</p>
                                        </div>
                                    </div>

                                    <div className="col-sm-24 event-detail-title-time">
                                        <div style={{display: "inline-block"}}>
                                            <p className="event-detail-title-time-content"><i
                                                className="glyphicon glyphicon-map-marker event-detail-title-icon-fa"
                                                aria-hidden="true"></i>
                                                {this.props.location}</p>
                                            <p className="event-detail-location"> {this.props.locationDetail}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-10 col-md-8 event-detail-btn-group">
                            {(this.props.status == 0) ? (
                                    <button className="btn btn-default event-detail-btn-join" data-toggle="modal"
                                            data-target={"#" + idJoinButton}
                                            disabled="disabled"
                                    ><span>Not Available</span></button>) :
                                (created) ? (
                                        <button className="btn btn-default event-detail-btn-join" data-toggle="modal"
                                                data-target={"#" + idJoinButton}
                                                disabled="disabled"
                                        ><span>Join Event Now</span></button>) :
                                    joined ? (
                                            <button className="btn  btn-default event-detail-btn-see"
                                                    data-toggle="modal"
                                                    data-target={"#" + idJoinButton}
                                                    disabled="disabled"
                                            ><span>Joined</span></button>
                                        )
                                        : (
                                            <button className="btn btn-join event-detail-btn-join" data-toggle="modal"
                                                    data-target={"#" + idJoinButton}
                                                    onClick={this.handleJoinEvent}
                                            ><span>Join Event Now</span></button>
                                        )
                            }
                            <div className="col-sm-24 event-detail-btn-group-share">
                                <div className="col-sm-12 event-detail-btn-social">
                                    <button className="event-detail-btn-share">Share Fb
                                    </button>
                                </div>
                                <div className="col-sm-12 event-detail-btn-social">
                                    <button className="event-detail-btn-share">Share G+
                                    </button>
                                </div>
                            </div>
                            <JoinContainer/>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Title