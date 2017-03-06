package vn.axonactive.internship_program.events_webservice.service;

import vn.axonactive.internship_program.events_webservice.entity.Role;

import java.util.List;

/**
 * Created by nmtri on 12/20/2016.
 */
public interface RoleService{
    public List<Role> getAll();
    public boolean deleteAll();
    public Role create(String roleName);
    public Role findByRoleName(String roleName);
}
