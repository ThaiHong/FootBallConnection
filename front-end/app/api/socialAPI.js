import axios from 'axios';
import {APP_URL} from '../config/appConfig.js'
import {userLogined, userNotLogined} from '../actions/userLoginedAction';
import {dispatch} from '../store'
import {getMyInfo} from './userAPI'

const BASE_URL = `${APP_URL}/api/`;

export const responseFacebook = (response)=> {
    $.blockUI(loading);
  axios.post(`${BASE_URL}social/fb`,{
        accessToken: response.accessToken
        }).then(function (response) {
          let data = response.data;
          if(data.status && data.status == 401){
            dispatch(userNotLogined());
          }else{
            let token = data.token;
            localStorage.setItem('token', token);
            $('#signInSignUpForm').modal('hide');
            getMyInfo(token, (res)=> {dispatch(userLogined(res));});
          }
      $.unblockUI();

  }).catch(function (error) {
          dispatch(userNotLogined());
      $.unblockUI();
  });
}

export const responseGoogle = (response)=>{
    $.blockUI(loading);
    axios.post(`${BASE_URL}social/gg`,{accessToken : response.tokenId})
        .then(function(response){
            let data = response.data;
            if(data.status && data.status == 401){
              dispatch(userNotLogined());
            }else{
            let token = data.token;
            localStorage.setItem('token', token);
            $('#signInSignUpForm').modal('hide');
            getMyInfo(token, (res)=> {
              getImageByURL(res.avatar);
              dispatch(userLogined(res));
            });
          }
            $.unblockUI();

        }).catch(function(error){
            dispatch(userNotLogined());
        $.unblockUI();

    });
}

export const getImageByURL = (url) => {
  axios.get(url,{
      headers: {
          "Access-Control-Allow-Origin": "*"
      }
  })
      .then(function (response) {
          console.log(response);
      })
      .catch(function (error) {
          console.log(error);
      });
}
