import React, {Component} from 'react';
import {updateStatusEventByUserId, getEventDetail} from '../../actions/eventAction'
import {getSponsors} from '../../actions/sponsorAction'

class EventManageComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            eventId: this.props.params.eventId,
            status: true,
            label: "Open",
        };

        this.handleClickStatus = this.handleClickStatus.bind(this);
        this.handleClickYes = this.handleClickYes.bind(this);

    }

    componentWillMount() {
        getSponsors(this.props.params.eventId);
        getEventDetail(this.props.params.eventId);
    }

    componentWillReceiveProps(newProps) {

        var status = (newProps.eventDetail.status == 1) ? true : false;
        var label = "Close";
        if (status) label = "Open";
        var eventId = this.state.eventId;

        this.setState({
            eventId: eventId,
            status: status,
            label: label
        });

    }

    handleClickYes(event) {

        var status = this.state.status;
        status = (!status);

        updateStatusEventByUserId(this.state.eventId, status ? 1 : 0);

        $('#myModal').modal('hide');
    }

    handleClickStatus(event) {

        $('#myModal').modal('show');
        event.preventDefault();
    }


    render() {

        var currentLink = window.location.pathname;
        var part;
        var next_link;
        var final_step = false;
        var des_active, speaker_active, schedule_active, sponsor_active, remind_active;
        var link_target;
        var setUpRemindButton;
        if (currentLink.includes("description")) {
            part = "Description";
            next_link = "/event/" + this.props.params.eventId + "/manage/speaker";
            des_active = "active";
            speaker_active = schedule_active = sponsor_active = remind_active = "";
            link_target = "";
        }
        if (currentLink.includes("speaker")) {
            part = "Speaker";
            next_link = "/event/" + this.props.params.eventId + "/manage/schedule";
            speaker_active = "active";
            des_active = schedule_active = sponsor_active = remind_active = "";
            link_target = "";
        }
        if (currentLink.includes("schedule")) {
            part = "Schedule";
            next_link = "/event/" + this.props.params.eventId + "/manage/sponsor";
            schedule_active = "active";
            speaker_active = des_active = sponsor_active = remind_active = "";
            link_target = "";
        }
        if (currentLink.includes("sponsor")) {
            part = "Sponsor";
            final_step = true
            next_link = "/event/" + this.props.params.eventId;
            sponsor_active = "active";
            speaker_active = schedule_active = des_active = remind_active = "";
            link_target = "_blank";
            setUpRemindButton=
                <div></div>
        }
        if (currentLink.includes("remind")) {
            part = "Remind";
            final_step = true
            next_link = "/event/" + this.props.params.eventId;
            remind_active = "active";
            speaker_active = schedule_active = des_active = sponsor_active = "";
            link_target = "_blank";
        }
        return (
            <div className="row min-width-menu">
                <div className="col-xs-4 no-padding">
                    <aside className="left-side-menu">
                        <header>
                            <div>
                                <p>{ this.props.eventDetail &&
                                this.props.eventDetail.title
                                }</p>
                            </div>
                        </header>
                        <nav className="side-navigation">
                            <ul>
                                <li className={des_active}><a
                                    href={"/event/" + this.state.eventId + "/manage/description"}><i
                                    className="fa fa-file-text-o"></i> Description</a></li>
                                <li className={speaker_active}><a
                                    href={"/event/" + this.state.eventId + "/manage/speaker"}><i
                                    className="fa fa-user-circle"></i> Speaker</a></li>
                                <li className={schedule_active}><a
                                    href={"/event/" + this.state.eventId + "/manage/schedule"}><i
                                    className="fa fa-calendar"></i> Schedule</a></li>
                                <li className={sponsor_active}><a
                                    href={"/event/" + this.state.eventId + "/manage/sponsor"}><i
                                    className="fa fa-diamond"></i> Sponsor</a></li>
                                <li className={remind_active}><a
                                    href={"/event/" + this.state.eventId + "/manage/remind"}><i
                                    className="fa fa-clock-o"></i> Remind</a></li>
                                <li>
                                    <div className="row width-switch-div-center">
                                        <div className="col-xs-14 open-close-event-title status-font-style no-padding">Event status:</div>
                                        <div className="col-xs-10 group-label-checkbox no-padding">
                                            <div className="no-padding">
                                                <label className="my-event-switch no-padding">
                                                    <input type="checkbox" checked={this.state.status}
                                                           onClick={this.handleClickStatus}/>
                                                    <div className="my-event-slider round"></div>
                                                </label>
                                            </div>
                                            <div className="no-padding status-font">{this.state.label}</div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                    </aside>
                </div>
                <div className="col-xs-20 no-padding">
                    <div className="row row-no-padding">
                        <div className="col-xs-20 row-no-padding">
                            <p className="title-left-menu ">
                                {part}
                            </p>
                        </div>
                        <div className="col-xs-4 title-right-panel">
                            <a target={link_target} href={next_link}>
                                <button type="submit"
                                        className="btn no-border-radius button-speaker pull-right btn-continue">{final_step ? "Preview event" : "Save & continue"}</button>
                            </a>
                        </div>
                    </div>
                    {React.cloneElement(this.props.children, this.props)}

                </div>

                <div className="modal fade" id="myModal" role="dialog">
                    <div className="modal-dialog">

                        <div className="modal-content my-event-dialog-content">
                            <div className="modal-header my-event-dialog-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <p className="modal-title my-event-dialog-title">Confirm</p>
                            </div>
                            <div className="modal-body">
                                <p className="my-event-dialog-bd">If you click yes, all of participant will receive
                                    {this.state.status ? " cancellation" : " re-open"} of event email. Are you sure
                                    to {this.state.status ? "close" : "open"} event?</p>
                            </div>
                            <div className="modal-footer my-event-dialog-ft">
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
;

export default EventManageComponent;
