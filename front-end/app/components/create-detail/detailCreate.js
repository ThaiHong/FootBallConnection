/**
 * Created by hvthien on 1/3/2017.
 */
import React, {Component} from 'react'
import FormGroupDetail from './formGroupDetail'
import FormGroupSelect from './formGroupMultiSelect'
import WysiwygEditor from './wysiwygEditor'
import UploadCoverImage from './uploadCoverImage'
import {getEventCreated} from '../../api/eventApi'
import {getMaxDateByEvent, getMinDateByEvent} from '../../api/topicAPI'
import {APP_URL} from '../../config/appConfig'
import Moment from 'moment';
import {notification, DATE_FORMAT, TIME_FORMAT,
    DATE_TIME_FORMAT, DATE_FORMAT_PICKER, TIME_FORMAT_PICKER} from '../../config/appConfig'
import UploadImageComponent from '../uploadImageComponent'

export default class DetailCreate extends Component {
    constructor(props){
        super(props);
        const attr = {
            value : '',
            touched: false,
            valid : false
        }
        this.state = {
            name: attr,
            venue: attr,
            location: attr,
            lng: '',
            lat: '',
            date: attr,
            endDate: attr,
            image: attr,
            description: '',
            cats: {
                value: [],
                touched: false,
                valid : false
            },
            isLoaded: false,
            maxDate: '',
            minDate: '',
            pixelCrop:{
                x: 0,
                y: 0,
                width: 0,
                height: 0
            }
    }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleVenueChange = this.handleVenueChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.isCreateEventFormValid = this.isCreateEventFormValid.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updatePixelCrop = this.updatePixelCrop.bind(this);
        this.onCropDone = this.onCropDone.bind(this);
        this.choseImageAlready = this.choseImageAlready.bind(this);
    }

    choseImageAlready(){
        this.setState({
            choseImage: true
        });
    }

    componentWillMount(){
        const set = (val) => this.setState(val);
        var eventDetail = {};
        // console.log(this.props);
        getEventCreated(this.props.routeParams.eventId, (res) => {
            eventDetail = res;
            set({name: {value: eventDetail.title, touched: true, valid: eventDetail.title? true : false}});
            set({venue: {value: eventDetail.address, touched: true, valid: eventDetail.address? true : false}});
            set({location: {value: eventDetail.location, touched: true, valid: eventDetail.location? true : false}});
            set({lat: eventDetail.latitude});
            set({lng: eventDetail.longitude});
            set({date: {value: Moment.unix(eventDetail.startDate/1000).format(DATE_TIME_FORMAT), touched: true, valid: eventDetail.startDate? true : false}});
            set({endDate: {value: eventDetail.endDate? Moment.unix(eventDetail.endDate/1000).format(DATE_TIME_FORMAT) : "", touched: true, valid: eventDetail.endDate? true : false}});

            var cats = [];
            eventDetail.categories.forEach(function (e) {
                cats.push(e.id);
            });
            set({cats: {value: cats, touched: true, valid : true}});
            if(eventDetail.imageCover) {
                set({
                    image: {
                        value: eventDetail.imageCover,
                        touched: false,
                        valid: eventDetail.imageCover ? true : false
                    }
                })
            }
            if(eventDetail.description){
                set({description: eventDetail.description});
            }
        });

        getMaxDateByEvent(this.props.routeParams.eventId, (date) => {
            set({maxDate: date ? Moment.unix(date/1000).format(DATE_TIME_FORMAT):''})
        })
        getMinDateByEvent(this.props.routeParams.eventId, (date) => {
            set({minDate: date ? Moment.unix(date/1000).format(DATE_TIME_FORMAT):''})
        })
    }

    updatePixelCrop(pixelCropObj){
        this.setState({
            pixelCrop: pixelCropObj
        })
    }

    onCropDone(){
        this.setState({
            image: {
                value: document.getElementById("imgInput").files[0],
                touched: true,
                valid: true
            }
        })
    }

