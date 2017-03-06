package vn.axonactive.internship_program.events_webservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.security.access.method.P;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import vn.axonactive.internship_program.events_webservice.common.CommonMessageException;
import vn.axonactive.internship_program.events_webservice.common.CommonPath;
import vn.axonactive.internship_program.events_webservice.common.PixelCrop;
import vn.axonactive.internship_program.events_webservice.common.UserUtils;
import vn.axonactive.internship_program.events_webservice.entity.Enrollment;
import vn.axonactive.internship_program.events_webservice.entity.Event;
import vn.axonactive.internship_program.events_webservice.entity.User;
import vn.axonactive.internship_program.events_webservice.service.*;

import javax.validation.Valid;
import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Objects;

/**
 * Created by dtnhat on 12/22/2016.
 */
@RestController
@RequestMapping(value = "api/event")
public class EventController {

    @Autowired
    private EventService eventService;

    @Autowired
    private EnrollmentService enrollmentService;

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private ImageService imageService;

    @PreAuthorize("isAuthenticated()")
    @PostMapping(value = "/quick")
    public ResponseEntity<?> createEventQuickly(@Valid @RequestBody Event event ) {
//        if(result.hasErrors()) return new CommonMessageException().badRequest();
        Event createdEvent = eventService.createEventQuickly(event);
        if (createdEvent == null) {
            return new ResponseEntity<Object>("cant create event", HttpStatus.EXPECTATION_FAILED);
        } else {
            return new ResponseEntity<Object>(createdEvent.getId(), HttpStatus.CREATED);
        }
    }

    @GetMapping("/live/{num}")
    public ResponseEntity<MappingJacksonValue> getListLiveEventByUserId(@PathVariable Integer num) {

        String accountCode = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByAccountCode(accountCode);
        if (user == null) {
            return new ResponseEntity<MappingJacksonValue>(new MappingJacksonValue(null), HttpStatus.FORBIDDEN);
        }

        Long id = user.getId();

        MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(eventService.getListLiveEventByUserId(id, num));
        FilterProvider filters = new SimpleFilterProvider()
                .addFilter("filter.Event", SimpleBeanPropertyFilter
                        .filterOutAllExcept("id", "title", "imageCover", "location", "startDate",
                                "address", "endDate", "description", "longitude", "latitude","status"));
        mappingJacksonValue.setFilters(filters);

        return new ResponseEntity<MappingJacksonValue>(mappingJacksonValue, HttpStatus.OK);

    }

    @GetMapping("/live/size")
    public ResponseEntity<Integer> getSizeOfListLiveEventByUserId() {

        String accountCode = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByAccountCode(accountCode);
        if (user == null) {
            return new ResponseEntity<Integer>(0, HttpStatus.FORBIDDEN);
        }

        Long id = user.getId();

        return new ResponseEntity<Integer>(eventService.getSizeOfListLiveEventByUserId(id), HttpStatus.OK);

    }

    @GetMapping("/pass/{num}")
    public ResponseEntity<MappingJacksonValue> getListPassEventByUserId(@PathVariable Integer num) {

        String accountCode = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByAccountCode(accountCode);
        if (user == null) {
            return new ResponseEntity<MappingJacksonValue>(new MappingJacksonValue(null), HttpStatus.FORBIDDEN);
        }

        Long id = user.getId();

        MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(eventService.getListPassEventByUserId(id, num));
        FilterProvider filters = new SimpleFilterProvider()
                .addFilter("filter.Event", SimpleBeanPropertyFilter
                        .filterOutAllExcept("id", "title", "imageCover", "location", "startDate",
                                "address", "endDate","status"));
        mappingJacksonValue.setFilters(filters);

        return new ResponseEntity<MappingJacksonValue>(mappingJacksonValue, HttpStatus.OK);

    }

    @GetMapping("/pass/size")
    public ResponseEntity<Integer> getSizeOfListPassEventByUserId() {

        String accountCode = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByAccountCode(accountCode);
        if (user == null) {
            return new ResponseEntity<Integer>(0, HttpStatus.FORBIDDEN);
        }

        Long id = user.getId();

        return new ResponseEntity<Integer>(eventService.getSizeOfListPassEventByUserId(id), HttpStatus.OK);

    }

