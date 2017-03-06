/**
 * Created by pvdinh on 1/3/2017.
 */
import * as ActionConstants from '../constants';
import * as API from '../api/speakerAPI'
import {dispatch} from '../store'

export const getSpeakerByEventId = (eventId) => {
    API.getSpeakerByEventId(eventId,
        (response)=>{
            dispatch({
                type: ActionConstants.GET_ALL_SPEAKER_OF_EVENTS,
                speakerLists : response.data
            })
        }, (err) => console.log(err));
}
