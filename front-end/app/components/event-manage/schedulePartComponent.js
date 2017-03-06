/**
 * Created by phanvudinh on 1/4/2017.
 */
import React from 'react';
import { Form , Control, actions} from 'react-redux-form';
import CustomFormGroupSelectSpeaker from './CustomFormGroupSelectSpeaker'
import {dispatch} from '../../store'
import Moment from 'moment';
import * as _ from 'lodash';
import * as API from '../../api/topicAPI';
import {getTopicsByEventId} from '../../actions/topicAction'
import { findDOMNode } from 'react-dom';
import $$ from 'jquery';
import validator from "validator";
import {notification, DATE_FORMAT, DATE_FORMAT_PICKER, TIME_FORMAT,
    DATE_TIME_FORMAT, TIME_FORMAT_PICKER, DATE_TIME_FORMAT_DISPLAY} from '../../config/appConfig'

class SchedulePartComponent extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.delete = this.delete.bind(this);
        this.changeValue = this.changeValue.bind(this);
        const {topicSpeakers,index,startTime, endTime,title,description,location,id} = this.props;
        let currentSpeakers = [];
        _.forEach(topicSpeakers,(item) => currentSpeakers.push(item.speaker.id));
        let topicObj={id : id,
                      title: title,
                      location : location,
                      startDate : Moment.unix(startTime/1000).format(DATE_FORMAT),
                      endDate : Moment.unix(endTime/1000).format(DATE_FORMAT),
                      startTime : Moment.unix(startTime/1000).format(TIME_FORMAT),
                      endTime : Moment.unix(endTime/1000).format(TIME_FORMAT),
                      speakers : currentSpeakers,
                      description : description
        }
        this.reset  = this.reset.bind(this);
        let identify = {
                        selectSpeaker : "selectSpeaker"+index,
                        datePickerScheduleStart : "datePickerScheduleStart"+index,
                        timePickerScheduleStart : "timePickerScheduleStart"+index,
                        datePickerScheduleEnd : "datePickerScheduleEnd"+index,
                        timePickerScheduleEnd : "timePickerScheduleEnd"+index
                      }

        this.state = {update : false,
                      identify : identify,
                      currentSpeakers : currentSpeakers,
                      topicObj : topicObj,
                      isTime : true,
                      titleErrors: "",
                      locationErrors: "",
                      descriptionErrors: ""
                     };
        this.switchMode = this.switchMode.bind(this);
        this.validationTime = this.validationTime.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.changeLocation = this.changeLocation.bind(this);
        this.changeDescription = this.changeDescription.bind(this);
    }

    submit(){
        let {eventId} = this.props;
        let{id,title, description,location,startTime,endTime,startDate,endDate} = this.state.topicObj;
        startTime = Moment(startDate+" "+startTime,DATE_TIME_FORMAT, true);
        endTime = Moment(endDate+" "+endTime,DATE_TIME_FORMAT, true);
        let topicSpeakers = [];
        _.forEach(this.state.currentSpeakers,(id) => {
            topicSpeakers.push({speaker : {id : _.toNumber(id)}});
        });
        let topicData={title, description, location, startTime, endTime, topicSpeakers};
        API.updateTopic(id,topicData,(response)=> {getTopicsByEventId(eventId);notification('success','Successfully','');}, (err) => {console.log(err),notification('warning','Something Wrong','')});
        this.switchMode();
    }

    componentDidMount(){
      const el = findDOMNode(this.refs.part_body);
      $$(el).hide();

      let {
            selectSpeaker,
            datePickerScheduleStart,
            timePickerScheduleStart,
            datePickerScheduleEnd,
            timePickerScheduleEnd
          } = this.state.identify;

        var dateToday = new Date();
        let selectSpeakerPart = $(`#${selectSpeaker}`);
        selectSpeakerPart.select2({
            placeholder: "Speaker"
        }).change(() => {
            var speakers = selectSpeakerPart.val();
            let newSpeakers = _.map(speakers,(item) => {return _.toNumber(item)});
            console.log(newSpeakers);
            this.setState({currentSpeakers : newSpeakers});
        });


        let datePickerScheduleStartPart =  $(`#${datePickerScheduleStart}`);
        datePickerScheduleStartPart.datetimepicker({
            timepicker:false,
            format:DATE_FORMAT_PICKER,
            minDate: dateToday
        }).change(() => {
            var startDate = datePickerScheduleStartPart.val();
            this.changeValue('startDate', startDate);
            this.validationTime();
        });

        let timePickerScheduleStartPart = $(`#${timePickerScheduleStart}`)
        timePickerScheduleStartPart.datetimepicker({
            datepicker: false,
            format: TIME_FORMAT_PICKER,
            step: 15
        }).change(() => {
            var startTime = timePickerScheduleStartPart.val();
            this.changeValue('startTime', startTime);
            this.validationTime();
        });

        let datePickerScheduleEndPart = $(`#${datePickerScheduleEnd}`)
        datePickerScheduleEndPart.datetimepicker({
            timepicker:false,
            format:DATE_FORMAT_PICKER,
            minDate: dateToday
        }).change(() => {
            var endDate = datePickerScheduleEndPart.val();
            this.changeValue('endDate', endDate);
            this.validationTime();
        });

        let timePickerScheduleEndPart = $(`#${timePickerScheduleEnd}`)
        timePickerScheduleEndPart.datetimepicker({
            datepicker: false,
            format: TIME_FORMAT_PICKER,
            step: 15
        }).change(() => {
            var endTime = timePickerScheduleEndPart.val();
            this.changeValue('endTime', endTime);
            this.validationTime();
        });

        var startDate = datePickerScheduleStartPart.val('');
        var endDate = datePickerScheduleEndPart.val('');
        var startTime = timePickerScheduleStartPart.val('');
        var endTime = timePickerScheduleEndPart.val('');
        this.validationTime();
    }

    validationTime(){
      let{startTime,endTime,startDate,endDate} = this.state.topicObj;
      let starttime = Moment(startDate+" "+startTime,DATE_TIME_FORMAT, true);
      let endtime = Moment(endDate+" "+endTime,DATE_TIME_FORMAT, true);

      let eventDetail = this.props.eventDetail;
      let start = Moment.unix(eventDetail.startDate/1000);
      let end = Moment.unix(eventDetail.endDate/1000);
      let isTime = Moment(endtime).isAfter(starttime) && Moment(starttime).isAfter(start) && Moment(end).isAfter(endtime);
      this.setState({isTime : isTime});

      if(isTime){
        this.refs.backgroundError.classList.remove('background-error');
      }else{
        this.refs.backgroundError.classList.add('background-error');
      }
    }

    changeValue(field, v){
      let newTopic = _.assign({},this.state.topicObj);
      newTopic[field] = v;
      this.setState({topicObj : _.merge({},this.state.topicObj,newTopic)});
    }


    delete(){
      API.deleteTopic(this.state.topicObj.id,(response)=> {getTopicsByEventId(this.props.eventId),notification('info','Deleted','');}, (err) => {console.log(err);notification('warning','Something Wrong','')});
    }

    reset(){
        let {
          selectSpeaker,
          datePickerScheduleStart,
          timePickerScheduleStart,
          datePickerScheduleEnd,
          timePickerScheduleEnd
        } = this.state.identify;
        var speakers = $(`#${selectSpeaker}`).val([]).trigger('change');
        var startDate = $(`#${datePickerScheduleStart}`).val('');
        var endDate = $(`#${datePickerScheduleEnd}`).val('');
        var startTime = $(`#${timePickerScheduleStart}`).val('');
        var endTime = $(`#${timePickerScheduleEnd}`).val('');
    }

    switchMode(){
        this.setState((prevState, props) => {
            return {update: !prevState.update};
        });
        const el = findDOMNode(this.refs.part_body);
        $$(el).slideToggle(250);
    }

    changeTitle(e){
        let value = e.target.value;
        this.changeValue("title",value);
        if(value.length == 0){
            this.setState({titleErrors : "Title must be required"});
        }else{
            this.setState({titleErrors : ""});
        }
    }

    changeLocation(e){
        let value = e.target.value;
        this.changeValue("location",value);
        if(value.length == 0){
            this.setState({locationErrors : "Location must be required"});
        }else{
            this.setState({locationErrors : ""});
        }
    }

    changeDescription(e){
        let value = e.target.value;
        this.changeValue("description",value);
        if(value.length > 200){
            this.setState({descriptionErrors : "Description too be large"});
        }else{
            this.setState({descriptionErrors : ""});
        }
    }

    render(){
        let {
            selectSpeaker,
            datePickerScheduleStart,
            timePickerScheduleStart,
            datePickerScheduleEnd,
            timePickerScheduleEnd
          } = this.state.identify;
        let {index,startTime,endTime, title, speakerLists} = this.props;
        let {update,isTime,titleErrors,descriptionErrors,locationErrors,topicObj,currentSpeakers} = this.state;
        let view = null;
        if(update === true){
            view = <i className="fa fa-minus edit-button" ></i>;
        }else{
            view = <i className="fa fa-pencil edit-button" ></i>
        }
        return(
        <div className="row margin-top-10 panel-min-width">
            <div className="shadow-panel ">

                <div className="row margin-top-4 background-white cursor no-padding-side " onClick={this.switchMode}>
                    <div className="title-index-bar col-xs-2 background-event-index">
                        {index+1}
                    </div>
                    <div className="title-index-bar col-xs-9">
                        {title}
                    </div>
                    <div className="title-index-bar col-xs-10 inline-date">
                        {"["+Moment.unix(startTime/1000, 'x').format(DATE_TIME_FORMAT_DISPLAY)+" - "+Moment.unix(endTime/1000, 'x').format(DATE_TIME_FORMAT_DISPLAY)+"]" }
                    </div>
                    <div className="title-index col-xs-2">
                        {isTime ? '' : (<i className="fa fa-exclamation-triangle" aria-hidden="true"></i>)}
                    </div>
                    <div className="title-index-bar col-xs-1">
                        {view}
                    </div>
                </div>

                <div className="row form-speaker padding-top-10 background-white boder-top-panel " ref="part_body">
                    <div className="col-xs-6 padding-top-10">
                        <div className="row">
                            <p className="title-text-field">Topic title</p>
                        </div>
                        <div className="row">
                            <p className="title-text-field">Location</p>
                        </div>
                        <div className="row">
                            <p className="title-text-field">Time</p>
                        </div>
                        <div className="row">
                            <p className="title-text-field"></p>
                        </div>
                        <div className="row">
                            <p className="title-text-field  padding-top-10"></p>
                        </div>

                        <div className="row">
                            <p className="title-text-field">Host/Speaker</p>
                        </div>
                        <div className="row">
                            <p className="title-text-field">Topic description</p>
                        </div>
                    </div>

                    <div className="col-xs-16">
                        <form onSubmit={value => this.handleSubmit(value)}>

                            <div className="form-group">
                                <div className="input-group col-xs-24">
                                    <input type="text" placeholder="Topic title" className="form-control no-border-radius form-schedule" value={topicObj.title} onChange={(e) => this.changeTitle(e)}/>
                                    <span className="error-message">{titleErrors}</span>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group col-xs-24">
                                    <input type="text" placeholder="Location" className="form-control no-border-radius form-schedule" value={topicObj.location} onChange={(e) => this.changeLocation(e)}/>
                                    <span className="error-message">{locationErrors}</span>
                                </div>
                            </div>

                            <div className="col-xs-16 background-gray padding-time-date-frame" ref="backgroundError">
                                <div className="row">
                                    <div  className="col-xs-4 no-padding">
                                        <p className="title-time-date">Start</p>
                                    </div>
                                    <div className="col-xs-12 ">
                                        <p className="input-group input-group-sm no-padding">
                                            <span className="input-group-addon"><i className="glyphicon glyphicon-calendar"></i></span>
                                            <input id={datePickerScheduleStart} type="text" placeholder="dd-mm-yy" value={topicObj.startDate}
                                                   className="form-control no-border-radius"/>
                                        </p>
                                    </div>
                                    <div className="col-xs-8 no-padding">
                                        <p className="input-group input-group-sm no-padding">
                                            <span className="input-group-addon"><i className="glyphicon glyphicon-time"></i></span>
                                            <input  id={timePickerScheduleStart} type="text" placeholder="00 : 00" className="form-control no-border-radius" value={topicObj.startTime}/>
                                        </p>
                                    </div>
                                </div>

                                <div className="row">
                                    <div  className="col-xs-4 no-padding ">
                                        <p className="title-time-date">End</p>
                                    </div>
                                    <div className="col-xs-12 ">
                                        <p className="input-group input-group-sm no-padding">
                                            <span className="input-group-addon"><i className="glyphicon glyphicon-calendar"></i></span>
                                            <input  id={datePickerScheduleEnd} type="text" placeholder="dd-mm-yy" className="form-control no-border-radius" value={topicObj.endDate}/>
                                        </p>
                                    </div>
                                    <div className="col-xs-8 no-padding">
                                        <p className="input-group input-group-sm no-padding">
                                            <span className="input-group-addon"><i className="glyphicon glyphicon-time"></i></span>
                                            <input  id={timePickerScheduleEnd} type="text" placeholder="00 : 00" className="form-control no-border-radius" value={topicObj.endTime}/>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="">
                                <div className="input-group col-xs-24 padding-top-10">
                                    <CustomFormGroupSelectSpeaker
                                        id={selectSpeaker}
                                        type="multiple"
                                        value={{value : currentSpeakers}}
                                        iconClass="fa fa-user-circle"
                                        values={speakerLists}
                                        style={{width:"100%"}}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <textarea className="form-control" placeholder="Detail description for the topic" rows="4" id="comment" onChange={(e) => this.changeDescription(e)} value={topicObj.description}/>
                                <span className="error-message">{descriptionErrors}</span>
                            </div>

                            <div className="form-group pull-right">
                                {(isTime && !!!titleErrors && !!!locationErrors && !!!descriptionErrors) ? (<button type="button" className="btn no-border-radius button-speaker" onClick={this.submit}>Save</button>)
                                    :(<button type="button" disabled className="btn no-border-radius button-speaker" onClick={this.submit}>Save</button>) }
                                <button type="button" className="btn  no-border-radius button-speaker" onClick={this.delete}>Delete</button>
                            </div>

                        </form>
                    </div>

                    <div className="col-xs-2">
                    </div>
                </div>
            </div>
        </div>

        )
    }
}

export default SchedulePartComponent;
