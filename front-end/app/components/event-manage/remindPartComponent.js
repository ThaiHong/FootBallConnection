import React from 'react'
import * as API from '../../api/speakerAPI'
import {getOneSponsor} from '../../api/sponsorAPI'
import {dispatch} from '../../store'
import {getSpeakerByEventId} from '../../actions/speakerAction'
import * as _ from 'lodash'
import Cropper from 'react-cropper';
import ReactCrop from 'react-image-crop';
// import $$ from 'jquery'
// import {findDOMNode} from 'react-dom'
import FormGroup from '../FormGroup'
import Moment from 'moment'
import {notification, DATE_FORMAT, TIME_FORMAT,
    DATE_TIME_FORMAT, DATE_FORMAT_PICKER, TIME_FORMAT_PICKER} from '../../config/appConfig'
class RemindPartComponent extends React.Component{
    constructor(props){
        super(props);
        let {
            id,
            time,
            message
        } = this.props;
        let remind = {
            id: "",
            time: "",
            message: ""
        };
        this.state={update : false, remind : remind, nameError: ""};
        this.switchMode = this.switchMode.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.deleteRemind = this.deleteRemind.bind(this);
    }

    deleteRemind(){
        this.props.deleteCron(this.props.cron.id, this.props.cron.event.id);
    }

    switchMode(){
        // this.setState((prevState, props) => {
        //     return {update: !prevState.update};
        // });
        this.setState({update: !this.state.update})
    }
    static componentDidMount(){
        $('#reminddatepicker_edit').datetimepicker({
            timepicker:false,
            format:DATE_FORMAT_PICKER,
            minDate: dateToday
        })
    }
    changeValue(field, e){
        var newRemind = this.state.remind;
        newRemind[field] = e.target.value;
        this.setState({remind: newRemind});
    }

    onSubmit(){
        this.switchMode();
    }

    reset() {

    }


    render() {
        console.log(this.props.cron);
        let view = null;
        let view2 = null;

        var date = Moment().format("DATE_FORMAT");
        var dateNumber = Moment(date,"DATE_FORMAT");

        var validRemindNumber = Moment(Moment.unix(this.props.cron.startDate/1000).format(DATE_FORMAT), DATE_FORMAT, true);

        if(dateNumber>=validRemindNumber){
            view =
            <div>
                <div className="row remind-title-border margin-top-15 background-white no-padding-side panel-min-width">
                    <div className=" title-index col-xs-2 background-event-index">
                        {this.props.index}
                    </div>
                    <div className="title-index col-xs-21 remind_past">
                        {Moment.unix(this.props.cron.startDate/1000).format(DATE_FORMAT)}
                    </div>
                    <div className="title-index col-xs-1 remind_past">
                        <i className="fa fa-check-square"></i>
                    </div>
                </div>
                <div className="row form-speaker padding-top-10 padding-bottom-10 background-white">
                    <div className="col-xs-24">
                        {this.props.cron.message}
                    </div>
                </div>

            </div>;
        }else{
            view =
            <div>
                 <div className="row remind-title-border margin-top-15 background-white no-padding-side panel-min-width">
                    <div className=" title-index col-xs-2 background-event-index">
                        {this.props.index}
                    </div>
                    <div className="title-index col-xs-21">
                        {Moment.unix(this.props.cron.startDate/1000).format(DATE_FORMAT)}
                    </div>
                    <div className="title-index col-xs-1">
                        <i className="fa fa-trash-o edit-button" onClick={this.deleteRemind}></i>
                    </div>
                </div>
                <div className="row form-speaker padding-top-10 padding-bottom-10 background-white">
                    <div className="col-xs-24">
                        {this.props.cron.message}
                    </div>
                </div>

            </div>;
        }

        view2 = (<div>

            <div className="row margin-top-10 background-white">

                <div className=" title-index col-xs-2 background-event-index">
                    1
                </div>
                <div className="title-index col-xs-21">
                    Nguyen Minh Tri
                </div>

                <div className="title-index col-xs-1">
                    <i className="fa fa-trash-o edit-button" onClick={this.deleteRemind}></i>
                </div>
            </div>
            <div className="row form-speaker padding-top-10 background-white">
                <div className="col-xs-22 col-xs-offset-1">
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                            <input id="reminddatepicker_edit" type="text" placeholder="yyyy-mm-dd"  className="form-control no-border-radius"/>
                        </div>
                    </div>

                    <div className="sponsor-name-error">
                        {this.state.nameError}
                    </div>
                    <div className="form-group">
                        <textarea className="form-control" onChange={e => this.changeValue('message', e)}  placeholder="Message for participants" rows="5" value={this.state.message} />
                    </div>

                    <div className="form-group pull-right">
                        <button type="button" className="btn no-border-radius button-speaker" onClick={this.onSubmit}>Update</button>
                        <button type="reset" className="btn no-border-radius button-speaker" onClick={this.deleteSpeaker}>Delete</button>
                    </div>
                </div>
            </div>

        </div>);

        return (
          <div className="row">
              {view}
          </div>
        );
    }
}

export default RemindPartComponent;
