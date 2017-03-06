/**
 * Created by hvthien on 12/12/2016.
 */
import React, {Component} from 'react'

export default class SelectForm extends Component {
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.props.onChange({value: event.target.value});
    }

    render(){
        console.log(this.props.value);
        return(
            <select className="form-control" id="selectboxevent" onChange={this.handleChange}>
            <optgroup label="Entertaiment">
                <option>Music</option>
                <option>Sport</option>
                <option>Art</option>
            </optgroup>
            <optgroup label="Academic">
                <option>Tent</option>
                <option>Flashlight</option>
                <option>Toilet Paper</option>
            </optgroup>
        </select>
        )
    }
}