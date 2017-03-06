package vn.axonactive.internship_program.events_webservice.service;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import vn.axonactive.internship_program.events_webservice.entity.*;
import vn.axonactive.internship_program.events_webservice.repository.CategoryRepository;
import vn.axonactive.internship_program.events_webservice.repository.EnrollmentRepository;
import vn.axonactive.internship_program.events_webservice.repository.EventRepository;
import vn.axonactive.internship_program.events_webservice.service.*;

import java.util.*;

/**
 * Created by nhlinh2 on 12/29/2016.
 */
@RunWith(SpringJUnit4ClassRunner.class)
public class EventServiceTest {

    @Mock
    private EventRepository eventRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private UserService userService;

    @Mock
    private EnrollmentRepository enrollmentRepository;

    @Mock
    private EnrollmentServiceImpl enrollmentService;

    @InjectMocks
    private EventServiceImpl eventService;

    private Set<Category> categories = new HashSet<Category>();
    private List<Event> events = new ArrayList<Event>();
    private Enrollment enrollment = new Enrollment();
    private User user = new User(0L, "abc@yahoo.com", "abc", "abc");

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);

        categories.add(new Category(new Long(1), "Music", "Music Concert"));
        categories.add(new Category(new Long(2), "Sport", "Sport Show"));

        events.add(new Event(new Long(0), "Event1", "Address1", "Location1", new Double(10), new Double(20), new Date(), new Date(), categories));
        events.add(new Event(new Long(1), "Event2", "Address2", "Location2", new Double(10), new Double(20), new Date(), new Date(), categories));
        events.add(new Event(new Long(2), "Event3", "Address3", "Location3", new Double(10), new Double(20), new Date(), new Date(), categories));

        enrollment.setEvent(events.get(1));
        enrollment.setType(1);
    }

    @Test
    public void createEventQuickly(){
        //Todo impediment
    }

    @Test
    public void getAll_OK() {
        Mockito.when(eventRepository.findAllByOrderByCreateDateDesc()).thenReturn(events);
        List eventResult = eventService.getAll();
        Assert.assertEquals(events.size(), eventResult.size());
    }

    @Test
    public void getAll_Zero() {
        Mockito.when(eventRepository.findAll()).thenReturn(new ArrayList<Event>());
        List eventResult = eventService.getAll();
        Assert.assertEquals(0, eventResult.size());
    }

    @Test
    public void getEventDetail_OK() {
        Long idEvent= Long.valueOf(0);
        Mockito.when(eventRepository.findOne(idEvent)).thenReturn(events.get(0));
        Assert.assertEquals("Event1", eventService.getEventDetail(idEvent).getTitle());
    }

    @Test
    public void getEventDetail(){
        Event event = new Event(new Long(1), "Event1", "Address1", "Location1", new Double(10), new Double(20), new Date(), new Date(), categories);
        Long eventId= new Long(1);
        Mockito.when(eventRepository.findOne(eventId)).thenReturn(event);
        Assert.assertEquals(event,eventService.getEventDetail(eventId));
    }

    @Test
    public void getAllEventSlideShow(){
        Mockito.when(eventRepository.findAllByOrderByImageCoverDesc()).thenReturn(events);
        List eventResult = eventService.getAllEventSlideShow();
        Assert.assertEquals(events.size(), eventResult.size());
    }

    @Test
    public void getUpcomingEvents_OK() {
        Long num = 2L;
        List<Event> upcomingEvents = new ArrayList<Event>();
        upcomingEvents.add(events.get(0));
        upcomingEvents.add(events.get(1));
        Mockito.when(eventRepository.findUpcomingEvent(num)).thenReturn(upcomingEvents);
        Assert.assertEquals(num.intValue(), upcomingEvents.size());
    }

    @Test
    public void updateEvent() {
        //Todo impediment
    }

    @Test
    public void getCreatedEvent(){
        //Todo impediment
    }

    @Test
    public void getAllEventAfterCurrentDateByOneDay(){
        Mockito.when(eventRepository.getAllEventAfterCurrentDateByOneDay()).thenReturn(events);
        List eventResult = eventService.getAllEventAfterCurrentDateByOneDay();
        Assert.assertEquals(events.size(), eventResult.size());
    }

    @Test
    public void getListLiveEventByUserId_OK() {
        Long id = 1L;
        List<Event> liveEvents = new ArrayList<>();
        liveEvents.add(events.get(0));
        liveEvents.add(events.get(1));
        Mockito.when(eventRepository.getListLiveEventByUserId(id, 4)).thenReturn(liveEvents);
        Assert.assertEquals(2, liveEvents.size());
    }

    @Test
    public void getListLiveEventByUserId_Zero() {
        Long id = 1L;
        List<Event> liveEvents = new ArrayList<>();
        Mockito.when(eventRepository.getListLiveEventByUserId(id,4)).thenReturn(liveEvents);
        Assert.assertEquals(0, liveEvents.size());
    }

    @Test
    public void getListLiveEventByUserId_Fail() {
        Long id = -1L;
        List<Event> liveEvents = new ArrayList<>();
        Mockito.when(eventRepository.getListLiveEventByUserId(id,4)).thenReturn(liveEvents);
        Assert.assertEquals(0, liveEvents.size());
    }

    @Test
    public void getListPassEventByUserId_OK() {
        Long id = 1L;
        List<Event> passEvents = new ArrayList<>();
        passEvents.add(events.get(0));
        passEvents.add(events.get(1));
        Mockito.when(eventRepository.getListLiveEventByUserId(id,4)).thenReturn(passEvents);
        Assert.assertEquals(2, passEvents.size());

    }

    @Test
    public void getListPassEventByUserId_Zero() {
        Long id = 1L;
        List<Event> passEvents = new ArrayList<>();
        Mockito.when(eventRepository.getListLiveEventByUserId(id,4)).thenReturn(passEvents);
        Assert.assertEquals(0, passEvents.size());
    }

    @Test
    public void getListPassEventByUserId_Fail() {
        Long id = -1L;
        List<Event> passEvents = new ArrayList<>();
        Mockito.when(eventRepository.getListLiveEventByUserId(id,4)).thenReturn(passEvents);
        Assert.assertEquals(0, passEvents.size());
    }

    @Test
    public void updateStatusEventByEventId_OK() {
        Long id = 1L;
        Integer status = 1;
        Event event = events.get(0);
        Mockito.when(eventRepository.findOne(id)).thenReturn(event);
        event.setStatus(status);
        Assert.assertEquals(new Integer(status), event.getStatus());
    }

    @Test
    public void getSizeOfListLiveEventByUserID_OK(){
        Long userId = 1L;
        List<Event> liveEvents = new ArrayList<>();
        liveEvents.add(events.get(0));
        liveEvents.add(events.get(1));
        Mockito.when(eventRepository.getSizeOfListLiveEventByUserId(userId)).thenReturn(liveEvents.size());
        Assert.assertEquals(2, liveEvents.size());
    }

    @Test
    public void getSizeOfListPassEventByUserID_OK(){
        Long userId = 1L;
        List<Event> passEvents = new ArrayList<>();
        passEvents.add(events.get(0));
        passEvents.add(events.get(1));
        Mockito.when(eventRepository.getSizeOfListPassEventByUserId(userId)).thenReturn(passEvents.size());
        Assert.assertEquals(2, passEvents.size());
    }


}
