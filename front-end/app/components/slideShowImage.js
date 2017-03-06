import React, {Component} from 'react'
import {APP_URL} from '../config/appConfig.js'

class SlideShowImage extends Component {

    render() {
        if(this.props.imageCover) {
            return (

                    <div className="item">
                        <a href={"/event/"+this.props.id}>
                        <img
                            src={APP_URL + this.props.imageCover}
                            alt="Bootstrap Touch Slider" className="slide-image"/>
                        </a>

                    </div>
            )
        }
        else
            return(<span></span>);
    }

}

export default SlideShowImage;
