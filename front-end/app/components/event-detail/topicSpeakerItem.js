/**
 * Created by ltphuc on 12/23/2016.
 */
import React, {Component} from 'react'
import ToolTip from 'react-portal-tooltip'

class TopicSpeakerItem extends Component {
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

        var avatarPreview = (this.props.avatar)? this.props.avatar : "http://www.repairwale.com/images/test_image.jpg";
        let image = "url('"+avatarPreview+"')";
        var avatar = (<div className="circle-avatar"
                           id={"speaker"+this.props.id}
                           onMouseEnter={this.showTooltip}
                           onMouseLeave={this.hideTooltip}
                           style={{ backgroundImage: image, maxHeight: 20 }}></div>)
        return (
            <div className="col-sm-6 event-detail-speaker">
                <div className="col-md-24">
                  {avatar}
                </div>
                <div className="col-md-24"><center>
                    <p className="event-detail-speaker-content">{this.props.name}</p></center>
                </div>

                <ToolTip active={this.state.isTooltipActive} position="top" arrow="center"
                         parent={"#speaker" + this.props.id}>
                    <div className="row event-detail-tooltip">
                        <div className="col-sm-24">
                            <h4><strong>{this.props.name}</strong></h4>
                            <div>{this.props.major}</div>
                            <div>{this.props.email}</div>
                        </div>
                    </div>
                </ToolTip>
            </div>
        )
    }
}

export default TopicSpeakerItem
