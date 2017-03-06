package vn.axonactive.internship_program.events_webservice.service;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import vn.axonactive.internship_program.events_webservice.entity.*;
import vn.axonactive.internship_program.events_webservice.repository.EnrollmentRepository;
import vn.axonactive.internship_program.events_webservice.repository.EventRepository;
import vn.axonactive.internship_program.events_webservice.repository.UserRepository;
import vn.axonactive.internship_program.events_webservice.service.EnrollmentServiceImpl;
import vn.axonactive.internship_program.events_webservice.service.UserService;

import java.util.*;

/**
 * Created by nhlinh2 on 01/16/2017.
 */
@RunWith(SpringJUnit4ClassRunner.class)
public class EnrollmentServiceTest {
    @Mock
    EnrollmentRepository enrollmentRepository;

    @Mock
    EventRepository eventRepository;

    @Mock
    UserService userService;

    @Mock
    SecurityContext securityContext;

    @InjectMocks
    EnrollmentServiceImpl enrollmentService;

    private EnrollmentPK enrollmentPK = new EnrollmentPK();
    private Enrollment enrollment = new Enrollment();
    private Set<Category> categories = new HashSet<Category>();
    private List<Event> events = new ArrayList<Event>();
    private List<Enrollment> enrollments = new ArrayList<Enrollment>();
    private Event event;
    User user0 = new User(1L,"phanvudinh@yahoo.com","phanvudinh","phanvudinh");
    String accountCode = "123";
    @Before
    public void init(){
        MockitoAnnotations.initMocks(this);

        categories.add(new Category(new Long(1),"Music","Music Concert"));
        categories.add(new Category(new Long(2),"Sport","Sport Show"));

        events.add(new Event(new Long(0),"Event1","Address1","Location1",new Double(10),new Double(20),new Date(),new Date(),categories));
        events.add(new Event(new Long(1),"Event2","Address2","Location2",new Double(10),new Double(20),new Date(),new Date(),categories));
        events.add(new Event(new Long(2),"Event3","Address3","Location3",new Double(10),new Double(20),new Date(),new Date(),categories));

        enrollments.add(new Enrollment(user0, events.get(0), new Date(),"123", "", 1));
        enrollments.add(new Enrollment(user0, events.get(1), new Date(),"111", "", 2));
        enrollments.add(new Enrollment(user0, events.get(2), new Date(),"333", "", 2));

        event = events.get(0);
        enrollment.setType(1);
        enrollmentPK.setEvent(event.getId());
        enrollmentPK.setUser(user0.getId());
        enrollmentService.setEnrollment(enrollment);

    }

//    @Test
//    public void testCreateEnrollment_OK(){
//        int type=1;
//
//        Mockito.when(eventRepository.findOne(enrollmentPK.getEvent())).thenReturn(event);
//        Mockito.when(userRepository.findOne(enrollmentPK.getUser())).thenReturn(user0);
//        Mockito.when(enrollmentRepository.save(enrollment)).thenReturn(enrollment);
//
//        Enrollment enrollmentExpect = new Enrollment();
//        enrollmentExpect.setEvent(event);
//        enrollmentExpect.setUser(user0);
//        enrollmentExpect.setType(type);
//
//        Assert.assertEquals(enrollmentExpect.getEvent(),enrollmentService.createEnrollment(enrollmentPK,type).getEvent());
//        Assert.assertEquals(enrollmentExpect.getUser(),enrollmentService.createEnrollment(enrollmentPK,type).getUser());
//        Assert.assertEquals(enrollmentExpect.getType(),enrollmentService.createEnrollment(enrollmentPK,type).getType());
//    }

    @Test
    public void testCreateEnrollment_Failed_UnsuitableType(){
        //Todo impediment
//        int type=-1;
//        int type0=5;
//
//        Mockito.when(eventRepository.findOne(enrollmentPK.getEvent())).thenReturn(event);
//        Mockito.when(enrollmentRepository.save(enrollment)).thenReturn(enrollment);
//
//        Enrollment enrollmentExpect = null;
//
//        Assert.assertEquals(enrollmentExpect,enrollmentService.createEnrollment(enrollmentPK,type));
//        Assert.assertEquals(enrollmentExpect,enrollmentService.createEnrollment(enrollmentPK,type0));
    }

    @Test
    public void testCreateEnrollment_Failed_DuplicatePK(){
        int type=1;

        Mockito.when(enrollmentRepository.exists(enrollmentPK)).thenReturn(true);
        Enrollment enrollmentExpect = null;

        Assert.assertEquals(enrollmentExpect,enrollmentService.createEnrollment(enrollmentPK,type));
    }

