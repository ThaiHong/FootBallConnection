package vn.axonactive.internship_program.events_webservice.controller;

import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import vn.axonactive.internship_program.events_webservice.common.CommonMessageException;
import vn.axonactive.internship_program.events_webservice.common.UserUtils;
import vn.axonactive.internship_program.events_webservice.entity.Enrollment;
import vn.axonactive.internship_program.events_webservice.entity.EnrollmentPK;
import vn.axonactive.internship_program.events_webservice.entity.User;
import vn.axonactive.internship_program.events_webservice.service.EnrollmentService;
import vn.axonactive.internship_program.events_webservice.service.UserService;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

/**
 * Created by dctruc on 12/26/2016.
 */
@RestController
@RequestMapping(value = "api/enrollments")
public class EnrollmentController {

    @Autowired
    EnrollmentService enrollmentService;

    @Autowired
    UserService userService;

    @PreAuthorize("isAuthenticated()")
    @PostMapping(value = "/join")
    public ResponseEntity<?> becomeParticipant(@Valid @RequestBody EnrollmentPK enrollmentPK) {

        String accountCode = SecurityContextHolder.getContext().getAuthentication().getName();
//        if(result.hasErrors()) return new CommonMessageException().badRequest();
        enrollmentPK.setUser(userService.findByAccountCode(accountCode).getId());

        Enrollment enrollment = enrollmentService.becomeParticipant(enrollmentPK);

        MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(enrollment);
        FilterProvider filters = new SimpleFilterProvider()
                .addFilter("filter.Enrollment", SimpleBeanPropertyFilter
                        .filterOutAllExcept("type", "authorizationCode", "checkIn", "confirm"));
        mappingJacksonValue.setFilters(filters);

        if (enrollment == null) {
            return new ResponseEntity<MappingJacksonValue>(mappingJacksonValue, HttpStatus.EXPECTATION_FAILED);
        } else {
            return new ResponseEntity<MappingJacksonValue>(mappingJacksonValue, HttpStatus.CREATED);
        }
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping(value = "/{eventId}/list-participants")
    public ResponseEntity<MappingJacksonValue> getListParticipant(@PathVariable Long eventId) {
        List<Enrollment> enrollments = enrollmentService.getEnrollmentsByEvent(eventId);

        MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(enrollments);
        FilterProvider filters = new SimpleFilterProvider()
                .addFilter("filter.Enrollment", SimpleBeanPropertyFilter
                        .filterOutAllExcept("user", "authorizationCode", "checkIn", "confirm"))
                .addFilter("filter.User", SimpleBeanPropertyFilter
                        .filterOutAllExcept("id", "fullName", "email", "rangeAge", "phone", "job"));
        mappingJacksonValue.setFilters(filters);

        return new ResponseEntity<MappingJacksonValue>(mappingJacksonValue, HttpStatus.OK);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping(value = "/{eventId}/list-participants/{start}/{num}")
    public ResponseEntity<MappingJacksonValue> getListParticipantRange(@PathVariable Long eventId, @PathVariable int start, @PathVariable int num) {
        List<Enrollment> enrollments = enrollmentService.getEnrollmentsByEventRange(eventId, start, num);
        MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(enrollments);
        FilterProvider filters = new SimpleFilterProvider()
                .addFilter("filter.Enrollment", SimpleBeanPropertyFilter
                        .filterOutAllExcept("user", "authorizationCode", "checkIn", "confirm"))
                .addFilter("filter.User", SimpleBeanPropertyFilter
                        .filterOutAllExcept("id", "fullName", "email", "rangeAge", "phone", "job"));
        mappingJacksonValue.setFilters(filters);

        if(enrollments!=null) {
            return new ResponseEntity<MappingJacksonValue>(mappingJacksonValue, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<MappingJacksonValue>(mappingJacksonValue, HttpStatus.EXPECTATION_FAILED);
        }
    }

    @GetMapping("/up-coming/{num}")
    public ResponseEntity<MappingJacksonValue> getUpcomingTicket(@PathVariable int num) {

        String accountCode = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByAccountCode(accountCode);
        if (user == null) {
            return new ResponseEntity<MappingJacksonValue>(new MappingJacksonValue(null), HttpStatus.FORBIDDEN);
        }

        Long id = user.getId();
        System.out.println("ID: " + id);

        List<Enrollment> enrollments = enrollmentService.getUpComingTicket(id, num);
        MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(enrollments);
        FilterProvider filters = new SimpleFilterProvider()
                .addFilter("filter.Enrollment", SimpleBeanPropertyFilter
                        .filterOutAllExcept("event", "user", "type", "authorizationCode", "optionalEmailReminder","enrollDate"))
                .addFilter("filter.Event", SimpleBeanPropertyFilter
                        .filterOutAllExcept("id", "title", "imageCover", "startDate", "location", "endDate"))
                .addFilter("filter.User", SimpleBeanPropertyFilter
                        .filterOutAllExcept("id", "fullName", "email"));

        mappingJacksonValue.setFilters(filters);

        return new ResponseEntity<MappingJacksonValue>(mappingJacksonValue, HttpStatus.OK);
    }

    @GetMapping("/passing/{num}")
    public ResponseEntity<MappingJacksonValue> getPassingTicket(@PathVariable int num) {

        String accountCode = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByAccountCode(accountCode);
        if (user == null) {
            return new ResponseEntity<MappingJacksonValue>(new MappingJacksonValue(null), HttpStatus.FORBIDDEN);
        }

        Long id = user.getId();
        System.out.println("ID: " + id);
        List<Enrollment> enrollments = enrollmentService.getPassingTicket(id, num);
        MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(enrollments);
        FilterProvider filters = new SimpleFilterProvider()
                .addFilter("filter.Enrollment", SimpleBeanPropertyFilter
                        .filterOutAllExcept("event", "user", "type", "authorizationCode", "optionalEmailReminder","enrollDate"))
                .addFilter("filter.Event", SimpleBeanPropertyFilter
                        .filterOutAllExcept("id", "title", "imageCover", "startDate", "location", "endDate"))
                .addFilter("filter.User", SimpleBeanPropertyFilter
                        .filterOutAllExcept("id", "fullName", "email"));
        mappingJacksonValue.setFilters(filters);

        return new ResponseEntity<MappingJacksonValue>(mappingJacksonValue, HttpStatus.OK);
    }

    @PostMapping("/email-reminder")
    public ResponseEntity<?> changeStatusOfEmailReminder(@Valid @RequestBody Map<String, Long> data) {

        String accountCode = SecurityContextHolder.getContext().getAuthentication().getName();
//        if(result.hasErrors()) return new CommonMessageException().badRequest();
        User user = userService.findByAccountCode(accountCode);
        if (user == null) {
            return new ResponseEntity<Integer>(-1, HttpStatus.FORBIDDEN);
        }

        Long eventId = data.get("eventId");

        int status = data.get("status").intValue();

        enrollmentService.changeStatusOfEmailReminder(eventId, user.getId(), status);
        return new ResponseEntity<Integer>(HttpStatus.OK);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/find-user")
    public ResponseEntity<?> getUserByEnrollmentPK(@Valid @RequestBody EnrollmentPK enrollmentPK) {
        Enrollment enrollment = enrollmentService.getEnrollmentByEventAndUser(enrollmentPK);
//        if(result.hasErrors()) return new CommonMessageException().badRequest();
        MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(enrollment);
        FilterProvider filters = new SimpleFilterProvider()
                .addFilter("filter.Enrollment", SimpleBeanPropertyFilter
                        .filterOutAllExcept("user", "authorizationCode", "checkIn", "confirm"))
                .addFilter("filter.User", SimpleBeanPropertyFilter
                        .filterOutAllExcept("id", "fullName", "email", "rangeAge", "phone", "job"));
        mappingJacksonValue.setFilters(filters);

        if (enrollment == null) {
            return new ResponseEntity<MappingJacksonValue>(mappingJacksonValue, HttpStatus.EXPECTATION_FAILED);
        } else {
            return new ResponseEntity<MappingJacksonValue>(mappingJacksonValue, HttpStatus.OK);
        }
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/{eventId}/qrcode")
    public ResponseEntity<?> getQRCodeByEventAndUser(@PathVariable Long eventId){
        User user = this.userService.findByAccountCode(UserUtils.getAccountCodeByAuthorization());
        String code = enrollmentService.getQRCodeByEventAndUser(eventId, user.getId());
        if(code !=null ){
            return new ResponseEntity<String>(code, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<String>("", HttpStatus.NOT_FOUND);
        }
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping(value = "/my-event-home")
    public ResponseEntity<MappingJacksonValue> getMyEvent() {
        String accountCode = SecurityContextHolder.getContext().getAuthentication().getName();
        List<Enrollment> enrollments = enrollmentService.findMyEvent(this.userService.findByAccountCode(accountCode).getId());
        MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(enrollments);
        FilterProvider filters = new SimpleFilterProvider()
                .addFilter("filter.Enrollment", SimpleBeanPropertyFilter
                        .filterOutAllExcept("event", "type"))
                .addFilter("filter.Event", SimpleBeanPropertyFilter
                        .filterOutAllExcept("id", "title", "imageCover", "startDate", "location"));
        mappingJacksonValue.setFilters(filters);
        return new ResponseEntity<MappingJacksonValue>(mappingJacksonValue, HttpStatus.OK);
    }

}
