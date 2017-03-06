/**
 * Created by XuanVinh on 1/2/2017.
 */
import{
    ADD_SPONSOR,
    GET_SPONSORS,
    REMOVE_SPONSOR,
    EDIT_SPONSOR
} from '../constants'

import * as API from '../api/sponsorAPI'
import {dispatch} from '../store'

export const addSponsor = (formData, eventId) =>{
    API.addSponsor(eventId, formData, (newSponsor)=>{
        dispatch({
            type: ADD_SPONSOR,
            eventId: eventId,
            sponsor: newSponsor
        })
    })
}

export const updateSponsor = (eventId, id, formData)=>{
    API.updateSponsor(eventId, id, formData, (updatedSponsor)=>{
        dispatch({
            type: EDIT_SPONSOR,
            eventId: eventId,
            sponsor: updatedSponsor
        })
    })
}

export const getSponsors = (id)=>{
    API.getSponsors(id,(sponsors)=>{
        dispatch({
            type: GET_SPONSORS,
            sponsors: sponsors
        })
    })
}

export const deleteSponsor = (id, eventId) => {
    API.deleteUser(id, eventId, () => {
        dispatch({
            type: REMOVE_SPONSOR,
            eventId: eventId
        })
    })
}

export const setEditSponsor = (sponsor) => {
    dispatch({
        type: EDIT_SPONSOR,
        currentSponsor: sponsor
    })
}

