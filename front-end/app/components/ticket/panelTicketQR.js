/**
 * Created by LongDo on 1/1/2017.
 */
import React from 'react'
import {Button, Panel} from 'react-bootstrap'
import {APP_URL} from '../../config/appConfig'
import Moment from 'moment'
import {DATE_TIME_FORMAT_DISPLAY} from "../../config/appConfig"

let urlPDF = `${APP_URL}/api/downloads/pdf`;
let urlPNG = `${APP_URL}/api/downloads/png`;

class PanelTicketQR extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var qrCode = this.props.qrCode;
        let enrollDate = Moment.unix(this.props.enrollDate/1000).format(DATE_TIME_FORMAT_DISPLAY);

        var urlImage = "/images/tickets/" + qrCode;
        return (
            <div className="ticket-item-panel-qr">
                <Panel collapsible expanded={this.props.collapseStatus} className="col-md-24">
                    <div classID="ticketQRCODE">
                        <img src={urlImage}
                             className="ticket-item-image"/>
                        <div className="col-md-24 ticket-no-padding">
                            <h5>Enroll Time: {enrollDate}</h5>
                        </div>
                    </div>
                    <a href={urlPDF + "/" + qrCode} download={this.props.eventName + ".pdf"}>
                        <button className="btn-download-pdf">Download PDF</button>
                    </a>
                    <a href={urlPNG + "/" + qrCode} download={this.props.eventName + ".png"}>
                        <button className="btn-download-png ">Download PNG</button>
                    </a>

                </Panel>
            </div>
        )
    }
}
export default PanelTicketQR;
