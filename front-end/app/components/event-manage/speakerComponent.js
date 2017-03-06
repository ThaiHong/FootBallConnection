import React from 'react'
import SpeakerFormComponent from './speakerFormComponent'
import SpeakerPartComponent from './speakerPartComponent'
import {getSpeakerByEventId} from '../../actions/speakerAction'
import * as API from '../../api/speakerAPI';
import {dispatch} from '../../store';
import {actions} from 'react-redux-form';

class SpeakerComponent extends React.Component{
    constructor(props){
      super(props);
      let {eventId} = this.props.routeParams;
      API.getSpeakerByEventId(eventId,(res) => dispatch(actions.change("AppForm.speakerListForm",res.data)),
            (err)=>console.log(err));
    }

    render() {
        return (
          <div className="row background-event-manage no-padding">
            <div className="col-xs-2">
            </div>

            <div className="col-xs-20 ">
              {this.props.speakerListForm.map((speaker, index) => <SpeakerPartComponent originSpeaker={speaker} index={index} speakerListForm = {this.props.speakerListForm} validationSpeakerListForm={this.props.validationSpeakerListForm}
               key={speaker.id} eventId={this.props.routeParams.eventId}/>)}
              <SpeakerFormComponent {...this.props} speaker={this.props.speaker} validation={this.props.validation}/>
            </div>

            <div className="col-xs-2">
            </div>

          </div>
        );
    }
}

export default SpeakerComponent;
