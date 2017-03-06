import React from 'react'
import RemindPartComponent from "./remindPartComponent"
import RemindFormComponent from "./remindFormComponent"
import Moment from 'moment'
import {notification, DATE_FORMAT, TIME_FORMAT,
    DATE_TIME_FORMAT, DATE_FORMAT_PICKER, TIME_FORMAT_PICKER} from '../../config/appConfig'

class RemindComponent extends React.Component{
    constructor(props){
      super(props);
    }

    componentWillMount(){
        // console.log("Bat dau lay list sponsor")
        // this.props.getSponsors(this.props.routeParams.eventId);
        this.props.getCrons(this.props.routeParams.eventId);
    }
    render() {

        var cronsDateArray = [];
        this.props.eventCrons.map((cron)=>{
            var onlyDateNumber = Moment(Moment.unix(cron.startDate/1000).format(DATE_FORMAT), DATE_FORMAT, true).valueOf();
            cronsDateArray.push(onlyDateNumber);
        });
        //generate a remind list here
        if(this.props.eventCrons.length == 0){
            var cronsList = "";
        }else{
            var cronsList = this.props.eventCrons.map((cron, index)=>
                <RemindPartComponent deleteCron = {this.props.deleteCron} cron = {cron} index={index + 1} key = {cron.id}/>
            )
        }
        return (
          <div className="row background-event-manage no-padding">
            <div className="col-xs-20 col-xs-offset-2">
                {cronsList}
                <RemindFormComponent cronsDateArray = {cronsDateArray} endDate = {this.props.eventDetail.endDate} eventId = {this.props.routeParams.eventId} addCronSchedule = {this.props.addCronSchedule}/>
            </div>
          </div>
        );
    }
}

export default RemindComponent;
