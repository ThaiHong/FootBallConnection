import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux'; // we need this for react-router
import {listEvent, eventDetail, joinEventId, numberEvents, listParticipant} from './eventReducer'
import AppForm from './appForm';
import {auth} from './signInReducer';
import {categories} from './categoryReducer'
import {userInfo, myEvent, myEventsHome, updatePassword} from './userReducer'
import {userLogined} from './userLoginedReducer'
import {upComingTicket, passingTicket} from './ticketReducer'
import {liveEvents, passEvents, sizeOfLiveEvents, sizeOfPassEvents} from './myEventReducer'
import {addSponsor, sponsorList, updatedSponsor} from './sponsorReducer'
import {listEventSearched } from './searchReducer'
import {speaker} from './speakerReducer'
import {topic} from './scheduleReducer'
import {addCronSchedule, eventCrons} from './cronScheduleReducer'


const rootReducer = combineReducers({
    routing: routerReducer,
    AppForm: AppForm,
    auth,
    listEvent,
    listEventSearched,
    eventDetail,
    categories,
    userInfo,
    joinEventId,
    myEvent,
    myEventsHome,
    userLogined,
    addSponsor,
    numberEvents,
    sponsorList,
    updatedSponsor,
    speaker,
    listParticipant,
    upComingTicket,
    passingTicket,
    liveEvents,
    passEvents,
    topic,
    sizeOfLiveEvents,
    sizeOfPassEvents,
    addCronSchedule,
    eventCrons
});

export default rootReducer;
