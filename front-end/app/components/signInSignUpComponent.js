/**
 * Created by pvdinh on 12/24/2016.
 */
import React, {Component} from 'react';
import SignInContainer from '../containers/signInContainer';
import SignUpContainer from '../containers/signUpContainer';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import * as SocialAPI from '../api/socialAPI';
class SignInSignUpComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {signIn : true};
        this.signInMode = this.signInMode.bind(this);
        this.signUpMode = this.signUpMode.bind(this);
        this.handleAfterForgot();
    }

    componentDidMount(){
        this.setState({signIn : true});
        this.refs.signIn.classList.remove('forcusing');
        this.refs.signUp.classList.add('forcusing');
    }
    signInMode(){
        this.setState({signIn : true});
        this.refs.signIn.classList.remove('forcusing');
        this.refs.signUp.classList.add('forcusing');
    }

    signUpMode(){
        this.setState({signIn : false});
        this.refs.signIn.classList.add('forcusing');
        this.refs.signUp.classList.remove('forcusing');
    }

    getUrlParameter(name){
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
    }

    handleAfterForgot(){
        if (this.getUrlParameter('mod')=='login'){
            var msg=this.getUrlParameter('act')=='success'? true:false;
            var email=this.getUrlParameter('email')!=''? this.getUrlParameter('email'):'';
            var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
            if (history.pushState) {
                window.history.pushState({path:newurl},'',newurl);
            }
            $(document).ready(function(){
               if (msg) $('#success_forgot').show().html('<div class="alert alert-success" > Reset password successfully. Please login with your new password !</div>').fadeOut(10000);
                    else $('#success_forgot').show().html('<div class="alert alert-danger" > Something went wrong with your action!</div>').fadeOut(10000);
                if (email) $('#emailLogin').val(email).change();
                $('#signInSignUpForm').modal();
            })
        }
    }

    render() {
        var linkStyle = {
            textAlign: "right",
            marginBottom: 20,
            paddingRight: 0,
            fontSize: 13,
            fontWeight: 600
        }

        var modalBodyStyle = {
            marginTop: 10,
            marginBottom: 0
        }

        var modalTitleStyle = {
            textAlign: "center",
            color: "#756f6f",
            paddingTop: 10,
            paddingBottom: 10
        }

        return (
            <div className="modal fade" id="signInSignUpForm" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content no-border-radius">
                        <div>
                            <div className="row">
                                <div className="col-xs-12 cursor">
                                    <h5 style={modalTitleStyle} className="modal-title" onClick={this.signInMode} ref="signIn">SIGN IN</h5>
                                </div>
                                <div className="col-xs-12 cursor">
                                    <h5 style={modalTitleStyle} className="modal-title" onClick={this.signUpMode} ref="signUp">SIGN UP</h5>
                                </div>
                            </div>
                        </div>
                        <div className="modal-body" style={modalBodyStyle}>
                            {this.state.signIn ? <SignInContainer /> : <SignUpContainer />}

                            <div>
                                <p style={{textAlign: "center", marginTop: 14 , color:"#795548" }}><b>or</b></p>

                                <FacebookLogin
                                   appId="940084092795242"
                                   callback={SocialAPI.responseFacebook}
                                   scope="public_profile,user_friends,user_actions.books,email"
                                   textButton="Sign in with Facebook"
                                   cssClass="button-facebook"
                                 />

                                 <GoogleLogin
                                    clientId="966314298950-7damarn9a509rvfi1uc7d7ed2mvc2eli.apps.googleusercontent.com"
                                    buttonText="Sign in with Google"
                                    onSuccess={SocialAPI.responseGoogle}
                                    onFailure={SocialAPI.responseGoogle}
                                    className="button-google"
                                  />
                            </div>
                        </div>
                        <div className="modal-header">
                          <a data-dismiss="modal" className="cursor">Close</a>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

export default SignInSignUpComponent;
