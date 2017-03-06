package vn.axonactive.internship_program.events_webservice.service;

import vn.axonactive.internship_program.events_webservice.entity.Topic;

import java.util.List;

/**
 * Created by phanvudinh on 1/4/2017.
 */
public interface TopicService {
    public Topic create(Topic topic,long eventId);
    public Topic getById(long id);
    public void delete(long id);
    public List<Topic> getTopicsByEventId(long eventId);
    public Topic update(Topic topic,long topicId);
    public Topic userOwnTopicByEvent(Long topicId, Long userId);
    public Topic getMaxDateTopicByEvent(Long eventId);
    public Topic getMinDateTopicByEvent(Long eventId);
}
