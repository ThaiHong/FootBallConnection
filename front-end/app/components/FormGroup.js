/**
 * Created by hvthien on 12/12/2016.
 */
import React from 'react'
import InputForm from './InputForm'

const FormGroup = ({id, type, value, onChange, spanClass, iconClass, placeholder, custom}) => (
    <div className="form-group">
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

export default FormGroup