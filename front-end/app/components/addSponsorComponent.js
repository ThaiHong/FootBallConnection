/**
 * Created by XuanVinh on 1/2/2017.
 */
import React, {Component} from 'react'
import FormGroup from './FormGroup'
import TextAreaFormGroup from './textAreaFormGroup'
import SponsorListContainer from '../containers/sponsorListContainer'
import AddSponsorContainer from '../containers/addSponsorContainer'
import {getSponsors} from "../actions/sponsorAction"

class AddSponsorComponent extends Component{

    render(){
        getSponsors();
        return(
            <div>
                <AddSponsorContainer/>
                <div id="sponsorList">
                <SponsorListContainer/>
                </div>
            </div>
        );
    }
}

export default AddSponsorComponent;