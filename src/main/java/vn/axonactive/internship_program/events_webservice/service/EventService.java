package vn.axonactive.internship_program.events_webservice.service;

import vn.axonactive.internship_program.events_webservice.entity.Event;

import java.util.List;

/**
 * Created by dtnhat on 12/22/2016.
 */
public interface EventService {
    Event createEventQuickly(Event event);
    List<Event> getAll();
    Event getEventDetail(Long eventId);
    List<Event> getAllEventSlideShow();
    List<Event> getUpcomingEvents(Long num);
    Event updateEvent(Event event);
    Event getCreatedEvent(Long eventId);
    List<Event> getAllEventAfterCurrentDateByOneDay();
    List<Event> getListLiveEventByUserId(Long id, Integer num);
    List<Event> getListPassEventByUserId(Long id, Integer num);
    Event updateStatusEventByEventId(Long id, Integer status);
    Integer getSizeOfListLiveEventByUserId(Long id);
    Integer getSizeOfListPassEventByUserId(Long id);
    List<Event> getNearByEvents(Double latitude, Double longitude, int num);
}
