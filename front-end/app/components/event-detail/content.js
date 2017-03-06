/**
 * Created by ltphuc on 12/23/2016.
 */
import React, {Component} from 'react'

class Content extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        var descriptionHtml = this.props.description;
        $(document).ready(function () {
            $('div #description').html(descriptionHtml);
        });

        return (
            <div className="col-md-24 event-detail-content">
                <div className="container event-detail-color-white">
                    <div className="col-sm-24 col-md-24 event-detail-no-padding">
                        <section id="intro">
                            <div className="row">
                                <div className="col-sm-24 col-md-24 event-detail-no-padding">
                                    <h3 className="event-detail-content-title">Introduction</h3>
                                    <div className="col-sm-24">
                                        <div className="event-detail-content-intro" id="description">
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>

                                <div className="col-sm-24 col-md-24 event-detail-no-padding">
                                    <div className="col-sm-24">
                                        <div className="event-detail-cate">
                                            <h3 className="event-detail-content-share">TAGS</h3>
                                            <div className="event-detail-margin-10-0-0-0">
                                                {
                                                    this.props.categories.map((category, i) => <a key={i}
                                                                                                  href="#"
                                                                                                  className="event-detail-link-cate">{category.typeName}</a>)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                                <div className="col-sm-24 col-md-24 event-detail-no-padding">
                                    <div className="col-sm-24">
                                        <div className="event-detail-padding-20">
                                            <h3 className="event-detail-content-share">SHARE WITH FRIENDS</h3>
                                            <div className="event-detail-margin-10-20-0-0">
                                                <img className="img-circle event-detail-content-image"
                                                     src="https://cdn1.iconfinder.com/data/icons/logotypes/32/square-facebook-512.png"></img>
                                                <img className="img-circle event-detail-content-image"
                                                     src="https://assets.materialup.com/uploads/b8f2348a-dfa8-4c0a-b696-112e1c293b95/googleplus-logos-02.png"></img>
                                                <img className="img-circle event-detail-content-image"
                                                     src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/linkedin_circle_color-512.png"></img>
                                                <img className="img-circle event-detail-content-image"
                                                     src="http://icons.iconarchive.com/icons/danleech/simple/1024/twitter-icon.png"></img>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}

export default Content
