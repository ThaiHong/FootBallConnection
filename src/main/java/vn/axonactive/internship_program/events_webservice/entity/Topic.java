package vn.axonactive.internship_program.events_webservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;
import java.util.Set;

/**
 * Created by dtnhat on 12/8/2016.
 */

@Entity
@Table(name="topic")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Topic {
    private Long id;

    @NotEmpty  (message = "error.topic.title.notnull")
    private String title;
    private String description;
    @NotEmpty  (message = "error.topic.location.notnull")
    private String location;
    private Date startTime;
    private Date endTime;
    private Event event;
    private Set<TopicSpeaker> topicSpeakers;

    private Set<RatingTopic> ratingTopics;
    private Set<BookmarkTopic> bookmarkTopics;

    public Topic(){}
    public Topic(Long id, String title, String description, String location) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.location = location;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    @ManyToOne
    @JoinColumn(name="event_id")
    @JsonIgnore
    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    @OneToMany(mappedBy = "topic", cascade = CascadeType.ALL)
    @LazyCollection(LazyCollectionOption.TRUE)
    public Set<TopicSpeaker> getTopicSpeakers() {
        return topicSpeakers;
    }

    public void setTopicSpeakers(Set<TopicSpeaker> topicSpeakers) {
        this.topicSpeakers = topicSpeakers;
    }

    @JsonIgnore
    @OneToMany(mappedBy = "topic")
    public Set<RatingTopic> getRatingTopics() {
        return ratingTopics;
    }

    public void setRatingTopics(Set<RatingTopic> ratingTopics) {
        this.ratingTopics = ratingTopics;
    }
    @JsonIgnore
    @OneToMany(mappedBy = "topic")
    public Set<BookmarkTopic> getBookmarkTopics() {
        return bookmarkTopics;
    }

    public void setBookmarkTopics(Set<BookmarkTopic> bookmarkTopics) {
        this.bookmarkTopics = bookmarkTopics;
    }
}
