/**
 * Created by hvthien on 12/12/2016.
 */
import React, {Component} from 'react'

export default class InputForm extends Component {
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.props.onChange({value: event.target.value});
    }

    render(){
        return(

            // <input
            //     className="form-control"
            //     type={this.props.type}
            //     value={this.props.value}
            //     onChange={this.handleChange}
            //     required="required" />

            <input
                id={this.props.id}
                required="required"
                className="form-control"
                onChange={this.handleChange}
                type={this.props.type}
                value={this.props.value}
                placeholder={this.props.placeholder}
                />
    )
    }
}