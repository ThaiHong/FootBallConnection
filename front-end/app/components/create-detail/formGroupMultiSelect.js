/**
 * Created by hvthien on 1/4/2017.
 */
import React from 'react'

const FormGroupSelect = ({spanClass, iconClass, values, style, value, type, id, label}) => (
    <div className="form-group">
        {(label && value.valid) ?
            <label className="label-valid">{label}</label>
            :
            <label className="label-invalid">{label}</label>
        }
        <div className="input-group">
            <span className="input-group-addon"><i className={iconClass}></i></span>
            <select id={id} className="form-control" multiple={type} style={style} placeholder="Select Categories" value={value.value}>
                {
                    values.map(val =>
                        <option key={val.id} value={val.id}>{val.typeName}</option>
                    )
                }
            </select>
            <div>
            </div>
            { !value.touched ? null :
                value.valid ? <span className="input-group-addon"><i className="text-success glyphicon glyphicon-ok"></i></span> :
                    <span className="input-group-addon"><i className="text-danger glyphicon glyphicon-remove"></i></span>
            }
        </div>
    </div>
)

export default FormGroupSelect