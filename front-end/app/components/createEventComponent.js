/**
 * Created by hvthien on 12/13/2016.
 */
import React from 'react'
import CreateEventContainer from '../containers/createEventContainer'
import {getAllCategories} from '../actions/categoryAction'

const CreateEventComponent = () => (

	<div>
        <div className="modal fade" id="createEvent" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h4 className="modal-title form-title">QUICK CREATE</h4>
                    </div>
                    <div className="modal-body quickCreate">
                        <CreateEventContainer/>
                    </div>
                </div>
            </div>
        </div>
	</div>
)

export default CreateEventComponent
