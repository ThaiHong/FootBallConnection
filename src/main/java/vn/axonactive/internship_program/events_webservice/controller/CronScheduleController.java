package vn.axonactive.internship_program.events_webservice.controller;

import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import vn.axonactive.internship_program.events_webservice.common.CommonMessageException;
import vn.axonactive.internship_program.events_webservice.entity.CronSchedule;
import vn.axonactive.internship_program.events_webservice.service.CronScheduleService;

import javax.validation.Valid;
import java.util.List;

/**
 * Created by dtnhat on 1/11/2017.
 */

@RestController
@RequestMapping(value = "api/cronSchedules")
public class CronScheduleController {

    @Autowired
    private CronScheduleService cronScheduleService;

    @PreAuthorize("isAuthenticated()")
    @GetMapping
    public ResponseEntity<List<CronSchedule>> getAll(){
        return new ResponseEntity<List<CronSchedule>>(cronScheduleService.getAll(), HttpStatus.OK);
    }

   @PreAuthorize("isAuthenticated()")
    @GetMapping(value = "/{id}")
    public ResponseEntity<CronSchedule> getScheduleById(@PathVariable("id")  Long id){
        return new ResponseEntity<CronSchedule>(cronScheduleService.getCronScheduleById(id),HttpStatus.OK);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping(value = "/events/{eventId}")
    public ResponseEntity<MappingJacksonValue> getListScheduleByEventId(@PathVariable("eventId")  Long eventId){
        List<CronSchedule> cronSchedules = cronScheduleService.getListCronScheduleByEventId(eventId);
        MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(cronSchedules);
        FilterProvider filters = new SimpleFilterProvider()
                .addFilter("filter.Event", SimpleBeanPropertyFilter
                        .filterOutAllExcept("id"));
        mappingJacksonValue.setFilters(filters);

        return new ResponseEntity<MappingJacksonValue>(mappingJacksonValue,HttpStatus.OK);
    }
    @PreAuthorize("isAuthenticated()")
    @DeleteMapping(value = "/{id}")
    public void deleteScheduleById(@PathVariable("id")  Long id){
        cronScheduleService.delete(id);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody CronSchedule cronSchedule) {

        System.out.println(cronSchedule.getStartDate());
       // if (result.hasErrors()) return new CommonMessageException().badRequest();
            CronSchedule cron = cronScheduleService.create(cronSchedule);
            MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(cron);
            FilterProvider filters = new SimpleFilterProvider()
                    .addFilter("filter.Event", SimpleBeanPropertyFilter
                            .filterOutAllExcept("id"));
            mappingJacksonValue.setFilters(filters);

            return new ResponseEntity<MappingJacksonValue>(mappingJacksonValue, HttpStatus.OK);
    }





}
