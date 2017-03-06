/**
 * Created by vdhong on 1/9/2017.
 */

import React from 'react'
import ProfileFormComponent from './profileFormComponent'
import {dispatch} from '../../store';
import {actions} from 'react-redux-form';
class ProfileComponent extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        return (

            <div className="row background-event-manage no-padding profile-body" >
                <div className="col-md-2">

                </div>

                <div className="col-md-20 profile-body">

                    <ProfileFormComponent {...this.props}  />

                </div>

                <div className="col-md-2">
                </div>

            </div>
        );
    }
}

export default ProfileComponent;