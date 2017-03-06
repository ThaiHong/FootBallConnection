package vn.axonactive.internship_program.events_webservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.Type;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Set;

/**
 * Created by pvdinh on 1/2/2017.
 */

@Entity
@Table(name = "speaker")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Speaker implements Serializable{
    private Long id;

    @NotEmpty  (message = "error.speaker.name.notnull")
    private String name;
    private int age;
    private String address;
    @Email (message = "error.speaker.email.invalid")
    private String email;
    private String facebook;
    private String linkedIn;
    private String twitter;
    private String avatar;
    private String phone;
    private String major;
    private String description;

    private Event event;
    private List<TopicSpeaker> topicSpeakers;

    public Speaker(Long id, String name, String address, String email, String phone, String description) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.email = email;
        this.phone = phone;
        this.description = description;
    }

    public Speaker(){

    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Basic
    @Column(name = "name", nullable = false)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "age")
    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Basic
    @Column(name = "email")
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Basic
    @Column(name = "address")
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Basic
    @Column(name = "facebook")
    public String getFacebook() {
        return facebook;
    }

    public void setFacebook(String facebook) {
        this.facebook = facebook;
    }

    @Basic
    @Column(name = "linked_in")
    public String getLinkedIn() {
        return linkedIn;
    }

    public void setLinkedIn(String linkedIn) {
        this.linkedIn = linkedIn;
    }

    @Lob
    @Column(name = "avatar", columnDefinition = "VARCHAR(255)")
    public String getAvatar(){
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    @Basic
    @Column(name = "twitter")
    public String getTwitter() {
        return twitter;
    }

    public void setTwitter(String twitter) {
        this.twitter = twitter;
    }

    @Basic
    @Column(name = "phone")
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Basic
    @Column(name = "major")
    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    @Basic
    @Column(name = "description")
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "event", referencedColumnName = "id", nullable = false)
    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }
    @JsonIgnore
    @OneToMany(mappedBy = "speaker")
    @LazyCollection(LazyCollectionOption.TRUE)
    public List<TopicSpeaker> getTopicSpeakers() {
        return topicSpeakers;
    }

    public void setTopicSpeakers(List<TopicSpeaker> topicSpeakers) {
        this.topicSpeakers = topicSpeakers;
    }


    @Override
    public String toString() {
        return "Speaker{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", age=" + age +
                ", email='" + email + '\'' +
                '}';
    }
}
