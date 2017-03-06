package vn.axonactive.internship_program.events_webservice.service;

import vn.axonactive.internship_program.events_webservice.entity.Event;
import vn.axonactive.internship_program.events_webservice.entity.User;

import java.util.List;

/**
 * Created by lmchuc on 12/31/2016.
 */
public interface EmailService {
    public void sendNotificationMailForTeam(String receptorEmail);

    public void sendWelcomeMailNewMember(String receptorEmail, String memberName);

    public void sendForgotPasswordMail(String receptorEmail, String memberName, String newPassword, String link);

    public void sendEmailTicket(String eventCode);

    public void sendEmailRemindTicket(String eventCode);

    public void sendEmailCancelEvent(List<String> receptors, String owner, Long eventId);
    public void sendEmailReOpenEvent(List<String> receptors, String owner, Long eventId);
}
