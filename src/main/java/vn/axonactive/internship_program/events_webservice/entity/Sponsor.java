package vn.axonactive.internship_program.events_webservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * Created by dctruc on 1/3/2017.
 */
@Entity
@Table(name = "sponsor")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Sponsor {

    private Long id;
    @NotEmpty (message = "error.sponsor.sponsorname.notnull")
    private String sponsorName;
    private String description;
    private String image;
    private Double latitude;
    private Double longitude;
    private Event event;
    private String location;

    public Sponsor(Long id, String sponsorName, String description, String location) {
        this.id = id;
        this.sponsorName = sponsorName;
        this.description = description;
        this.location = location;
    }


    public Sponsor() {

    }

    @Id
    @GeneratedValue
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSponsorName() {
        return sponsorName;
    }

    public void setSponsorName(String sponsorName) {
        this.sponsorName = sponsorName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "event_id")
    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }
}
