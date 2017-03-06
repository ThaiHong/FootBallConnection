import React, {Component} from 'react'
import EventCalendar from './eventCalendar'
import JoinEventButton from './joinEventButton'
import {changeJoinEventId} from '../actions/eventAction'
import {APP_URL} from '../config/appConfig.js'

class EventPanelMini extends Component {

    render() {

        var event = this.props.event;

        var str = "/Date("+this.props.event.startDate+")/";
        var num = parseInt(str.replace(/[^0-9]/g, ""));
        var date = new Date(num);

        var dd = date.getDate();
        var mm = date.getMonth()+1; //January is 0!
        var yyyy = date.getFullYear();
        if(dd<10) {
            dd='0'+dd
        }
        if(mm<10) {
            mm='0'+mm
        }
        date = dd+"/"+mm+"/"+yyyy;


        const url = (event.imageCover) ? APP_URL+event.imageCover +"/thumb":
            "/assets/default.png"
        var link = (this.props.type==1) ? "/event/"+event.id+"/manage/description" : "event/"+event.id;

        return (
            <div>
                <a href={link}>
                <div className="event-panel-box">
                    <img src={url} style={{width:"100%"}}/>
                    <div className="event-mini-panel-content">
                        <div>
                            {(event.title.length > 40) ? event.title.substring(0, 39)+"..."  : event.title }  -  <b>{date}</b>
                        </div>
                    </div>
                </div>
                </a>
            </div>
        );
    }
}

export default EventPanelMini;
