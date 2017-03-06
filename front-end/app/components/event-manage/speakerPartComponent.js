import React from 'react'
import * as API from '../../api/speakerAPI'
import {dispatch} from '../../store'
import {getSpeakerByEventId} from '../../actions/speakerAction'
import * as _ from 'lodash'
import {findDOMNode} from 'react-dom'
import $$ from 'jquery'
import { Form , Control, actions, Errors} from 'react-redux-form';
import validator from 'validator'
import {notification} from '../../config/appConfig'

class SpeakerPartComponent extends React.Component{
    constructor(props){
      super(props);
        let {index,eventId} = this.props;
        let speaker = this.props.speakerListForm[index];
        let avatarPreview = speaker.avatar == null ? "https://kolabo8.com/images/avatar.png" : speaker.avatar
        this.state={update : true, eventId:eventId, avatarPreview : avatarPreview, speaker:speaker};

        this.switchMode = this.switchMode.bind(this);
        this.deleteSpeaker = this.deleteSpeaker.bind(this);
        // this.changeValue = this.changeValue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.triggerChoseFile = this.triggerChoseFile.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.reset = this.reset.bind(this);
    }

    deleteSpeaker(){
      let {index,speakerListForm} = this.props;
      let speakers = speakerListForm.slice();
      speakers.splice(index, 1);
      API.deleteSpeaker(this.state.speaker.id, (res) => {
        if(res.data.status == 422){
          notification('warning','Something Wrong','');
        }else{
          dispatch(actions.change("AppForm.speakerListForm",speakers));notification('info','Deleted','');
        }
      }, (err) => {notification('warning','Something Wrong','')});
    }

    componentDidMount(){
      this.switchMode();
    }

    switchMode(){
        this.setState((prevState, props) => {
            return {update: !prevState.update};
        });
        const el = findDOMNode(this.refs.formSpeakerPart);
        $$(el).slideToggle(300);
    }

    // changeValue(field, e){
    //   let newSpeaker = this.state.speaker;
    //   newSpeaker[field] = e.target.value;
    //    this.setState({speaker : _.merge({},this.state.speaker,newSpeaker)});
    // }

    onSubmit(value){
      let {index,speakerListForm} = this.props;
      const {name, major,email,linkedIn,phone,description} = value;
      let speakerData = {
        name,
        major,
        email,
        linkedIn,
        phone,
        description
      };
      let data = new FormData();
      data.append('speaker', JSON.stringify(speakerData));
      if(value.avatar != null){
          data.append('avatar', value.avatar);
      }
      API.updateSpeaker(value.id, data, (response) => {
          let speakers = speakerListForm.slice();
          speakers[index] = response.data;
          dispatch(actions.change('AppForm.speakerListForm', speakers));
          this.switchMode();
          notification('success','Successfully','');
      }, (err) => {console.log(err);notification('warning','Something Wrong','')});
    }

    triggerChoseFile(){
      var inputField = this.refs.avatar;
      inputField.click();
    }

    reset() {
      let {index,originSpeaker,speakerListForm} = this.props;
      let speakers = speakerListForm.slice();
      API.getSpeakerById(originSpeaker.id, (res) => {
        let data = res.data;
        speakers[index] = Object.assign({},data);
            dispatch(actions.change('AppForm.speakerListForm', speakers));
        this.setState({
            avatarPreview: data.avatar == null ? "https://kolabo8.com/images/avatar.png" : data.avatar
        });
        notification('info','Reseted','');
      }, err => console.log(err));

    }

    handleImageChange(e) {
        let reader = new FileReader();
        let file = e.target.files[0];
        let isSize ;
        let {index} = this.props;
        reader.onloadend = () => {
          dispatch(actions.change(`AppForm.speakerListForm.${index}.avatar`, file));
          dispatch(actions.setErrors(`AppForm.speakerListForm.${index}.avatar`, {
            size: !isSize
          }));

          this.setState({
            avatarPreview: reader.result
          });
        }
        if(e.target.files[0] != undefined){
          isSize = file.size < 4194304;
          reader.readAsDataURL(file);
        }
    }

