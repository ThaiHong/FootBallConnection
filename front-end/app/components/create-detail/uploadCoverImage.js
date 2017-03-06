/**
 * Created by hvthien on 1/3/2017.
 */
import React from 'react'
import InputForm from '../InputForm'
import {APP_URL} from '../../config/appConfig.js'


const UploadCoverImage = ({img}) => (
    <div className="form-group">
        { img.valid ?
            <label className="label-valid">Upload cover image</label>
            :
            <label className="label-invalid">Upload cover image</label>
        }
        <div className="input-group">
            <div className="custom-file-upload">
                <input id="imgcover" type="file" />
                <i className="fa fa-cloud-upload"></i> Upload Image (Max: 1MB)
            </div>
            { !img.touched ? null :
                img.valid ? <span> <i className="text-success glyphicon glyphicon-ok"></i></span> :
                    <span> <i className="text-danger glyphicon glyphicon-remove"></i></span>
            }
        </div>
        <div id="imageholder">
            {!img.touched && img.valid &&
                <img id="cover-image-create" style={{width: "100%"}} src={APP_URL+img.value} />
            }
        </div>
    </div>
)

export default UploadCoverImage