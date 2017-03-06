/**
 * Created by dinhpv on 1/4/2017.
 */
import React from 'react'

const CustomFormGroupSelectSpeaker = ({spanClass, iconClass, values, style, value, type, id}) => (
    <div className="form-group">
             <select id={id} className="form-control" multiple={type} style={style} placeholder="Select Speaker" value={value.value}>
                 {
                 	values.map(val =>
					 <option key={val.id} value={val.id}>{val.name}</option>
                 	)
                 }
             </select>
            { !value.touched ? null :
                value.valid ? <span className="input-group-addon"><i className="text-success glyphicon glyphicon-ok"></i></span> :
					<span className="input-group-addon"><i className="text-danger glyphicon glyphicon-remove"></i></span>
            }
    </div>
)

export default CustomFormGroupSelectSpeaker
