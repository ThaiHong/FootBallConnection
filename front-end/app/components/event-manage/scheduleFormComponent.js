import React from 'react';
import { Form , Control, actions, Errors} from 'react-redux-form';
import * as speakerAPI from '../../api/speakerAPI'
import CustomFormGroupSelectSpeaker from './CustomFormGroupSelectSpeaker'
import {dispatch} from '../../store'
import Moment from 'moment';
import * as _ from 'lodash';
import * as API from '../../api/topicAPI';
import {getTopicsByEventId} from '../../actions/topicAction'
import { findDOMNode } from 'react-dom';
import $$ from 'jquery';
import {notification, DATE_FORMAT, TIME_FORMAT,
    DATE_TIME_FORMAT, DATE_FORMAT_PICKER, TIME_FORMAT_PICKER} from '../../config/appConfig'

class ScheduleFormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state= {create : true, isTime : false};
        this.validationTime = this.validationTime.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.reset  =  this.reset.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.switchMode = this.switchMode.bind(this);
    }

    handleSubmit(){
        let {eventId} = this.props.params;
        let{title, description,location,starttime,endtime,startDate,endDate,speakers} = this.props.topic;
        let startTime = Moment(startDate+" "+starttime,DATE_TIME_FORMAT, true);
        let endTime = Moment(endDate+" "+endtime,DATE_TIME_FORMAT, true);
        let topicSpeakers = [];
        _.forEach(speakers.value,(id) => {
            topicSpeakers.push({speaker : {id : _.toNumber(id)}});
        });
        let topicData={title, description, location, startTime, endTime, topicSpeakers};
        API.createTopic(eventId,topicData,(response)=> {this.reset(false);getTopicsByEventId(eventId); notification('success','Successfully','');}, (err) => {console.log(err);notification('warning','Somthing Wrong','');});
        this.switchMode();
    }

    componentDidMount(){
      this.switchMode();
      var dateToday = new Date();
      let selectSpeaker = $("#selectSpeaker");
      let datePickerScheduleStart = $("#datePickerScheduleStart");
      let timePickerScheduleStart = $("#timePickerScheduleStart");
      let datePickerScheduleEnd = $("#datePickerScheduleEnd");
      let timePickerScheduleEnd = $("#timePickerScheduleEnd");

      selectSpeaker.select2({
        placeholder: "Speaker"
      }).change(() => {
          var speakers = selectSpeaker.val();
          dispatch(actions.change("AppForm.topic.speakers.value", speakers));
      });

      datePickerScheduleStart.datetimepicker({
          timepicker:false,
          format:DATE_FORMAT_PICKER,
          minDate: dateToday
      }).change(() => {
          var startDate = datePickerScheduleStart.val();
          dispatch(actions.change("AppForm.topic.startDate", startDate));
          this.validationTime();
      });

      timePickerScheduleStart.datetimepicker({
          datepicker: false,
          format: TIME_FORMAT_PICKER,
          step: 15
      }).change(() => {
          var startTime = timePickerScheduleStart.val();
          dispatch(actions.change("AppForm.topic.starttime", startTime));
          this.validationTime();
      });

      datePickerScheduleEnd.datetimepicker({
          timepicker:false,
          format:DATE_FORMAT_PICKER,
          minDate: dateToday
      }).change(() => {
          var endDate = datePickerScheduleEnd.val();
          dispatch(actions.change("AppForm.topic.endDate", endDate));
          this.validationTime();
      });

      timePickerScheduleEnd.datetimepicker({
          datepicker: false,
          format: TIME_FORMAT_PICKER,
          step: 15
      }).change(() => {
          var endTime = timePickerScheduleEnd.val();
          dispatch(actions.change("AppForm.topic.endtime", endTime));
          this.validationTime();
      });
    }

    validationTime(){
      let{starttime,endtime,startDate,endDate} = this.props.topic;
      let startTime = Moment(startDate+" "+starttime,DATE_TIME_FORMAT, true);
      let endTime = Moment(endDate+" "+endtime,DATE_TIME_FORMAT, true);
      let eventDetail = this.props.eventDetail;
      let start = Moment.unix(eventDetail.startDate/1000);
      let end = Moment.unix(eventDetail.endDate/1000);
      let isTime = Moment(endTime).isAfter(startTime) && Moment(startTime).isAfter(start) && Moment(end).isAfter(endTime);
      this.setState({isTime : isTime});

        if(isTime){
        this.refs.backgroundError.classList.remove('background-error');
      }else{
        this.refs.backgroundError.classList.add('background-error');
      }
    }

    reset(reset){
        dispatch(actions.reset("AppForm.topic"));
        var speakers = $('#selectSpeaker').val([]).trigger('change');
        var startDate = $('#datePickerScheduleStart').val('');
        var endDate = $('#datePickerScheduleEnd').val('');
        var startTime = $('#timePickerScheduleStart').val('');
        var endTime = $('#timePickerScheduleEnd').val('');
        this.setState({isTime : false, create : false});
        this.refs.backgroundError.classList.remove('background-error');
        if(reset){
          notification('info','Reseted','');
        }
    }

    resetForm(){
      this.reset(true);
    }

    switchMode(){
        this.setState((prevState, props) => {
            return {create: !prevState.create};
        });
        const el = findDOMNode(this.refs.body_topic);
        $$(el).slideToggle(100);
    }

    render(){
        let {topic,validation,speakerLists} = this.props;
        return(
            <div className="row">

                <div className="shadow-panel">
                    {this.state.create ? (<div className="row margin-top-15 background-white cursor no-padding-side panel-min-width"  onClick={this.switchMode}>
                                            <div className=" title-index-bar col-xs-2 background-event-index">
                                                <i className="fa fa-calendar" aria-hidden="true"></i>
                                            </div>
                                            <div className="title-index-bar col-xs-21">
                                                Add New Topic
                                            </div>
                                            <div className="title-index-bar col-xs-1">
                                                <i className="fa fa-minus edit-button"></i>
                                            </div>
                                          </div>):
                                        (<div className="row margin-top-15 background-white cursor no-padding-side panel-min-width" onClick={this.switchMode}>
                                            <div className="title-index-bar padding-add-btn text-center">
                                                <i className="fa fa-plus"></i><a className="add-more">Add More Topic</a>
                                            </div>
                                        </div>)}

                    <div className="row form-speaker padding-top-10 background-white boder-top-panel" ref="body_topic">
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
                                <p className="title-text-field margin-top-4 "></p>
                            </div>
                            <div className="row">
                                <p className="title-text-field padding-top-9"></p>
                            </div>

                            <div className="row">
                                <p className="title-text-field">Host/Speaker</p>
                            </div>
                            <div className="row">
                                <p className="title-text-field">Topic description</p>
                            </div>
                        </div>

                        <div className="col-xs-16">
                            <Form model="AppForm.topic" onSubmit={value => {this.handleSubmit(value)}}>

                                <div className="form-group">
                                    <div className="input-group col-xs-24">
                                        <Control.text model="AppForm.topic.title" updateOn="change" type="text" placeholder="Topic title"
                                                      className="form-control no-border-radius form-schedule"
                                                      validateOn="change" value={topic.title}
                                                      validators={{minLength: (value) => value.trim().length > 0,
                                                          maxLength: (value) => value.trim().length < 30}}/>
                                        <Errors
                                            className="error-message"
                                            model="AppForm.topic.title"
                                            show="touched"
                                            messages={{
                                                minLength: 'Name is required',
                                                maxLength: 'Must be 20 characters or less'
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group col-xs-24">
                                        <Control.text model="AppForm.topic.location" updateOn="change"  type="text" placeholder="Location"
                                                      className="form-control no-border-radius form-schedule" validateOn="change" value={topic.location}
                                                      validators={{minLength: (value) => value.trim().length > 0,
                                                          maxLength: (value) => value.trim().length < 30}}/>
                                        <Errors
                                            className="error-message"
                                            model="AppForm.topic.location"
                                            show="touched"
                                            messages={{
                                                minLength: 'Name is required',
                                                maxLength: 'Must be 30 characters or less'
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className={"col-xs-16 background-gray padding-time-date-frame"} ref="backgroundError">
                                    <div className="row">
                                        <div  className="col-xs-4 no-padding">
                                            <p className="title-time-date">Start</p>
                                        </div>
                                        <div className="col-xs-12 ">
                                            <p className="input-group input-group-sm no-padding">
                                                <span className="input-group-addon"><i className="glyphicon glyphicon-calendar"></i></span>
                                                <input id="datePickerScheduleStart" type="text" placeholder={DATE_FORMAT}
                                                       className="form-control no-border-radius"/>
                                            </p>
                                        </div>
                                        <div className="col-xs-8 no-padding">
                                            <p className="input-group input-group-sm no-padding">
                                                <span className="input-group-addon"><i className="glyphicon glyphicon-time"></i></span>
                                                <input  id="timePickerScheduleStart" type="text" placeholder={TIME_FORMAT} className="form-control no-border-radius"/>
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
                                                <input  id="datePickerScheduleEnd" type="text" placeholder={DATE_FORMAT} className="form-control no-border-radius"/>
                                            </p>
                                        </div>
                                        <div className="col-xs-8 no-padding">
                                            <p className="input-group input-group-sm no-padding">
                                                <span className="input-group-addon"><i className="glyphicon glyphicon-time"></i></span>
                                                <input  id="timePickerScheduleEnd" type="text" placeholder={TIME_FORMAT} className="form-control no-border-radius"/>
                                            </p>
                                        </div>
                                    </div>
                                </div>


                                <div className="input-group  col-xs-24 padding-top-10">
                                    <CustomFormGroupSelectSpeaker
                                        id="selectSpeaker"
                                        type="multiple"
                                        value={topic.speakers}
                                        values={speakerLists}
                                        style={{width:"100%"}}
                                    />
                                </div>
                                <div className="form-group">
                                    <Control.textarea model="AppForm.topic.description" updateOn="change" className="form-control"
                                                      placeholder="Detail description for the topic " rows="4" id="comment"
                                                      validators={{maxLength: (value) => value.trim().length < 200}}/>
                                    <Errors
                                        className="error-message"
                                        model="AppForm.topic.description"
                                        show="touched"
                                        messages={{
                                            maxLength: 'Description too large'
                                        }}
                                    />
                                </div>

                                <div className="form-group pull-right">
                                    {(validation.$form.touched && (!validation.$form.valid || !this.state.isTime)) ?
                                        <button type="submit" disabled className="btn no-border-radius button-speaker">Save</button>
                                        :
                                        <button type="submit" className="btn no-border-radius button-speaker">Save</button>}
                                    <button type="button" className="btn  no-border-radius button-speaker" onClick={this.resetForm}>Reset</button>
                                </div>
                            </Form>
                        </div>

                        <div className="col-xs-2">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ScheduleFormComponent;
