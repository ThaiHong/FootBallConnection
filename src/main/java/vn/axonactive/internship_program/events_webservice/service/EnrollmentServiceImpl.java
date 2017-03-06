package vn.axonactive.internship_program.events_webservice.service;

import com.google.firebase.database.*;
import org.hibernate.validator.constraints.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import vn.axonactive.internship_program.events_webservice.common.AES;
import vn.axonactive.internship_program.events_webservice.entity.Enrollment;
import vn.axonactive.internship_program.events_webservice.entity.EnrollmentPK;
import vn.axonactive.internship_program.events_webservice.entity.Event;
import vn.axonactive.internship_program.events_webservice.entity.User;
import vn.axonactive.internship_program.events_webservice.repository.EnrollmentRepository;
import vn.axonactive.internship_program.events_webservice.repository.EventRepository;
import vn.axonactive.internship_program.events_webservice.repository.UserRepository;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EnrollmentServiceImpl implements EnrollmentService {

    @Autowired
    EnrollmentRepository enrollmentRepository;

    @Autowired
    EventRepository eventRepository;

    @Autowired
    EmailService emailService;

    @Autowired
    private UserService userService;

    /*
    Enrollment Type:
        1: Organizer
        2: Participants
        3: Supporters
     */
    Enrollment enrollment = new Enrollment();

    public void setEnrollment(Enrollment enrollment) {
        this.enrollment = enrollment;
    }

    @Override
    public Enrollment becomeParticipant(EnrollmentPK enrollmentPK) {

        return createEnrollment(enrollmentPK, 2);
    }

    @Override
    public Enrollment becomeOrganizer(EnrollmentPK enrollmentPK) {

        return createEnrollment(enrollmentPK, 1);
    }

    @Override
    public Enrollment createEnrollment(EnrollmentPK enrollmentPK, int type) {
        if (type != 1 && type != 2) {
            return null;
        }

        System.out.println(enrollmentRepository.exists(enrollmentPK));
        if (!enrollmentRepository.exists(enrollmentPK)) {
            if (eventRepository.exists(enrollmentPK.getEvent())) {
                enrollment.setEvent(eventRepository.findOne(enrollmentPK.getEvent()));
                String accountCode = SecurityContextHolder.getContext().getAuthentication().getName();
                enrollment.setUser(userService.findByAccountCode(accountCode));
                enrollment.setType(type);
                enrollment.setEnrollDate(new Date());
                String code = enrollment.getEvent().getId() + "0" + userService.findByAccountCode(accountCode).getId();
//                code = String.format("%012d",Long.parseLong(code));
                enrollment.setAuthorizationCode(code);
                Enrollment newEnrollment = enrollmentRepository.save(enrollment);
                if (type == 2) {
                    if (!"local".equals(System.getenv("ENV"))) {

                        System.out.println("Vao them su kien nao!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                        //                Them database vao Firebase
                        DatabaseReference eventRef = FirebaseDatabase.getInstance().getReference("events");
                        Long eventId = enrollment.getEvent().getId();
                        Long userId = enrollment.getUser().getId();
                        DatabaseReference userRef = eventRef.child(eventId.toString());
                        Map data = new HashMap();
                        data.put("confirm", 0);
                        data.put("check", 0);
                        data.put("email", enrollment.getUser().getEmail());
                        data.put("fullName", enrollment.getUser().getFullName());
                        data.put("rangeAge", enrollment.getUser().getRangeAge());
                        data.put("phone", enrollment.getUser().getPhone());
                        data.put("code", enrollment.getAuthorizationCode());


                        userRef.child(userId.toString()).setValue(data);
                        userRef.child(userId.toString()).child("check").addValueEventListener(new ValueEventListener() {
                            @Override
                            public void onDataChange(DataSnapshot dataSnapshot) {
                                int checkIn = dataSnapshot.getValue(Integer.class);
                                updateCheckInStatus(checkIn, eventId, userId);
                            }

                            @Override
                            public void onCancelled(DatabaseError databaseError) {

                            }
                        });

                        userRef.child(userId.toString()).child("confirm").addValueEventListener(new ValueEventListener() {
                            @Override
                            public void onDataChange(DataSnapshot dataSnapshot) {
                                int confirm = dataSnapshot.getValue(Integer.class);
                                updateConfirmStatus(confirm, eventId, userId);
                            }

                            @Override
                            public void onCancelled(DatabaseError databaseError) {

                            }
                        });
                    }
                    emailService.sendEmailTicket(code);
                    return newEnrollment;
                }
            } else {
                return null;
            }
        } else {
            return null;
        }
        return null;
    }

    @Override
    public List<Enrollment> getUpComingTicket(Long id, int num) {
        return this.enrollmentRepository.getListUpComingByUserId(id, num);
    }

    @Override
    public List<Enrollment> getPassingTicket(Long id, int num) {
        return this.enrollmentRepository.getListPassingByUserId(id, num);
    }

    @Override
    public Enrollment findByAuthorizationCode(String code) {
        return this.enrollmentRepository.findByAuthorizationCode(code);
    }

    @Override
    public List<Enrollment> getEnrollmentsByEvent(Long eventId) {
        return this.enrollmentRepository.findByEventId(eventId);
    }

    @Override
    public List<Enrollment> getEnrollmentsByEventRange(Long eventId, int start, int num) {
        String accountCode = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByAccountCode(accountCode);
        EnrollmentPK enrollmentPK = new EnrollmentPK(eventId, user.getId());
        if (enrollmentRepository.exists(enrollmentPK)) {
            Enrollment enrollment = enrollmentRepository.findOne(enrollmentPK);
            if (enrollment.getType() == 1) {
                return this.enrollmentRepository.findByEventIdLimit(eventId, start, num);
            }
        }
        return null;
    }

    @Override
    public void updateCheckInStatus(int checkIn, long eventId, long userId) {
        this.enrollmentRepository.updateCheckInStatus(checkIn, eventId, userId);
    }

    @Override
    public void updateConfirmStatus(int checkIn, long eventId, long userId) {
        this.enrollmentRepository.updateConfirmStatus(checkIn, eventId, userId);
    }

    @Override
    public Enrollment getEnrollmentByEventAndUser(EnrollmentPK enrollmentPK) {
        return this.enrollmentRepository.findOne(enrollmentPK);
    }

    @Override
    public List<Enrollment> findByEventIdAndByKeyword(Long eventId, String keyword) {
        return enrollmentRepository.findByEventIdAndByKeyword(eventId, keyword);
    }

    @Override
    public void changeStatusOfEmailReminder(Long eventId, Long userId, int status) {
        this.enrollmentRepository.changeStatusOfEmailReminder(eventId, userId, status);
    }

    @Override
    public List<Enrollment> findMyEvent(Long userId){
        List<Enrollment> enrollments = enrollmentRepository.findUserEventByTypeAnyStatusLimit4(userId, 1);
        enrollments.addAll(enrollmentRepository.findUserEventByTypeLimit4(userId,2));
        return enrollments;
    }

    @Override
    public Enrollment userOwnEvent(Long userId, Long eventId) {
        return this.enrollmentRepository.userOwnEvent(userId,eventId);
    }

    @Override
    public int checkStatusUserEvent(Long userId, Long eventId) {
        EnrollmentPK enrollmentPK = new EnrollmentPK(eventId, userId);
        if (!enrollmentRepository.exists(enrollmentPK)) {
            return 0;
        }
        else{
            return enrollmentRepository.findOne(enrollmentPK).getType();
        }
    }

    @Override
    public String getQRCodeByEventAndUser(Long eventId, Long userId) {
        return enrollmentRepository.findQRCodeByEventAndUser(eventId, userId);
    }

}
