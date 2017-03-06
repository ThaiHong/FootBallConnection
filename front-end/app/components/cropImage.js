/**
 * Created by dctruc on 1/4/2017.
 */
import React, {Component} from 'react'

class CropImage extends Component {

    render() {
        return (
            <div style={{marginBottom:"15px"}}>

                <div className="row">
                    <div className="image-output">
                        <img src="http://lynnhavenwahoos2018.org/wp-content/uploads/2016/10/your-logo-here.png" alt="" id="item-img-output"/>
                    </div>
                </div>
                <div className="row" style={{marginTop:"5px"}}>
                    <input type="file" name="" className="item-img" accept="image/*"/>
                </div>

                <div id="cropImagePop" className="modal fade" role="dialog">
                    <div className="modal-dialog" style={{width: "850px"}} role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                    aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title">Crop Image</h4>
                            </div>

                            <div >
                                <div className="col-xs-12 col-sm-4 col-sm-offset-4">
                                    <div style={{display: "block", width: "300px", height: "300px"}}>
                                        <div id="upload-demo"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer" style={{paddingTop: "300px"}}>
                                <button type="button" id="cropImageBtn" className="btn btn-primary">Crop</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );

    }
}

export default CropImage;
