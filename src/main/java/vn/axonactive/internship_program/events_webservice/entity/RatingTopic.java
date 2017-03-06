package vn.axonactive.internship_program.events_webservice.entity;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by dtnhat on 12/8/2016.
 */
@Entity
@Table(name="rating_topic")
public class RatingTopic implements Serializable{
    private User user;
    private Topic topic;
    private Float score;

    @Id
    @ManyToOne
    @JoinColumn(name = "user_id")
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Id
    @ManyToOne
    @JoinColumn(name = "topic_id")
    public Topic getTopic() {return topic;}
    public void setTopic(Topic topic) {
        this.topic = topic;
    }

    @Column(name = "score")
    public Float getScore() {
        return score;
    }

    public void setScore(Float score) {
        this.score = score;
    }
}
