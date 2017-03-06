/**
 * Created by ltphuc on 12/23/2016.
 */
import React, {Component} from 'react'
import TopicSpeakerItem from './topicSpeakerItem'
import Moment from 'moment'
import {DATE_FORMAT, DATE_TIME_FORMAT_DISPLAY} from '../../config/appConfig'

class TopicItem extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        let startTime = Moment.unix(this.props.startTime/1000).format(DATE_TIME_FORMAT_DISPLAY);
        let endTime = Moment.unix(this.props.endTime/1000).format(DATE_TIME_FORMAT_DISPLAY);
        return (
            <div className="row event-detail-topic-item">
                <div className="col-md-8 col-xs-8 event-detail-time-location">
                    <div className="event-detail-topic-time">{startTime} - {endTime}</div>
                    <div className="event-detail-topic-time">Location: {this.props.location}</div>
                </div>
                <div className="col-md-16 col-xs-16 event-detail-topic-item-title">
                    <div className="row event-detail-topic-item-content">
                        <p className="event-detail-topic-item-header-title">{this.props.title}</p>
                        <p className="event-detail-topic-item-header-des">{this.props.description}</p>
                    </div>
                    <div></div>
                    <div className="row">
                        {this.props.speakers.map((s, i) =>
                            <TopicSpeakerItem key={i}
                                              id={i+"_"+this.props.id}
                                              avatar={s.speaker.avatar}
                                              name={s.speaker.name}
                                              link={s.speaker.linkedIn}
                                              email={s.speaker.email}
                                              major={s.speaker.major}/>
                        )}
                    </div>
                </div >
            </div>
        )
    }
}

export default TopicItem
