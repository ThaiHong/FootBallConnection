/**
 * Created by pvdinh on 12/27/2016.
 */
import { dispatch } from '../store'
import {userNotLogined} from './userLoginedAction'

export const handleExpiredToken = (data, callBack) => {
  if(data.status && data.status === 401){
    callBack();
  }
};
