/**
 * Created by Admin on 12/24/2016.
 */
import axios from "axios";
import {APP_URL} from '../config/appConfig.js'
const BASE_URL = `${APP_URL}/api/categories`;

export const getAllCategories = (cb, fcb) => {
    axios(BASE_URL)
        .then(function (response) {
            cb(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
}
