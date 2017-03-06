//  Import Dependencies
import React from 'react';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute} from 'react-router';
import store, {history} from './store';
//  Import Components
import Main from './components/main';
import HomePageContainer from './containers/homePageContainer'
import EventDetailContainer from './containers/eventDetailContainer'

import EventManageComponent from './components/event-manage/eventManageComponent'
import SpeakerComponent from './components/event-manage/speakerComponent';
import ScheduleComponent from './components/event-manage/scheduleComponent'
import MainEventManageComponent from  './components/event-manage/mainEventManageComponent'
import EventManageContainer from './containers/event-manage/eventManageContainer'
import SpeakerContainer from './containers/event-manage/speakerContainer';
import ScheduleContainer from './containers/event-manage/scheduleContainer'

import AddSponsorContainer from './containers/addSponsorContainer'
import AddSponsorComponent from './components/addSponsorComponent'
import DetailCreateContainer from './containers/detailCreateContainer'
import MyListTicketContainer from './containers/listTicketContainer'
import Error404 from './components/error404Component'
import cropImage from './components/cropImage'
import ErrorSomethingwrong  from './components/errorSomethingWrongComponent'
import ListParticipantContainer from './containers/listParticipantContainer'

import SponsorContainer from './containers/event-manage/sponsorContainer';
import ProfileContainer from './containers/profileContainer';
import MyEventContainer from './containers/myEventContainer'
import RemindContainer from './containers/event-manage/remindContainer'
import UploadImageTest from './components/uploadImageTest'


//  Import CSS
require("style-loader!css-loader!./styles/event-manage.css");
require("style-loader!css-loader!./styles/ReactCrop.css");
require("style-loader!css-loader!./styles/crop-component.css");


//Import js

//  Import SCSS
require("!style-loader!css-loader!sass-loader!./scss/tab.scss");


const app = () => (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={Main}>
                <IndexRoute component={HomePageContainer}> </IndexRoute>
                <Route path="/my-ticket" components={MyListTicketContainer}/>
                <Route path="/my-profile" components={ProfileContainer} />
                <Route path="/my-event" components={MyEventContainer} />
                <Route path="/cropImage" components={cropImage}/>
                <Route path="/testUpload" components={UploadImageTest}/>
                <Route path="/404" components={Error404}/>
                <Route path="/access-denied" components={ErrorSomethingwrong}/>
                <Route path = "event/:eventId" component = {EventDetailContainer}/>
                <Route path = "event/:eventId/participants" component={ListParticipantContainer} />
                <Route path = "event/:eventId/manage" component = {EventManageContainer}>
                    <IndexRoute component={MainEventManageComponent} />
                    <Route path = "description" component = {DetailCreateContainer}/>
                    <Route path = "speaker" component = {SpeakerContainer}/>
                     <Route path="schedule" component={ScheduleContainer}/>
                    <Route path = "sponsor" component = {SponsorContainer}/>
                    <Route path = "remind" component = {RemindContainer}/>
                </Route>
                <Route path="/*" components={Error404}/>
            </Route>
        </Router>
    </Provider>
)

export default app;
