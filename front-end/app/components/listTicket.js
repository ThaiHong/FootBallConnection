/**
 * Created by LongDo on 1/1/2017.
 */
import React from 'react'
import Ticket from './ticket/ticket'
import {getUpComingTicket, getPassingTicket} from '../actions/ticketAction'

class ListTicket extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            numberOfUpComing: 4,
            numberOfPassing: 4
        }

        this.handleUpComingSeeMore = this.handleUpComingSeeMore.bind(this);
        this.handleUpPassingSeeMore = this.handleUpPassingSeeMore.bind(this);

    }

    componentWillMount() {
        getUpComingTicket(4);
        getPassingTicket(4);
    }

    handleUpComingSeeMore() {
        this.state.numberOfUpComing += 4;
        this.props.getUpComingTicket(this.state.numberOfUpComing);
    }

    handleUpPassingSeeMore() {
        this.state.numberOfPassing += 4;
        this.props.getPassingTicket(this.state.numberOfPassing);
    }

    render() {

        var ticketUpComing = this.props.upComingTicket;

        var ticketPassing = this.props.passingTicket;

        var upComing = (ticketUpComing.length > 0) ? <Ticket tickets={ticketUpComing} hidden={false}  changeStatusEmailReminder = {this.props.changeStatusEmailReminder}/> :
            <div className="ticket-text-align-center"><p style={{color:"#424242"}}>Empty</p></div>
        var passing = (ticketPassing.length > 0) ? <Ticket tickets={ticketPassing} hidden={true}/> :
            <div className="ticket-text-align-center"><p style={{color:"#424242"}}>Empty</p></div>

        var btnUpSeeMore = (ticketUpComing.length >= this.state.numberOfUpComing) ?
            <div className="ticket-btn-see-more">
                <button className="btn btn-see-more" onClick={this.handleUpComingSeeMore}>See more...</button>
            </div> : "";

        var btnPassSeeMore = (ticketPassing.length >= this.state.numberOfPassing) ?
            <div className="ticket-btn-see-more">
                <button className="btn btn-see-more" onClick={this.handleUpPassingSeeMore}>See more...</button>
            </div> : "";

        return (
            <div className="ticket-body">
                <div className="container ticket-body-content">
                    <div className="col-md-24 ticket-body-title">
                        <p className="ticket-title">My Tickets</p>
                    </div>
                    {upComing}
                    {btnUpSeeMore}
                </div>
                <div className="container ticket-body-content">
                    <div className="title-up-coming-event ticket-body-title col-md-24">
                        <p className="ticket-title">Expired Tickets</p>
                    </div>
                    {passing}
                    {btnPassSeeMore}
                </div>
            </div>

        )
    }
}
export default ListTicket;