/**
 * Created by dctruc on 12/26/2016.
 */
import {
    JOIN_ERROR,
    JOIN_EVENT,
    JOIN_SUCCESS,
    GET_USER_DETAIL,
    GET_MY_EVENT,
    GET_MY_EVENT_HOME
} from '../constants'
import * as API from '../api/userAPI'
import {dispatch} from '../store'

export const updateUser = (user) => {
    console.log("Update User");
    API.updateJoin(user);
}

export const getUserDetail = () => {
    API.getUserDetail(
        (user)=>{
            dispatch({
                type: GET_USER_DETAIL,
                user: user
            })
        })
}

export const getMyEvents = () => {
    API.getMyEvents(
        (enrollments)=>{
            dispatch({
                type: GET_MY_EVENT,
                enrollments: enrollments
            })
        })
}

export const getMyEventsHomePage = () => {
    API.getMyEventsHomePage(
        (enrollments)=>{
            dispatch({
                type: GET_MY_EVENT_HOME,
                enrollments: enrollments
            })
        }
    )
}

export const updateProfile = (data) => {

    API.updateProfile(data,
        (res) => {

        }
    )

}

export const changeStatusOfAllEmailReminder = (status) => {

    API.changeStatusOfAllEmailReminder(status,
        (data) => {

        }
    )

}
