/**
 * Created by dlong on 12/30/2016.
 */
import React from 'react';
import {Button, Panel} from 'react-bootstrap';
import TicketItem from './ticketItem'
class Ticket extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        var tickets = this.props.tickets;
        console.log("HELLLO", this.props);
        var changeStatusEmailReminder = this.props.changeStatusEmailReminder;


        var ticketEven = [];
        var ticketOdd = [];

        for (var i = 0; i < tickets.length; i++) {
            if (i % 2 == 0) {
                ticketEven.push(tickets[i]);
            } else {
                ticketOdd.push(tickets[i]);
            }
        }

        return (
            <div>
                <div className="container ticket-item ticket-text-align-center">
                    <div className="row">
                        <div className="col-md-12 col-lg-12 ticket-no-padding-left">
                            {
                                ticketEven.map((ticket, i) =>

                                    <TicketItem key={i} eventName={ticket.event.title}
                                                imageCover={ticket.event.imageCover}
                                                venue={ticket.event.address}
                                                location={ticket.event.location}
                                                startDate={ticket.event.startDate}
                                                endDate={ticket.event.endDate}
                                                email={ticket.user.email}
                                                qrCode={ticket.authorizationCode}
                                                id={ticket.event.id}
                                                userId={ticket.user.id}
                                                index={i}
                                                changeStatusEmailReminder={changeStatusEmailReminder}
                                                reminder={ticket.optionalEmailReminder}
                                                enrollDate={ticket.enrollDate}
                                                hidden={this.props.hidden}
                                    />
                                )
                            }
                        </div>
                        <div className="col-md-12 col-lg-12 ticket-no-padding-left">
                            {
                                ticketOdd.map((ticket, i) =>

                                    <TicketItem key={i} eventName={ticket.event.title}
                                                imageCover={ticket.event.imageCover}
                                                venue={ticket.event.address}
                                                location={ticket.event.location}
                                                startDate={ticket.event.startDate}
                                                endDate={ticket.event.endDate}
                                                email={ticket.user.email}
                                                qrCode={ticket.authorizationCode}
                                                id={ticket.event.id}
                                                index={i}
                                                userId={ticket.user.id}
                                                changeStatusEmailReminder={changeStatusEmailReminder}
                                                reminder={ticket.optionalEmailReminder}
                                                enrollDate={ticket.enrollDate}
                                                hidden={this.props.hidden}
                                    />
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Ticket;
