package vn.axonactive.internship_program.events_webservice.service;

import vn.axonactive.internship_program.events_webservice.entity.Speaker;

import java.util.List;

/**
 * Created by phanvudinh on 1/2/2017.
 */
public interface SpeakerService {
    public Speaker create(Speaker speaker);
    public Speaker getById(long id);
    public List<Speaker> getSpeakerByEventId(long eventId);
    public void delete(long eventId);
    public Speaker update(long speakerId, Speaker speaker);
    public Speaker userOwnSpeakerByEvent(long speakerId,long userId);
}
