/**
 * Created by pvdinh on 1/3/2017.
 */
import React from 'react'
import {connect} from 'react-redux'
import SponsorComponent from '../../components/event-manage/sponsorComponent'
import {addSponsor,deleteSponsor,getSponsors,updateSponsor} from '../../actions/sponsorAction'

const mapStateToProps = (state, ownProps) => {
    return {
        eventId : state.routing.locationBeforeTransitions.query.eventId,
        speaker : state.AppForm.speaker,
        validation : state.AppForm.forms.speaker,
        sponsorList : state.sponsorList
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch : dispatch,
        addSponsor: (formData, eventId) => addSponsor(formData, eventId),
        deleteSponsor: (id, eventId) => deleteSponsor(id, eventId),
        getSponsors: (id) => getSponsors(id),
        updateSponsor: (eventId, id, formData)=>updateSponsor(eventId, id, formData)
    }
}

const SponsorContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SponsorComponent)

export default SponsorContainer;
