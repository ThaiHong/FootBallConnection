/**
 * Created by XuanVinh on 1/2/2017.
 */
import{
    ADD_SPONSOR,
    GET_SPONSORS,
    REMOVE_SPONSOR,
    EDIT_SPONSOR
} from '../constants'
import {getSponsors} from "../actions/sponsorAction"

export const addSponsor = (state=[], action) => {
    switch (action.type){
        case ADD_SPONSOR:
            getSponsors(action.eventId)
            return action.sponsor;
        case REMOVE_SPONSOR:
            getSponsors(action.eventId)
            return state;
        default:
            return state;
    }
};


export const sponsorList = (state=[], action)=>{
    switch(action.type){
        case GET_SPONSORS:
            return action.sponsors;
        default:
            return state;
    }
}

export const updatedSponsor = (state=[],action)=>{
    switch (action.type){
        case EDIT_SPONSOR:
            getSponsors(action.eventId)
            return action.sponsor;
        default:
            return state;
    }
}

