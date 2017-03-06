/**
 * Created by pvdinh on 12/19/2016.
 */
import React, {Component} from 'react'
import EventPanel from './eventPanel'
import UpcomingEventsComponent from './upcomingEventsComponent'
import SlideShowHome from './slideShowHome'
import JoinContainer from '../containers/joinContainer'
import {getUpcomingEvents} from '../actions/eventAction'


class HomePage extends Component {

    constructor(props){
        super(props);
        this.state ={
            numberEvents: 10
        }
        this.handleSeeMoreEvent = this.handleSeeMoreEvent.bind(this);
    }

    componentWillMount(){
        getUpcomingEvents(10);
    }

    handleSeeMoreEvent(value){
        getUpcomingEvents(this.props.numberEvents+10);
    }


    componentWillReceiveProps(nextProps){
        this.setState({numberEvents: nextProps.numberEvents});
    }

    render() {
        if(this.props.userLogined){
            $("#myupcoming").show();
        }
        else{
            $("#myupcoming").hide();
        }

        return (
            <div className="body homepage-body">
                <div className="row">
                    <SlideShowHome events={this.props.events}/>
                </div>

                <div className="row upcoming-events">
                    <div className="col-sm-1 col-md-3 col-lg-4">
                    </div>
                    <div className="col-sm-22 col-md-18 col-lg-16">
                            <UpcomingEventsComponent userLogined={this.props.userLogined} myEventsHome={this.props.myEventsHome}/>
                    </div>
                    <div className="col-sm-1col-md-3 col-lg-4">
                    </div>
                </div>

                <div className="row body-title">
                    <p>UPCOMING EVENTS</p>
                </div>
                <div className="row">
                    <div className="col-md-3 col-lg-4">
                    </div>
                    <div className="col-md-18 col-lg-16">
                        <div className="row">
                            {
                                this.props.events.map(event =>
                                    <div key={event.id} className="col-xs-24 col-sm-12 col-md-12 col-lg-12" >
                                        <EventPanel
                                            event={event}
                                            {...event}
                                            user={this.props.user}
                                            userLogined={this.props.userLogined}
                                            myEvents={this.props.myEvents}
                                        />
                                    </div>
                                )
                            }
                            <JoinContainer/>
                        </div>
                  </div>
                    <div className="col-md-3 col-lg-4">
                    </div>
                </div>

                {this.props.events.length >= this.props.numberEvents &&
                    <div className="see-more-button">
                        <button
                            className="btn btn-see-more btn-lg"
                            onClick={this.handleSeeMoreEvent}>See more...
                        </button>
                    </div>
                }
            </div>
        )
    }
}
export default HomePage;