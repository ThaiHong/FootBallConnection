package vn.axonactive.internship_program.events_webservice.common;

import vn.axonactive.internship_program.events_webservice.entity.Enrollment;
import vn.axonactive.internship_program.events_webservice.entity.Event;
import vn.axonactive.internship_program.events_webservice.service.EmailService;
import vn.axonactive.internship_program.events_webservice.service.EventService;

import java.util.List;

/**
 * Created by pvdinh on 1/9/2017.
 */
public class TaskSendEmailEventReminder {
    private EventService eventService;
    private EmailService emailService;

    public TaskSendEmailEventReminder() {
    }

    public TaskSendEmailEventReminder(EventService eventService, EmailService emailService) {
        this.eventService = eventService;
        this.emailService = emailService;
    }

    public EventService getEventService() {
        return eventService;
    }

    public void setEventService(EventService eventService) {
        this.eventService = eventService;
    }

    public EmailService getEmailService() {
        return emailService;
    }

    public void setEmailService(EmailService emailService) {
        this.emailService = emailService;
    }

    public void sendEmailReminder() {
        List<Event> list = this.eventService.getAllEventAfterCurrentDateByOneDay();
        for (Event e : list) {
            System.out.println("size of enrollment " + e.getEnrollments().size());
            for (Enrollment en : e.getEnrollments()) {
                if (en.getOptionalEmailReminder() == 1 && en.getType() == 2) {
              //      this.emailService.sendEmailRemindTicket(en.getAuthorizationCode());
                    System.out.println("Start Time " + en.getAuthorizationCode());

               }
            }
        }
    }
}
