package vn.axonactive.internship_program.events_webservice.service;

import vn.axonactive.internship_program.events_webservice.entity.Enrollment;
import vn.axonactive.internship_program.events_webservice.entity.EnrollmentPK;
import vn.axonactive.internship_program.events_webservice.entity.Event;

import java.util.List;

/**
 * Created by dctruc on 12/26/2016.
 */
public interface EnrollmentService {
    Enrollment becomeParticipant(EnrollmentPK enrollmentPK);
    Enrollment becomeOrganizer(EnrollmentPK enrollmentPK);
    Enrollment createEnrollment(EnrollmentPK enrollmentPK, int type);
    Enrollment findByAuthorizationCode(String code);
    List<Enrollment> getUpComingTicket(Long id, int num);
    List<Enrollment> getPassingTicket(Long id, int num);
    List<Enrollment> getEnrollmentsByEvent(Long eventId);
    void changeStatusOfEmailReminder(Long eventId, Long userId, int status);
    List<Enrollment> getEnrollmentsByEventRange(Long eventId, int start, int num);
    void updateCheckInStatus(int checkIn, long eventId,long userId);
    void updateConfirmStatus(int checkIn, long eventId,long userId);
    Enrollment getEnrollmentByEventAndUser(EnrollmentPK enrollmentPK);
    List<Enrollment> findByEventIdAndByKeyword(Long eventId, String keyword);
    List<Enrollment> findMyEvent(Long userId);
    Enrollment userOwnEvent(Long userId, Long eventId);
    int checkStatusUserEvent(Long userId, Long eventId);
    String getQRCodeByEventAndUser(Long eventId, Long userId);
}


