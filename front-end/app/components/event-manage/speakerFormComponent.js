import React from 'react';
import { Form , Control, actions, Errors} from 'react-redux-form';
import * as API from '../../api/speakerAPI';
import {getSpeakerByEventId} from '../../actions/speakerAction'
import {findDOMNode} from 'react-dom'
import $$ from 'jquery'
import validator from 'validator'
import {dispatch} from '../../store'
import {notification} from '../../config/appConfig'

class SpeakerFormComponent extends React.Component{
    constructor(props){
      super(props);
      this.state={avatarPreview: "http://www.repairwale.com/images/test_image.jpg", create : true};
      this.triggerChoseFile = this.triggerChoseFile.bind(this);
      this.handleImageChange = this.handleImageChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.switchMode = this.switchMode.bind(this);
      this.reset = this.reset.bind(this);
    }

    handleSubmit(value){
      let eventId = this.props.routeParams.eventId;
      const {name, major,email,linkedIn,phone,description} = value;
      let speaker = {
        name,
        major,
        email,
        linkedIn,
        phone,
        description
      };
      let data = new FormData();
      data.append('speaker', JSON.stringify(speaker));
      if(value.avatar != null){
          data.append('avatar', value.avatar);
      }
      API.createSpeaker(eventId, data,
       (response) => {
            API.getSpeakerByEventId(eventId,(res) => {
                dispatch(actions.change("AppForm.speakerListForm",res.data));
                this.setState({
                    avatarPreview: "https://kolabo8.com/images/avatar.png"
                });
                dispatch(actions.reset("AppForm.speaker"));
                this.switchMode();
                notification('success','Submit Successfully','');
            },
                (err)=>{console.log(err);notification('warning','Something Wrong','')})}, (err) => {console.log(err);notification('warning','Something Wrong','')});

    }

    triggerChoseFile(){
      var inputField = this.refs.avatar;
      inputField.click();
    }

    reset(){
      let {dispatch} = this.props;
      this.setState({
        avatarPreview: "https://kolabo8.com/images/avatar.png"
      });
      dispatch(actions.change("AppForm.speaker.avatar", null))
      dispatch(actions.reset("AppForm.speaker"));
      notification('info','Reseted', '');
    }

    handleImageChange(e) {
        let reader = new FileReader();
        let file = e.target.files[0];
        let isSize;
        reader.onloadend = () => {
          dispatch(actions.change("AppForm.speaker.avatar", file));
          dispatch(actions.setErrors('AppForm.speaker.avatar', {
            size: !isSize
          }));

          this.setState({
            avatarPreview: reader.result
          });
        }
        if(e.target.files[0] != undefined){
          reader.readAsDataURL(file);
          isSize = file.size < 4194304;
        }
    }

    componentDidMount(){
      this.switchMode();
    }

    switchMode(){
        this.setState((prevState, props) => {
            return {create: !prevState.create};
        });
        const el = findDOMNode(this.refs.formSpeakerComponent);
        $$(el).slideToggle(200);
    }