    componentDidMount() {
        const self = this;
        const set = (val) => this.setState(val);
        var eventDetail = {};


        $('#detaillatitude').change(function (val) {
            var lng = $('#detaillongitude').val();
            var lat = $('#detaillatitude').val();
            var location = $('#detailcreatelocation').val();
            set({location: {value: location, touched: true, valid: true}});
            set({lat: lat});
            set({lng: lng});
        });
        $('#startdatedetailcreate').change(function (val) {
            var date = $('#startdatedetailcreate').val();
            var end = $('#enddatedetailcreate').val();

            var startDate =  Moment(date,DATE_TIME_FORMAT, true);
            var endDate  =  Moment(end,DATE_TIME_FORMAT, true);

            if(Moment(startDate).isAfter(endDate) || (self.state.minDate && startDate.isAfter(Moment(self.state.minDate,DATE_TIME_FORMAT, true)))) {
                set({date: {value: date, touched: true, valid: false}});
                set({endDate: {value: end, touched: true, valid: false}});
            }
            else {
                var valid = (date) ? true : false;
                set({date: {value: date, touched: true, valid: valid}});
                set({endDate: {value: end, touched: true, valid: end?true:false}});
            }
        });
        $('#enddatedetailcreate').change(function (val) {
            var date = $('#enddatedetailcreate').val();
            var start = $('#startdatedetailcreate').val();
            var startDate =  Moment(start,DATE_TIME_FORMAT, true);
            var endDate  =  Moment(date,DATE_TIME_FORMAT, true);
            if(Moment(startDate).isAfter(endDate) || (self.state.maxDate && (Moment(self.state.maxDate,DATE_TIME_FORMAT, true)).isAfter(endDate))) {
                set({date: {value: start, touched: true, valid: false}});
                set({endDate: {value: date, touched: true, valid: false}});
            }
            else {
                var valid = (date) ? true : false;
                set({endDate: {value: date, touched: true, valid: valid}});
                set({date: {value: start, touched: true, valid: start?true:false}});
            }
        });
        $('#selectdetailcreate').change(function () {
            var cats = $('#selectdetailcreate').val();
            var valid = cats.length > 0 ? true : false;
            set({cats: {value: cats, touched: true, valid : valid}});
        })
        // $("#imgcover").change(function(){
        //     var countFiles = $(this)[0].files.length;
        //     var imgPath = $(this)[0].value;
        //     var extn = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
        //     var image_holder = $("#imageholder");
        //     if($(this)[0].files[0].size < 10048576) {
        //         if (extn == "gif" || extn == "png" || extn == "jpg" || extn == "jpeg") {
        //             if (typeof(FileReader) != "undefined") {
        //                 //loop for each file selected for uploaded.
        //                 image_holder.empty();
        //                 for (var i = 0; i < countFiles; i++) {
        //                     var reader = new FileReader();
        //                     reader.onload = function (e) {
        //                         $("<img />", {
        //                             "id": "cover-image-create",
        //                             "src": e.target.result,
        //                             "style": 'width: 100%'
        //                         }).appendTo(image_holder);
        //                         if (e.target.result) {
        //                             var image = window.btoa(e.target.result.substring(
        //                                 e.target.result.indexOf("base64,") + 7)
        //                             );
        //                             set({
        //                                 image: {
        //                                     value: document.getElementById("imgcover").files[0],
        //                                     touched: true,
        //                                     valid: true
        //                                 }
        //                             });
        //                         }
        //                     }
        //                     image_holder.show();
        //                     reader.readAsDataURL($(this)[0].files[i]);
        //                 }
        //             } else {
        //                 alert("This browser does not support FileReader.");
        //             }
        //         }
        //         else {
        //             alert("Please select only image");
        //         }
        //     }
        //     else{
        //         alert("Maximum size is 1MB! Please choose another one.");
        //     }
        // });
    }

    componentDidUpdate(){
        var map;
        if(!this.state.isLoaded && this.state.lat && this.state.lng && $('#detailcreatemap').length>0 ) {
            this.setState({isLoaded: true});
            var pos = {
                lat: this.state.lat,
                lng: this.state.lng
            }
            google.maps.event.addDomListener(window, 'load', initMaps);
            function initMaps() {
                map = new google.maps.Map(document.getElementById('detailcreatemap'), {
                    center: {lat: parseFloat(pos.lat), lng: parseFloat(pos.lng)},
                    zoom: 16,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });
                var myMarker = new google.maps.Marker({
                    position: new google.maps.LatLng(16, 108),
                    draggable: true
                });
                myMarker.setMap(map);
                var latlng = new google.maps.LatLng(pos.lat, pos.lng);
                myMarker.setPosition(latlng);
                google.maps.event.addListener(myMarker, 'dragend', function (evt) {
                    getAddress(evt.latLng.lat(), evt.latLng.lng());
                });
                google.maps.event.addListener(myMarker, 'dragstart', function (evt) {
//                document.getElementById('current').innerHTML = '<p>Currently dragging marker...</p>';
                });

                var input = document.getElementById('detailcreatelocation');
                var searchBox = new google.maps.places.SearchBox(input);
                searchBox.addListener('places_changed', function () {
                    console.log("123");
                    $('#detaillongitude').val("");
                    $('#detaillatitude').val("");
                    var places = searchBox.getPlaces();
                    if (places.length == 0) {
                        return;
                    }
                    $('#detaillongitude').val(places[0].geometry.location.lng()).change();
                    $('#detaillatitude').val(places[0].geometry.location.lat()).change();
                    $('#detailcreatelocation').trigger('change');
                    var pos = {
                        lat: places[0].geometry.location.lat(),
                        lng: places[0].geometry.location.lng()
                    };
                    var latlng = new google.maps.LatLng(pos.lat, pos.lng);
                    myMarker.setPosition(latlng);
                    map.setCenter({
                        lat: places[0].geometry.location.lat(),
                        lng: places[0].geometry.location.lng()
                    });
                    myMarker.setPosition(latlng);
                });
            }
            function getAddress(latitude, longitude) {
                return new Promise(function (resolve, reject) {
                    var request = new XMLHttpRequest();
                    var method = 'GET';
                    var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true';
                    var async = true;
                    request.open(method, url, async);
                    request.onreadystatechange = function () {
                        if (request.readyState == 4) {
                            if (request.status == 200) {
                                var data = JSON.parse(request.responseText);
                                var address = data.results[0];
                                console.log(address);
                                $('#detailcreatelocation').val(address.formatted_address);
                                $('#detaillongitude').val(longitude).change();
                                $('#detaillatitude').val(latitude).change();
                                resolve(address);
                            }
                            else {
                                reject(request.status);
                            }
                        }
                    };
                    request.send();
                });
            };
            $("#form-create-detail").show();
        }
    }


