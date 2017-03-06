import React from 'react';
import ReactDOM from 'react-dom';
import {validateUserLogined} from './actions/userLoginedAction'
import {getUpcomingEvents} from './actions/eventAction'
import {getAllCategories} from './actions/categoryAction'

// import App from './app'
import App from './app'
ReactDOM.render(
    <App />,
    document.getElementById('app'),
    function(){
        // getUpcomingEvents(10);
        validateUserLogined();
    }
)
