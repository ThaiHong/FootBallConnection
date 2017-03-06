/**
 * Created by tthong on 12/27/2016.
 */
import {FORGOT_PASSWORD} from '../constants'
import * as API from '../api/forgotPasswordAPI'
import {dispatch} from '../store'

export const forgotPassword = (data,cb,fcb) => {
    API.forgotPassword(data,
        (res) => {
            dispatch({
                type: FORGOT_PASSWORD,
                //this is message
            })
        }, fcb
    )
}