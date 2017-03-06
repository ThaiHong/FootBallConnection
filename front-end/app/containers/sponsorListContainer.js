/**
 * Created by dctruc on 1/3/2017.
 */
import React from 'react'
import {connect} from 'react-redux'

import SponsorListComponent from '../components/sponsorListComponent'

import {getSponsors, deleteSponsor, setEditSponsor} from'../actions/sponsorAction'

const mapStatetoProps = (state,ownProps) =>{
    return {
        sponsors: state.sponsorList,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch : dispatch,
        getSponsors: () => getSponsors(),
        deleteSponsor: (id) => deleteSponsor(id),
        setEditSponsor: (sponsor) => setEditSponsor(sponsor)
    }
}


const AddSponsorContainer = connect(
    mapStatetoProps,
    mapDispatchToProps
)(SponsorListComponent)

export default AddSponsorContainer;
