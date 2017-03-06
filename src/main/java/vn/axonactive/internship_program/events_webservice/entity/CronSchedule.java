package vn.axonactive.internship_program.events_webservice.entity;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by dtnhat on 1/11/2017.
 */

@Entity
public class CronSchedule {

    private Long id;
    private Date startDate;
    private String message;
    private  Event event;

    public CronSchedule(Long id, String message) {
        this.id = id;
        this.message = message;
    }
    public CronSchedule(){}

    @Id
    @GeneratedValue
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @ManyToOne
    @JoinColumn(name="event_id")
    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }
}
