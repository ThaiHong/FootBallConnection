/**
 * Created by ltphuc on 12/23/2016.
 */
import React, {Component} from 'react'

class Banner extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <img src={this.props.urlImage} className="event-detail-banner"
                 alt={this.props.description}/>
        )
    }
}

export default Banner