/**
 * Created by XuanVinh on 1/16/2017.
 */
import React, {Component} from 'react'
import ReactCrop from 'react-image-crop';

class UploadImageComponent extends Component{
    constructor(props){
        super(props);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.cropImageDone = this.cropImageDone.bind(this);
        this.onClickingCrop = this.onClickingCrop.bind(this);
        this.imageDoneWithoutCrop = this.imageDoneWithoutCrop.bind(this);
        this.state={
            imagePreview: "",
            pixelCropState: {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            },
            crop: this.props.crop,
            fit: this.props.fit,
            cropped: false,
            haveImage: false,
            canvasSize: this.props.canvasSize
        }
    }

    componentWillMount(){
        this.setState({
            imagePreview: this.props.defaultImage
        });
    }

    componentDidMount(){
        if(this.state.fit){
            var image = new Image();
            if(this.props.componentId){
                var canvas = document.getElementById('myCanvas'+this.props.componentId);
            }else{
                var canvas = document.getElementById('myCanvas');
            }
            var ctx = canvas.getContext('2d');

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            image.crossOrigin = "Anonymous";

            image.onload = () => {
                ctx.drawImage(image,
                    0, 0,
                    canvas.width, canvas.height)
            }
            image.src = this.props.defaultImage;
        }
        if(this.props.forceEnableCrop){
            if(this.props.componentId){
                var cropDivId = "#cropDiv"+this.props.componentId;
            }else{
                var cropDivId = "#cropDiv";
            }
            $(cropDivId).removeClass("disabledbutton");
        }
    }

    componentWillReceiveProps(nextProps){
        if(!nextProps.fit) {
            var image = new Image();
            if(this.props.componentId){
                var canvas = document.getElementById('myCanvas'+this.props.componentId);
            }else{
                var canvas = document.getElementById('myCanvas');
            }
            var ctx = canvas.getContext('2d');

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            image.crossOrigin = "Anonymous";

            image.onload = () => {
                ctx.drawImage(image,
                    0, 0,
                    canvas.width, canvas.height)
            }
            image.src = nextProps.defaultImage;
        }

    }

