package vn.axonactive.internship_program.events_webservice.entity;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by dtnhat on 12/8/2016.
 */
@Entity
@Table(name = "favorite_category")
public class FavoriteCategory implements Serializable{
    private User user;
    private Category category;

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
    @JoinColumn(name = "category_id")

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
