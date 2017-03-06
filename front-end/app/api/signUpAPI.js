import axios from "axios";
import {APP_URL} from '../config/appConfig.js'
const BASE_URL = `${APP_URL}/api/users`;

export const signUpAccount = (account, cb, fcb) => {
    axios.post(BASE_URL, account)
        .then(function (response) {
            cb(response)
        })
        .catch(function (error) {
            fcb(error);
        });
}
