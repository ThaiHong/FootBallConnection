/**
 * Created by hvthien on 1/9/2017.
 */
import React, {Component} from 'react'

class ListParticipant extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <tr>
                <td>{this.props.user.fullName}</td>
                <td>{this.props.user.email}</td>
                <td>{this.props.user.rangeAge}</td>
                <td>{this.props.user.phone}</td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
            </tr>
        )
    }
}

export default ListParticipant