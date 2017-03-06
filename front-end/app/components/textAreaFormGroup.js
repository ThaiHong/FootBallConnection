/**
 * Created by hvthien on 12/12/2016.
 */
import React from 'react'
import TextAreaForm from './textAreaForm'

const TextAreaFormGroup = ({id, type, value, onChange, spanClass, iconClass, placeholder}) => (
    <div className="form-group">
        <div className="input-group">
            <span className="input-group-addon"><i className={iconClass}></i></span>
            <TextAreaForm
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
    </div>
)

export default TextAreaFormGroup