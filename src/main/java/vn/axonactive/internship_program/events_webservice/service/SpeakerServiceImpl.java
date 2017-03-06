package vn.axonactive.internship_program.events_webservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.axonactive.internship_program.events_webservice.entity.Speaker;
import vn.axonactive.internship_program.events_webservice.repository.SpeakerRepository;

import java.util.List;

/**
 * Created by phanvudinh on 1/2/2017.
 */
@Service
@Transactional
public class SpeakerServiceImpl implements SpeakerService {
    @Autowired
    private SpeakerRepository speakerRepository;

    @Override
    public Speaker create(Speaker speaker) {
        return this.speakerRepository.save(speaker);
    }

    @Override
    public Speaker getById(long id) {
        return this.speakerRepository.findOne(id);
    }

    @Override
    public List<Speaker> getSpeakerByEventId(long eventId) {
        return this.speakerRepository.getSpeakerByEventId(eventId);
    }

    @Override
    public void delete(long eventId) {
        this.speakerRepository.delete(eventId);
    }

    @Override
    public Speaker update(long speakerId, Speaker speaker) {
        Speaker updateSpeaker = this.speakerRepository.findOne(speakerId);
        updateSpeaker.setName(speaker.getName());
        updateSpeaker.setMajor(speaker.getMajor());
        updateSpeaker.setEmail(speaker.getEmail());
        updateSpeaker.setLinkedIn(speaker.getLinkedIn());
        updateSpeaker.setPhone(speaker.getPhone());
        updateSpeaker.setDescription(speaker.getDescription());
        if(speaker.getAvatar() != null) updateSpeaker.setAvatar(speaker.getAvatar());
        return this.speakerRepository.save(updateSpeaker);
    }

    @Override
    public Speaker userOwnSpeakerByEvent(long speakerId,long userId) {
        return this.speakerRepository.userOwnSpeakerByEvent(speakerId,userId);
    }
}
