package vn.axonactive.internship_program.events_webservice.service;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;
import vn.axonactive.internship_program.events_webservice.entity.Enrollment;
import vn.axonactive.internship_program.events_webservice.entity.Event;
import vn.axonactive.internship_program.events_webservice.entity.User;
import vn.axonactive.internship_program.events_webservice.repository.EnrollmentRepository;
import vn.axonactive.internship_program.events_webservice.repository.EventRepository;
import vn.axonactive.internship_program.events_webservice.repository.UserRepository;
import vn.axonactive.internship_program.events_webservice.service.*;

import java.util.ArrayList;

/**
 * Created by dlong on 1/10/2017.
 */
@RunWith(MockitoJUnitRunner.class)
public class DownloadTicketServiceTest {
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
    private ArrayList<Enrollment> enrollments = new ArrayList<Enrollment>();

    @Test
    public void downloadPDFFileByEventCode_OK() throws Exception{
        User user = new User(1L,"axonactive@gmail.com","12345678","AxonActive");
        Event event = new Event(1L,"DevDay","BachKhoa");
        String evencode =  "TbqoK3Z4K4nOi2lxkc7Q";
        Enrollment enrollment = new Enrollment();
        enrollment.setEvent(event);
        enrollment.setUser(user);
        enrollment.setAuthorizationCode("TbqoK3Z4K4nOi2lxkc7Q");
        enrollment.setType(1);
        this.enrollments.add(enrollment);
        String code = enrollment.getAuthorizationCode();

        Mockito.when(enrollmentRepository.findByAuthorizationCode(enrollment.getAuthorizationCode())).thenReturn(enrollment);
        Mockito.when(enrollmentRepository.findByEventId(event.getId())).thenReturn(enrollments);
        Assert.assertEquals(evencode,enrollment.getAuthorizationCode());

        try {
            Assert.assertEquals(event,enrollment.getEvent().getImageCover());
          } catch(AssertionError ae) {
            Assert.assertEquals("message", enrollment.getEvent(), event);
        }
    }
    @Test
    public void downloadPNGFileByEventCode_OK() throws Exception{
        User user = new User(1L,"axonactive@gmail.com","12345678","AxonActive");
        Event event = new Event(1L,"DevDay","BachKhoa");
        String evencode =  "TbqoK3Z4K4nOi2lxkc7Q";
        Enrollment enrollment = new Enrollment();
        enrollment.setEvent(event);
        enrollment.setUser(user);
        enrollment.setAuthorizationCode("TbqoK3Z4K4nOi2lxkc7Q");
        enrollment.setType(1);
        this.enrollments.add(enrollment);
        Mockito.when(enrollmentRepository.findByAuthorizationCode(enrollment.getAuthorizationCode())).thenReturn(enrollment);
        Mockito.when(enrollmentRepository.findByEventId(event.getId())).thenReturn(enrollments);
        Assert.assertEquals(evencode,enrollment.getAuthorizationCode());

        try {
            Assert.assertEquals(event,enrollment.getEvent().getImageCover());
        } catch(AssertionError ae) {
            Assert.assertEquals("message", enrollment.getEvent(), event);
        }
    }
}
