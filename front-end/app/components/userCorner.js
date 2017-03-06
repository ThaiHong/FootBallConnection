import React from 'react';
import {getImageByURL} from '../api/socialAPI'


class UserCorner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {user: this.props.user, logOut: this.props.logOut};
        this.logOut = this.logOut.bind(this);
    }

    componentWillMount() {
        this.setState({user: this.props.user, logOut: this.props.logOut});
    }

    logOut() {
        const {logOut} = this.props;
        delete localStorage['token'];
        logOut();
    }

    myTicket(){

    }

    render() {
        let image = this.state.user.avatar;
        return (
            <div className="dropdown">
                <div>
                    <div className="user-menu">
                        <div className="user-menu">
                            <a href="#" data-toggle="dropdown">
                                <div className="circle-avatar-user-corner menu-item" style={{backgroundImage: image}}></div>
                                <div className="menu-item user-name">{this.state.user.fullName}</div>
                                <span className="caret"></span>
                            </a>

                            <div className="dropdown-menu profile-menu cursor menudrop" id="bodydrop">
                                <div className="dropp" id="c">
                                    <a href="/myProfile">
                                    <div className="row profile-menu-item">
                                        <div className="col-xs-6 col-md-6 profile-menu-icon-div">
                                            <i className="glyphicon glyphicon-user"/>
                                        </div>
                                        <span className="col-xs-18 col-md-18">
                                        Profile
                                    </span>
                                    </div>
                                    </a>
                                </div>
                                <div className="divider"/>
                                <div className="dropp" id="c">
                                    <a href="/my-ticket">
                                    <div className="row profile-menu-item cursor">
                                        <div className="col-xs-6 col-md-6 profile-menu-icon-div">
                                            <i className="fa fa-ticket profile-menu-icon"/>
                                        </div>
                                        <span className="col-xs-18 col-md-18">
                                        My tickets
                                    </span>
                                    </div>
                                    </a>
                                </div>
                                <div className="divider"/>
                                <div className="dropp" id="c">
                                    <div className="row profile-menu-item cursor">
                                        <div className="col-xs-6 col-md-6 profile-menu-icon-div">
                                            <i className="glyphicon glyphicon-calendar"/>
                                        </div>
                                        <span className="col-xs-18 col-md-18">
                                        My events
                                    </span>
                                    </div>
                                </div>
                                <div className="divider"/>
                                <div className="dropp" id="c">
                                    <div className="row profile-menu-item cursor" onClick={this.logOut}>
                                        <div className="col-xs-6 col-md-6 profile-menu-icon-div">
                                            <i className="glyphicon glyphicon-off"/>
                                        </div>
                                        <span className="col-xs-18 col-md-18">
                                        Sign out
                                    </span>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default UserCorner;
