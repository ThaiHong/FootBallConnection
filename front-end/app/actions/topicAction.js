/**
 * Created by phanvudinh on 1/4/2017.
 */
import * as ActionConstants from '../constants';
import * as API from '../api/topicAPI'
import {dispatch} from '../store'

export const getTopicsByEventId = (eventId) => {
    API.getTopicsByEventId(eventId,
        (response)=>{
            dispatch({
                type: ActionConstants.GET_ALL_TOPIC_OF_EVENTS,
                topicLists : response.data
            })
        }, (err) => console.log(err));
}
