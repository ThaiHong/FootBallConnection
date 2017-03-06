/**
 * Created by vdhong on 1/10/2017.
 */
import React, {Component} from 'react'

import  * as API from '../../api/userAPI'
class ChangePassword extends Component {

    constructor(props) {
        super(props);
        this.handleOldPassword = this.handleOldPassword.bind(this);
        this.handleNewPassword = this.handleNewPassword.bind(this);
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
        this.handleSummitChangePassword = this.handleSummitChangePassword.bind(this);
        this.state = {
            currentPassword: '',
            currentPasswordError: '',
            newPassword: '',
            newPasswordError: '',
            confirmPassword: '',
            confirmPasswordError: ''
        };
    }


    handleOldPassword(e) {
        let value = e.target.value;
        this.setState({currentPassword: value.trim()});
        if (value.length < 8) {
            this.setState({currentPasswordError: 'Current password is not valid'});
        } else {
            this.setState({currentPasswordError: ''});
        }
    }

    handleNewPassword(e) {
        let value = e.target.value;
        this.setState({newPassword: value.trim()});
        if (value.length < 8) {
            this.setState({newPasswordError: 'New password is not valid'});
        } else if( value == this.state.currentPassword){
            this.setState({newPasswordError: 'New password must different  current password!'})
        } else{
            this.setState({newPasswordError: ''});
        }
    }

    handleConfirmPassword(e) {
        let value = e.target.value;
        this.setState({confirmPassword: value.trim()});
        if (value.length < 8 || value != this.state.newPassword) {
            this.setState({confirmPasswordError: 'Does not match new password'});
        } else {
            this.setState({confirmPasswordError: ''});
        }
    }

    handleSummitChangePassword(e) {
        var comp = this;
        e.preventDefault();
        var passwordMap = {
            currentPassword: this.state.currentPassword,
            newPassword: this.state.newPassword,
            confirmPassword: this.state.confirmPassword
        }

        API.updatePassword(passwordMap, (response) => {
            comp.notification('success', response, '');
            $("#changepassword").modal('hide');
        }, (error) => {
            comp.notification('warning', 'Update failed, something went wrong', '');

        });
        comp.setState ({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        });
        comp.refs.currentPassword.value="";
        comp.refs.newPassword.value="";
        comp.refs.confirmPassword.value="";
    }

    notification(type, content, header) {
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": true,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "250",
            "hideDuration": "500",
            "timeOut": "3000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
        //success,infor , warning, error
        toastr[type](content, header);
    }


    render() {

        var center = {
            textAlign: center,
        }


        return (

            <div className="modal fade col-xs-24 " id="changepassword" role="dialog">
                <div className="modal-dialog" >
                    <div className="row">
                        <button type="button" className="close" data-dismiss="modal"
                                style={{marginRight: 10, marginTop: 5}}>&times;</button>

                        <div className="panel panel-default" style={{borderRadius: 0}}>
                            <div className="panel-body">
                                <div className="text-center">

                                    <h2 className="text-center" style={{color: "#7D8581"}}>Change Password </h2>

                                    <div className="panel-body col-xs-24">
                                        <div id="error_forgot"></div>
                                        <form id="register-form" role="form" autoComplete="off" className="form"
                                              method="post">
                                            <div className="form-group row col-xs-24">
                                                <div className="title-text-field-pass col-xs-8">
                                                    Current password
                                                </div>
                                                <div className="input-group col-xs-16">

                                                    <input id="currentpassword" name="current password"
                                                           className="form-control" type="password" ref="currentPassword"
                                                           onChange={value => this.handleOldPassword(value)}/>
                                                </div>
                                                <div
                                                    className="error-change-password">{this.state.currentPasswordError ? this.state.currentPasswordError : ''}</div>
                                            </div>
                                            <div className="form-group row col-xs-24">
                                                <div className="title-text-field-pass col-xs-8">
                                                    New password
                                                </div>
                                                <div className="input-group col-xs-16">
                                                    <input id="newpassword" name="old password"
                                                           className="form-control" type="password" ref="newPassword"
                                                           onChange={value => this.handleNewPassword(value)}/>
                                                </div>
                                                <div
                                                    className="error-change-password"> {this.state.newPasswordError ? this.state.newPasswordError : ''}</div>
                                            </div>
                                            <div className="form-group row col-xs-24" >
                                                <div className="title-text-field-pass col-xs-8">
                                                    Confirm password
                                                </div>
                                                <div className="input-group col-xs-16">
                                                    <input id="confirmpassword" name="confirm password"
                                                           className="form-control" type="password" ref="confirmPassword"
                                                           onChange={value => this.handleConfirmPassword(value)}/>
                                                </div>
                                            <div
                                                    className="error-change-password"> {this.state.confirmPasswordError ? this.state.confirmPasswordError : ''}</div>
                                            </div>
                                            <div className="col-xs-24 form-group row">
                                                <div className="col-xs-14"></div>
                                            <div className="form-group  col-xs-10">
                                                <button name="recover-submit"   onClick={this.handleSummitChangePassword}
                                                        className="btn no-border-radius button-speaker">Save  change
                                                </button>
                                            </div>
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
export  default ChangePassword