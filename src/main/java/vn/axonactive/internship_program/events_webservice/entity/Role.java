package vn.axonactive.internship_program.events_webservice.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import java.util.List;

/**
 * Created by phanvudinh on 11/5/2016.
 */
@Entity
@Table(name = "Role")
public class Role {
    private Integer roleId;
    private String roleName;
    private List<Permission> permissionList;

    public Role() {
    }

    public Role(Integer roleId, String roleName) {
        this.roleId = roleId;
        this.roleName = roleName;
    }
    @Id
    @Column(name = "roleId")
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }
    @Basic
    @Column(name = "roleName", nullable = false, unique = true)
    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }
    @OneToMany(mappedBy = "role")
    @LazyCollection(LazyCollectionOption.TRUE)
    @JsonIgnore
    public List<Permission> getPermissionList() {
        return permissionList;
    }

    public void setPermissionList(List<Permission> permissionList) {
        this.permissionList = permissionList;
    }
}
