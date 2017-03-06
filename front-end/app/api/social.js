/**
 * Created by nmtri on 12/22/2016.
 */
import axios from 'axios';
import {APP_URL} from '../config/appConfig.js'

export const responseFacebook = (response)=>{

  axios.post(`${APP_URL}/api/social/fb`,
       {
          accessToken: response.accessToken,
          avatarUrl: response.picture.data.url
       }).then(function(response){
           console.log(response);

       }).catch(function(error){
           console.log(error);
       });
}

export const responseGoogle = (response)=>{

    axios.post(`${APP_URL}/api/social/gg`,response.profileObj)
        .then(function(response){
            console.log(response);

        }).catch(function(error){
        console.log(error);
    });
}
