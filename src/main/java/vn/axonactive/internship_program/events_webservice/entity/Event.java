package vn.axonactive.internship_program.events_webservice.entity;

import com.fasterxml.jackson.annotation.*;
import org.apache.lucene.analysis.core.LowerCaseFilterFactory;
import org.apache.lucene.analysis.miscellaneous.ASCIIFoldingFilterFactory;
import org.apache.lucene.analysis.ngram.NGramFilterFactory;
import org.apache.lucene.analysis.snowball.SnowballPorterFilterFactory;
import org.apache.lucene.analysis.standard.StandardTokenizerFactory;
import org.hibernate.search.annotations.Parameter;
import org.hibernate.annotations.Target;
import org.hibernate.search.annotations.*;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.search.bridge.StringBridge;
import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.beans.factory.annotation.Autowired;
import vn.axonactive.internship_program.events_webservice.repository.CategoryRepository;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by dtnhat on 12/8/2016.
 */
@Entity
@Indexed
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@JsonFilter("filter.Event")
@JsonInclude(JsonInclude.Include.NON_NULL)
@AnalyzerDef(name = "customAnalyzer",
        tokenizer = @TokenizerDef(factory = StandardTokenizerFactory.class),
        filters = {
                @TokenFilterDef(factory = ASCIIFoldingFilterFactory.class),
                @TokenFilterDef(factory = LowerCaseFilterFactory.class),
                @TokenFilterDef(factory = SnowballPorterFilterFactory.class, params = {
                        @Parameter(name = "language", value = "English")
                })

        })
public class Event {

    private Long id;
    private String organizerName;

    @Field
    @NotEmpty (message = "error.event.title.notnull")
    @Analyzer(definition = "customAnalyzer")
    private String title;

    @Field
    @Analyzer(definition = "customAnalyzer")
    private String description;
    private Integer numberOfParticipants;
    @NotEmpty (message = "error.event.address.notnull")
    private String address;

    @Field
    @NotEmpty (message = "error.event.location.notnull")
    @Analyzer(definition = "customAnalyzer")
    private String location;
    private Double latitude;
    private Double longitude;
    private Date createDate;
    private Date startDate;
    @Field(analyze = Analyze.NO)
    private Date endDate;
    private String imageCover;
    private String imageLogo;
    private String optionalChoices;
    /*
     * 0 private
     * 1 public
     */
    private Integer status = 0;
    private Set<Topic> topics;
    private Set<Enrollment> enrollments;

    @IndexedEmbedded
    @Target(Category.class)
    private Set<Category> categories;
    private Set<Sponsor> sponsors;
    private List<Speaker> speakers;
    private Set<CronSchedule> cronSchedules;

    public Event(Long id, String title, String address, String location, Double latitude, Double longitude, Date startDate, Date endDate, Set<Category> categories) {
        this.id = id;
        this.title = title;
        this.address = address;
        this.location = location;
        this.latitude = latitude;
        this.longitude = longitude;
        this.startDate = startDate;
        this.endDate = endDate;
        this.categories = categories;
    }

    public Event(Long id, String title, String address) {
        this.id = id;
        this.title = title;
        this.address = address;
    }

    public Event() {

    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrganizerName() {
        return organizerName;
    }

    public void setOrganizerName(String organizerName) {
        this.organizerName = organizerName;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Column(columnDefinition = "TEXT")
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getNumberOfParticipants() {
        return numberOfParticipants;
    }

    public void setNumberOfParticipants(Integer numberOfParticipants) {
        this.numberOfParticipants = numberOfParticipants;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
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

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

 //   @Lob
//    @Column(columnDefinition = "LONGBLOB")
    public String getImageCover() {
        return imageCover;
    }

    public void setImageCover(String imageCover) {
        this.imageCover = imageCover;
    }

//    @Lob
//    @Column(columnDefinition = "LONGBLOB")
    public String getImageLogo() {
        return imageLogo;
    }

    public void setImageLogo(String imageLogo) {
        this.imageLogo = imageLogo;
    }

    public String getOptionalChoices() {
        return optionalChoices;
    }

    public void setOptionalChoices(String optionalChoices) {
        this.optionalChoices = optionalChoices;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    @OrderBy("start_time ASC")
    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    public Set<Topic> getTopics() {
        return topics;
    }

    public void setTopics(Set<Topic> topics) {
        this.topics = topics;
    }

    @OneToMany(mappedBy = "event",fetch = FetchType.EAGER)
    @JsonIgnore
    public Set<Enrollment> getEnrollments() {
        return enrollments;
    }

    public void setEnrollments(Set<Enrollment> enrollments) {
        this.enrollments = enrollments;
    }

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "event_category", joinColumns = @JoinColumn(name = "event_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "category_id", referencedColumnName = "id"))
    public Set<Category> getCategories() {
        return categories;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }

    @OneToMany(mappedBy = "event",cascade = CascadeType.ALL)
    public Set<Sponsor> getSponsors() {
        return sponsors;
    }

    public void setSponsors(Set<Sponsor> sponsors) {
        this.sponsors = sponsors;
    }
    @OneToMany(mappedBy = "event")
    @LazyCollection(LazyCollectionOption.TRUE)
    public List<Speaker> getSpeakers() {
        return speakers;
    }

    public void setSpeakers(List<Speaker> speakers) {
        this.speakers = speakers;
    }

    @OneToMany(mappedBy = "event",cascade = CascadeType.ALL)
    @JsonIgnore
    public Set<CronSchedule> getCronSchedules() {
        return cronSchedules;
    }

    public void setCronSchedules(Set<CronSchedule> cronSchedules) {
        this.cronSchedules = cronSchedules;
    }
}
