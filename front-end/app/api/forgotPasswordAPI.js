/**
 * Created by tthong on 12/27/2016.
 */
import axios from "axios";
import {APP_URL} from '../config/appConfig.js'
import { dispatch } from '../store'

export const forgotPassword = (data, cb,  fcb) => {
    axios.post(APP_URL+"/auth/forgotPassword", data)
        .then(function (response) {
            cb(response.data);
        })
        .catch(function (error) {
            fcb(error);
        });

};
