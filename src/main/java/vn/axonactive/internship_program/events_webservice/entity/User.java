package vn.axonactive.internship_program.events_webservice.entity;

import com.fasterxml.jackson.annotation.*;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.search.annotations.Analyzer;
import org.hibernate.search.annotations.Field;
import org.hibernate.search.annotations.Indexed;
import org.hibernate.search.annotations.IndexedEmbedded;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;
import vn.axonactive.internship_program.events_webservice.common.AccountTypeEnum;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;



/**
 * Created by dtnhat on 12/8/2016.
 */



@Entity
@JsonFilter("filter.User")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class User {

    private Long id;
    private String password;
    private String email;//ensure , except facebook account


    private String fullName;
    private int gender;
    private String avatar;
    private Date birthday;
    private String phone;
    private String address;
    private String district;
    private String province;
    private String country;
    private String rangeAge;
    private String job;
    private boolean ignoreJoin;
    private Set<Enrollment> enrollments;
    private Set<RatingTopic> ratingTopics;
    private Set<BookmarkTopic> bookmarkTopics;
    private Set<FavoriteCategory> favoriteCategories;
    private List<Permission> permissionList = new ArrayList<>();
    private String accessToken;
    private String accountType;
    private String accountCode;
    private String interest;
    private Integer optionalAllEmailReminder = 1;


    public User(Long id, Integer optionalAllEmailReminder) {
        this.id = id;
        this.optionalAllEmailReminder = optionalAllEmailReminder;
    }

    public User(Long id, String email, String password, String fullName) {
        this.id = id;
        this.password = password;
        this.email = email;
        this.fullName = fullName;
    }

    public User() {
    }

    @Id
    @GeneratedValue
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }


    @Column(unique = true)
    @Email
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullName() {
        return fullName;
    }
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public int getGender() {
        return gender;
    }
    public void setGender(int gender) {
        this.gender = gender;
    }
    public String getAvatar() {
        return avatar;
    }
    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
    public Date getBirthday() {
        return birthday;
    }
    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public String getDistrict() {
        return district;
    }
    public void setDistrict(String district) {
        this.district = district;
    }
    public String getProvince() {
        return province;
    }
    public void setProvince(String province) {
        this.province = province;
    }
    public String getCountry() {
        return country;
    }
    public void setCountry(String country) {
        this.country = country;
    }
    public String getAccessToken() {
        return accessToken;
    }
    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    @Basic
    @Column(columnDefinition = "VARCHAR(30)")
    public String getAccountType() {
        return accountType;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }
    public boolean isIgnoreJoin() {
        return ignoreJoin;
    }
    public void setIgnoreJoin(boolean ignoreJoin) {
        this.ignoreJoin = ignoreJoin;
    }
    @Basic
    @Column(unique = true)
    public String getAccountCode() {
        return accountCode;
    }
    public void setAccountCode(String accountCode) {
        this.accountCode = accountCode;
    }
    public void setRangeAge(String rangeAge) {
        this.rangeAge = rangeAge;
    }
    public String getRangeAge() {
        return rangeAge;
    }
    public String getJob() {
        return job;
    }
    public void setJob(String job) {
        this.job = job;
    }
    @JsonIgnore
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL, orphanRemoval = true)
    public Set<Enrollment> getEnrollments() {
        return enrollments;
    }
    public void setEnrollments(Set<Enrollment> enrollments) {
        this.enrollments = enrollments;
    }
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    public Set<RatingTopic> getRatingTopics() {
        return ratingTopics;
    }
    public void setRatingTopics(Set<RatingTopic> ratingTopics) {
        this.ratingTopics = ratingTopics;
    }
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    public Set<BookmarkTopic> getBookmarkTopics() {
        return bookmarkTopics;
    }
    public void setBookmarkTopics(Set<BookmarkTopic> bookmarkTopics) {
        this.bookmarkTopics = bookmarkTopics;
    }
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    public Set<FavoriteCategory> getFavoriteCategories() {
        return favoriteCategories;
    }
    public void setFavoriteCategories(Set<FavoriteCategory> favoriteCategories) {
        this.favoriteCategories = favoriteCategories;
    }
    @OneToMany(mappedBy = "user")
    @LazyCollection(LazyCollectionOption.TRUE)
    @JsonIgnore
    public List<Permission> getPermissionList() {
        return permissionList;
    }
    public void setPermissionList(List<Permission> permissionList) {
        this.permissionList = permissionList;
    }


    @Basic
    @Column(name = "interest")
    public String getInterest() {
        return interest;
    }

    public void setInterest(String interest) {
        this.interest = interest;
    }
    @Column(name = "optionalAllEmailReminder")
    public Integer getOptionalAllEmailReminder() {
        return optionalAllEmailReminder;
    }

    public void setOptionalAllEmailReminder(Integer optionalAllEmailReminder) {
        this.optionalAllEmailReminder = optionalAllEmailReminder;
    }
}
