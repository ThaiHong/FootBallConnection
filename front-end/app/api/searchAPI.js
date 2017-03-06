/**
 * Created by dtnhat on 12/30/2016.
 */

import axios from "axios";
import {APP_URL} from '../config/appConfig.js'

const BASE_URL = `${APP_URL}/api/search`;

export const searchEvent = (keyword,cb, fcb) => {
    axios.get(BASE_URL+'/event-quick-search?keyword='+keyword)
        .then(function (response) {
            console.log("OK");
            cb(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
}

export const searchParticipant = (keyword,event_id,cb, fcb) => {
    axios.get(BASE_URL+'/participant-search?keyword='+keyword+'&event_id='+event_id)
        .then(function (response) {
            cb(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
}
