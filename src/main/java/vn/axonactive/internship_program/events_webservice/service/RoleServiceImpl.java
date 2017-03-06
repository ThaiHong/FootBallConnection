package vn.axonactive.internship_program.events_webservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.axonactive.internship_program.events_webservice.entity.Role;
import vn.axonactive.internship_program.events_webservice.repository.RoleRepository;

import java.util.List;

/**
 * Created by nmtri on 12/20/2016.
 */
@Service
@Transactional
public class RoleServiceImpl implements RoleService{
    @Autowired
    RoleRepository roleRepository;
    @Override
    public List<Role> getAll() {
        return (List<Role>) this.roleRepository.findAll();
    }

    @Override
    public boolean deleteAll() {
        return false;
    }

    @Override
    public Role create(String roleName) {
        Role role = new Role();
        role.setRoleName(roleName);
        return this.roleRepository.save(role);
    }

    @Override
    public Role findByRoleName(String roleName) {

        return this.roleRepository.findByRoleName(roleName);
    }
}
