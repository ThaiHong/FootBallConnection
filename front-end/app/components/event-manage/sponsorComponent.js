import React from 'react'
import SponsorFormComponent from './sponsorFormComponent'
import SponsorPartComponent from './sponsorPartComponent'
import {getSpeakerByEventId} from '../../actions/speakerAction'

class SponsorComponent extends React.Component{
    constructor(props){
      super(props);
      let {eventId} = this.props.routeParams;
      getSpeakerByEventId(eventId);
    }

    componentWillMount(){
        console.log("Bat dau lay list sponsor")
        this.props.getSponsors(this.props.routeParams.eventId);
    }
    render() {
        if(this.props.sponsorList.length == 0){
            var sponsorList = "";
        }else{
            var sponsorList = this.props.sponsorList.map((sponsor, index) =>
                <SponsorPartComponent deleteSponsor={this.props.deleteSponsor} updateSponsor={this.props.updateSponsor} index={index + 1} {...sponsor} key={sponsor.id} eventId={this.props.routeParams.eventId}/>)
        }
        return (
          <div className="row background-event-manage no-padding">
            <div className="col-xs-2">
            </div>

            <div className="col-xs-20">
                {sponsorList}
                <SponsorFormComponent {...this.props} speaker={this.props.speaker} validation={this.props.validation} />
            </div>

            <div className="col-xs-2">
            </div>

          </div>
        );
    }
}

export default SponsorComponent;
