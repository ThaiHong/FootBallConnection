/**
 * Created by tthong on 12/27/2016.
 */
import React, {Component} from 'react'

class ForgotPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            message: ''
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getURL() {
        var arr = window.location.href.split("/");
        delete arr[arr.length - 1];
        return arr.join("/");
    }

    handleEmailChange(e) {
        this.setState({email: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();

        var email = this.state.email.trim();


        if (email) {
            $.blockUI(loading);
            this.props.forgotPassword({"email": this.state.email, "urlPath": this.getURL()},
                (res) => {
                    $("#forgotPassword").modal('hide');
                    $('#successfulProcess').modal();
                    $.unblockUI();
                }
                , (err) => {
                    $.unblockUI();
                    this.state.message = "Your email isn't or an error in system!";
                    $('#error_forgot').show().html('<div class="alert alert-danger" >' + this.state.message + '</div>').fadeOut(5000);
                    // setTimeout("location.href = ''", 1000)
                });

        }
    }


    render() {

        var center = {
            textAlign: center,
        }


        return (
            <div className="modal fade" id="forgotPassword" role="dialog">
                <div className="modal-dialog" style={{width: 400}}>
                    <div className="row">
                        <button type="button" className="close" data-dismiss="modal"
                                style={{marginRight: 10, marginTop: 5}}>&times;</button>

                        <div className="panel panel-default" style={{borderRadius: 0}}>
                            <div className="panel-body">
                                <div className="text-center">
                                    <h3><i className="fa fa-lock fa-4x"></i></h3>
                                    <h2 className="text-center" style={{color: "#7D8581"}}>Forgot Password?</h2>
                                    <p>You can reset your password here.</p>
                                    <div className="panel-body">
                                        <div id="error_forgot"></div>
                                        <form id="register-form" role="form" autoComplete="off" className="form"
                                              method="post">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <span className="input-group-addon"><i
                                                        className="glyphicon glyphicon-envelope color-blue"></i></span>
                                                    <input id="email" name="email" placeholder="Email address"
                                                           className="form-control" type="email"
                                                           onChange={this.handleEmailChange}/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <button name="recover-submit"
                                                        className="btn btn-create btn-lg btn-block"
                                                        onClick={this.handleSubmit}>Reset Password
                                                </button>
                                            </div>
                                        </form>
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
export default ForgotPassword;