    render() {
        let {avatarPreview} = this.state;
        let image = "url('"+avatarPreview+"')";
        let $imagePreview = (<div className="circle-avatar" style={{ backgroundImage: image }}></div>);

        let {index,speakerListForm,validationSpeakerListForm} = this.props;
        let speaker = speakerListForm[index];
        let validationSpeakerListFormPart = validationSpeakerListForm[index];
        let view = (<div>
                {this.state.update ? (<div className="row margin-top-4 background-white cursor no-padding-side" onClick={this.switchMode}>

                    <div className=" title-index-bar col-xs-2 background-event-index">
                        {index + 1}
                    </div>
                    <div className="title-index-bar col-xs-21">
                        {speaker.name}
                    </div>
                    <div className="title-index-bar col-xs-1">
                        <i className="fa fa-minus edit-button" ></i>
                    </div>
                </div>):(<div className="row margin-top-4 background-white cursor no-padding-side" onClick={this.switchMode}>

                             <div className=" title-index-bar col-xs-2 background-event-index">
                                 {index + 1}
                             </div>
                             <div className="title-index-bar col-xs-21">
                                 {speaker.name}
                             </div>
                             <div className="title-index-bar col-xs-1">
                                 <i className="fa fa-pencil edit-button"></i>
                             </div>
                         </div>)}

                <div className="row form-speaker padding-top-10 background-white boder-top-panel" ref="formSpeakerPart">

                    <div className="col-xs-6"  >

                        <div className="row">
                            <p className="title-text-field-speaker">Full name</p>
                        </div>
                        <div className="row">
                            <p className="title-text-field-speaker">Position /Office</p>
                        </div>
                        <div className="row">
                            <p className="title-text-field-speaker">Email</p>
                        </div>
                        <div className="row">
                            <p className="title-text-field-speaker">LinkedIn</p>
                        </div>
                        <div className="row">
                            <p className="padding-pp ">Profile picture</p>
                        </div>
                        <div className="row">
                            <p className="title-text-field">Description</p>
                        </div>

                    </div>

                    <div className="col-xs-16">
                        <Form model={`AppForm.speakerListForm.${index}`} onSubmit={value => this.onSubmit(value)}>

                            <input type="file" ref="avatar" className="hidden" onChange={e => this.handleImageChange(e)}/>

                            <div className="form-group ">
                                <div className="input-group col-xs-24">
                                    <Control.text type="text" model={`AppForm.speakerListForm.${index}.name`} updateOn="change"
                                                          placeholder="Full Name" className="form-control no-border-radius"
                                                          validateOn="change" value={speaker.name}
                                                          validators={{minLength: (value) => value.trim().length > 0,
                                                                       maxLength: (value) => value.trim().length < 20}}/>
                                   <Errors
                                        className="error-message"
                                        model={`AppForm.speakerListForm.${index}.name`}
                                        show="touched"
                                        messages={{
                                        minLength: 'Name is required',
                                        maxLength: 'Must be 20 characters or less'
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="form-group ">
                                <div className="input-group col-xs-24">
                                    <Control.text type="text" model={`AppForm.speakerListForm.${index}.major`} updateOn="change"
                                                          placeholder="Major" className="form-control no-border-radius"
                                                          validateOn="change" value={speaker.major}/>
                                </div>
                            </div>

                            <div className="form-group row no-padding">

                                <div className=" col-xs-12 no-padding">
                                    <Control.text type="text" model={`AppForm.speakerListForm.${index}.email`} updateOn="change"
                                                          placeholder="Email address" className="form-control no-border-radius"
                                                          validateOn="change" value={speaker.email}
                                                          validators={{minLength: (value) => value.trim().length > 0,
                                                                  isEmail: (value) => validator.isEmail(value.trim())}}/>
                                    <Errors
                                        className="error-message"
                                        model={`AppForm.speakerListForm.${index}.email`}
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
                                        <Control type="text" model={`AppForm.speakerListForm.${index}.phone`} updateOn="change"
                                                         placeholder="Phone number" className="form-control no-border-radius"
                                                         validateOn="change" value={speaker.phone}
                                                         validators={{isPhoneNumber: (value) => validator.isNumeric(value.trim()) || value.trim().length == 0}}/>
                                        <Errors
                                            className="error-message"
                                            model={`AppForm.speakerListForm.${index}.phone`}
                                            show="touched"
                                            messages={{
                                                isPhoneNumber: 'Must be correctly phone number form'
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group ">
                                <div className="input-group col-xs-24">
                                    <Control.text type="text" model={`AppForm.speakerListForm.${index}.linkedIn`} updateOn="change"
                                                          placeholder="LinkedIn" className="form-control no-border-radius"
                                                          validateOn="change" value={speaker.linkedIn}
                                                          validators={{isURL: (value) => validator.isURL(value.trim()) || value.trim().length == 0}}/>
                                    <Errors
                                        className="error-message"
                                        model={`AppForm.speakerListForm.${index}.linkedIn`}
                                        show="touched"
                                        messages={{
                                            isURL: 'Must be correctly url address'
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="form-group col-xs-24">
                                <div className="input-group">
                                    <div className="col-xs-6 cursor" title="Change Avatar" onClick={this.triggerChoseFile}>
                                        {$imagePreview}
                                    </div>
                                </div>
                                <Errors
                                    className="error-message"
                                    model={`AppForm.speakerListForm.${index}.avatar`}
                                    messages={{
                                        size: 'Must be less than 4MB'
                                    }}
                                />
                            </div>

                            <div className="col-xs-24 no-padding">
                              <Control.textarea model={`AppForm.speakerListForm.${index}.description`} updateOn="change" className="form-control no-padding"
                                      validators={{maxLength: (value) => value.trim().length < 200}}
                                       placeholder="  Detail description for speaker " rows="4" id="comment" />
                              <Errors
                                    className="error-message"
                                    model={`AppForm.speakerListForm.${index}.description`}
                                    show="touched"
                                    messages={{
                                         maxLength: 'Description too large'
                                    }}
                                />
                            </div>


                            <div className="form-group  pull-right btn-padding">
                                {(validationSpeakerListFormPart.$form.touched && !validationSpeakerListFormPart.$form.valid) ?
                                    <button type="submit" disabled className="btn no-border-radius button-speaker">Update</button>
                                    :
                                    <button type="submit" className="btn no-border-radius button-speaker">Update</button>}
                                <button type="button" className="btn no-border-radius button-speaker" onClick={this.deleteSpeaker}>Delete</button>
                                <button type="button" className="btn no-border-radius button-speaker" onClick={this.reset}>Reset</button>
                            </div>

                        </Form>
                    </div>

                    <div className="col-xs-2">

                    </div>
                </div>

                   </div>)

        return (
          <div className="row margin-top-10 panel-min-width">
              <div className="shadow-panel ">
              {view}
              </div>
          </div>
        );
    }
}

export default SpeakerPartComponent;
