/**
 * Created by ltphuc on 12/23/2016.
 */
import React, {Component} from 'react'
import Banner from './event-detail/banner'
import Title from './event-detail/title'
import Nav from './event-detail/nav'
import Content from './event-detail/content'
import Topic from './event-detail/topic'
import Sponsor from './event-detail/sponsor'
import {getEventDetail} from '../actions/eventAction'
import {APP_URL} from '../config/appConfig.js'
import Moment from 'moment'
import {DATE_FORMAT, DATE_TIME_FORMAT} from '../config/appConfig'
import Maps from './event-detail/maps'
import {checkJoinedCreated} from '../api/eventApi'

class EventDetail extends Component {

    constructor(props) {
        super(props);
        this.convertDate = this.convertDate.bind(this);
    }

    componentWillMount() {
        getEventDetail(this.props.params.eventId);
    }

    convertDate(date) {
        var str = "/Date(" + date + ")/";
        var num = parseInt(str.replace(/[^0-9]/g, ""));
        var date = new Date(num);
        var dd = date.getDate();
        var mm = date.getMonth() + 1; //January is 0!
        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        return dd + "/" + mm + "/" + yyyy;
    }

    render() {
        var eventDetail = this.props.eventDetail;

        var sponsors = eventDetail.sponsors;


        var urlImage = (eventDetail.imageCover) ? APP_URL + eventDetail.imageCover :
            "/assets/default.png"

        var description = (eventDetail.description) ? eventDetail.description : "No description now";

        var address = eventDetail.address;
        var location = eventDetail.location;

        var latitude = eventDetail.latitude;
        var longitude = eventDetail.longitude;
        var categories = eventDetail.categories;
        let startDate = Moment.unix(eventDetail.startDate/1000).format(DATE_TIME_FORMAT);
        let endDate = Moment.unix(eventDetail.endDate/1000).format(DATE_TIME_FORMAT);
        var title = eventDetail.title;
        var organizerName = eventDetail.organizerName;

        var organizers = [
            {
                name: organizerName,
                link: "http://www.axonactive.com/"
            }
        ]

        var sponsorsDes = [
            {
                name: "Axon Active   ",
                link: "http://www.axonactive.com/"
            }
        ]

        var topics = eventDetail.topics;

        var sponsors = eventDetail.sponsors;

        var mapStyle = {
            minHeight: 700,
            width: "100%",
            padding: 0,
        }
        if (eventDetail.id) {
            if(eventDetail.status==0){
                checkJoinedCreated(eventDetail.id, (type)=> {
                    if(type!=1)
                        window.location.href = "/404";
                })
            }

            return (
                <div>
                    <Banner urlImage={urlImage}
                            description={title}/>
                    <Title startDate={startDate} endDate={endDate} location={address}
                           calendar={eventDetail.startDate}
                           title={title} locationDetail={location} id={eventDetail.id}
                           userLogined={this.props.userLogined} status={eventDetail.status}
                           myEvents={this.props.myEvents}/>
                    <section>
                        <Nav />
                        <Content
                            description={description} organizers={organizers} sponsors={sponsorsDes}
                            categories={categories}/>
                        <Topic topics={topics}/>
                        <Sponsor sponsors={sponsors}/>
                        <div style={{backgroundColor: "#999"}}>
                            <div className="col-md-24" style={{padding: "0 0 50px 0"}}>
                                <section id="other">
                                    <Maps eventDetail={eventDetail}/>
                                </section>
                            </div>
                        </div>
                    </section>
                </div>
            );
        }
        else
            return (<div></div>)
    }
}

export default EventDetail
