package vn.axonactive.internship_program.events_webservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.axonactive.internship_program.events_webservice.entity.Permission;
import vn.axonactive.internship_program.events_webservice.entity.Role;
import vn.axonactive.internship_program.events_webservice.entity.User;
import vn.axonactive.internship_program.events_webservice.repository.PermissionRepository;

import javax.transaction.Transactional;

/**
 * Created by pvdinh on 12/27/2016.
 */
@Service
@Transactional
public class PermissionServiceImpl implements PermissionService {

    @Autowired
    private PermissionRepository permissionRepository;

    @Override
    public Permission create(User user, Role role) {
        Permission permission = new Permission();
        permission.setRole(role);
        permission.setUser(user);
        return this.permissionRepository.save(permission);
    }
}
