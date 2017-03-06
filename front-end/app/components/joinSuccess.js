import React, {Component} from 'react'

class JoinSuccess extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        $('#join-success').modal('toggle');
    }

    render() {
        return (
            <div className="modal fade" id="join-success" role="dialog">
                <div className="modal-dialog" style={{width: "300px"}}>
                    <div className="well well-sm" style={{borderRadius: 0, padding:25}}>
                        <div className="form-group">
                            <div className="center">
                                    <span style={{fontSize: 100}}><i className="fa fa-check-square" style={{
                                        color: "green",
                                        borderRadius: 0
                                    }}></i></span>
                            </div>
                            <div className="center">
                                <h4 style={{color: "#898989", fontWeight: 550}}>Join Success!</h4>
                            </div>
                        </div>

                        <div className="form-group " style={{borderRadius: 0}}>
                            <button className="btn btn-join btn-block" onClick={this.onClick}>Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );

    }

}
export default JoinSuccess;
