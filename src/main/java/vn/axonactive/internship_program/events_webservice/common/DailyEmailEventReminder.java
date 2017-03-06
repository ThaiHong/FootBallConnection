package vn.axonactive.internship_program.events_webservice.common;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.scheduling.quartz.QuartzJobBean;

/**
 * Created by pvdinh on 1/9/2017.
 */
public class DailyEmailEventReminder extends QuartzJobBean {

    private TaskSendEmailEventReminder taskSendEmailEventReminder;

    public TaskSendEmailEventReminder getTaskSendEmailEventReminder() {
        return taskSendEmailEventReminder;
    }

    public void setTaskSendEmailEventReminder(TaskSendEmailEventReminder taskSendEmailEventReminder) {
        this.taskSendEmailEventReminder = taskSendEmailEventReminder;
    }

    @Override
    protected void executeInternal(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        this.taskSendEmailEventReminder.sendEmailReminder();
    }
}
