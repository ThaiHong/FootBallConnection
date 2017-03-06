/**
 * Created by ltphuc on 12/23/2016.
 */
import React, {Component} from 'react'
import TopicItem from './topicItem'

class Topic extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="col-md-24 event-detail-topic-body">
                <div className="container event-detail-topic">
                    <h3 className="event-detail-content-title">Topic</h3>
                    <div className="col-sm-24 col-md-24">
                        <section id="topic">
                            {this.props.topics.map((topic, i) => <TopicItem key={i}
                                                                            id={i}
                                                                            startTime={topic.startTime}
                                                                            endTime={topic.endTime}
                                                                            title={topic.title}
                                                                            description={topic.description}
                                                                            location={topic.location}
                                                                            speakers={topic.topicSpeakers}
                            />)}
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}

export default Topic