import React from 'react';
import {Form, Control, actions} from 'react-redux-form';
import ReactCrop from 'react-image-crop';
import { findDOMNode } from 'react-dom';
import $$ from 'jquery';
import UploadImageComponent from '../uploadImageComponent';
import {APP_URL} from '../../config/appConfig';
import {notification} from '../../config/appConfig'

class SponsorFormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarPreview: "http://i.imgur.com/kVVnP7Y.png",
            create: false,
            nameError: "",
            imageError: "",
            choseImage: false,
            pixelCrop:{
                x: 0,
                y: 0,
                width: 0,
                height: 0,
            }
        };

        this.triggerChoseFile = this.triggerChoseFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.switchMode = this.switchMode.bind(this);
        this.reset = this.reset.bind(this);
        this.updatePixelCrop = this.updatePixelCrop.bind(this);
        this.choseImageAlready = this.choseImageAlready.bind(this);
    }

    choseImageAlready(){
        this.setState({
            choseImage: true
        });
    }

    updatePixelCrop(pixelCropObj){
        this.setState({
            pixelCrop: pixelCropObj
        })
    }
    componentDidMount() {
        const set = (val) => this.setState(val);
        const el = findDOMNode(this.refs.body_sponsor);
        $$(el).hide();
    }

    handleSubmit(value) {
        var pixelCrop = this.state.pixelCrop;
        var upload = document.getElementById("imgInput").files[0];

        let {dispatch} = this.props;
        let eventId = this.props.routeParams.eventId;
        const {name, major, description} = value;
        if(name=="") {
            this.setState({nameError: "Sponsor name must be inputted"})
        }else{
            if(this.state.choseImage){
                this.setState({
                    nameError: "",
                    imageError: "",
                })
                let sponsor = {
                    sponsorName: name,
                    description: description,
                    location: major
                }
                var formData = new FormData();
                formData.append("sponsor", JSON.stringify(sponsor));
                formData.append("pixelCrop", JSON.stringify(pixelCrop));
                formData.append("imgFile", upload);
                this.props.addSponsor(formData, eventId);
                dispatch(actions.reset("AppForm.speaker"));
                this.render
                this.setState({
                    avatarPreview: "http://i.imgur.com/kVVnP7Y.png"
                });
                this.switchMode();
            }else{
                this.setState({imageError: "Please upload sponsor image"});
            }

        }
    }

    triggerChoseFile() {
        var inputField = this.refs.avatar;
        inputField.click();
    }

    reset() {
        let {dispatch} = this.props;
        this.setState({
            avatarPreview: "http://i.imgur.com/kVVnP7Y.png"
        });
        dispatch(actions.change("AppForm.speaker.avatar", null))
        dispatch(actions.reset("AppForm.speaker"));
    }

    switchMode() {
        this.setState((prevState, props) => {
            return {create: !prevState.create};
        });
        const el = findDOMNode(this.refs.body_sponsor);
        $$(el).slideToggle(300);

    }

    render() {

        var canvasSize = {
            width: 200,
            height: 200
        }
        var crop = {
            x: 0,
            y: 0,
            width: 2000,
            aspect: canvasSize.width / canvasSize.height
        }
        var fit = true;
        var defaultImage =APP_URL + "/assets/200x200.png"

        let view = null;
        view = (!this.state.create) ? (<div className="row margin-top-15 background-white cursor no-padding-side panel-min-width" onClick={this.switchMode}>
                        <div className="title-index-bar padding-add-btn text-center">
                            <i className="fa fa-plus"></i><a className="add-more" >Add More Sponsor</a>
                        </div>
                    </div>) : (<div className="row margin-top-15 background-white cursor no-padding-side panel-min-width" onClick={this.switchMode}>
            <div className="  title-index-bar col-xs-2 background-event-index">
                <i className="fa fa-plus" aria-hidden="true"></i>
            </div>
            <div className="title-index-bar col-xs-21">
                Add New Sponsor
            </div>
            <div className="title-index-bar col-xs-1">
                <i className="fa fa-minus edit-button" ></i>
            </div>
        </div>)



        return (
            <div className="row padding-bottom-30">
                <div className="shadow-panel">
                    {view}
                    <div className="row form-speaker padding-top-10 background-white boder-top-panel panel-min-width" ref="body_sponsor">
                        <div className="col-xs-21 col-xs-offset-1 padding-top-10">
                            <Form model="AppForm.speaker" onSubmit={value => this.handleSubmit(value)}>
                                <div className="row ">
                                    <div className="col-xs-8 min-width-form-sponsor">
                                        {/*<div className="sponsor-avatar-crop">*/}
                                            {/*<ReactCrop*/}
                                                {/*src={this.state.avatarPreview}*/}
                                                {/*crop={crop}*/}
                                                {/*onComplete={(crop, pixelCrop)=>this.onCropComplete(crop, pixelCrop)}*/}
                                            {/*/>*/}
                                        {/*</div>*/}
                                        {/*<canvas id="myCanvas" width="500" height="500"></canvas>*/}

                                        {/*<input className="sponsor-avatar-button" type="file" accept="image/*" ref="avatar" onChange={e => this.handleImageChange(e)}/>*/}

                                        <UploadImageComponent choseImageAlready = {this.choseImageAlready} updatePixelCrop = {this.updatePixelCrop} fit={fit} crop={crop} canvasSize = {canvasSize} defaultImage = {defaultImage}/>
                                        <div className="sponsor-name-error">
                                            {this.state.imageError}
                                        </div>
                                    </div>
                                    <div className="col-lg-16 min-width-form-sponsor ">
                                        <div className="form-group">
                                            <div className="input-group">
                                                                <span className="input-group-addon"><i
                                                                    className="glyphicon glyphicon-user"></i></span>
                                                <Control.text type="text" model="AppForm.speaker.name" updateOn="change"
                                                              placeholder="Full name" className="form-control no-border-radius"
                                                              validateOn="change" value={this.props.speaker.name}/>
                                            </div>
                                        </div>
                                        <div className="sponsor-name-error">
                                            {this.state.nameError}
                                        </div>

                                        <div className="form-group">
                                            <div className="input-group">
                                                    <span className="input-group-addon"><i
                                                        className="glyphicon glyphicon-map-marker"></i></span>
                                                <Control.text type="text" model="AppForm.speaker.major" updateOn="change"
                                                              placeholder="Location" className="form-control no-border-radius"
                                                              validateOn="change" value={this.props.speaker.major}/>
                                            </div>
                                        </div>

                                        <div className="">
                                            <Control.textarea model="AppForm.speaker.description" updateOn="change"
                                                              className="form-control" placeholder="Detail description for sponsor "
                                                              rows="4" id="comment"/>
                                        </div>

                                        <div className="form-group pull-right padding-top-30">
                                            <button type="submit" className="btn no-border-radius button-speaker">Save </button>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        </div>

                    </div>
                </div>

            </div>
        );
    }
}
;

export default SponsorFormComponent;
