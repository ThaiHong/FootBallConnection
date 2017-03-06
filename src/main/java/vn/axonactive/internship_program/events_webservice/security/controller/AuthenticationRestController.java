package vn.axonactive.internship_program.events_webservice.security.controller;

import org.apache.commons.lang.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import vn.axonactive.internship_program.events_webservice.common.CommonMessageException;
import vn.axonactive.internship_program.events_webservice.entity.User;
import vn.axonactive.internship_program.events_webservice.security.JwtAuthenticationRequest;
import vn.axonactive.internship_program.events_webservice.security.JwtAuthenticationResponse;
import vn.axonactive.internship_program.events_webservice.security.JwtTokenUtil;
import vn.axonactive.internship_program.events_webservice.service.EmailService;
import vn.axonactive.internship_program.events_webservice.service.UserService;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
public class AuthenticationRestController {


    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    private Map<String, String> oldUsing= new HashMap<>();

    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    @RequestMapping(value = "/auth/login", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@Valid @RequestBody JwtAuthenticationRequest authenticationRequest) throws AuthenticationException {
        // Validate Unauthorized

//        if(result.hasErrors()){
//            return new CommonMessageException().badRequest();
//        }

        User user = userService.findByAccountCode(authenticationRequest.getEmail());
        if(user == null || !passwordEncoder.matches(authenticationRequest.getPassword(),user.getPassword())){
            throw new AuthenticationCredentialsNotFoundException("Not Found Account");
        }
        final UserDetails userDetails = userDetailsService.loadUserByUsername(user.getAccountCode());
        final String token = this.jwtTokenUtil.generateToken(userDetails);
        return new ResponseEntity<Object>(new JwtAuthenticationResponse(token), HttpStatus.OK);
    }


    @RequestMapping(value = "/auth/forgotPassword", method = RequestMethod.POST)
    public ResponseEntity<?> createForgotPasswordToken(@Valid @RequestBody JwtAuthenticationRequest authenticationRequest) throws javax.naming.AuthenticationException {
        User user = userService.findByEmail(authenticationRequest.getEmail());
        if(user == null){
            return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);
        }

        String password= RandomStringUtils.randomAlphanumeric(10);
        final String token = this.jwtTokenUtil.generateToken(authenticationRequest.getEmail(),password,authenticationRequest.getUrlPath());

        try {
            emailService.sendForgotPasswordMail(authenticationRequest.getEmail(),user.getFullName(),password,authenticationRequest.getUrlPath()+"forgotPassword?token="+token);
        }catch( Exception e ){
            // catch error
            System.out.println("Error Sending Email: " + e.getMessage());
        }
        return new ResponseEntity<Object>(new JwtAuthenticationResponse(token), HttpStatus.OK);
    }

    @RequestMapping(value= "/forgotPassword",method = RequestMethod.GET)
    void generatePassword(HttpServletResponse response, @RequestParam("token") String token) throws IOException {
        String email=this.jwtTokenUtil.getEmailFromToken(token);
        String password=this.jwtTokenUtil.getPasswordFromToken(token);
        String urlPath=this.jwtTokenUtil.getUrlFromToken(token);

        if(email == null||password==null||urlPath==null || oldUsing.containsKey(email)){
            response.sendRedirect(urlPath+"?mod=login&act=fail");
        }
        else{
            oldUsing.put(email,token);
            User user = userService.findByAccountCode(email);
            user.setPassword(passwordEncoder.encode(password));
            userService.save(user);
            response.sendRedirect(urlPath+"?mod=login&act=success&email="+email);
        }
    }
}
