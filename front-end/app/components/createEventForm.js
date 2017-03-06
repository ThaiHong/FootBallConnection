/**
 * Created by hvthien on 12/20/2016.
 */
import React, {Component} from 'react'
import FormGroup from './FormGroup'
import Moment from 'moment';
import FormGroupSelect from './FormGroupSelect'
import {getAllCategories} from '../actions/categoryAction'
import {DATE_FORMAT, DATE_FORMAT_PICKER} from '../config/appConfig'

export default class CreateEventForm extends Component {
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
            cats: {
                value: [],
                touched: false,
                valid : false
            },
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleVenueChange = this.handleVenueChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.isCreateEventFormValid = this.isCreateEventFormValid.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentWillMount(){
        getAllCategories()
    }

    componentDidMount() {
        var dateToday = new Date();
        $('#datetimepicker').datetimepicker({
            timepicker: false,
            format: DATE_FORMAT_PICKER,
            minDate: dateToday
        });

        const set = (val) => this.setState(val);
        $('#latitude').change(function (val) {
            var lng = $('#longitude').val();
            var lat = $('#latitude').val();
            var location = $('#quickcreatelocation').val();
            set({location: {value: location, touched: true, valid: true}});
            set({lat: lat});
            set({lng: lng});
            console.log(lng+","+lat);
        });

        $('#datetimepicker').change(function (val) {
            var date = $('#datetimepicker').val();
            var valid = (date) ? true : false;
            set({date: {value: date, touched: true, valid: valid}});
        });

        $('#selectboxevent').change(function () {
            var cats = $('#selectboxevent').val();
            var valid = cats.length > 0 ? true : false;
            set({cats: {value: cats, touched: true, valid : valid}});
        })
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
        var location = $('#quickcreatelocation').val();
        this.setState({location: {value: value.value, touched: true, valid: false}});
    }

    isCreateEventFormValid(){
        if(this.state.name.valid && this.state.venue.valid &&
            this.state.location.valid && this.state.date.valid && this.state.cats.valid){
            return true;
        }
        else{
            return false;
        }
    }

    handleSubmit(e){
         // e.preventDefault();
        var categories = [];
        this.state.cats.value.forEach((id) => {
            categories.push({id: id});
        });

        var event = {
            title: this.state.name.value,
            address: this.state.venue.value,
            location:this.state.location.value,
            latitude: this.state.lat,
            longitude: this.state.lng,
            createDate: (new Date()).getTime(),
            startDate: Moment(this.state.date.value,DATE_FORMAT, true),
            categories: categories
        }
        console.log(event);

        if(this.isCreateEventFormValid()){
            this.props.addEvent(event);
            $('#selectboxevent').val([]).change();
            const attr = {
                value : '',
                touched: false,
                valid : false
            }
            this.setState({
                name: attr,
                venue: attr,
                location: attr,
                lng: '',
                lat: '',
                date: attr,
                cats: {
                    value: [],
                    touched: false,
                    valid : false
                },
            });
            $('#createEvent').modal('toggle');
        }
    }


    render(){
        var selectStyle = {
            width: '100%',
            borderRadius: '0px',
            border: '0px'
        };

        var chooseLocationLink = <a className="openmodal" href="#changelocationlink"  data-toggle="collapse" data-target="#changelocationlink">Choose Your Location Directly</a>

        return (
            <div>
                <form className="quick-create">
                    <FormGroup
                        type="text"
                        value={this.state.name}
                        onChange={this.handleNameChange}
                        iconClass="glyphicon glyphicon-pencil"
                        placeholder="Event Name"
                    />
                    <FormGroup
                        type="text"
                        value={this.state.venue}
                        onChange={this.handleVenueChange}
                        iconClass="glyphicon glyphicon-home"
                        placeholder="Event Venue"
                    />
                    <FormGroup
                        type="text"
                        value={this.state.location}
                        onChange={this.handleLocationChange}
                        iconClass="glyphicon glyphicon-map-marker"
                        placeholder="Event Location"
                        id="quickcreatelocation"
                        custom={chooseLocationLink}
                    />


                    <div id="changelocationlink" className="collapse">
                        <div id='quickcreatemap'></div>
                        <br/>
                    </div>


                    <input type="hidden" id="longitude" value={this.state.lng} />
                    <input type="hidden" id="latitude" value={this.state.lat}/>
                    <FormGroup
                        type="text"
                        value={this.state.date}
                        onChange={() => {}}
                        iconClass="glyphicon glyphicon-calendar"
                        placeholder="Start Date"
                        id="datetimepicker"
                    />
                    <FormGroupSelect
                        id="selectboxevent"
                        type="multiple"
                        value={this.state.cats}
                        iconClass="glyphicon glyphicon-tags"
                        values={this.props.cats}
                        style={selectStyle}
                    />
                    <br/>
                    {this.isCreateEventFormValid() ? (
                        <button type="submit" onClick={this.handleSubmit}
                                className="btn btn-create btn-lg btn-block">CREATE</button>
                    ) : (
                        <button type="submit"
                                className="btn btn-create btn-lg btn-block"
                                disabled="disabled">CREATE</button>
                    )}

                </form>
            </div>
        );
    }
}