    handleNameChange(value){
        var valid = (value.value) ? true : false;
        this.setState({name: {value: value.value, touched: true, valid: valid}});
        console.log(this.state.cats);
    }
    handleVenueChange(value){
        var valid = (value.value) ? true : false;
        this.setState({venue: {value: value.value, touched: true, valid: valid}});
    }
    handleLocationChange(value){
        var location = $('#detailcreatelocation').val();
        this.setState({location: {value: value.value, touched: true, valid: false}});
    }
    isCreateEventFormValid(){
        if(this.state.name.valid && this.state.venue.valid &&
            this.state.location.valid && this.state.date.valid && this.state.cats.valid && this.state.endDate.valid){
            return true;
        }
        else{
            return false;
        }
    }

    handleSubmit(e){
        e.preventDefault();
        var categories = [];
        this.state.cats.value.forEach((id) => {
            categories.push({id: id});
        });
        var startDate = new Date(this.state.date.value);
        var endDate = new Date(this.state.endDate.value);
        if(categories.length==0){
            $('html,body').scrollTop(700);
        }
        if(!this.state.date.value || !this.state.endDate.value || startDate.getTime()>endDate.getTime()){
            $('html,body').scrollTop(600);
        }
        if(!this.state.image.value || !this.state.location.valid){
            this.setState({image: {value: this.state.image.value, touched: true, valid: this.state.image.valid}});
            $('html,body').scrollTop(100);
        }
        if(!this.state.name.value || !this.state.venue.value){
            $('html,body').scrollTop(0);
        }
        var event = {
            id: this.props.routeParams.eventId,
            title: this.state.name.value,
            address: this.state.venue.value,
            location:this.state.location.value,
            latitude: this.state.lat,
            longitude: this.state.lng,
            startDate: Moment(this.state.date.value,DATE_TIME_FORMAT, true),
            endDate: Moment(this.state.endDate.value,DATE_TIME_FORMAT, true),
            categories: categories,
            description: tinyMCE.get('description-create').getContent(),
        //    imageCover: this.state.image.value
        }

        var upload = this.state.image.touched ? this.state.image.value : ""

        var formData = new FormData();
        formData.append("event",JSON.stringify(event));
        formData.append("imgCover", upload);
        formData.append("pixelCrop", JSON.stringify(this.state.pixelCrop));
        formData.append("id", this.props.routeParams.eventId);

        console.log("lkdjflkjadf", formData);

        if(this.isCreateEventFormValid()){
            this.props.updateEvent(formData);
            console.log("Save Success");
        }
    }
    render(){
        var selectStyle = {
            width: '100%',
            borderRadius: '0px',
            border: '0px'
        };

        if(tinyMCE.get('description-create')){
            if(!tinyMCE.get('description-create').getContent())
                tinyMCE.get('description-create').setContent(this.state.description);
        }

        var dateToday = new Date();
        $('#startdatedetailcreate').datetimepicker({
            format: DATE_FORMAT_PICKER + " " + TIME_FORMAT_PICKER,
            minDate: dateToday
        });

        $('#enddatedetailcreate').datetimepicker({
            format: DATE_FORMAT_PICKER + " " + TIME_FORMAT_PICKER,
            minDate: dateToday
        });

        $("#selectdetailcreate").select2({
            placeholder: "Categories"
        });


        var canvasSize = {
            width: 1920,
            height: 768
        }
        var crop = {
            x: 0,
            y: 0,
            width: 2000,
            aspect: canvasSize.width / canvasSize.height
        }

        var fit = this.state.image.touched;//false;
        var defaultImage = (!this.state.image.touched && this.state.image.value) ? APP_URL + this.state.image.value : "/assets/960x384.png";

        return (
            <div className="row background-event-manage no-padding">
                <div className="col-xs-2">
                </div>
                <div className="col-xs-20 margin-top-4 padding-bottom-10">
                    <div className="shadow-panel">
                        {/*<div className="row margin-top-10 background-white">*/}
                            {/*<div className=" title-index-bar col-xs-2 background-event-index">*/}
                                {/*<i className="fa fa-pencil" aria-hidden="true"></i>*/}
                            {/*</div>*/}
                            {/*<div className="title-index-bar col-xs-21">*/}
                                {/*Description*/}
                            {/*</div>*/}
                            {/*<div className="title-index-bar col-xs-1">*/}
                                {/*<i className="fa edit-button"></i>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                        <div className="row form-speaker background-white margin-top-10">
                            <div className="padding-left-right"
                                 id="form-create-detail" hidden="hidden">
                                <form className="detail-create">
                                    <br/>
                                    <div className="col-xs-24 col-sm-12 col-md-12 col-lg-12">
                                        <FormGroupDetail
                                            label="Event Name"
                                            type="text"
                                            value={this.state.name}
                                            onChange={this.handleNameChange}
                                            iconClass="glyphicon glyphicon-pencil"
                                            placeholder="Event Name"
                                        />
                                    </div>
                                    <div className="col-xs-24 col-sm-12 col-md-12 col-lg-12">
                                        <FormGroupDetail
                                            label="Event Venue"
                                            type="text"
                                            value={this.state.venue}
                                            onChange={this.handleVenueChange}
                                            iconClass="glyphicon glyphicon-home"
                                            placeholder="Event Venue"
                                        />
                                    </div>
                                    <div className="col-xs-24 col-sm-24 col-md-24 col-lg-24" id="des-width">
                                        { this.state.image.valid ?
                                            <label className="label-valid">Upload cover image</label>
                                            :
                                            <label className="label-invalid">Upload cover image</label>
                                        }
                                        <UploadImageComponent choseImageAlready={this.choseImageAlready} onCropDone={this.onCropDone} updatePixelCrop = {this.updatePixelCrop} fit={fit} crop={crop} canvasSize = {canvasSize} defaultImage = {defaultImage}/>
                                        {/*<UploadCoverImage img={this.state.image}/>*/}
                                    </div>
                                    <div className="col-xs-24 col-sm-24 col-md-24 col-lg-24">
                                        <FormGroupDetail
                                            label="Choose event location"
                                            type="text"
                                            value={this.state.location}
                                            onChange={this.handleLocationChange}
                                            iconClass="glyphicon glyphicon-map-marker"
                                            placeholder="Event Location"
                                            id="detailcreatelocation"
                                        />
                                    </div>
                                    <div className="col-xs-24 col-sm-24 col-md-24 col-lg-24">
                                        <div id='detailcreatemap' style={{width: "100%", height: "35vh"}}></div>
                                        <br/>
                                    </div>
                                    <input type="hidden" id="detaillongitude" value={this.state.lng}/>
                                    <input type="hidden" id="detaillatitude" value={this.state.lat}/>
                                    <div className="col-xs-24 col-sm-12 col-md-12 col-lg-12">
                                        <FormGroupDetail
                                            label="Start date"
                                            type="text"
                                            value={this.state.date}
                                            onChange={() => {
                                            }}
                                            iconClass="glyphicon glyphicon-calendar"
                                            placeholder="Start Date"
                                            id="startdatedetailcreate"
                                        />
                                    </div>
                                    <div className="col-xs-24 col-sm-12 col-md-12 col-lg-12">
                                        <FormGroupDetail
                                            label="End Date"
                                            type="text"
                                            value={this.state.endDate}
                                            onChange={() => {
                                            }}
                                            iconClass="glyphicon glyphicon-calendar"
                                            placeholder="End Date"
                                            id="enddatedetailcreate"
                                        />
                                    </div>
                                    <div className="col-xs-24 col-sm-24 col-md-24 col-lg-24">
                                        <FormGroupSelect
                                            label="Select categories"
                                            id="selectdetailcreate"
                                            type="multiple"
                                            value={this.state.cats}
                                            iconClass="glyphicon glyphicon-tags"
                                            values={this.props.cats}
                                            style={selectStyle}
                                        />
                                    </div>
                                    <div className="col-xs-24 col-sm-24 col-md-24 col-lg-24">
                                        <WysiwygEditor id="description-create" description={this.state.description}/>
                                    </div>
                                    <br/>
                                    <div className="col-xs-24 col-sm-24 col-md-24 col-lg-24">
                                        <div className="form-group pull-right">
                                            <button type="submit" onClick={this.handleSubmit}
                                                    className="btn no-border-radius button-speaker">Save & Continue
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xs-2">
                </div>
            </div>
        );
    }
}