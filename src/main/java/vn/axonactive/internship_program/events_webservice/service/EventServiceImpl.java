package vn.axonactive.internship_program.events_webservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import vn.axonactive.internship_program.events_webservice.entity.*;
import vn.axonactive.internship_program.events_webservice.repository.CategoryRepository;
import vn.axonactive.internship_program.events_webservice.repository.EnrollmentRepository;
import vn.axonactive.internship_program.events_webservice.repository.EventRepository;

import org.apache.commons.codec.binary.Base64;;
import java.util.ArrayList;
import java.util.List;
import java.util.HashSet;

@Service
public class EventServiceImpl implements EventService {

    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private EnrollmentService enrollmentService;
    @Autowired
    private UserService userService;
    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Override
    public Event createEventQuickly(Event event) {
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        String name = auth.toString();
        HashSet<Category> cats = new HashSet<Category>();
        for (Category category : event.getCategories()
                ) {
            category = categoryRepository.getOne(category.getId());
            cats.add(category);
        }
        event.setCategories(cats);
        Event newEvent = eventRepository.save(event);
        // Save Organizer
        String accountCode = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByAccountCode(accountCode);
        enrollmentService.becomeOrganizer(new EnrollmentPK(newEvent.getId(), user.getId()));
        return newEvent;
    }

    @Override
    public List<Event> getAll() {

        List<Event> events =  //eventRepository.findAll();
                eventRepository.findAllByOrderByCreateDateDesc();
        return events;
    }

    @Override
    public Event getEventDetail(Long eventId) {
        return this.eventRepository.findOne(eventId);
    }

    public List<Event> getAllEventSlideShow() {
//        System.out.println(eventRepository.findAllByOrderByImageCoverDesc().size());
        return eventRepository.findAllByOrderByImageCoverDesc();
    }

    @Override
    public List<Event> getUpcomingEvents(Long num) {

        return eventRepository.//findAllByOrderByCreateDateDesc();
                findUpcomingEvent(num);
    }

    @Override
    public Event updateEvent(Event event) {
        HashSet<Category> cats = new HashSet<Category>();
        for (Category category : event.getCategories()
                ) {
            category = categoryRepository.getOne(category.getId());
            cats.add(category);
        }
        event.setCategories(cats);
        if (eventRepository.exists(event.getId())) {
            String accountCode = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = userService.findByAccountCode(accountCode);
            EnrollmentPK enrollmentPK = new EnrollmentPK(event.getId(), user.getId());
            System.out.println(":____________________" + event.getId() + user.getId());
            if (enrollmentRepository.exists(enrollmentPK)) {
                Enrollment enrollment = enrollmentRepository.findOne(enrollmentPK);
                if (enrollment.getType() == 1) {
//                    System.out.println(":____________________");
//                    byte[] decodedBuffer = Base64.decodeBase64(event.getImageCover());
//                    event.setImageCover(event.getImageCover());
                    Event oldEvent = eventRepository.findOne(event.getId());
                    if(event.getImageCover()==null){
                        event.setImageCover(oldEvent.getImageCover());
                    }
                    return eventRepository.save(event);
                }
            }
            ;
        }
        return null;
    }

    @Override
    public Event getCreatedEvent(Long eventId) {
        String accountCode = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByAccountCode(accountCode);
        EnrollmentPK enrollmentPK = new EnrollmentPK(eventId, user.getId());
        if (enrollmentRepository.exists(enrollmentPK)) {
            Enrollment enrollment = enrollmentRepository.findOne(enrollmentPK);
            if (enrollment.getType() == 1) {
                return eventRepository.findOne(eventId);
            }
        }
        return null;
    }

    @Override
    public List<Event> getAllEventAfterCurrentDateByOneDay() {
        return this.eventRepository.getAllEventAfterCurrentDateByOneDay();
    }

    @Override
    public List<Event> getListLiveEventByUserId(Long id, Integer num) {
        return eventRepository.getListLiveEventByUserId(id, num);
    }

    @Override
    public List<Event> getListPassEventByUserId(Long id, Integer num) {
        return eventRepository.getListPassEventByUserId(id, num);
    }

    @Override
    public Event updateStatusEventByEventId(Long id, Integer status) {

        Event event = eventRepository.findOne(id);
        event.setStatus(status);

        return eventRepository.save(event);

    }

    @Override
    public Integer getSizeOfListLiveEventByUserId(Long id) {
        return eventRepository.getSizeOfListLiveEventByUserId(id);
    }

    @Override
    public Integer getSizeOfListPassEventByUserId(Long id) {
        return eventRepository.getSizeOfListPassEventByUserId(id);
    }

    @Override
    public List<Event> getNearByEvents(Double latitude, Double longitude, int num) {
        List<Event> events = eventRepository.findAllUpcomingEvents();
        List<Event> nearByEvents = new ArrayList<Event>();
        for(Event event: events){
            if(distance(latitude, event.getLatitude(), longitude, event.getLongitude(), 0L, 0L)<20000){
                if(nearByEvents.size()<num)
                    nearByEvents.add(event);
            }
        }
        return nearByEvents;
    }

    private double distance(double lat1, double lat2, double lon1,
                                  double lon2, double el1, double el2) {

        final int R = 6371; // Radius of the earth

        Double latDistance = Math.toRadians(lat2 - lat1);
        Double lonDistance = Math.toRadians(lon2 - lon1);
        Double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        Double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        double distance = R * c * 1000; // convert to meters

        double height = el1 - el2;

        distance = Math.pow(distance, 2) + Math.pow(height, 2);

        return Math.sqrt(distance);
    }
}
