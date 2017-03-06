package vn.axonactive.internship_program.events_webservice.controller;

import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import vn.axonactive.internship_program.events_webservice.entity.Enrollment;
import vn.axonactive.internship_program.events_webservice.entity.User;
import vn.axonactive.internship_program.events_webservice.search.SearchService;
import vn.axonactive.internship_program.events_webservice.entity.Event;
import vn.axonactive.internship_program.events_webservice.service.EnrollmentService;

import javax.validation.Valid;
import java.util.List;


/**
 * Created by dtnhat on 12/30/2016.
 */
@RestController
@RequestMapping(value = "api/search")
public class SearchController {

    @Autowired
    private SearchService searchService;

    @Autowired
    private  EnrollmentService enrollmentService;

    @RequestMapping(value = "/event-quick-search",method = RequestMethod.GET)
    public ResponseEntity<MappingJacksonValue> searchEventByKeyword(@RequestParam("keyword") String keyword){

        System.out.println(keyword);
        List<Event> events = searchService.searchEventByKeyword(keyword);
        if(events!=null &&events.size()>=1){
            MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(events);
            FilterProvider filters = new SimpleFilterProvider()
                    .addFilter("filter.Event",SimpleBeanPropertyFilter.filterOutAllExcept("id","title","imageCover","location"));
            mappingJacksonValue.setFilters(filters);
            return new ResponseEntity<MappingJacksonValue>(mappingJacksonValue,HttpStatus.OK);
        }else{
            return new ResponseEntity<MappingJacksonValue>(HttpStatus.OK);
        }
    }

    @RequestMapping(value = "/participant-search",method = RequestMethod.GET)
    public ResponseEntity<MappingJacksonValue> searchParticipantByKeyword(@RequestParam("keyword") String keyword, @RequestParam("event_id") Long event_id){

        List<Enrollment> enrollments = searchService.searchUserByKeyword(event_id,keyword);
        if (enrollments!=null && enrollments.size()>=1){
            MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(enrollments);
            FilterProvider filters = new SimpleFilterProvider()
                    .addFilter("filter.Enrollment", SimpleBeanPropertyFilter
                            .filterOutAllExcept("user", "authorizationCode", "checkIn", "confirm"));
            mappingJacksonValue.setFilters(filters);

            return new ResponseEntity<MappingJacksonValue>(mappingJacksonValue, HttpStatus.OK);
        }else{
            return new ResponseEntity<MappingJacksonValue>(HttpStatus.OK);
        }
    }

}
