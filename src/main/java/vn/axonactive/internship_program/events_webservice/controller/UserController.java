package vn.axonactive.internship_program.events_webservice.controller;

import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mysql.jdbc.ConnectionProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import vn.axonactive.internship_program.events_webservice.common.AccountTypeEnum;
import vn.axonactive.internship_program.events_webservice.common.CommonMessageException;
import vn.axonactive.internship_program.events_webservice.common.UserUtils;
import vn.axonactive.internship_program.events_webservice.entity.Enrollment;
import vn.axonactive.internship_program.events_webservice.entity.Role;
import vn.axonactive.internship_program.events_webservice.entity.User;
import vn.axonactive.internship_program.events_webservice.security.JwtAuthenticationResponse;
import vn.axonactive.internship_program.events_webservice.security.JwtTokenUtil;
import vn.axonactive.internship_program.events_webservice.security.JwtUser;
import vn.axonactive.internship_program.events_webservice.service.*;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * Created by phanvudinh on 12/10/2016.
 */
@RestController
@RequestMapping(value = "/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private EnrollmentService enrollmentService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private ImageService imageService;

    @Value("${awesomeevent.domain}")
    private String domain;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<MappingJacksonValue> getAll() {
        List<User> users = userService.getAll();
        MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(users);
        FilterProvider filters = new SimpleFilterProvider()
                .addFilter("filter.User", SimpleBeanPropertyFilter
                        .serializeAllExcept("password"));
        return new ResponseEntity<MappingJacksonValue>(mappingJacksonValue, HttpStatus.OK);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping(value = "/{userId}")
    public ResponseEntity<MappingJacksonValue> getById(@PathVariable Long userId) {
        User user = userService.getById(userId);
        MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(user);
        FilterProvider filters = new SimpleFilterProvider()
                .addFilter("filter.User", SimpleBeanPropertyFilter
                        .serializeAllExcept("password"));
        mappingJacksonValue.setFilters(filters);
        return new ResponseEntity<MappingJacksonValue>(mappingJacksonValue, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<?> create(@Valid @RequestBody User user ) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

//      if(result.hasErrors()){
//            return new CommonMessageException().badRequest();
//       }

        user.setEmail(user.getEmail());
        user.setAccountCode(user.getEmail());
        user.setAvatar("http://www.exclutips.com/wp-content/uploads/2015/08/wordpress-custom-user-avatar.png");
        String password = passwordEncoder.encode(user.getPassword());
        user.setPassword(password);
        user.setAccountType(AccountTypeEnum.SYSTEM);
        User newUser = userService.create(user);
        String token = this.jwtTokenUtil.generateToken(this.userDetailsService.loadUserByUsername(user.getAccountCode()));
        emailService.sendWelcomeMailNewMember(newUser.getEmail(), newUser.getFullName());
        return new ResponseEntity<>(new JwtAuthenticationResponse(token), HttpStatus.OK);
    }


    @PreAuthorize("isAuthenticated()")
    @PutMapping(value = "/update")
    public ResponseEntity<?> updateProfile(@RequestPart("profile") String userObj, @RequestPart(name = "avatar", required = false) MultipartFile file) throws IOException {
        User user  = new ObjectMapper().readValue(userObj, User.class);
        long userId = UserUtils.getIdByAuthorization();
        if(userId != user.getId()){
            return new ResponseEntity<Object>(CommonMessageException.forbidden(), HttpStatus.OK);
        }else{
            if (file!=null && !file.isEmpty()){
                user.setAvatar(this.domain+"/images/avatars/"+ this.imageService.uploadImageUpdateUserProfileReturnImageName( file,this.userService.getById(userId).getAvatar()));
            }
            User updatedUser = this.userService.update(user);
            MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(updatedUser);
            FilterProvider filters = new SimpleFilterProvider()
                    .addFilter("filter.User", SimpleBeanPropertyFilter
                            .filterOutAllExcept("id", "fullName", "email", "rangeAge", "phone", "job","birthday"));
            mappingJacksonValue.setFilters(filters);
            return new ResponseEntity<Object>(mappingJacksonValue, HttpStatus.OK);
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping(value = "/{userId}")
    public void create(@PathVariable Long userId) {
        userService.delete(userId);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping(value = "/info")
    public ResponseEntity<?> infor() {
        User user = this.userService.findByAccountCode(UserUtils.getAccountCodeByAuthorization());
        MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(user);
        FilterProvider filters = new SimpleFilterProvider()
                .addFilter("filter.User", SimpleBeanPropertyFilter
                        .serializeAllExcept("password"));
        mappingJacksonValue.setFilters(filters);
        return new ResponseEntity<Object>(mappingJacksonValue, HttpStatus.OK);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping(value = "/my-event")
    public ResponseEntity<MappingJacksonValue> getMyEvent() {
        String accountCode = SecurityContextHolder.getContext().getAuthentication().getName();
        List<Enrollment> enrollments = userService.getAllEnrollmentsByUserId(this.userService.findByAccountCode(accountCode).getId());
        MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(enrollments);
        FilterProvider filters = new SimpleFilterProvider()
                .addFilter("filter.Enrollment", SimpleBeanPropertyFilter
                        .filterOutAllExcept("event", "type"))
                .addFilter("filter.Event", SimpleBeanPropertyFilter
                        .filterOutAllExcept("id"));
        mappingJacksonValue.setFilters(filters);
        return new ResponseEntity<MappingJacksonValue>(mappingJacksonValue, HttpStatus.OK);
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping(value = "/update-join")
    public ResponseEntity<?> updateJoin(@RequestBody User user) {
        User updatedUser = userService.update(user);
        MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(updatedUser);
        FilterProvider filters = new SimpleFilterProvider()
                .addFilter("filter.User", SimpleBeanPropertyFilter
                        .filterOutAllExcept("id", "fullName", "email", "rangeAge", "phone", "job"));
        mappingJacksonValue.setFilters(filters);
        return new ResponseEntity<MappingJacksonValue>(mappingJacksonValue, HttpStatus.OK);
    }

    @PostMapping("/all-email-reminder")
    public ResponseEntity<Integer> changeStatusOfAllEmailReminder(@Valid @RequestBody Map<String, Long> data) {

        String accountCode = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByAccountCode(accountCode);
        if (user == null) {
            return new ResponseEntity<Integer>(-1, HttpStatus.FORBIDDEN);
        }

        int status = data.get("status").intValue();

        userService.changeStatusOfAllEmailReminder(user.getId(), status);

        return new ResponseEntity<Integer>(HttpStatus.OK);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping(value = "/profile/changePassword")
    public ResponseEntity<?> changePassword(@Valid @RequestBody Map<String, String> passwordMap) {
//        if(result.hasErrors()){
//            return new CommonMessageException().badRequest();
//        }
        String currentPassword = passwordMap.get("currentPassword");
        String newPassword = passwordMap.get("newPassword");
        String confirmPassword = passwordMap.get("confirmPassword");
        System.out.println(currentPassword);

        String accountCode = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByAccountCode(accountCode);
        System.out.println("system current password" + user.getPassword());
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        if (passwordEncoder.matches(currentPassword, user.getPassword())) {
            if (newPassword != null && confirmPassword != null && newPassword.equals(confirmPassword)) {
                user.setPassword(passwordEncoder.encode(newPassword));
                userService.updatePassword(user);
                return new ResponseEntity<Object>("Change password successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<Object>("Confirmed password doesn't match new password", HttpStatus.BAD_REQUEST);
            }

        } else {
            return new ResponseEntity<Object>("Current password is not correct", HttpStatus.BAD_REQUEST);
        }

    }

}