    handleImageChange(e) {
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                imagePreview: reader.result,
                cropped: false
            });
            if(this.props.componentId){
                var cropDivId = "#cropDiv"+this.props.componentId;
            }else{
                var cropDivId = "#cropDiv";
            }
            $(cropDivId).removeClass("disabledbutton");
            if(this.state.fit){
                this.imageDoneWithoutCrop();
            }else{
                if(this.props.componentId){
                    var modalId = "#imageCoverModal"+this.props.componentId;
                }else{
                    var modalId = "#imageCoverModal";
                }
                $(modalId).modal('show');
            }
        }

        if (e.target.files[0] != undefined) {
            if (e.target.files[0].size < 20 * 1024 * 1024){
                this.props.choseImageAlready();
                reader.readAsDataURL(file)
            }
            else{
                alert("Maximize size is 20MB. Please select another image.")
            }
        }
    }

    onClickingCrop(e){
        if(this.props.componentId){
            var modalId = "#imageCoverModal"+this.props.componentId;
        }else{
            var modalId = "#imageCoverModal";
        }
        $(modalId).modal('show');
    }

    onCropComplete(crop1, pixelCrop){
        var newPixelCrop = {
            x: pixelCrop.x,
            y: pixelCrop.y,
            width: pixelCrop.width,
            height: pixelCrop.height,
        }


        var newCrop = this.state.crop;
        newCrop.x = crop1.x;
        newCrop.y = crop1.y;
        newCrop.width = crop1.width;

        this.setState({
            pixelCropState: newPixelCrop,
            crop: newCrop,
            cropped: true
        });

    }

    imageDoneWithoutCrop(){
        var image = new Image();
        if(this.props.componentId){
            var canvas = document.getElementById('myCanvas'+this.props.componentId);
        }else{
            var canvas = document.getElementById('myCanvas');
        }
        var ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        image.crossOrigin = "Anonymous";

        image.onload = () => {
            if(this.state.cropped){
                ctx.drawImage(image,
                    this.state.pixelCropState.x, this.state.pixelCropState.y,
                    this.state.pixelCropState.width, this.state.pixelCropState.height,
                    0, 0,
                    canvas.width, canvas.height);
            }else{

                var ratioImage = image.width/image.height;
                var ratioCanvas = this.state.crop.aspect;
                if (ratioImage>ratioCanvas){
                    ctx.drawImage(image,
                        0,
                        canvas.height/2 - (canvas.width/ratioImage)/2,
                        canvas.width, canvas.height/ratioImage
                    );
                }else{
                    ctx.drawImage(image,
                        canvas.width / 2 - this.state.canvasSize.height*ratioImage/ 2,
                        0,
                        canvas.width*ratioImage, canvas.height
                    );
                }
            }
        }
        image.src = this.state.imagePreview;

        if(this.props.onCropDone){
            this.props.onCropDone();
        }
    }
    cropImageDone(){
        var image = new Image();
        if(this.props.componentId){
            var canvas = document.getElementById('myCanvas'+this.props.componentId);
        }else{
            var canvas = document.getElementById('myCanvas');
        }
        var ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        image.crossOrigin = "Anonymous";

        image.onload = () => {
            if(this.state.pixelCropState.width==0) {
                var ratio = this.state.crop.aspect;
                if (image.width / image.height > ratio) {
                    this.setState({
                        pixelCropState: {
                            x: 0,
                            y: 0,
                            width: image.height * ratio,
                            height: image.height
                        }
                    })
                }
                else {
                    this.setState({
                        pixelCropState: {
                            x: 0,
                            y: 0,
                            width: image.width,
                            height: image.width / ratio
                        }
                    })
                }
            }
            this.props.updatePixelCrop(this.state.pixelCropState);

            ctx.drawImage(image,
                this.state.pixelCropState.x, this.state.pixelCropState.y,
                this.state.pixelCropState.width, this.state.pixelCropState.height,
                0, 0,
                canvas.width, canvas.height);

        }
        image.src = this.state.imagePreview;

        if(this.props.onCropDone){
            this.props.onCropDone();
        }
    }

    render(){


        var width = $("#des-width").width() ? $("#des-width").width() : this.state.canvasSize.width;
        var height = width*this.state.canvasSize.height/this.state.canvasSize.width;

        if(this.props.componentId){
            var canvasId = "myCanvas"+this.props.componentId;
            var inputId = "imgInput"+this.props.componentId;
            var cropDivId = "cropDiv"+this.props.componentId;
            var modalId = "imageCoverModal"+this.props.componentId;
        }else{
            var canvasId = "myCanvas";
            var inputId = "imgInput";
            var cropDivId = "cropDiv";
            var modalId = "imageCoverModal";
        }

        return(
            <div>
                    <canvas style={{border: "1px solid grey"}} id={canvasId} width={width} height={height}></canvas>
                <div>
                    <div className="input-group" style={{display: "inline-block"}}>
                        <div className="custom-file-upload">
                            <input className="img-input-button" id={inputId} type="file" accept="image/*"  onChange={e => this.handleImageChange(e)}/>
                            <i className="fa fa-cloud-upload"></i> Upload Image (Max: 20MB)
                        </div>
                    </div>
                    <div className="input-group" style={{display: "inline-block", marginLeft: 5}}>
                        <div id={cropDivId} className="custom-file-upload disabledbutton" onClick={this.onClickingCrop}>
                            <i className="fa fa-crop"></i> Crop
                        </div>
                    </div>
                </div>

                <div id={modalId} className="modal fade " role="dialog" >
                    <div className="modal-dialog">

                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Crop image</h4>
                            </div>
                            <div className="modal-body crop-modal-body ">
                                <div className="crop-show-image  div-modal-scroll">
                                    <ReactCrop
                                        src={this.state.imagePreview}
                                        crop={this.state.crop}
                                        onComplete={(crop1, pixelCrop)=>this.onCropComplete(crop1, pixelCrop)}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer" style={{textAlign: "center"}}>
                                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.cropImageDone}>OK</button>
                                <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>



        );
    }
}
export default UploadImageComponent;
