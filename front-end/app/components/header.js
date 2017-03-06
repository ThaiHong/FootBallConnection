/**
 * Created by pvdinh on 12/19/2016.
 */
import React, {Component} from 'react'
import CreateEventComponent from './createEventComponent'
import UserCornerContainer from '../containers/userCornerContainer'
import UserCorner from './userCorner'
import JoinContainer from '../containers/joinContainer'
import {getAllCategories} from '../actions/categoryAction'
import AlertFormSignInSignUpButton from './alertFormSignInSignUpButton'
import ForgotPassword from '../containers/forgotPasswordContainer';
import AlertSentEmailNewPass from './alertSentEmailNewPass'
import QuickSearchContainer from '../containers/searchContainer';


class Header extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
        this.myTicket = this.myTicket.bind(this);
        this.myEvent = this.myEvent.bind(this);
    }
    logOut(){
        const {logOut} = this.props;
        delete localStorage['token'];
        logOut();
        window.location.href = "/"
    }

    myTicket(){
        window.location.href = "/my-ticket"
    }

    myEvent(){
        window.location.href = "/my-event"
    }
    myProfile(){
        window.location.href = "/my-profile"
    }

    render() {

        let headerPart1;
        let headerPart2;
        let headerPartAvatar;
        let image = "url('" + this.props.user.avatar + "')";
        if (this.props.userLogined) {
            headerPartAvatar=
                <li className="header-avatar-padding">
                    <div className="circle-avatar-user-corner" style={{backgroundImage: image}}></div>
                </li>;
            headerPart1 =
                <li className="dropdown header-name-padding">
                    <a href="#" className="dropdown-toggle header-dropdown-box" data-toggle="dropdown" role="button"
                       aria-haspopup="true" aria-expanded="false">
                        {this.props.user.fullName}
                        <span className="caret"></span>
                    </a>
                    <ul className="dropdown-menu usercorner-dropdown-menu">
                        <li  className="dropp cursor" id="c" onClick={this.myProfile}>
                            <div className="row profile-menu-item">
                                <div className="col-xs-4 col-md-6 profile-menu-icon-div">
                                    <i className="fa fa-user-circle-o"/>
                                </div>
                                <span className="col-xs-20 col-md-18">
                                        Profile
                                    </span>
                            </div>
                        </li>
                        <li role="separator" className="divider usercorner-divider"></li>

                        <li className="dropp cursor" id="c" onClick={this.myTicket}>
                            <div className="row profile-menu-item">
                                <div className="col-xs-4 col-md-6 profile-menu-icon-div">
                                    <i className="fa fa-ticket"/>
                                </div>
                                <span className="col-xs-20 col-md-18">
                                        My tickets
                                    </span>
                            </div>
                        </li>
                        <li role="separator" className="divider usercorner-divider"></li>

                        <li className="dropp cursor" id="c" onClick={this.myEvent}>
                            <div className="row profile-menu-item">
                                <div className="col-xs-4 col-md-6 profile-menu-icon-div">
                                    <i className="fa fa-calendar-check-o"/>
                                </div>
                                <span className="col-xs-20 col-md-18">
                                    My events
                                </span>
                            </div>
                        </li>
                        <li role="separator" className="divider usercorner-divider"></li>

                        <li className="dropp cursor" id="c" onClick={this.logOut}>
                            <div className="row profile-menu-item">
                                <div className="col-xs-4 col-md-6 profile-menu-icon-div">
                                    <i className="fa fa-sign-out"/>
                                </div>
                                <span className="col-xs-20 col-md-18">
                                        Sign out
                                    </span>
                            </div>
                        </li>
                    </ul>
                </li>;
            headerPart2 =
                <li><a href="#">
                            <span data-toggle="modal"
                                  data-target="#createEvent">
                              Create event
                          </span>
                </a></li>;

        } else {
            headerPartAvatar= "";
            headerPart1 =
                <li><a href="#" data-toggle="modal" data-target="#signInSignUpForm">
                    <span>
                        Sign in | Sign up
                    </span>
                </a>
                </li>;
            headerPart2 =
                <li><a href="#">
                        <span onClick={() => {
                            localStorage.setItem('REMEMBER_ACTION', "CREATE");
                            getAllCategories()
                        }} data-toggle="modal"
                              data-target="#signInSignUpForm">
                            Create event
                        </span>
                </a></li>;
        }
        var rightCorner =
            <ul className="nav navbar-nav navbar-right">
                {headerPartAvatar}
                {headerPart1}
                {headerPart2}
            </ul>
        return (

            <div>
                <nav className="navbar navbar-default header">
                    <div className="container-fluid">
                        <div className="navbar-header">

                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                    data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className="sr-only"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand header-brand" href="/">
                                <img src="/assets/logo.png" className="header-brand"/>
                            </a>
                        </div>

                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <div className="navbar-form navbar-left form-group header-search">
                                <QuickSearchContainer/>
                            </div>
                            {rightCorner}
                        </div>
                    </div>
                </nav>
                <ForgotPassword/>
                <AlertSentEmailNewPass/>
                <CreateEventComponent />
                <AlertFormSignInSignUpButton />
            </div>
        )
    }
}
export default Header;