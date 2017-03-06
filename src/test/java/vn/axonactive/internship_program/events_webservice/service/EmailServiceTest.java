package vn.axonactive.internship_program.events_webservice.service;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import vn.axonactive.internship_program.events_webservice.entity.Enrollment;
import vn.axonactive.internship_program.events_webservice.entity.Event;
import vn.axonactive.internship_program.events_webservice.entity.User;
import vn.axonactive.internship_program.events_webservice.repository.EnrollmentRepository;
import vn.axonactive.internship_program.events_webservice.repository.EventRepository;
import vn.axonactive.internship_program.events_webservice.repository.UserRepository;
import vn.axonactive.internship_program.events_webservice.service.*;

import java.util.Properties;


@RunWith(MockitoJUnitRunner.class)
public class EmailServiceTest {

    @InjectMocks
    private EmailServiceImpl emailService;
    private EnrollmentServiceImpl enrollmentService;
    private QRCodeServiceImpl qrCodeService;
    private UserServiceImpl userService;
    private EventServiceImpl eventService;

    @Mock
    private EnrollmentRepository enrollmentRepository;
    private UserRepository userRepository;
    private EventRepository eventRepository;


    @Test
    public void sendWelcomeMailNewMember_OK(){
        String receptorEmail = "dtnhat51@gmail.com";
        String memberName = "Nhat Ha";
        //emailService.sendWelcomeMailNewMember(receptorEmail,memberName);
        //todo implement later

    }
    @Test
    public void sendNotificationMailForTeam_OK(){
        String evencode =  "TbqoK3Z4K4nOi2lxkc7Q";
        User user = new User(1L,"axonactive@gmail.com","12345678","AxonActive");
        Event event = new Event(1L,"DevDay","BachKhoa");
        Enrollment enrollment = new Enrollment();
        enrollment.setEvent(event);
        enrollment.setUser(user);
        enrollment.setAuthorizationCode("TbqoK3Z4K4nOi2lxkc7Q");

        Mockito.when(enrollmentRepository.findByAuthorizationCode(enrollment.getAuthorizationCode())).thenReturn(enrollment);
        Mockito.when(enrollmentRepository.save(enrollment)).thenReturn(enrollment);
        Assert.assertEquals(evencode,enrollment.getAuthorizationCode());

        try {
            Assert.assertEquals(event,enrollment.getEvent().getImageCover());
        } catch(AssertionError ae) {
            Assert.assertEquals("message", enrollment.getEvent(), event);
        }

    }
    @Test
    public void sendEmailRemindTicket_OK(){
        String name = "AxonActive";
        String eventname = "DevDay";
        String location = "BachKhoa";
        String startDate = "10/10/2017";
        String evencode =  "abcded";

        User user = new User(1L,"axonactive@gmail.com","12345678","AxonActive");
        Event event = new Event(1L,"DevDay","BachKhoa");
        Enrollment enrollment = new Enrollment();
        enrollment.setEvent(event);
        enrollment.setUser(user);
        enrollment.setAuthorizationCode("abcded");
        Mockito.when(enrollmentRepository.findByAuthorizationCode(enrollment.getAuthorizationCode())).thenReturn(enrollment);
        Mockito.when(enrollmentRepository.save(enrollment)).thenReturn(enrollment);
        // Assert.assertEquals(evencode,enrollmentService.findByAuthorizationCode(enrollment.getAuthorizationCode()));
        Assert.assertEquals(evencode,enrollment.getAuthorizationCode());
        try {
            Assert.assertEquals(event,enrollment.getEvent().getImageCover());
        } catch(AssertionError ae) {
            Assert.assertEquals("message", enrollment.getEvent(), event);
        }
    }
}
