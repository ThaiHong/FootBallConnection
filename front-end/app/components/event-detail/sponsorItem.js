/**
 * Created by ltphuc on 1/4/2017.
 */
import React from 'react'
import ToolTip from 'react-portal-tooltip'
import {APP_URL} from "../../config/appConfig"

export default class SponsorItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isTooltipActive: false
        }

        this.showTooltip = this.showTooltip.bind(this);
        this.hideTooltip = this.hideTooltip.bind(this);
    }

    showTooltip() {
        this.setState({isTooltipActive: true})
    }

    hideTooltip() {
        this.setState({isTooltipActive: false})
    }


    render() {
        var urlImage = "http://vignette2.wikia.nocookie.net/horrormovies/images/e/e3/No_Image.png/revision/latest?cb=20140329231046";

        if (this.props.image) {
            var urlImage = APP_URL + this.props.image;
        }

        return (
            <div className="col-sm-4">
                <div className="row" style={{textAlign: "center"}}>
                    <img id={"img" + this.props.id} className="event-detail-sponsor-avatar"
                         src={urlImage} onMouseEnter={this.showTooltip}
                         onMouseLeave={this.hideTooltip}></img>
                    <ToolTip active={this.state.isTooltipActive} position="top" arrow="center"
                             parent={"#img" + this.props.id}>
                        <div className="row event-detail-tooltip">
                            <div className="col-sm-24">
                                <h4><strong>{this.props.sponsorName}</strong></h4>
                                <div className="event-detail-sponsor-item-name">
                                    {this.props.description}</div>
                                <h6>{this.props.location}</h6>
                            </div>
                        </div>
                    </ToolTip>
                </div>
            </div>

        );
    }
}
