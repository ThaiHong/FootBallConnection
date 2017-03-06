/**
 * Created by pvdinh on 12/27/2016.
 */
import {
    USER_LOGINED,
    USER_NOT_LOGINED
} from '../constants'
import { dispatch } from '../store'
import {getMyInfo} from '../api/userAPI'
export const userLogined = (user) => {
  return {
    type: USER_LOGINED,
    user: user
  }
};

export const userNotLogined = () => {
  return {
    type: USER_NOT_LOGINED
  }
};

export const validateUserLogined = () => {
  let token = localStorage.getItem('token');
  if(token != null) {
    getMyInfo(token, (res) => {
      if(res.status && res.status === 401){
        dispatch(userNotLogined());
      }
      else if (res != null) {
        dispatch(userLogined(res));
      } else {
        dispatch(userNotLogined());
      }
    });
  }
};
