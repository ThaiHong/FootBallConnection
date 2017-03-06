import React from 'react'
import ScheduleFormComponent from './scheduleFormComponent'
import {getSpeakerByEventId} from '../../actions/speakerAction'
import {getTopicsByEventId} from '../../actions/topicAction'
import SchedulePartComponent from './schedulePartComponent'
class ScheduleComponent extends React.Component{
    constructor(props){
        super(props);
        getSpeakerByEventId(this.props.routeParams.eventId);
        getTopicsByEventId(this.props.routeParams.eventId);
    }

    render() {
        return (
            <div className="row background-event-manage no-padding">
                <div className="col-xs-2">
                </div>

                <div className="col-xs-20">
                    {this.props.topicLists.map((topic, index) => <SchedulePartComponent index={index} {...topic} key={topic.id}
                                           speakerLists={this.props.speakerLists} eventDetail={this.props.eventDetail}    eventId={this.props.routeParams.eventId} />)}
                    <ScheduleFormComponent {...this.props} validation={this.props.validation}
                                                           topic = {this.props.topic} speakerLists={this.props.speakerLists}/>
                </div>

                <div className="col-xs-2">
                </div>
                
            </div>
        );
    }
}

export default ScheduleComponent;
