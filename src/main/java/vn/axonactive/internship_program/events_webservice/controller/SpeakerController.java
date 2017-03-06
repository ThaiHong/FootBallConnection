package vn.axonactive.internship_program.events_webservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import vn.axonactive.internship_program.events_webservice.common.CommonMessageException;
import vn.axonactive.internship_program.events_webservice.common.UserUtils;
import vn.axonactive.internship_program.events_webservice.entity.Speaker;
import vn.axonactive.internship_program.events_webservice.service.EnrollmentService;
import vn.axonactive.internship_program.events_webservice.service.EventService;
import vn.axonactive.internship_program.events_webservice.service.ImageService;
import vn.axonactive.internship_program.events_webservice.service.SpeakerService;

import java.io.IOException;

/**
 * Created by phanvudinh on 1/2/2017.
 */
@RestController
@RequestMapping(value = "/api/speakers")
public class SpeakerController {
    @Autowired
    private SpeakerService speakerService;

    @Autowired
    private EventService eventService;

    @Autowired
    private EnrollmentService enrollmentService;

    @Autowired
    private ImageService imageService;

    @Value("${awesomeevent.domain}")
    private String domain;

    @PreAuthorize("hasRole('ADMIN') OR hasRole('USER')")
    @PostMapping(value = "/{eventId}")
    public ResponseEntity<Object> create(@RequestPart("speaker") String speaker,
                                         @RequestPart(name = "avatar", required = false) MultipartFile file,
                                         @PathVariable("eventId") long eventId) throws IOException {
        if (this.enrollmentService.userOwnEvent(UserUtils.getIdByAuthorization(), eventId) == null) {
            return new ResponseEntity<Object>(CommonMessageException.forbidden(), HttpStatus.OK);
        }else{
            Speaker newSpeaker = new ObjectMapper().readValue(speaker, Speaker.class);
            if (file!=null && !file.isEmpty()){
                newSpeaker.setAvatar(this.domain+"/images/speakers/"+ this.imageService.uploadImageCreateSpeakerReturnImageName(file));
            }
            newSpeaker.setEvent(this.eventService.getEventDetail(eventId));
            return new ResponseEntity<Object>(this.speakerService.create(newSpeaker), HttpStatus.OK);
        }
    }

    @PreAuthorize("hasRole('ADMIN') OR hasRole('USER')")
    @GetMapping(value = "/{speakerId}")
    public ResponseEntity<Object> getById(@PathVariable("speakerId") long speakerId) throws IOException {
        return new ResponseEntity<Object>(this.speakerService.getById(speakerId), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN') OR hasRole('USER')")
    @GetMapping(value = "/events/{eventId}")
    public ResponseEntity<Object> getSpeakerByEventId(@PathVariable("eventId") long eventId) throws IOException {
        return new ResponseEntity<Object>(this.speakerService.getSpeakerByEventId(eventId), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN') OR hasRole('USER')")
    @DeleteMapping(value = "/{speakerId}")
    public ResponseEntity<Object> delete(@PathVariable("speakerId") long speakerId) throws IOException {
        if(this.speakerService.userOwnSpeakerByEvent(speakerId, UserUtils.getIdByAuthorization()) == null){
            return new ResponseEntity<Object>(CommonMessageException.forbidden(), HttpStatus.OK);
        }else{
            String avatar = this.speakerService.getById(speakerId).getAvatar();
            this.speakerService.delete(speakerId);
            this.imageService.deleteImageSpeaker(avatar);
            return new ResponseEntity<Object>(true, HttpStatus.OK);
        }
    }

    @PreAuthorize("hasRole('ADMIN') OR hasRole('USER')")
    @PutMapping(value = "/{speakerId}")
    public ResponseEntity<Object> update(@PathVariable("speakerId") long speakerId, @RequestPart("speaker") String speaker, @RequestPart(name = "avatar", required = false) MultipartFile file) throws IOException {
        if(this.speakerService.userOwnSpeakerByEvent(speakerId, UserUtils.getIdByAuthorization()) == null){
            return new ResponseEntity<Object>(CommonMessageException.forbidden(), HttpStatus.OK);
        }else{
            Speaker newSpeaker = new ObjectMapper().readValue(speaker, Speaker.class);
            if (file!=null && !file.isEmpty()){
                newSpeaker.setAvatar(this.domain+"/images/speakers/"+ this.imageService.uploadImageUpdateSpeakerReturnImageName(file,this.speakerService.getById(speakerId).getAvatar()));
            }
            return new ResponseEntity<Object>(this.speakerService.update(speakerId, newSpeaker), HttpStatus.OK);
        }
    }
}