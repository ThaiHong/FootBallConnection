package vn.axonactive.internship_program.events_webservice.controller;

import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.Trigger;
import org.quartz.TriggerKey;
import org.quartz.impl.matchers.GroupMatcher;
import org.quartz.impl.triggers.CronTriggerImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.quartz.SchedulerFactoryBean;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import vn.axonactive.internship_program.events_webservice.common.CommonMessageException;

import javax.validation.Valid;
import java.text.ParseException;
import java.util.Map;

/**
 * Created by pvdinh on 1/10/2017.
 */
@RestController
@RequestMapping(value = "api/schedule/")
public class ManageCronJob {

    @Autowired
    private SchedulerFactoryBean schedulerFactoryBean;

    @PostMapping(value = "/setScheduleSendEmailEventReminder")
    public ResponseEntity<?> setScheduleSendEmailEventReminder(@Valid @RequestBody Map<String,String> map) {
//        if (result.hasErrors()) return new CommonMessageException().badRequest();
            try {
                if (!map.get("cronExpression").isEmpty()) {
                    String newCronExpression = map.get("cronExpression");

                    Scheduler scheduler = this.schedulerFactoryBean.getScheduler();
                    TriggerKey triggerKey = TriggerKey.triggerKey("cronTriggerEmailEventReminder", "CronTrigger");
                    CronTriggerImpl trigger = (CronTriggerImpl) scheduler.getTrigger(triggerKey);
                    trigger.setCronExpression(newCronExpression);
                    scheduler.rescheduleJob(triggerKey, trigger);
                }
            } catch (Exception e) {
                return new ResponseEntity<String>("SOMETHING WRONG", HttpStatus.OK);
            }
            return new ResponseEntity<String>("SCHEDULE CHANGE SUCCESSFULLY", HttpStatus.OK);
    }
}