    @Test
    public void testCreateEnrollment_Failed_NotFoundEvent(){
        int type=1;

        Mockito.when(enrollmentRepository.exists(enrollmentPK)).thenReturn(true);
        Mockito.when(eventRepository.findOne(enrollmentPK.getEvent())).thenReturn(null);
        Mockito.when(userService.findByAccountCode(accountCode)).thenReturn(user0);
        Mockito.when(eventRepository.exists(enrollmentPK.getEvent())).thenReturn(false);
        Mockito.when(enrollmentRepository.save(enrollment)).thenReturn(enrollment);

        Enrollment enrollmentExpect = null;

        Assert.assertEquals(enrollmentExpect,enrollmentService.createEnrollment(enrollmentPK,type));
    }

    @Test
    public void testGetEnrollmentByEventAndUser_NotFoundEnrollment() {
        Mockito.when(enrollmentRepository.findOne(enrollmentPK)).thenReturn(null);
        Assert.assertEquals(null,enrollmentService.getEnrollmentByEventAndUser(enrollmentPK));
    }

    @Test
    public void testGetEnrollmentByEventAndUser_OK() {
        Mockito.when(enrollmentRepository.findOne(enrollmentPK)).thenReturn(enrollment);
        Assert.assertEquals(enrollment,enrollmentService.getEnrollmentByEventAndUser(enrollmentPK));
    }

    @Test
    public void testGetEnrollmentsByEventRange_OK(){
        //Todo impediment
//        List<Enrollment> result = new ArrayList<Enrollment>();
//        result.add(enrollments.get(1));
//
//// Mockito.whens() for your authorization object
//        Authentication authentication = Mockito.mock(Authentication.class);
//        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
//        Mockito.when(securityContext.getAuthentication()).thenReturn(authentication);
//        Mockito.when(authentication.getName()).thenReturn(accountCode);
//        SecurityContextHolder.setContext(securityContext);
//        Mockito.when(userService.findByAccountCode(accountCode)).thenReturn(user0);
////        enrollmentService.setEnrollmentPK(enrollmentPK);
//        Mockito.when(enrollmentRepository.exists(enrollmentPK)).thenReturn(true);
////        Mockito.when(enrollmentRepository.findOne(enrollmentPK)).thenReturn(enrollment);
//        Mockito.when(enrollmentRepository.findByEventIdLimit(1L,1,2)).
//                thenReturn(result);
//
//        Assert.assertEquals(result, enrollmentService.getEnrollmentsByEventRange(1L, 1,2));
    }

    @Test
    public void testGetEnrollmentsByEvent_OK(){
        List<Enrollment> result = new ArrayList<Enrollment>();
        result.add(enrollments.get(1));
        Mockito.when(enrollmentRepository.findByEventId(1L)).
                thenReturn(result);

        Assert.assertEquals(result, enrollmentService.getEnrollmentsByEvent(1L));
    }

    @Test
    public void getUpcomingTicket_OK(){
        Long id = 1L;
        List<Enrollment> upcomingTicket = new ArrayList<>();
        upcomingTicket.add(enrollments.get(0));
        upcomingTicket.add(enrollments.get(1));
        Mockito.when(enrollmentRepository.getListUpComingByUserId(id, 4)).thenReturn(upcomingTicket);
        Assert.assertEquals(2, upcomingTicket.size());
    }

    @Test
    public void getPassingTicket_OK(){
        Long id = 1L;
        List<Enrollment> passingTicket = new ArrayList<>();
        passingTicket.add(enrollments.get(0));
        passingTicket.add(enrollments.get(1));
        Mockito.when(enrollmentRepository.getListUpComingByUserId(id, 4)).thenReturn(passingTicket);
        Assert.assertEquals(2, passingTicket.size());
    }

    @Test
    public void findByAuthorizationCode_OK(){
        String code = "NHL132";
        Mockito.when(enrollmentRepository.findByAuthorizationCode(code)).thenReturn(enrollment);
        Assert.assertEquals(enrollment,enrollmentService.findByAuthorizationCode(code));
    }

    @Test
    public void updateCheckinStatus(){
        //Todo impediment
    }

    @Test
    public void updateConfirmStatus(){
        //Todo impediment
    }

    @Test
    public void findByEventIdAndByKeyword_OK(){
        Long eventId = 1L;
        String keyword = "Event1";
        List<Enrollment> enrolls = new ArrayList<>();
        enrolls.add(enrollments.get(0));
        Mockito.when(enrollmentRepository.findByEventIdAndByKeyword(eventId,keyword)).thenReturn(enrolls);
        //Todo impediment
    }

    @Test
    public void changeStatusOfEmailReminder(){
        //Todo impediment
    }

    @Test
    public void findMyEvent_Fail(){
//        Long userId=1L;
//        List<Enrollment> enrolls = new ArrayList<>();
//        Mockito.when(enrollmentRepository.findUserEventByTypeLimit4(userId, 1)).thenReturn(enrolls);
//        Mockito.when(enrolls.addAll(enrollmentRepository.findUserEventByTypeLimit4(userId,2)));
//        Assert.assertEquals(0,enrolls.size());
        //Todo impediment
    }

