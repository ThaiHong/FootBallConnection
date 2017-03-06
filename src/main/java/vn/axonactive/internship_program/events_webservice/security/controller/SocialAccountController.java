package vn.axonactive.internship_program.events_webservice.security.controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.social.facebook.api.Facebook;
import org.springframework.social.facebook.api.impl.FacebookTemplate;
import org.springframework.social.google.api.Google;
import org.springframework.web.bind.annotation.*;
import vn.axonactive.internship_program.events_webservice.common.AccountTypeEnum;
import vn.axonactive.internship_program.events_webservice.entity.User;
import vn.axonactive.internship_program.events_webservice.security.JwtTokenUtil;
import vn.axonactive.internship_program.events_webservice.security.JwtAuthenticationResponse;
import vn.axonactive.internship_program.events_webservice.service.UserService;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.Map;

/**
 * Created by dtnhat on 12/20/2016.
 */
@RestController
@RequestMapping(value="/api/social")
public class SocialAccountController {

    private Facebook facebook;

    private Google google;

    private HttpTransport transport = new NetHttpTransport();

    private JacksonFactory jsonFactory = new JacksonFactory();

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @PostMapping(value="/fb")
    private ResponseEntity<?> signUpByFacebook (@RequestBody Map<String,String> data){

        String accessToken = data.get("accessToken");
        facebook = new FacebookTemplate(accessToken);
        String [] fields = { "id", "email","name","first_name", "last_name","gender","middle_name","cover","hometown","location" };
        org.springframework.social.facebook.api.User userSocial = facebook.fetchObject("me", org.springframework.social.facebook.api.User.class, fields);
        String email = userSocial.getEmail();
        String fbId = userSocial.getId();
        System.out.println("EMAIL FROM FACEBOOK"+ email + fbId);
        if(email != null && !email.isEmpty()){
            if(userService.findByAccountCode(email) != null){
                UserDetails userDetails = userDetailsService.loadUserByUsername(email);
                String token = this.jwtTokenUtil.generateToken(userDetails);
                return new ResponseEntity<Object>(new JwtAuthenticationResponse(token), HttpStatus.OK);
            }else{
                User user = new User();
                user.setAccountCode(email);
                user.setAccountType(AccountTypeEnum.FACEBOOK);
                user.setEmail(email);
                user.setGender(userSocial.getGender().equals("male")?0:1);
                user.setFullName(userSocial.getName());
                user.setAvatar("http://graph.facebook.com/"+userSocial.getId()+"/picture?type=square");
                User newUser = userService.create(user);
                UserDetails userDetails = userDetailsService.loadUserByUsername(newUser.getAccountCode());
                String token = this.jwtTokenUtil.generateToken(userDetails);
                return new ResponseEntity<Object>(new JwtAuthenticationResponse(token), HttpStatus.OK);
            }
        }else{
            if(userService.findByAccountCode(fbId) != null){
                UserDetails userDetails = userDetailsService.loadUserByUsername(fbId);
                String token = this.jwtTokenUtil.generateToken(userDetails);
                return new ResponseEntity<Object>(new JwtAuthenticationResponse(token), HttpStatus.OK);
            }else{
                User user = new User();
                user.setAccountCode(fbId);
                user.setAccountType(AccountTypeEnum.FACEBOOK);
                user.setGender(userSocial.getGender().equals("male")?0:1);
                user.setFullName(userSocial.getName());
                user.setAvatar("http://graph.facebook.com/"+userSocial.getId()+"/picture?type=square");
                User newUser = userService.create(user);
                UserDetails userDetails = userDetailsService.loadUserByUsername(newUser.getAccountCode());
                String token = this.jwtTokenUtil.generateToken(userDetails);
                return new ResponseEntity<Object>(new JwtAuthenticationResponse(token), HttpStatus.OK);
            }
        }
//            user.setFullName(userSocial.getFirstName() + " "+ userSocial.getMiddleName()+" "+userSocial.getLastName());
    }

    @PostMapping(value="/gg")
    private ResponseEntity<?> signUpByGoogle (@RequestBody Map<String,String> accessTokenClient){
        String accessToken = accessTokenClient.get("accessToken");
        String CLIENT_ID = "966314298950-7damarn9a509rvfi1uc7d7ed2mvc2eli.apps.googleusercontent.com";
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(this.transport, this.jsonFactory).setAudience(Collections.singletonList(CLIENT_ID)).build();

        UserDetails userDetails = null;
        String token = "";

        GoogleIdToken idToken = null;
        try {
            idToken = verifier.verify(accessToken);
        } catch (GeneralSecurityException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        if (idToken != null) {
            GoogleIdToken.Payload payload = idToken.getPayload();
            String userId = payload.getSubject();
            if(this.userService.findByAccountCode(payload.getEmail()) != null){
                userDetails = userDetailsService.loadUserByUsername(payload.getEmail());
                token = this.jwtTokenUtil.generateToken(userDetails);
            }else{
                User user = new User();
                user.setEmail(payload.getEmail());
                user.setAccountCode(payload.getEmail());
                user.setFullName((String) payload.get("name"));
                user.setAvatar((String) payload.get("picture"));
                user.setAccountType(AccountTypeEnum.GOOGLE);
                User newUser = this.userService.create(user);

                userDetails = userDetailsService.loadUserByUsername(newUser.getEmail());
                token = this.jwtTokenUtil.generateToken(userDetails);
//                System.out.println("User ID: " + userId);
//                String email = payload.getEmail();
//                boolean emailVerified = Boolean.valueOf(payload.getEmailVerified());
//                String name = (String) payload.get("name");
//                String pictureUrl = (String) payload.get("picture");
//                String locale = (String) payload.get("locale");
//                String familyName = (String) payload.get("family_name");
//                String givenName = (String) payload.get("given_name");
//                System.out.println(payload.getEmail());
            }
        }
        return new ResponseEntity<Object>(new JwtAuthenticationResponse(token), HttpStatus.OK);
    }
}
