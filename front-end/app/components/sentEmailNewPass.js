/**
 * Created by tthong on 12/27/2016.
 */
import React, {Component} from 'react'


class SentEmailNewPass extends Component {
    constructor(props) {
        super(props);
    }

    handleBack() {
        $('#successfulProcess').modal('hide');
    }

    render() {
        return (
                    <div  style={{borderRadius: 0}}>
                        <div className="register well well-sm" style={{borderRadius: 0, padding:25}}>

                            <div className="form-group">
                                <div className="center">
                                    <span style={{fontSize: 70}}><i className="fa fa-check-square" style={{
                                        color: "green",
                                        borderRadius: 0
                                    }}></i></span>
                                </div>
                                <div className="center">
                                    <h4 style={{color: "#898989", fontWeight: 550}}>New password already sent to your
                                        email!</h4>
                                </div>
                            </div>

                            <div className="form-group " style={{borderRadius: 0}}>
                                <a className="btn btn-join btn-block" onClick={this.handleBack} href="javascript:location.reload();">Back to home page
                                </a>
                            </div>
                        </div>
                    </div>
        )
    }
}
export default SentEmailNewPass