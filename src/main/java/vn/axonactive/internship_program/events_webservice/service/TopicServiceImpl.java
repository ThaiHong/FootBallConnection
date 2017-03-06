package vn.axonactive.internship_program.events_webservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.axonactive.internship_program.events_webservice.entity.Topic;
import vn.axonactive.internship_program.events_webservice.entity.TopicSpeaker;
import vn.axonactive.internship_program.events_webservice.repository.EventRepository;
import vn.axonactive.internship_program.events_webservice.repository.SpeakerRepository;
import vn.axonactive.internship_program.events_webservice.repository.TopicRepository;
import vn.axonactive.internship_program.events_webservice.repository.TopicSpeakerRepository;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by phanvudinh on 1/4/2017.
 */
@Service
@Transactional
public class TopicServiceImpl implements TopicService {
    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private SpeakerRepository speakerRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private TopicSpeakerRepository topicSpeakerRepository;

    @Override
    public Topic create(Topic topic, long eventId) {
        Topic newTopic = new Topic();
        newTopic.setTitle(topic.getTitle());
        newTopic.setLocation(topic.getLocation());
        newTopic.setDescription(topic.getDescription());
        newTopic.setStartTime(topic.getStartTime());
        newTopic.setEndTime(topic.getEndTime());
        newTopic.setEvent(this.eventRepository.findOne(eventId));

        newTopic = this.topicRepository.save(newTopic);

        for(TopicSpeaker t: topic.getTopicSpeakers()){
            TopicSpeaker n = new TopicSpeaker(newTopic,this.speakerRepository.findOne(t.getSpeaker().getId()));
            this.topicSpeakerRepository.save(n);
        }

        return this.getById(newTopic.getId());
    }

    @Override
    public Topic getById(long id) {
        return this.topicRepository.findOne(id);
    }

    @Override
    public void delete(long id) {
        this.topicRepository.delete(id);
    }

    @Override
    public List<Topic> getTopicsByEventId(long eventId) {
        return this.topicRepository.getTopicsByEventId(eventId);
    }

    @Override
    public Topic update(Topic topic, long topicId) {
        Topic newTopic = this.topicRepository.findOne(topicId);

        newTopic.setTitle(topic.getTitle());
        newTopic.setLocation(topic.getLocation());
        newTopic.setDescription(topic.getDescription());
        newTopic.setStartTime(topic.getStartTime());
        newTopic.setEndTime(topic.getEndTime());

        this.topicSpeakerRepository.deleteAllSpeakerByTopicId(topicId);

        Set<TopicSpeaker> set = new HashSet<TopicSpeaker>();

        for(TopicSpeaker t: topic.getTopicSpeakers()){
            TopicSpeaker n = new TopicSpeaker(newTopic,this.speakerRepository.findOne(t.getSpeaker().getId()));
            set.add(n);
        }

        newTopic.setTopicSpeakers(set);

        return this.topicRepository.save(newTopic);
    }

    @Override
    public Topic userOwnTopicByEvent(Long topicId, Long userId) {
        return this.topicRepository.userOwnTopicByEvent(topicId,userId);
    }

    @Override
    public Topic getMaxDateTopicByEvent(Long eventId){
        return this.topicRepository.getMaxDateTopicByEvent(eventId);
    }

    @Override
    public Topic getMinDateTopicByEvent(Long eventId){
        return this.topicRepository.getMinDateTopicByEvent(eventId);
    }
}
