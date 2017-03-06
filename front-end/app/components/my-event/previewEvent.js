/**
 * Created by ltphuc on 1/6/2017.
 */
import React from 'react'

export default class PreviewEvent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="previewModal" className="modal fade" role="dialog">
                <div className="container my-event-dialog">

                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Preview</h4>
                        </div>
                        <div className="modal-body">
                            <iframe className="my-event-preview" src={this.props.link}></iframe>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
