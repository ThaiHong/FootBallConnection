/**
 * Created by XuanVinh on 1/2/2017.
 */
import React, {Component} from 'react'
import FormGroup from './FormGroup'
import TextAreaFormGroup from './textAreaFormGroup'
import SponsorListComponent from './sponsorListComponent'
import CropImage from './cropImage'

class AddSponsorForm extends Component{
    constructor(props){
        super(props);
        const attr = {
            value: '',
            touched: false,
            valid: false
        }
        this.state = {
            name: attr,
            location:attr,
            lng: '',
            lat: '',
            description: attr,
            image: attr
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillReceiveProps(nextProps){
        this.setState({name: {value: nextProps.currentSponsor.sponsorName, touched: false, valid: true}});
        this.setState({description: {value: nextProps.currentSponsor.description, touched: false, valid: true}});
        this.setState({location: {value: nextProps.currentSponsor.location, touched: false, valid: true}});
        this.setState({image: {value: nextProps.currentSponsor.image, touched: false, valid: true}});
        // console.log(this.state);
    }

    componentDidMount() {
            const set = (val) => this.setState(val);
            $('#latitude').change(function (val) {
                var lng = $('#longitude').val();
                var lat = $('#latitude').val();
                var location = $('#addsponsor').val();
                set({location: {value: location, touched: true, valid: true}});
                set({lat: lat});
                set({lng: lng});
                // console.log(lng + "," + lat);
            });

    }
    handleNameChange(value){
        var valid = (value.value) ? true:false;
        this.setState({name: {value: value.value, touched: true, valid: valid}});
        // console.log("a",this.state.name.value)
    }
    handleLocationChange(value){
        var valid = $('#addsponsor').val();
        this.setState({location: {value: value.value, touched: true, valid: valid}});
    }
    handleDescriptionChange(value){
        var valid = (value.value) ? true:false;
        this.setState({description: {value: value.value, touched: true, valid: valid}});
    }
    handleSubmit(e){
        e.preventDefault()
        var image = $("#item-img-output").attr("src");

        image = window.btoa(image.substring(23, image.length));

        var sponsor = {
            sponsorName: this.state.name.value,
            description: this.state.description.value,
            location:this.state.location.value,
            latitude: this.state.lat,
            longitude: this.state.lng,
            image: image,
            event:{
                id : 2
            }
        }
        console.log(sponsor)
        this.props.addSponsor(sponsor)
    }
    render(){
        console.log(this.state);
        return(
            <div className="row">
                <form className="col-sm-12 col-sm-offset-6">

                    <CropImage/>

                    <FormGroup
                        type="text"
                        value={this.state.name}
                        onChange={this.handleNameChange}
                        iconClass="glyphicon glyphicon-pencil"
                        placeholder="Sponsor name"
                    />
                    <FormGroup
                        type="text"
                        value={this.state.location}
                        onChange={this.handleLocationChange}
                        iconClass="glyphicon glyphicon-map-marker"
                        placeholder="Street"
                        id="addsponsor"
                    />

                    <TextAreaFormGroup
                        type="text"
                        value={this.state.description}
                        onChange={this.handleDescriptionChange}
                        iconClass="glyphicon glyphicon-pencil"
                        placeholder="Description"
                    />

                    <button type="submit" onClick={this.handleSubmit}
                            className="btn btn-success btn-block">Add</button>
                </form>
            </div>
        );
    }
}
export default AddSponsorForm;