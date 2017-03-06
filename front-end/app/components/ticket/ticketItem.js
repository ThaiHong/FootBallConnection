/**
 * Created by LongDo on 1/2/2017.
 */
import React from 'react'
import InformationEvent from './informationEvent'
import PanelTicketQR from './panelTicketQR'
import {changeStatusEmailReminder} from '../../actions/enrollmentAction'
import {APP_URL} from '../../config/appConfig.js'
import Moment from 'moment'
import {DATE_TIME_FORMAT_DISPLAY} from '../../config/appConfig'

export default class TicketItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            status: true,
        }

        this.convertDate = this.convertDate.bind(this);
        this.handleClickStatus = this.handleClickStatus.bind(this);
        this.handleClickYes = this.handleClickYes.bind(this);
    }

    componentWillMount() {

        var status = (this.props.reminder == 1) ? true : false;

        this.setState({
            status: status
        });
    }

    componentWillReceiveProps(newProps) {
        console.log("NewProps: ", newProps);

        var status = (newProps.reminder == 1) ? true : false;

        this.setState({
            status: status
        });
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

    handleClickYes(event) {

        var status = this.state.status;
        status = (!status);

        changeStatusEmailReminder(this.props.id, status ? 1 : 0);

        var modalId = "myModal" + this.props.id;

        $('#' + modalId).modal('hide');
    }

    handleClickStatus(event) {

        var modalId = "myModal" + this.props.id;
        $('#' + modalId).modal('show');
        event.preventDefault();

    }

    render() {

        const urlImage = (this.props.imageCover) ? APP_URL + this.props.imageCover + "/cover" :
            "https://static.ticketbox.vn/static-page/img/sunflower_Musical_Banner_VN.jpg";

        var startDate = Moment.unix(this.props.startDate/1000).format(DATE_TIME_FORMAT_DISPLAY);
        var endDate = this.props.endDate ? Moment.unix(this.props.endDate/1000).format(DATE_TIME_FORMAT_DISPLAY): "";
        console.log("SONCOLW>SLFJSF",this.props);

        let id = this.props.id;

        var link = "/event/" + id;

        var modalId = "myModal" + id;

        var hidden = this.props.hidden;

        return (
            <div className="col-md-24 col-lg-24 ticket-item-padding-15">
                <div className="row ticket-no-padding ticket-item-content">
                    <div className="ticket-no-padding">
                        <a href={link}>
                            <img src={urlImage} className="ticket-item-banner"/>
                        </a>
                        <div className="ticket-item-padding-5">
                            <div className="col-md-24">
                                <InformationEvent eventName={this.props.eventName} venue={this.props.venue}
                                                  location={this.props.location} startDate={startDate}
                                                  endDate={endDate}/>
                                { hidden == false &&
                                <div className="row no-padding">
                                    <div className="col-md-4 col-xs-4 no-padding">
                                        <label className="my-event-switch">
                                            <input type="checkbox" checked={this.state.status}
                                                   onClick={this.handleClickStatus}/>
                                            <div className="my-event-slider round"></div>
                                        </label>
                                    </div>
                                    <div className="col-md-20 col-xs-20">
                                        <p className="text-align-reminder no-padding" style={{color:"#424242"}}>Email reminder</p>

                                    </div>
                                </div>
                                }
                            </div>
                        </div>

                        <div className="btn btn-dropdown-ticket ticket-item-btn-collapse ticket-text-align-center"
                             onClick={ () => this.setState({open: !this.state.open})}>
                            {this.state.open ?
                                <i className="fa fa-angle-up ticket-item-icon-fa" aria-hidden="true"></i> :
                                <i className="fa fa-angle-down ticket-item-icon-fa" aria-hidden="true"></i>}
                        </div>

                        <div className="content ticket-item-panel">
                            <PanelTicketQR email={this.props.email}
                                           qrCode={this.props.qrCode}
                                           collapseStatus={this.state.open} style={{borderRadius: 'none'}}
                                           eventName={this.props.eventName}
                                           enrollDate={this.props.enrollDate}
                            />
                        </div>
                    </div>
                </div>

                <div className="modal fade" id={modalId} role="dialog">
                    <div className="modal-dialog">

                        <div className="modal-content my-event-dialog-content">
                            <div className="modal-header my-event-dialog-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <p className="modal-title my-event-dialog-title">Confirm</p>
                            </div>
                            <div className="modal-body">
                                <p className="my-event-dialog-body no-padding">Are you sure to
                                    {this.state.status ? " disable" : " enable"} email reminder?</p>
                            </div>
                            <div className="modal-footer my-event-dialog-footer">
                                <button type="button" className="btn my-event-dialog-btn-yes"
                                        onClick={this.handleClickYes}>Yes
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
