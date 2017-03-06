import React, {Component} from 'react'
import EventCalendar from './eventCalendar'
import JoinEventButton from './joinEventButton'
import {changeJoinEventId} from '../actions/eventAction'
import {APP_URL} from '../config/appConfig.js'

class EventPanel extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        const url = (this.props.imageCover) ? APP_URL + this.props.imageCover +"/cover" :
            "/assets/default.png"

        const idJoinButton = this.props.userLogined ? "joinEvent" : "signInSignUpForm"

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

        var link = "/event/" + this.props.id;

        return (
            <div>
                <br/>
                <div className="event-panel-box">
                    <a href={link}>
                        <img src={url} alt="Norway" style={{width: "100%"}}/></a>
                    <div className="event-panel-content">
                        <div className="row">
                            <div className="col-xs-10 col-sm-5 col-md-5">
                                <EventCalendar startDate={this.props.startDate}/>
                            </div>
                            <div className="col-xs-16 col-sm-14 col-md-14">
                                <div className="event-panel-name">
                                    {this.props.title}
                                </div>
                                <div className="event-panel-address">
                                    {this.props.location}
                                </div>
                            </div>
                            <div className="col-xs-8 col-sm-5 col-md-5">
                                <JoinEventButton created={created} joined={joined} idJoinButton={idJoinButton}
                                                 user={this.props.user}
                                                 eventId={this.props.id} onClick={changeJoinEventId}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EventPanel;