    @GetMapping("/{eventId}/status/{status}")
    public ResponseEntity<Integer> updateStatusEventByUserId(@PathVariable Long eventId, @PathVariable Integer status) {

        String accountCode = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userService.findByAccountCode(accountCode);
        if (user == null) {
            return new ResponseEntity<Integer>(-1, HttpStatus.FORBIDDEN);
        }

        Integer sts = eventService.updateStatusEventByEventId(eventId, status).getStatus();

        List<String> receptors = userService.getListUserByEventId(eventId);
        String owner = userService.getUserOwnerByEventId(eventId);

        if (receptors.size() > 0) {
            if (status == 0) {
                emailService.sendEmailCancelEvent(receptors, owner, eventId);
            } else if (status == 1) {
                emailService.sendEmailReOpenEvent(receptors, owner, eventId);
            }
        }
        return new ResponseEntity<Integer>(sts, HttpStatus.OK);

    }

//    @GetMapping
//    public ResponseEntity<List<Event>> getAll() {
//        return new ResponseEntity<List<Event>>(eventService.getAll(), HttpStatus.OK);
//    }
    @GetMapping(value = "/{latitude}/{longitude}/{num}")
    public ResponseEntity<MappingJacksonValue> getNearByEvents(@PathVariable Double latitude,
                                                               @PathVariable Double longitude, @PathVariable int num){
        List<Event> events = eventService.getNearByEvents(latitude, longitude, num);

        MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(events);
        FilterProvider filters = new SimpleFilterProvider()
                .addFilter("filter.Event", SimpleBeanPropertyFilter
                        .filterOutAllExcept("id", "title", "imageCover", "location", "startDate", "address"));
        mappingJacksonValue.setFilters(filters);

        return new ResponseEntity<MappingJacksonValue>(mappingJacksonValue, HttpStatus.OK);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping(value = "/{eventId}/check-join")
    public ResponseEntity<?> checkEventJoinedByUserToken(@PathVariable Long eventId){
        User user = this.userService.findByAccountCode(UserUtils.getAccountCodeByAuthorization());
        int status = this.enrollmentService.checkStatusUserEvent(user.getId(), eventId);
        return new ResponseEntity<Integer>(status, HttpStatus.OK);
    }

    @GetMapping(value = "/{eventId}")
    public ResponseEntity<MappingJacksonValue> getEventDetail(@PathVariable Long eventId) {

        Event event = eventService.getEventDetail(eventId);

        MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(event);
        FilterProvider filters = new SimpleFilterProvider()
                .addFilter("filter.Event", SimpleBeanPropertyFilter
                        .serializeAll());
        mappingJacksonValue.setFilters(filters);

        if (event == null) {
            return new ResponseEntity<MappingJacksonValue>(mappingJacksonValue, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<MappingJacksonValue>(mappingJacksonValue, HttpStatus.OK);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping(value = "/update", consumes = {"multipart/form-data"})
    public ResponseEntity<MappingJacksonValue> updateEvent(@RequestPart("event") String event, @RequestPart(name="pixelCrop", required = false) String pixelCrop,
                                                           @RequestPart(name="imgCover", required = false) MultipartFile file) throws IOException, URISyntaxException, IOException {
        Event newEvent = new ObjectMapper().readValue(event, Event.class);
        if (file!=null && !file.isEmpty()){
            System.out.println("alkjfdlkjaldkjflk");
            PixelCrop pixelCropObj = new ObjectMapper().readValue(pixelCrop, PixelCrop.class);
            newEvent.setImageCover("/images/events/"+ imageService.uploadImageEventReturnImageName(file,newEvent.getId(),pixelCropObj));
        }

        Event updatedEvent = eventService.updateEvent(newEvent);
        MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(updatedEvent);
        FilterProvider filters = new SimpleFilterProvider()
                .addFilter("filter.Event", SimpleBeanPropertyFilter
                        .filterOutAllExcept("id", "title"));
        mappingJacksonValue.setFilters(filters);
        if (updatedEvent != null)
            return new ResponseEntity<MappingJacksonValue>(mappingJacksonValue, HttpStatus.OK);
        else
            return new ResponseEntity<MappingJacksonValue>(mappingJacksonValue, HttpStatus.EXPECTATION_FAILED);
    }

    @GetMapping(value = "/upcoming/{num}")
    public ResponseEntity<MappingJacksonValue> getUpcomingEvents(@PathVariable Long num) {

        List<Event> events = eventService.getUpcomingEvents(num);

        MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(events);
        FilterProvider filters = new SimpleFilterProvider()
                .addFilter("filter.Event", SimpleBeanPropertyFilter
                        .filterOutAllExcept("id", "title", "imageCover", "location", "startDate", "address"));
        mappingJacksonValue.setFilters(filters);

        return new ResponseEntity<MappingJacksonValue>(mappingJacksonValue, HttpStatus.OK);
    }

    @GetMapping(value = "/slide-show")
    public ResponseEntity<MappingJacksonValue> getSlideShow() {
        List<Event> events = eventService.getAllEventSlideShow();
        MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(events);
        FilterProvider filters = new SimpleFilterProvider()
                .addFilter("filter.Event", SimpleBeanPropertyFilter
                        .filterOutAllExcept("id", "imageCover"));
        mappingJacksonValue.setFilters(filters);
        return new ResponseEntity<MappingJacksonValue>(mappingJacksonValue, HttpStatus.OK);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping(value = "/created/{eventId}")
    public ResponseEntity<MappingJacksonValue> createdEvent(@PathVariable Long eventId) {
        Event createdEvent = eventService.getCreatedEvent(eventId);
        MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(createdEvent);
        FilterProvider filters = new SimpleFilterProvider()
                .addFilter("filter.Event", SimpleBeanPropertyFilter
                        .filterOutAllExcept("id", "title", "imageCover", "location", "startDate",
                                "address", "endDate", "description", "longitude", "latitude", "categories"
                                ));
        mappingJacksonValue.setFilters(filters);
        if (createdEvent != null) {
            return new ResponseEntity<MappingJacksonValue>(mappingJacksonValue, HttpStatus.OK);
        } else {
            return new ResponseEntity<MappingJacksonValue>(mappingJacksonValue, HttpStatus.EXPECTATION_FAILED);
        }
    }

    @GetMapping(value = "/{eventId}/title")
    public ResponseEntity<String> getEventTitle(@PathVariable Long eventId){
        Event event = eventService.getEventDetail(eventId);
        if(event !=null ){
            return new ResponseEntity<String>(event.getTitle(), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<String>("error", HttpStatus.EXPECTATION_FAILED);
        }
    }
}
