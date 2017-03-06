/**
 * Created by LongDo on 1/1/2017.
 */
import React from 'react'

class InformationEvent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="ticket-item-info">
                <h4>{this.props.eventName}</h4>
                <h5>{this.props.venue}</h5>
                <p>{this.props.location}</p>
                <h6>{this.props.endDate ? "From: "+ this.props.startDate+ " - To: "+ this.props.endDate : "Start Time: "+this.props.startDate }</h6>
            </div>

        )
    }
}

export default InformationEvent;