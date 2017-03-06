package vn.axonactive.internship_program.events_webservice.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by dtnhat on 12/8/2016.
 */
@Entity
@Table(name="topic_speaker")
public class TopicSpeaker implements Serializable{
    private long id;
    private Topic topic;
    private Speaker speaker;

    public TopicSpeaker() {
    }

    public TopicSpeaker(Topic topic, Speaker speaker) {
        this.topic = topic;
        this.speaker = speaker;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "topic_id")
    public Topic getTopic() {
        return topic;
    }

    public void setTopic(Topic topic) {
        this.topic = topic;
    }

    @ManyToOne
    @JoinColumn(name = "speaker_id")
    public Speaker getSpeaker() {
        return speaker;
    }

    public void setSpeaker(Speaker speaker) {
        this.speaker = speaker;
    }
}
