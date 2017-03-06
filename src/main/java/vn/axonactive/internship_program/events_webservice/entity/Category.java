package vn.axonactive.internship_program.events_webservice.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import org.hibernate.search.annotations.Analyzer;
import org.hibernate.search.annotations.Field;
import org.hibernate.search.annotations.Indexed;

import javax.persistence.*;
import java.util.Set;

/**
 * Created by dtnhat on 12/8/2016.
 */
@Entity
@Table(name = "category")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Category {
    private Long id;

    @Field
    @Analyzer(definition = "customAnalyzer")

    private String typeName;
    private String description;

    @JsonIgnore
    private Set<FavoriteCategory> favoriteCategories;


    public Category(Long id, String type, String description) {
        this.id = id;
        this.typeName = type;
        this.description = description;
    }

    public Category(){

    }

    @Id
    @GeneratedValue
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    @OneToMany(mappedBy = "category")
    public Set<FavoriteCategory> getFavoriteCategories() {
        return favoriteCategories;
    }

    public void setFavoriteCategories(Set<FavoriteCategory> favoriteCategories) {
        this.favoriteCategories = favoriteCategories;
    }
}
