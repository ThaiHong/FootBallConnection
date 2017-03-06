
// export const getAllUsers = () => {
//     API.fetchAllUsers(
//         (users) => {
//             dispatch({
//                 type: FETCH_ALL,
//                 users: users
//             })
//         })
// }

import GETALL_ROLE from '../constants'
import * as API from '../api/roleAPI'
import {dispatch} from '../store'

export const getAllRoles = () => {
    API.getAllRoles(
        (roles) => {
            dispatch({
                type: GETALL_ROLE,
                roles: roles
            })
        }
    )
}
