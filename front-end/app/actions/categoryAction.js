/**
 * Created by Admin on 12/24/2016.
 */
import {
    GET_ALL_CATEGORY,
} from '../constants'
import * as API from '../api/categoryAPI'
import {dispatch} from '../store'

export const getAllCategories = () => {
    API.getAllCategories(
        (cats) => {
            dispatch({
                type: GET_ALL_CATEGORY,
                cats: cats
            })
        })
}