/**
 * Created by vdhong on 1/9/2017.
 */
import React from 'react';
import {findDOMNode} from 'react-dom'
import {dispatch} from '../../store'
import {Form, Control, actions, Errors} from 'react-redux-form';
import validator from 'validator'
import ChangePassword from './changepasswordComponent'
import * as API from '../../api/userAPI'
import Moment from 'moment';
import {notification, DATE_FORMAT, DATE_FORMAT_PICKER} from '../../config/appConfig'
class ProfileFormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarPreview: "http://www.repairwale.com/images/test_image.jpg",
            create: true,
            status: true,
            accountType: "",
            avatar: ""
        };
        this.triggerChoseFile = this.triggerChoseFile.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClickStatus = this.handleClickStatus.bind(this);
        this.handleClickYes = this.handleClickYes.bind(this);
    }

    handleSubmit(value) {
        let comp = this;
        var {id, fullName, job, avatar, birthday, email, phone, interest, address} = value;
        birthday = Moment(birthday, DATE_FORMAT, true);
        let profile = {
            id,
            fullName,
            job,
            birthday,
            email,
            phone,
            interest,
            address
        };
        let data = new FormData();
        data.append('profile', JSON.stringify(profile));
        if (value.avatar != null) {
            data.append('avatar', value.avatar);
        }

        API.update(data, (response) => {
            let user = response;
            let profile = {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
                job: user.job,
                interest: user.interest,
                avatar: user.avatar,
                birthday: user.birthday ? Moment.unix(user.birthday / 1000).format(DATE_FORMAT) : '',
                address: user.address
            }
            notification('success', 'Update successfully', '');
            dispatch(actions.change("AppForm.profile", profile));
        }, (err) => {
            notification('warning', 'Update failed, your current password is not valid', '');
        });

    }

    triggerChoseFile() {
        var inputField = this.refs.avatar;
        inputField.click();
    }

    handleClickYes(event) {
        var status = this.state.status;
        status = (!status);
        $('#myModal').modal('hide');
        API.changeStatusOfAllEmailReminder(status ? 1 : 0,
            (data) => {
                this.initData();
            }
        )
    }
    handleClickStatus(event) {

        $('#myModal').modal('show');
        event.preventDefault();

    }

    handleImageChange(e) {
        let reader = new FileReader();
        let file = e.target.files[0];
        let isSize;
        reader.onloadend = () => {
            dispatch(actions.change("AppForm.profile.avatar", file));
            dispatch(actions.setErrors('AppForm.profile.avatar', {
                size: !isSize
            }));

            this.setState({
                avatarPreview: reader.result
            });
        }
        if (e.target.files[0] != undefined) {
            reader.readAsDataURL(file);
            isSize = file.size < 4194304;
        }
    }

    triggerChoseFile() {
        var inputField = this.refs.avatar;
        inputField.click();
    }

    initData() {

        API.getUserDetail((response) => {
            let user = response;
            this.setState({accountType: user.accountType});
            let profile = {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
                job: user.job,
                interest: user.interest,
                avatar: user.avatar,
                birthday: user.birthday ? Moment.unix(user.birthday / 1000, 'x').format(DATE_FORMAT) : '',
                address: user.address,
                optionalAllEmailReminder: user.optionalAllEmailReminder,
            }
            var status = (profile.optionalAllEmailReminder == 1) ? true : false;
            this.setState({status: status});

            dispatch(actions.change("AppForm.profile", profile));
            this.setState({avatarPreview : profile.avatar});
        }, (err) => console.log(err));
    }

    componentWillMount() {
        this.initData();
    }

    componentDidMount() {
        let dateOfBirthProfile = $('#dateOfBirthProfile');
        dateOfBirthProfile.datetimepicker({
            timepicker: false,
            format: DATE_FORMAT_PICKER,
            formatDate: 'd/m/Y',
        }).change(() => {
            var date = dateOfBirthProfile.val();
            dispatch(actions.change("AppForm.profile.birthday", date));
        });
    }
    render() {
        let {avatarPreview} = this.state;
        let image = "url('" + avatarPreview + "')";
        let {profile, validation} = this.props;
        let $imagePreview = (<div className="circle-avatar-profile" onClick={this.triggerChoseFile} style={{backgroundImage: image}}></div>);
        return (
            <div >
                <div className="container form-speaker padding-top-10 background-white min-width-form-pf">
                    <div className="col-md-24 ticket-body-title">
                        <p className="ticket-title">My Profile</p>
                        <br/>
                    </div>

                    <div className="col-md-6  text-align-center width-ava">
                        <div className="no-padding cursor" title="Change Avatar">
                            {$imagePreview}
                        </div>
                        <div id="user_profile">

                            <div className="change-password-link">
                                {this.props.user.accountType === 'system' ? (
                                    <button type="button" data-toggle="modal" className="btn-join"
                                     data-target="#changepassword"><span className="padding-btn-chgpass nowrap"> Change password</span>
                                    </button>) : null}

                            </div>
                        </div>
                        <div className="row padding-top-20">
                            <div className="col-xs-13 col-md-14 col-lg-14 no-padding">
                                <p className="no-padding title-text-field-switch"><span className="nowrap" style={{color:"#424242"}}>Email reminder</span>
                                </p>
                            </div>
                            <div className="col-xs-11 col-md-10 col-lg-10 width-switch">
                                <div className="input-group no-padding col-xs-24 ">
                                    <label className="my-event-switch button-reminder">
                                        <input type="checkbox" checked={this.state.status}
                                               onClick={this.handleClickStatus}/>
                                        <div className="my-event-slider round"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-18">

                        <Form model="AppForm.profile" onSubmit={value => this.handleSubmit(value)}>

                            <input type="file" accept="image/*" ref="avatar" className="hidden"
                                   onChange={e => this.handleImageChange(e)}/>
                            <div className="row">
                                <div className="col-xs-4">
                                    <p className="title-text-field-profile">Fullname</p>
                                </div>
                                <div className="col-xs-18">
                                    <div className="input-group col-xs-24">
                                            <span className="input-group-addon"><i
                                                className="fa fa-user"></i></span>
                                        <Control.text type="text" model="AppForm.profile.fullName" updateOn="change"
                                                      validateOn="change" value={profile.fullName}
                                                      validators={{
                                                          minLength: (value) => value.trim().length > 0,
                                                          maxLength: (value) => value.trim().length < 30
                                                      }}
                                                      placeholder="Full Name"
                                                      className="form-control no-border-radius"
                                        />
                                    </div>
                                    <Errors
                                        className="error-message"
                                        model="AppForm.profile.fullName"
                                        show="touched"
                                        messages={{
                                            minLength: 'Name is required',
                                            maxLength: 'Must be 30 characters or less'
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-xs-4">
                                    <p className="title-text-field-profile">Job</p>
                                </div>
                                <div className="col-xs-18">
                                    <div className="input-group col-xs-24">
                                        <span className="input-group-addon"><i
                                            className="fa fa-briefcase"></i></span>
                                        <Control.text type="text" model="AppForm.profile.job"
                                                      placeholder="Your job"
                                                      className="form-control no-border-radius"
                                                      updateOn="change" validateOn="change"
                                                      value={profile.job}
                                                      validators={{
                                                          minLength: (value) => value.trim().length > 0,
                                                      }}
                                        />
                                    </div>
                                    <Errors
                                        className="error-message"
                                        model="AppForm.profile.job"
                                        show="touched"
                                        messages={{
                                            minLength: 'Job is required',
                                        }}
                                    />
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-xs-4">
                                    <p className="title-text-field-profile">Birthday</p>
                                </div>
                                <div className="col-xs-18">
                                    <div className="input-group col-xs-24">
                                    <span className="input-group-addon"><i
                                        className="fa fa-calendar"></i></span>
                                        <Control.text id="dateOfBirthProfile" type="text" placeholder={DATE_FORMAT}
                                                      className="form-control no-border-radius"
                                                      model="AppForm.profile.birthday"
                                                      validateOn="change"
                                                      updateOn="change"
                                                      value={profile.birthday}
                                                      validators={{
                                                          minLength2: (value) => value.trim().length > 0,
                                                      }}
                                        />
                                    </div>
                                    <Errors
                                        className="error-message"
                                        model="AppForm.profile.birthday"
                                        show="touched"
                                        messages={{
                                            minLength2: 'Birthday is required',
                                        }}
                                    />
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-xs-4">
                                    <p className="title-text-field-profile"> Email</p>
                                </div>
                                <div className="col-xs-18">
                                    <div className="input-group col-xs-24">
                                        <span className="input-group-addon"><i
                                            className="fa fa-envelope"></i></span>
                                        <Control.text type="text" model="AppForm.profile.email"
                                                      placeholder="Email address"
                                                      className="form-control no-border-radius"
                                                      value={profile.email}
                                                      validateOn="change"
                                                      updateOn="change"
                                                      validators={{
                                                          minLength: (value) => value.trim().length > 0,

                                                      }}
                                        />
                                    </div>
                                    <Errors
                                        className="error-message"
                                        model="AppForm.profile.email"
                                        show="touched"
                                        messages={{
                                            minLength: 'Email is required',
                                            isEmail: 'Must be correctly email format'
                                        }}
                                    />
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-xs-4">
                                    <p className="title-text-field-profile">Phone </p>
                                </div>
                                <div className="col-xs-18">
                                    <div className="input-group col-xs-24">
                                    <span className="input-group-addon"><i
                                        className="fa fa-phone"></i></span>
                                        <Control type="text" model="AppForm.profile.phone"
                                                 placeholder="Phone number"
                                                 className="form-control no-border-radius"
                                                 value={profile.phone}
                                                 validateOn="change"
                                                 updateOn="change"
                                                 validators={{
                                                     isPhoneNumber: (value) => validator.isNumeric(value.trim()) || value.trim().length == 0,
                                                     maxLength: (value) => value.trim().length < 13
                                                 }}
                                        />

                                    </div>
                                    <Errors
                                        className="error-message"
                                        model="AppForm.profile.phone"
                                        show="touched"
                                        messages={{
                                            isPhoneNumber: 'Must be correctly phone number form',
                                            maxLength: 'Must be 13 numbers or less'
                                        }}
                                    />
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-xs-4">
                                    <p className="title-text-field-profile">Address</p>
                                </div>
                                <div className="col-xs-18">
                                    <div className="input-group col-xs-24"><span className="input-group-addon"><i
                                        className="fa fa-address-book"></i></span>
                                        <Control.text type="text" model="AppForm.profile.address"
                                                      placeholder="Your address"
                                                      className="form-control no-border-radius"
                                                      value={profile.address}
                                                      validators={{
                                                          minLength: (value) => value.trim().length > 0,
                                                      }}
                                        />

                                    </div>
                                    <Errors
                                        className="error-message"
                                        model="AppForm.profile.address"
                                        show="touched"
                                        messages={{
                                            minLength: 'Address is required',
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="form-group pull-right button-save-profile">
                                <button type="submit" className="btn no-border-radius button-speaker"> Save</button>

                            </div>
                            <ChangePassword/>

                        </Form>
                    </div>
                </div>

                <div className="modal fade" id="myModal" role="dialog">
                    <div className="modal-dialog">

                        <div className="modal-content my-event-dialog-content">
                            <div className="modal-header my-event-dialog-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <p className="my-event-dialog-title">Confirm</p>
                            </div>
                            <div className="">
                                <p className="my-event-dialog-body">Are you sure to
                                    {this.state.status ? " disable " : " enable"}email reminder from every event? </p>
                            </div>
                            <div className="modal-footer my-event-dialog-footer">
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

export default ProfileFormComponent;
