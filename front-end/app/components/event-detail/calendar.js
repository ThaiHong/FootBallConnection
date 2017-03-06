/**
 * Created by ltphuc on 12/30/2016.
 */
import React, {Component} from 'react'
import Moment from 'moment'
class Calendar extends Component {

    render() {
        var calenderbolder = {
            width: "100%",
            margin:"0px 10px 10px 0px",
            maxWidth: 150,
            height: "100%"
        }
        var calenderbolder2 = {
            paddingTop:"8px",
            backgroundColor: "#2ecc71",
            height:"100%",
            textAlign:"center",
            fontSize: "14px"
        }
        var calenderbolder3 = {
            color: "#666666",
            textAlign:"center",
            paddingTop: 10,
            marginBottom: 10,
            fontSize:"30px",
            fontWeight: "bold"
        }
        var calenderbolder4 = {
            marginTop: 10,
            color: "#666666",
            textAlign:"center",
            fontSize:"14px",
            padding: "0px 0px 10px 10px"
        }

        let startDate = Moment.unix(this.props.startDate/1000);
        return (
            <div>
                <div style={calenderbolder} >
                    <div className="calendar-month" >
                        <div>{startDate.format("MMMM")}</div>
                    </div>
                    <div className="calendar-date">
                        <div style={calenderbolder3} >
                            {startDate.format("DD")}
                        </div>
                        <div style={calenderbolder4}>
                            {startDate.format("dddd")}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Calendar;
