package vn.axonactive.internship_program.events_webservice.entity;

import com.fasterxml.jackson.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import vn.axonactive.internship_program.events_webservice.repository.EventRepository;
import vn.axonactive.internship_program.events_webservice.repository.UserRepository;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * Created by dtnhat on 12/8/2016.
 */
@JsonFilter("filter.Enrollment")
@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity
@Table(name = "enrollment")
@IdClass(EnrollmentPK.class)
public class Enrollment implements Serializable {
    private User user;
    private Event event;
    private Date enrollDate;
    private String authorizationCode;
    private String optionalChoice;
    private int confirm;
    private int checkIn;
    private Integer optionalEmailReminder = 1;
    private int type;

    @Id
    @ManyToOne
    @JoinColumn(name = "user_id")
//    @JsonIgnore
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Id
    @ManyToOne
    @JoinColumn(name = "event_id")
//    @JsonIgnore
    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    @Column(name = "enrollDate")
    public Date getEnrollDate() {
        return enrollDate;
    }

    public void setEnrollDate(Date enrollDate) {
        this.enrollDate = enrollDate;
    }

    @Column(name = "authorizationCode")
    public String getAuthorizationCode() {
        return authorizationCode;
    }

    public void setAuthorizationCode(String authorizationCode) {
        this.authorizationCode = authorizationCode;
    }

    @Column(name = "optionalChoice")
    public String getOptionalChoice() {
        return optionalChoice;
    }

    public void setOptionalChoice(String optionalChoice) {
        this.optionalChoice = optionalChoice;
    }

    @Column(name = "optionalEmailReminder")
    public Integer getOptionalEmailReminder() {
        return optionalEmailReminder;
    }

    public void setOptionalEmailReminder(Integer optionalEmailReminder) {
        this.optionalEmailReminder = optionalEmailReminder;
    }

    @Column(name = "type")
    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    @Column(name = "confirm", nullable = false, columnDefinition = "TINYINT(1)")
    public int getConfirm() {
        return confirm;
    }

    public void setConfirm(int confirm) {
        this.confirm = confirm;
    }

    @Column(name = "checkIn", nullable = false, columnDefinition = "TINYINT(1)")
    public int getCheckIn() {
        return checkIn;
    }

    public void setCheckIn(int checkIn) {
        this.checkIn = checkIn;
    }

    public Enrollment(User user, Event event, Date enrollDate, String authorizationCode, String optionalChoice, int type) {
        this.user = user;
        this.event = event;
        this.enrollDate = enrollDate;
        this.authorizationCode = authorizationCode;
        this.optionalChoice = optionalChoice;
        this.type = type;
    }

    public Enrollment() {

    }

}