    render() {
        let {avatarPreview} = this.state;
        let $imagePreview = null;
        let image = "url('"+avatarPreview+"')";
        if (avatarPreview != null) {
          $imagePreview = (<div className="circle-avatar" style={{ backgroundImage: image }}></div>);
        }
        let {speaker,validation} = this.props;
        let view = (<div>
                        {this.state.create ? (<div className="row margin-top-15 background-white cursor no-padding-side panel-min-width" onClick={this.switchMode}>
                            <div className="title-index-bar col-xs-2 background-event-index">
                              <i className="fa fa-plus-square" aria-hidden="true"></i>
                            </div>
                            <div className="title-index-bar col-xs-21">
                                Add New Speaker
                            </div>
                            <div className="title-index-bar col-xs-1">
                                <i className="fa fa-minus edit-button"></i>
                            </div>
                        </div>): (<div className="row margin-top-15 background-white cursor no-padding-side panel-min-width" onClick={this.switchMode}>
                                        <div className="title-index-bar padding-add-btn text-center " >
                                            <i className="fa fa-plus-square"></i><a className="add-more" >Add More Speaker</a>
                                        </div>
                                    </div>)}

                        <div className="row form-speaker padding-top-10 background-white boder-top-panel" ref="formSpeakerComponent">
                            <div className="col-xs-6">

                                <div className="row">
                                    <p className="title-text-field-speaker">Full name</p>
                                </div>
                                <div className="row">
                                    <p className="title-text-field-speaker">Position/Office</p>
                                </div>
                                <div className="row">
                                    <p className="title-text-field-speaker">Email</p>
                                </div>
                                <div className="row">
                                    <p className="title-text-field-speaker">LinkedIn</p>
                                </div>
                                <div className="row">
                                    <p className="title-text-field padding-pp ">Profile picture</p>
                                </div>
                                <div className="row">
                                    <p className="title-text-field">Description</p>
                                </div>
                            </div>

                            <div className="col-xs-16">
                                <Form model="AppForm.speaker" onSubmit={value => this.handleSubmit(value)}>

                                    <input type="file" accept="image/*" ref="avatar" className="hidden" onChange={e => this.handleImageChange(e)}/>

                                    <div className="form-group">
                                        <div className="input-group col-xs-24">
                                            <Control.text type="text" model="AppForm.speaker.name" updateOn="change"
                                                          placeholder="Full Name" className="form-control no-border-radius"
                                                          validateOn="change" value={speaker.name}
                                                          validators={{minLength: (value) => value.trim().length > 0,
                                                                       maxLength: (value) => value.trim().length < 20}}/>
                                        </div>
                                        <Errors
                                          className="error-message"
                                          model="AppForm.speaker.name"
                                          show="touched"
                                          messages={{
                                            minLength: 'Name is required',
                                            maxLength: 'Must be 20 characters or less'
                                          }}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <div className="input-group col-xs-24">
                                            <Control.text type="text" model="AppForm.speaker.major" updateOn="change"
                                                          placeholder="Major" className="form-control no-border-radius"
                                                          validateOn="change" value={speaker.major}/>
                                        </div>
                                    </div>

                                    <div className="form-group row no-padding">

                                        <div className=" col-xs-12 no-padding">
                                            <Control.text type="text" model="AppForm.speaker.email" updateOn="change"
                                                          placeholder="Email address" className="form-control no-border-radius"
                                                          validateOn="change" value={speaker.email}
                                                          validators={{minLength: (value) => value.trim().length > 0,
                                                                  isEmail: (value) => validator.isEmail(value.trim())}}/>
                                            <Errors
                                              className="error-message"
                                              model="AppForm.speaker.email"
                                              show="touched"
                                              messages={{
                                                minLength: 'Email is required ',
                                                isEmail: 'Must be correctly email form'
                                              }}
                                            />
                                        </div>

                                        <div className="col-xs-2 no-padding">
                                            <p className="title-text-field-tel">Tel.</p>
                                        </div>
                                        <div className="form-group col-xs-10 no-padding">
                                            <div className="input-group col-xs-24">
                                                <Control type="text" model="AppForm.speaker.phone" updateOn="change"
                                                         placeholder="Phone number" className="form-control no-border-radius"
                                                         validateOn="change" value={speaker.phone}
                                                         validators={{isPhoneNumber: (value) => validator.isNumeric(value.trim()) || value.trim().length == 0}}/>

                                               <Errors
                                                 className="error-message"
                                                 model="AppForm.speaker.phone"
                                                 show="touched"
                                                 messages={{
                                                   isPhoneNumber: 'Must be correctly phone number form'
                                                 }}
                                               />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="input-group col-xs-24">
                                            <Control.text type="text" model="AppForm.speaker.linkedIn" updateOn="change"
                                                          placeholder="LinkedIn" className="form-control no-border-radius"
                                                          validateOn="change" value={speaker.linkedIn}
                                                          validators={{isURL: (value) => validator.isURL(value.trim()) || value.trim().length == 0}}/>
                                            <Errors
                                              className="error-message"
                                              model="AppForm.speaker.linkedIn"
                                              show="touched"
                                              messages={{
                                                isURL: 'Must be correctly url address'
                                              }}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="input-group">
                                            <div className="col-xs-6  cursor" title="Change Avatar" onClick={this.triggerChoseFile}>
                                                {$imagePreview}
                                            </div>
                                        </div>
                                        <Errors
                                          className="error-message"
                                          model="AppForm.speaker.avatar"
                                          messages={{
                                            size: 'Must be less than 4MB'
                                          }}
                                        />
                                    </div>


                                    <div className="col-xs-24 no-padding">
                                      <Control.textarea model="AppForm.speaker.description" updateOn="change" className="form-control no-padding"
                                      validators={{maxLength: (value) => value.trim().length < 200}}
                                       placeholder="  Detail description for speaker " rows="3" id="comment" />
                                       <Errors
                                         className="error-message"
                                         model="AppForm.speaker.description"
                                         show="touched"
                                         messages={{
                                           maxLength: 'Description too large'
                                         }}
                                       />
                                    </div>

                                    <div className="form-group pull-right btn-padding">
                                        {(validation.$form.touched && !validation.$form.valid) ?
                                          <button type="submit" disabled className="btn no-border-radius button-speaker" >Save</button>
                                         :
                                         <button type="submit" className="btn no-border-radius button-speaker" >Save</button>}
                                        <button type="button" onClick={this.reset}  className="btn no-border-radius button-speaker ">Reset</button>
                                    </div>

                                </Form>
                            </div>

                            <div className="col-xs-2">

                            </div>
                        </div>
                    </div>)
            return (
                <div className="row panel-min-width padding-bottom-30">
                    <div className="shadow-panel">
                        {view}
                    </div>
                </div>
        );
    }
};

export default SpeakerFormComponent;
