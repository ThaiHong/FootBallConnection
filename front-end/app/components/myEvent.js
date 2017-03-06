/**
 * Created by ltphuc on 1/6/2017.
 */
import React from 'react'
import EventItem from '../components/my-event/eventItem'
import {
    getListLiveEventByUserId,
    getListPassEventByUserId,
    getSizeListLiveEventByUserId,
    getSizeListPassEventByUserId
} from '../actions/myEventAction'

export default class MyEvent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            numberOfLiveEvent: 6,
            numberOfPassEvent: 6,
            liveEvents: [],
            passEvents: [],
        }

        this.handleLiveSeeMore = this.handleLiveSeeMore.bind(this);
        this.handlePassSeeMore = this.handlePassSeeMore.bind(this);

    }

    componentWillMount() {
        getListLiveEventByUserId(this.state.numberOfLiveEvent);
        getListPassEventByUserId(this.state.numberOfPassEvent);
        getSizeListLiveEventByUserId();
        getSizeListPassEventByUserId();
    }

    componentWillReceiveProps(newProps) {
        console.log('Props: ', newProps);
        this.setState({liveEvents: newProps.liveEvents, passEvents: newProps.passEvents})
    }

    handleLiveSeeMore() {
        this.state.numberOfLiveEvent += 6;
        getListLiveEventByUserId(this.state.numberOfLiveEvent);
    }

    handlePassSeeMore() {
        this.state.numberOfPassEvent += 6;
        getListPassEventByUserId(this.state.numberOfPassEvent);
    }

    render() {

        console.log(this.props);

        var liveEvents = this.state.liveEvents;
        var passEvents = this.state.passEvents;

        var tab = {
            background: "none",
            marginLeft: 20,
        };

        var sizeOfLive = this.props.sizeOfLiveEvents;
        var sizeOfPass = this.props.sizeOfPassEvents;

        var btnLiveSeeMore = (liveEvents.length < sizeOfLive) ?
            <div className="ticket-btn-see-more">
                <button className="btn btn-see-more" onClick={this.handleLiveSeeMore}>See more...</button>
            </div> : "";

        var btnPassSeeMore = (passEvents.length < sizeOfPass) ?
            <div className="ticket-btn-see-more">
                <button className="btn btn-see-more" onClick={this.handlePassSeeMore}>See more...</button>
            </div> : "";

        var liveEventEmpty = (sizeOfLive <= 0) ? <div className="ticket-text-align-center"><p>Empty</p></div> : "";
        var passEventEmpty = (sizeOfPass <= 0) ? <div className="ticket-text-align-center"><p>Empty</p></div> : "";

        return (
            <div className="col-md-24 my-event">

                <div className="row my-event-content">

                    <div className="container my-event-body">

                        <div className="tab" style={tab}>
                            <ul className="tabs my-event-tabs">
                                <li><a href="#">Live Event ({sizeOfLive})</a></li>
                                <li><a href="#">Pass Event ({sizeOfPass})</a></li>
                            </ul>
                            <div className="tab_content">

                                <div className="tabs_item">
                                    <div className="row">
                                        {
                                            liveEvents.map((event, i) =>
                                                <EventItem key={i} id={event.id} title={event.title}
                                                           address={event.address}
                                                           image={event.imageCover}
                                                           location={event.location}
                                                           startDate={event.startDate}
                                                           endDate={event.endDate}
                                                           status={event.status}/>)
                                        }
                                        {liveEventEmpty}
                                        {btnLiveSeeMore}
                                    </div>
                                </div>
                                <div className="tabs_item">
                                    <div className="row">
                                        {
                                            passEvents.map((event, i) =>
                                                <EventItem key={i} id={event.id} title={event.title}
                                                           address={event.address}
                                                           image={event.imageCover}
                                                           location={event.location}
                                                           startDate={event.startDate}
                                                           endDate={event.endDate}
                                                           status={event.status}/>)
                                        }
                                        {passEventEmpty}
                                        {btnPassSeeMore}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
