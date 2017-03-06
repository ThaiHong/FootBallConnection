import React from 'react';
import {Form, Control, actions} from 'react-redux-form';
import {createSpeaker} from '../../api/speakerAPI';
import {getSpeakerByEventId} from '../../actions/speakerAction'
import Moment from 'moment'
import {notification, DATE_FORMAT, TIME_FORMAT,
    DATE_TIME_FORMAT, DATE_FORMAT_PICKER, TIME_FORMAT_PICKER} from '../../config/appConfig'

class RemindFormComponentt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            validate: "glyphicon glyphicon-remove",
            disable: "disabled",
            success_mess: "",
            error_mess: "",
            endDate: this.props.endDate,
            date: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.switchMode = this.switchMode.bind(this);
        this.reset = this.reset.bind(this);
        this.changeMessage = this.changeMessage.bind(this);
    }

    componentDidMount() {
        const set = (val) => this.setState(val);
        var dateToday = new Date();

        $('#reminddatepicker').datetimepicker({
            timepicker:false,
            format:DATE_FORMAT_PICKER,
            minDate: dateToday
        })
        $('#reminddatepicker').change((val) => {

            var date = $('#reminddatepicker').val();
            let dateNumber = Moment(date,DATE_FORMAT);


            var validRemindNumber = Moment(Moment.unix(this.props.endDate/1000).format(DATE_FORMAT), DATE_FORMAT, true);


            var valid = dateNumber < validRemindNumber;

            if(valid){
                if($.inArray(dateNumber.valueOf(), this.props.cronsDateArray)>-1){
                    set({validate: "glyphicon glyphicon-remove", error_mess: "The day you choose is set already ", date: "",disable: "disabled"});
                }else{
                    set({validate: "glyphicon glyphicon-ok", error_mess: "", date: date,disable: ""});
                }
            }else{
                if(!date){
                    set({validate: "glyphicon glyphicon-remove", error_mess: "Please choose a day you want to remind participants", date: "",disable: "disabled"});
                }else{
                    set({validate: "glyphicon glyphicon-remove", error_mess: "The day you choose is not before event's end day", date: "",disable: "disabled"});
                }
            }
        });
    }

    handleSubmit() {
        //this.props.cronsDateArray
        var standardTime = Moment(this.state.date, DATE_FORMAT, true);
        var cronSchedule = {
            message: this.state.message,
            startDate: standardTime,
            event:{
                id: this.props.eventId
            }
        }
        this.props.addCronSchedule(cronSchedule);
        // this.setState({success_mess: "Add remind schedule successfully"})

    }


    reset() {
        this.setState({date: "", message: ""});
    }

    changeMessage(e){
        this.setState({message: e.target.value})
    }



    switchMode() {
        this.setState((prevState, props) => {
            return {create: !prevState.create};
        });
    }

    render() {
        let view = null;
        let view2 = null;
        // if (!this.state.create) {
            view = (<div className="row margin-top-10 background-white">
                <div className="title-index text-center">
                    <i className="fa fa-plus-square"></i><a className="add-more" onClick={this.switchMode}>Add More
                    Sponsor</a>
                </div>
            </div>)
        // } else {
            view2 = (<div>
                <form>

                <div className="row margin-top-10 background-white">
                    <div className="title-index col-xs-24">
                        Add remind schedule
                    </div>
                </div>
                <div className="row form-speaker padding-top-10 background-white">
                    <div className="col-xs-22 col-xs-offset-1">
                        <div className="row ">
                            <div className="form-group col-xs-10">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-calendar"></i></span>
                                    <input id="reminddatepicker" value={this.state.date} type="text" placeholder={DATE_FORMAT}  className="form-control no-border-radius"/>
                                    <span className="input-group-addon"><i className={this.state.validate}></i></span>
                                </div>
                            </div>
                            <div className="sponsor-name-error col-xs-10">
                                {this.state.error_mess}
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group col-xs-24">
                                <textarea className="form-control" onChange={e => this.changeMessage(e)}  placeholder="Message for participants" rows="3" value={this.state.message} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group pull-right col-xs-24 align-right">
                                <button type="button" disabled={this.state.disable} className="btn no-border-radius button-speaker" onClick={this.handleSubmit}>Add</button>
                                <button type="reset" className="btn no-border-radius button-speaker" onClick={this.reset}>Reset</button>
                            </div>
                        </div>

                        <div className="row align-right">
                            <div className="sponsor-name-error">
                                {this.state.success_mess}
                            </div>
                        </div>
                    </div>
                </div>
                </form>
            </div>);
        // }
        return (
            <div className="row">
                {view2}
            </div>
        );
    }
}
;

export default RemindFormComponentt;
