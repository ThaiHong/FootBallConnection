package vn.axonactive.internship_program.events_webservice.entity;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by dtnhat on 12/8/2016.
 */
@Entity
@Table(name = "bookmark_topic")
public class BookmarkTopic implements Serializable {
    private User user;
    private Topic topic;
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
    public Topic getTopic() {
        return topic;
    }

    public void setTopic(Topic topic) {
        this.topic = topic;
    }
}
