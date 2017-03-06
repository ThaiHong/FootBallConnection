/**
 * Created by pvdinh on 12/19/2016.
 */
import React, {Component} from 'react'
import JoinSuccess from './joinSuccess'
import {APP_URL} from '../config/appConfig'


class Footer extends Component {
    constructor(props) {
        super(props);
    }
    render() {

        return (
            <div className="footer">
                <JoinSuccess/>
                <div className="footer_wrapper">
                    <div className="footer_block">
                        <div className="footer_item_small follow_us_div">
                            <div className="footer_header">
                                Follow us
                            </div>
                            <div className="footer-social-icon-corner">
                                <i className="fa fa-facebook-square social-icon footer_social_icon" aria-hidden="true"></i>
                                <i className="fa fa-google-plus-square social-icon footer_social_icon" aria-hidden="true"></i>
                                <i className="fa fa-twitter-square social-icon footer_social_icon" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div className="footer_item_large">
                            <div className="footer_header">
                                Company
                            </div>
                            <div style={{paddingBottom: "10px"}}>
                                <img id="footer_company_logo" src={APP_URL+ "/assets/axonactive.png"}/>
                            </div>

                        </div>
                        <div className="footer_item_large">
                            <div className="footer_header">
                                Headquarter
                            </div>
                            <div className="location">
                                <div className="location_item location_icon">
                                    <i className="fa fa-map-marker footer_social_icon" aria-hidden="true"></i>
                                </div>
                                <div className="location_item location_txt">
                                    <div className="location_txt_content location_txt_header">
                                        <a target="_blank" href="https://www.google.com/maps/place/Axon+Active+Vietnam/@10.8086532,106.6631633,18z/data=!4m5!3m4!1s0x3175293cb57e2cad:0x8f2bef857837085f!8m2!3d10.8092065!4d106.6641128">
                                            HO CHI MINH CITY, VIETNAM
                                        </a>
                                    </div>
                                    <div className="location_txt_content location_txt_details">
                                        39B Truong Son Street,
                                        Ward 4, Tan Binh District,
                                        Ho Chi Minh City, Vietnam
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="footer_item_large" id="footer_last_item">
                            <div className="footer_header">
                                Office
                            </div>
                            <div>
                                <div className="location">
                                    <div className="location_item location_icon">
                                        <i className="fa fa-map-marker footer_social_icon" aria-hidden="true"></i>
                                    </div>
                                    <div className="location_item location_txt office_mobile">
                                        <div className="location_txt_content location_txt_header">
                                            <a target="_blank" href="https://www.google.com/maps/place/Axon+Active+Vietnam/@16.04151,108.2198872,18z/data=!4m5!3m4!1s0x314219e9fae5b5f3:0x938e9d3475a89baf!8m2!3d16.0408888!4d108.2206436">
                                                DA NANG, VIETNAM
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="location">
                                    <div className="location_item location_icon">
                                        <i className="fa fa-map-marker footer_social_icon" aria-hidden="true"></i>
                                    </div>
                                    <div className="location_item location_txt office_mobile">
                                        <div className="location_txt_content location_txt_header">
                                            <a target="_blank" href="https://www.google.com/maps/place/Axon+Active+Inc./@37.7846883,-122.4112432,18z/data=!4m5!3m4!1s0x8085808f9025ce29:0x88675a56056af0ac!8m2!3d37.784913!4d-122.410747">
                                                SAN FRANCISCO, USA
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="location">
                                    <div className="location_item location_icon">
                                        <i className="fa fa-map-marker footer_social_icon" aria-hidden="true"></i>
                                    </div>
                                    <div className="location_item location_txt office_mobile last_office">
                                        <div className="location_txt_content location_txt_header">
                                            LUZERN, SWITZERLAND
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className="footer_block">
                        <div className="footer_final footer_final_left">
                            A product of <a href="http://www.axonactive.com/" target="_blank" className="footer_link">AXON ACTIVE VIETNAM</a>  @ 2016 | All rights reserved
                        </div>
                        <div className="footer_final footer_final_right">
                            <a href="#" target="_blank" className="footer_link">Terms of Service</a> | <a href="#" target="_blank" className="footer_link">Privacy Statement</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Footer;