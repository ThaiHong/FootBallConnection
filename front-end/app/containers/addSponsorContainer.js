/**
 * Created by XuanVinh on 1/2/2017.
 */

import React from 'react'
import {connect} from 'react-redux'

import AddSponsorForm from '../components/addSponsorForm'

import {addSponsor} from'../actions/sponsorAction'

const mapStatetoProps = (state,ownProps) =>{
    return {
        currentSponsor: state.currentSponsor
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch : dispatch,
        addSponsor: (sponsor) => addSponsor(sponsor)
    }
}


const AddSponsorContainer = connect(
    mapStatetoProps,
    mapDispatchToProps
)(AddSponsorForm)

export default AddSponsorContainer;

