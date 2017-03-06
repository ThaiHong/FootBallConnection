package vn.axonactive.internship_program.events_webservice.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

/**
 * Created by phanvudinh on 11/5/2016.
 */
@Entity
@Table(name = "Permission")
public class Permission {
    private Integer permissionId;
    private Role role;
    private User user;

    public Permission() {
    }

    public Permission(Integer permissionId, Role role, User user) {
        this.permissionId = permissionId;
        this.role = role;
        this.user = user;
    }

    public Permission(Role role, User user) {
        this.role = role;
        this.user = user;
    }




    @Id
    @Column(name = "permissionId")
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Integer getPermissionId() {
        return permissionId;
    }

    public void setPermissionId(Integer permissionId) {
        this.permissionId = permissionId;
    }
    @ManyToOne
    @JoinColumn(name = "role", referencedColumnName = "roleId", nullable = false)
    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
    @ManyToOne
    @JoinColumn(name = "user", nullable = false)
    @JsonIgnore
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
