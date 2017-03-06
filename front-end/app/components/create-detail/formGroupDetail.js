/**
 * Created by hvthien on 1/3/2017.
 */
import React from 'react'
import InputForm from '../InputForm'

const FormGroupDetail = ({id, type, value, onChange, spanClass, iconClass, placeholder, custom, label}) => (
    <div className="form-group">
        { value.valid ?
            <label className="label-valid" >{label}</label>
                :
            (<label className="label-invalid" >{label}</label>)
        }
        <div className="input-group">
            <span className="input-group-addon"><i className={iconClass}></i></span>

            <InputForm
                type={type}
                value={value.value}
                onChange={onChange}
                id={id}
                placeholder={placeholder}/>
            { !value.touched ? null :
                value.valid ? <span className="input-group-addon"><i className="text-success glyphicon glyphicon-ok"></i></span> :
                    <span className="input-group-addon"><i className="text-danger glyphicon glyphicon-remove"></i></span>
            }
        </div>
        {custom}
    </div>
)

export default FormGroupDetail