    @Test
    public void userOwnEvent(){
        Long userId=1L;
        Long eventId=2L;
        Mockito.when(enrollmentRepository.userOwnEvent(userId,eventId)).thenReturn(enrollment);
        Assert.assertEquals(enrollment,enrollmentService.userOwnEvent(userId,eventId));
    }

    @Test
    public void getUpComingTicket_IdNotExist_OK() {

        Mockito.when(enrollmentRepository.getListUpComingByUserId(1L, 8)).thenReturn(enrollments);

        int numberOfTicket = 0;

        Assert.assertEquals(numberOfTicket, enrollmentService.getUpComingTicket(10L, 8).size());
    }

    @Test
    public void getPassingTicket_IdNotExit_OK(){
        Mockito.when(enrollmentRepository.getListPassingByUserId(1L,8)).thenReturn(enrollments);
        int numberOfTicket = 0;
        Assert.assertEquals(numberOfTicket,enrollmentService.getPassingTicket(10L,8).size());
    }

    @Test
    public void getUpComingEvent_OK(){
        Mockito.when(enrollmentRepository.getListUpComingByUserId(1L,3)).thenReturn(enrollments);
        int numberOfTicket=3;
        Assert.assertEquals(numberOfTicket,enrollmentService.getUpComingTicket(1L,3).size());

    }

    @Test
    public void getPassingEvent_OK(){
        Mockito.when(enrollmentRepository.getListPassingByUserId(1L,3)).thenReturn(enrollments);
        int numberOfTicket = 3;
        Assert.assertEquals(numberOfTicket,enrollmentService.getPassingTicket(1L,3).size());
    }

    //--------------------------------------//

    @Test
    public void getUpComingTicket_NumSmallThanSizeOfTicket_OK() {

        Mockito.when(enrollmentRepository.getListUpComingByUserId(1L, 4)).thenReturn(enrollments);

        int numberOfTicket = 3;

        Assert.assertEquals(numberOfTicket, enrollmentService.getUpComingTicket(1L, 4).size());

    }

    @Test
    public void getUpComingTicket_NumBigThanSizeOfTicket_OK() {

        Mockito.when(enrollmentRepository.getListUpComingByUserId(1L, 8)).thenReturn(enrollments);

        int numberOfTicket = 3;

        Assert.assertEquals(numberOfTicket, enrollmentService.getUpComingTicket(1L, 8).size());

    }

    @Test
    public void getUpComingTicket_NumNegative_OK() {

        Mockito.when(enrollmentRepository.getListUpComingByUserId(1L, 4)).thenReturn(enrollments);

        int numberOfTicket = 0;

        Assert.assertEquals(numberOfTicket, enrollmentService.getUpComingTicket(1L, -4).size());

    }

    @Test
    public void getUpComingTicket_IdExist_OK() {

        Mockito.when(enrollmentRepository.getListUpComingByUserId(1L, 8)).thenReturn(enrollments);

        int numberOfTicket = 3;

        Assert.assertEquals(numberOfTicket, enrollmentService.getUpComingTicket(1L, 8).size());
    }


    @Test
    public void getPassingTicket_NumSmallThanSizeOfTicket_OK() {

        Mockito.when(enrollmentRepository.getListUpComingByUserId(1L, 4)).thenReturn(enrollments);

        int numberOfTicket = 3;

        Assert.assertEquals(numberOfTicket, enrollmentService.getUpComingTicket(1L, 4).size());

    }

    @Test
    public void getPassingTicket_NumBigThanSizeOfTicket_OK() {

        Mockito.when(enrollmentRepository.getListUpComingByUserId(1L, 8)).thenReturn(enrollments);

        int numberOfTicket = 3;

        Assert.assertEquals(numberOfTicket, enrollmentService.getUpComingTicket(1L, 8).size());

    }

    @Test
    public void getPassingTicket_NumNegative_OK() {

        Mockito.when(enrollmentRepository.getListUpComingByUserId(1L, 4)).thenReturn(enrollments);

        int numberOfTicket = 0;

        Assert.assertEquals(numberOfTicket, enrollmentService.getUpComingTicket(1L, -4).size());

    }

    @Test
    public void getPassingTicket_IdExist_OK() {

        Mockito.when(enrollmentRepository.getListUpComingByUserId(1L, 8)).thenReturn(enrollments);

        int numberOfTicket = 3;

        Assert.assertEquals(numberOfTicket, enrollmentService.getUpComingTicket(1L, 8).size());
    }

    @Test
    public void getPassingTicket_IdNotExist_OK() {

        Mockito.when(enrollmentRepository.getListUpComingByUserId(1L, 8)).thenReturn(enrollments);

        int numberOfTicket = 0;

        Assert.assertEquals(numberOfTicket, enrollmentService.getUpComingTicket(10L, 8).size());
    }


}
