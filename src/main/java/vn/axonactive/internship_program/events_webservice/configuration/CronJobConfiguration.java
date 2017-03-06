package vn.axonactive.internship_program.events_webservice.configuration;


import org.codehaus.groovy.runtime.powerassert.SourceText;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.Trigger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.scheduling.quartz.CronTriggerFactoryBean;
import org.springframework.scheduling.quartz.JobDetailFactoryBean;
import org.springframework.scheduling.quartz.SchedulerFactoryBean;


import vn.axonactive.internship_program.events_webservice.common.DailyEmailEventReminder;
import vn.axonactive.internship_program.events_webservice.common.TaskSendEmailEventReminder;
import vn.axonactive.internship_program.events_webservice.service.EmailService;
import vn.axonactive.internship_program.events_webservice.service.EventService;

import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by pvdinh on 1/9/2017.
 */

@Configuration
public class CronJobConfiguration {

    @Bean
    @Autowired
    public TaskSendEmailEventReminder taskSendEmailEventReminder(EventService eventService, EmailService emailService){
        return new TaskSendEmailEventReminder(eventService,emailService);
    }

    @Bean(name = "dailyEmailEventReminder")
    @Autowired
    public JobDetailFactoryBean dailyEmailEventReminder(TaskSendEmailEventReminder taskSendEmailEventReminder){
        JobDetailFactoryBean  jobDetailBean = new JobDetailFactoryBean();

        jobDetailBean.setJobClass(DailyEmailEventReminder.class);
        jobDetailBean.setName("dailyEmailEventReminder");
        jobDetailBean.setGroup("JobDetail");
        jobDetailBean.setDurability(true);

        Map<String,Object> map = new HashMap<>();
        map.put("taskSendEmailEventReminder",taskSendEmailEventReminder);

        jobDetailBean.setJobDataAsMap(map);
        return jobDetailBean;
    }
//---------------------------------------------------------------------
    @Bean(name = "cronTriggerEmailEventReminder")
    @Autowired
    public CronTriggerFactoryBean cronTriggerEmailEventReminder(@Qualifier(value = "dailyEmailEventReminder") JobDetailFactoryBean dailyEmailEventReminder) {
        CronTriggerFactoryBean cronTriggerBean = new CronTriggerFactoryBean();
        cronTriggerBean.setGroup("CronTrigger");
        cronTriggerBean.setName("cronTriggerEmailEventReminder");
        cronTriggerBean.setJobDetail(dailyEmailEventReminder.getObject());
         cronTriggerBean.setCronExpression("0 0/5 * * * ?");
      //  cronTriggerBean.setCronExpression("0 30 09 * * ?");
        return cronTriggerBean;
    }
//--------------------------------------------------------------------------

    @Bean
    @Autowired
    public SchedulerFactoryBean schedulerFactoryBean(@Qualifier("dailyEmailEventReminder") JobDetailFactoryBean dailyEmailEventReminder,
                                                     @Qualifier(value = "cronTriggerEmailEventReminder") CronTriggerFactoryBean cronTriggerEmailEventReminder) throws ParseException {
        SchedulerFactoryBean schedulerFactoryBean = new SchedulerFactoryBean();
        schedulerFactoryBean.setSchedulerName("schedulerSendEmailEventReminder");
        JobDetail jobDetail[] = {dailyEmailEventReminder.getObject()};
        schedulerFactoryBean.setJobDetails((JobDetail[]) jobDetail);
        Trigger trigger[] = {cronTriggerEmailEventReminder.getObject()};
        schedulerFactoryBean.setTriggers((Trigger[]) trigger);
        return schedulerFactoryBean;
    }
}
