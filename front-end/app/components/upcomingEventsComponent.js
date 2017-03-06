/**
 * Created by pvdinh on 12/19/2016.
 */
import React, {Component} from 'react'
import EventPanelMini from './eventPanelMini'
class UpcomingEventsComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        var tab = {
            paddingBottom: 50,
            background: "none"
        };

        var tabs = {
            backgroundColor: "white"
        }

        var i=0, j=0;

        return (
            <div id="myupcoming" className="tab tab-style">
                <ul className="tabs tabs-style" style={{paddingLeft: 10}}>
                    <li><a href="#">Registered</a></li>
                    <li><a href="#">Created</a></li>
                </ul>

                <div className="tab_content">

                    <div className="tabs_item">
                        <div className="row">
                            {this.props.userLogined&&
                                this.props.myEventsHome.map(enrollment =>
                                    (enrollment.type==2 && i++<4) ?
                                        (<div className="col-xs-12 col-sm-8 col-md-8 col-lg-6" key={enrollment.event.id} style={{padding:5}}>
                                            <EventPanelMini type="2" event={enrollment.event}/>
                                        </div>) : ""
                                )
                            }
                            {i >= 4 &&
                            <div className="col-xs-24 col-sm-24 col-md-24 col-lg-24"><a href="/my-ticket">
                                <span className="text-see-more pull-right"><i className="glyphicon glyphicon-arrow-right"></i> See more</span></a>
                            </div>
                            }
                        </div>
                    </div>
                    <div className="tabs_item">
                        <div className="row">
                            {this.props.userLogined&&
                                this.props.myEventsHome.map(enrollment =>
                                    (enrollment.type==1 && j++<4) ?
                                        (<div className="col-xs-12 col-sm-8 col-md-8 col-lg-6" key={enrollment.event.id}>
                                            <EventPanelMini type="1" event={enrollment.event}/>
                                        </div>) : ""
                                )
                            }
                            {j >= 4 &&
                            <div className="col-xs-24 col-sm-24 col-md-24 col-lg-24"><a href="/my-event">
                                <span className="text-see-more pull-right"><i className="glyphicon glyphicon-arrow-right"></i> See more</span></a>
                            </div>
                            }
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
export default UpcomingEventsComponent;