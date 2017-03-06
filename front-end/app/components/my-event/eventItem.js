/**
 * Created by ltphuc on 1/6/2017.
 */
import React from 'react'
import ReactDOM from 'react-dom';
import PreviewEvent from './previewEvent'
import {updateStatusEventByUserId} from '../../actions/myEventAction'
import {APP_URL} from '../../config/appConfig.js'

export default class EventItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            status: true,
            label: "",
        }

        this.handleEdit = this.handleEdit.bind(this);
        this.handlePreview = this.handlePreview.bind(this);
        this.convertDate = this.convertDate.bind(this);
        this.handleClickStatus = this.handleClickStatus.bind(this);
        this.handleClickYes = this.handleClickYes.bind(this);
    }

    componentWillMount() {

        var status = (this.props.status == 1) ? true : false;
        var label = "Close";
        if (status) label = "Open";

        this.setState({
            status: status, label: label
        });
    }

    componentWillReceiveProps(newProps) {

        var status = (newProps.status == 1) ? true : false;
        var label = "Close";
        if (status) label = "Open";

        this.setState({
            status: status, label: label
        });
    }

    handleEdit() {
        var id = this.props.id;
        location.href = 'event/' + id + '/manage/description';
    }

    handlePreview() {
        //$('#previewModal').modal('show');
        var id = this.props.id;
        location.href = 'event/' + id;
    }


    handleClickYes(event) {

        var status = this.state.status;
        status = (!status);

        updateStatusEventByUserId(this.props.id, status ? 1 : 0);

        var modalId = "myModal" + this.props.id;

        $('#' + modalId).modal('hide');
    }

    handleClickStatus(event) {

        var modalId = "myModal" + this.props.id;

        $('#' + modalId).modal('show');
        event.preventDefault();
    }

    convertDate(date) {
        var str = "/Date(" + date + ")/";
        var num = parseInt(str.replace(/[^0-9]/g, ""));
        var date = new Date(num);
        var dd = date.getDate();
        var mm = date.getMonth() + 1; //January is 0!
        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        return dd + "/" + mm + "/" + yyyy;
    }

    render() {

        var id = this.props.id;
        var link = "event/" + id;

        var image = (this.props.image) ? APP_URL + this.props.image + "/cover" : "https://static.ticketbox.vn/static-page/img/sunflower_Musical_Banner_VN.jpg?v4";

        var startDate = this.convertDate(this.props.startDate);
        var endDate = this.convertDate(this.props.endDate);

        var location = this.props.location;

        var modalId = "myModal" + this.props.id;

        var link = "event/" + id + "/participants";

        return (

            <div className="col-xs-24 col-sm-12 col-md-12 col-lg-12 no-padding">

                <div className="row my-event-item">
                    <div className="row my-event-item-body">
                        <img className="my-event-item-image"
                             src={image}></img>
                        <div className="col-sm-24 no-padding-right">
                            <div className="col-sm-16 my-event-item-content">
                                <div className="my-event-item-name">{this.props.title}</div>
                                <p className="my-event-item-time">From: {startDate} - To: {endDate}</p>
                                <p className="my-event-item-address">{this.props.address}</p>
                                <p className="my-event-item-location"><i>{location}</i></p>
                                <div className="col-sm-24 my-event-check-in">
                                    <a href={link}>Participants</a>
                                </div>
                            </div>
                            <div className="col-sm-8 my-event-panel-action">
                                <div className="row">
                                    <div className="col-sm-24 no-padding">
                                        <div className="col-sm-11 no-padding">{this.state.label}:</div>
                                        <div className="col-sm-13 no-padding">
                                            <label className="my-event-switch">
                                                <input type="checkbox" checked={this.state.status}
                                                       onClick={this.handleClickStatus}/>
                                                <div className="my-event-slider round"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-24 no-padding">
                            <div className="col-sm-12 my-event-btn-action">
                                <div className="btn my-event-item-btn-edit" onClick={this.handleEdit}>
                                    Edit
                                </div>
                            </div>
                            <div className="col-sm-12 my-event-btn-action">
                                <div className="btn my-event-item-btn-edit no-shadow" onClick={this.handlePreview}>
                                    Preview
                                </div>
                            </div>
                        </div>
                        {/*<PreviewEvent link={link}/>*/}
                    </div>
                </div>

                <div className="modal fade" id={modalId} role="dialog">
                    <div className="modal-dialog">

                        <div className="modal-content my-event-dialog-content">
                            <div className="modal-header my-event-dialog-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <p className="my-event-dialog-title"> Confirm  </p>
                            </div>
                            <div className="">
                                <p className="my-event-dialog-body ">  If you click yes, all of participant will receive
                                    {this.state.status ? " cancellation" : " re-open"} of event email. Are you sure
                                    to {this.state.status ? "close" : "open"} event?</p>
                            </div>
                            <div className="modal-footer my-event-dialog-footer1">
                                <button type="button" className="btn my-event-dialog-btn-yes"
                                        onClick={this.handleClickYes}>   Yes
                                </button>
                                <button type="button" className="btn my-event-dialog-btn-no"
                                        data-dismiss="modal">No
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        );
    }
}
