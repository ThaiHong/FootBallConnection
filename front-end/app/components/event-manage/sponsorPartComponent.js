import React from 'react'
import {getOneSponsor} from '../../api/sponsorAPI'
import * as _ from 'lodash'
import ReactCrop from 'react-image-crop';
import { findDOMNode } from 'react-dom';
import $$ from 'jquery';
import {APP_URL} from "../../config/appConfig"
import UploadImageComponent from '../uploadImageComponent';

class SponsorPartComponent extends React.Component{
    constructor(props){
        super(props);
        let {
            id,
            sponsorName,
            location,
            description,
            image
        } = this.props;
        let speaker = {
            id,
            sponsorName,
            location,
            description,
            avatar: APP_URL+image
        };
        this.state={
            update : false,
            speaker : speaker,
            avatarPreview : speaker.avatar,
            nameError: "",
            cropData: "",
            pixelCrop:{
                x: 0,
                y: 0,
                width: 0,
                height: 0,
            }
        };
        this.switchMode = this.switchMode.bind(this);
        this.deleteSpeaker = this.deleteSpeaker.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.triggerChoseFile = this.triggerChoseFile.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
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

    deleteSpeaker(){
        this.props.deleteSponsor(this.props.id, this.props.eventId);
    }

    switchMode(){
        this.setState((prevState, props) => {
            return {update: !prevState.update};
        });

            const el = findDOMNode(this.refs.part_sponsor);
            $$(el).slideToggle(300);
    }

    changeValue(field, e){
      let newSpeaker = this.state.speaker;
      newSpeaker[field] = e.target.value;
       this.setState({speaker : _.merge({},this.state.speaker,newSpeaker)});
    }

    onSubmit(){

        var pixelCrop = this.state.pixelCrop;
        var upload = document.getElementById("imgInput"+this.props.id).files[0];

        let speaker = this.state.speaker;
        const {id, sponsorName, location, description,} = speaker;

        if(sponsorName == ""){
            this.setState({nameError: "Sponsor name must be inputted"})
        }else{
            this.setState({nameError: ""})
            let sponsor = {
                sponsorName: sponsorName,
                description: description,
                location: location,
            }

            var formData = new FormData();
            formData.append("sponsor", JSON.stringify(sponsor));
            formData.append("pixelCrop", JSON.stringify(pixelCrop));
            formData.append("imgFile", upload);
            this.props.updateSponsor(this.props.eventId, id, formData);

            this.switchMode();
        }
    }

    triggerChoseFile(){
      var inputField = this.refs.avatar;
      inputField.click();
    }

    reset() {
        getOneSponsor(this.state.speaker.id,(response)=>{
            this.setState({
                speaker : response,
            })
        })
    }

    handleImageChange(e) {
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
          let newSpeaker = this.state.speaker;
          newSpeaker.avatar = file;
          this.setState({speaker : _.merge({},this.state.speaker,newSpeaker), avatarPreview: reader.result});
        }

        if (e.target.files[0] != undefined) {
            if (e.target.files[0].size < 1 * 1024 * 1024)
                reader.readAsDataURL(file)
            else
                alert("Maximize size is 1MB. Please select another image.")

        }
    }


    componentDidMount(){
        const el = findDOMNode(this.refs.part_sponsor);
        $$(el).hide();
    }

    render() {
        // let {avatarPreview} = this.state;
        // let $imagePreview = null;
        // let image = "url('"+avatarPreview+"')";
        // if (avatarPreview != null) {
        //     $imagePreview = (<div className="sponsor-avatar" style={{ backgroundImage: image }}></div>);
        // }

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
        var forceEnableCrop = true;
        var view;
        let viewIcon = null;
        if(this.state.update === true){
            viewIcon = <i className="fa fa-minus edit-button" ></i>;
        }else{
            viewIcon = <i className="fa fa-pencil edit-button" ></i>
        }
        // if(!this.state.update){
        //    view =  (<div className="row margin-top-15 background-white cursor no-padding-side panel-min-width" onClick={this.switchMode}>
        //
        //                 <div className=" title-index-bar col-xs-2 background-event-index">
        //                     {this.props.index}
        //                 </div>
        //                 <div className="title-index-bar col-xs-21">
        //                     {this.state.speaker.sponsorName}
        //                 </div>
        //                 <div className="title-index-bar col-xs-1">
        //                     {viewIcon}
        //                 </div>
        //             </div>);
        // }else{
            view = (<div className="shadow-panel">
                        <div className="row margin-top-15 background-white cursor no-padding-side panel-min-width" onClick={this.switchMode}>

                            <div className=" title-index-bar col-xs-2 background-event-index">
                                {this.props.index}
                            </div>
                            <div className="title-index-bar col-xs-21">
                                {this.state.speaker.sponsorName}
                            </div>
                            <div className="title-index-bar col-xs-1">
                                {viewIcon}
                            </div>
                        </div>
                <div className="row form-speaker padding-top-10 background-white boder-top-panel panel-min-width" ref="part_sponsor">
                    <div className="col-xs-22 col-xs-offset-1">
                        <form>
                            <div className="row">
                                <div className="col-xs-8 min-width-form-sponsor">
                                    <UploadImageComponent choseImageAlready = {this.choseImageAlready} forceEnableCrop={forceEnableCrop}
                                                          componentId = {this.props.id} updatePixelCrop = {this.updatePixelCrop}
                                                          fit={fit} crop={crop} canvasSize = {canvasSize} defaultImage = {this.state.speaker.avatar}/>
                                </div>
                                <div className="col-xs- min-width-form-sponsor">
                                    <div className="form-group">
                                        <div className="input-group">
                                                <span className="input-group-addon"><i
                                                    className="glyphicon glyphicon-user"></i></span>
                                            <input type="text" required="required" onChange={e => this.changeValue('sponsorName', e)} className="form-control no-border-radius"  value={this.state.speaker.sponsorName}/>
                                        </div>
                                    </div>
                                    <div className="sponsor-name-error">
                                        {this.state.nameError}
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="glyphicon glyphicon-map-marker"></i></span>
                                            <input type="text" onChange={e => this.changeValue('location', e)}  className="form-control no-border-radius"  value={this.state.speaker.location}/>
                                        </div>
                                    </div>
                                    <div className="form-group ">
                                        <textarea className="form-control" onChange={e => this.changeValue('description', e)}
                                                  placeholder="Detail description for speaker " rows="4" id="comment" value={this.state.speaker.description} />
                                    </div>
                                    <div className="form-group pull-right">
                                        <button type="button" className="btn no-border-radius button-speaker" onClick={this.onSubmit}>Update</button>
                                        <button type="button" className="btn no-border-radius button-speaker" onClick={this.deleteSpeaker}>Delete</button>
                                    </div>
                                </div>
                            </div>

                        </form>
                    </div>

                </div>

                   </div>)

        return (
          <div className="row ">
              {view}
          </div>
        );
    }
}

export default SponsorPartComponent;
