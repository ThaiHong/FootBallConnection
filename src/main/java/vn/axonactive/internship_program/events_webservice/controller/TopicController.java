package vn.axonactive.internship_program.events_webservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import vn.axonactive.internship_program.events_webservice.common.CommonMessageException;
import vn.axonactive.internship_program.events_webservice.common.UserUtils;
import vn.axonactive.internship_program.events_webservice.entity.Topic;
import vn.axonactive.internship_program.events_webservice.service.EnrollmentService;
import vn.axonactive.internship_program.events_webservice.service.EventService;
import vn.axonactive.internship_program.events_webservice.service.SpeakerService;
import vn.axonactive.internship_program.events_webservice.service.TopicService;

import javax.validation.Valid;
import java.io.IOException;
import java.util.Date;

/**
 * Created by phanvudinh on 1/4/2017.
 */
@RestController
@RequestMapping(value = "/api/topics")
public class TopicController {
    @Autowired
    private SpeakerService speakerService;

    @Autowired
    private EventService eventService;

    @Autowired
    private TopicService topicService;

    @Autowired
    private EnrollmentService enrollmentService;

    @PreAuthorize("hasRole('ADMIN') OR hasRole('USER')")
    @PostMapping(value = "/{eventId}")
    public ResponseEntity<?> create(@PathVariable long eventId, @Valid @RequestBody Topic topic) throws IOException {
//        if(result.hasErrors()) return new CommonMessageException().badRequest();
        if (this.enrollmentService.userOwnEvent(UserUtils.getIdByAuthorization(), eventId) == null) {
            return new ResponseEntity<Object>(CommonMessageException.forbidden(), HttpStatus.OK);
        }else {
            return new ResponseEntity<Object>(this.topicService.create(topic, eventId), HttpStatus.OK);
        }
    }

    @PreAuthorize("hasRole('ADMIN') OR hasRole('USER')")
    @GetMapping(value = "/{topicId}")
    public ResponseEntity<Object> getById(@PathVariable("topicId") long topicId) throws IOException {
        return new ResponseEntity<Object>(this.topicService.getById(topicId), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN') OR hasRole('USER')")
    @GetMapping(value = "/events/{eventId}")
    public ResponseEntity<Object> getTopicsByEventId(@PathVariable("eventId") long eventId) throws IOException {
        return new ResponseEntity<Object>(this.topicService.getTopicsByEventId(eventId), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN') OR hasRole('USER')")
    @DeleteMapping(value = "/{topicId}")
    public ResponseEntity<Object> delete(@PathVariable("topicId") long topicId) throws IOException {
        if(this.topicService.userOwnTopicByEvent(topicId,UserUtils.getIdByAuthorization()) == null){
            return new ResponseEntity<Object>(CommonMessageException.forbidden(), HttpStatus.OK);
        }else{
            this.topicService.delete(topicId);
            return new ResponseEntity<Object>(true, HttpStatus.OK);
        }
    }

    @PreAuthorize("hasRole('ADMIN') OR hasRole('USER')")
    @PutMapping(value = "/{topicId}")
    public ResponseEntity<?> update(@PathVariable("topicId") long topicId, @Valid @RequestBody Topic topic) throws IOException {
//        if(result.hasErrors()) return new CommonMessageException().badRequest();
        if(this.topicService.userOwnTopicByEvent(topicId,UserUtils.getIdByAuthorization()) == null){
            return new ResponseEntity<Object>(CommonMessageException.forbidden(), HttpStatus.OK);
        }else{
            return new ResponseEntity<Object>(this.topicService.update(topic, topicId), HttpStatus.OK);
        }
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping(value = "/max-date/{eventId}")
    public ResponseEntity<?> getMaxDateByEvent(@PathVariable Long eventId){
        Topic topic = this.topicService.getMaxDateTopicByEvent(eventId);
        if(topic != null){
            return new ResponseEntity<Date>(topic.getEndTime(), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<Object>("", HttpStatus.OK);
        }
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping(value = "/min-date/{eventId}")
    public ResponseEntity<?> getMinDateByEvent(@PathVariable Long eventId){
        Topic topic = this.topicService.getMinDateTopicByEvent(eventId);
        if(topic != null){
            return new ResponseEntity<Date>(topic.getStartTime(), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<Object>("", HttpStatus.OK);
        }
    }

}
