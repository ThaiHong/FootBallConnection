/**
 * Created by dtnha on 12/30/2016.
 */
import * as API from '../api/searchAPI'
import {dispatch} from '../store'
import {
    QUICK_SEARCH,
    LIST_PARTICIPANT_SEARCHED
} from '../constants/index'
export const searchEventByKeyword = (keyword)=>{
    API.searchEvent(keyword,(events)=>{
        console.log(events);
        dispatch({
            type: QUICK_SEARCH,
            listEventSearched: events
        })
    })
}

export const searchEnrollmentsByKeywordAndEventId = (keyword,event_id)=>{
    API.searchParticipant(keyword,event_id,(enrollments) =>{
        dispatch({
            type: LIST_PARTICIPANT_SEARCHED,
            enrollmentsSearched: enrollments
        })
    })
}