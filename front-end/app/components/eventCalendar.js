/**
 * Created by nmtri on 12/26/2016.
 */
import React, {Component} from 'react'
import Moment from 'moment'
class EventCalendar extends Component {

    render() {
        var calenderbolder = {
            width: "100%",
            margin:"0px 10px 10px 10px",
            maxWidth: 75,
        }
        var calenderbolder2 = {
            paddingTop:"8px",
            backgroundColor: "#2ecc71",
            height:"100%",
            textAlign:"center",
            fontSize: "12px"
        }
        var calenderbolder3 = {
            color: "#666666",
            height:"22px",
            textAlign:"center",
            paddingTop: 5,
            marginBottom: 5,
            fontSize:"17px",
            fontWeight: "bold"
        }
        var calenderbolder4 = {
            marginTop: 5,
            color: "#666666",
            textAlign:"center",
            fontSize:"12px",
            padding: "0px 0px 5px 0px"
        }

        let startTime = Moment.unix(this.props.startDate/1000);

        return (
            <div>
                <div style={calenderbolder} >
                    <div className="calendar-month">
                        <div>{startTime.format("MMMM")}</div>
                    </div>
                    <div className="calendar-date">
                        <div style={calenderbolder3} >
                            {startTime.format("DD")}
                        </div>
                        <div style={calenderbolder4}>
                            {startTime.format("dddd")}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EventCalendar;
