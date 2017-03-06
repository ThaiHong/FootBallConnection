import React, {Component} from 'react'
import SlideShowImage from './slideShowImage'
import {getSlideShowEvent} from '../api/eventApi'

class SlideShowHome extends Component {

    constructor(props){
        super(props);
        this.state = {
            slideShowEvents: []
        }
    }

    componentWillMount(){
        getSlideShowEvent((events) => {
            this.setState({slideShowEvents: events});
        })
    }

    render() {


        return (
            <div id="bootstrap-touch-slider" className="carousel bs-slider slide  control-round indicators-line"
                 data-ride="carousel" data-pause="hover" data-interval="5000">


                <ol className="carousel-indicators">
                    <li data-target="#bootstrap-touch-slider" data-slide-to="0" className="active"></li>
                    <li data-target="#bootstrap-touch-slider" data-slide-to="1"></li>
                    <li data-target="#bootstrap-touch-slider" data-slide-to="2"></li>
                    <li data-target="#bootstrap-touch-slider" data-slide-to="3"></li>
                    <li data-target="#bootstrap-touch-slider" data-slide-to="4"></li>
                </ol>


                <div className="carousel-inner" role="listbox">


                    <div className="item active">
                        <img
                            src="/assets/default.png"

                            alt="Bootstrap Touch Slider" className="slide-image"/>
                    </div>
                    {
                        this.state.slideShowEvents.map(event =>
                            <SlideShowImage key={event.id} id={event.id} imageCover={event.imageCover}/>
                        )
                    }

                </div>
                <a className="left carousel-control" href="#bootstrap-touch-slider" role="button" data-slide="prev">
                    <span className="fa fa-angle-left" aria-hidden="true"></span>
                </a>


                <a className="right carousel-control"  href="#bootstrap-touch-slider" role="button" data-slide="next">
                    <span className="fa fa-angle-right" aria-hidden="true"></span>
                </a>

            </div>
        );

    }

}

export default SlideShowHome;
