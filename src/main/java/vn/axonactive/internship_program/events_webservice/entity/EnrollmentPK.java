package vn.axonactive.internship_program.events_webservice.entity;

import org.springframework.web.filter.OncePerRequestFilter;

import java.io.Serializable;

/**
 * Created by dctruc on 12/26/2016.
 */
public class EnrollmentPK implements Serializable {
    private Long event;
    private Long user;

    public Long getEvent() {
        return event;
    }

    public void setEvent(Long event) {
        this.event = event;
    }

    public Long getUser() {
        return user;
    }

    public void setUser(Long user) {
        this.user = user;
    }

    public int hashCode() {
        return (int)(event + user);
    }

    public boolean equals(Object object) {
        if (object instanceof EnrollmentPK) {
            EnrollmentPK otherId = (EnrollmentPK) object;
            return (otherId.event == this.event) && (otherId.user == this.user);
        }
        return false;
    }

    public EnrollmentPK(Long event, Long user) {
        this.event = event;
        this.user = user;
    }

    public EnrollmentPK(int event, int user) {
        this.event = new Long(event);
        this.user = new Long(user);
    }

    public EnrollmentPK(){}
}
