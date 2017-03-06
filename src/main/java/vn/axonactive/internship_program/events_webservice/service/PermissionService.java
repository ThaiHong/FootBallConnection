package vn.axonactive.internship_program.events_webservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import vn.axonactive.internship_program.events_webservice.entity.Permission;
import vn.axonactive.internship_program.events_webservice.entity.Role;
import vn.axonactive.internship_program.events_webservice.entity.User;
import vn.axonactive.internship_program.events_webservice.repository.PermissionRepository;

/**
 * Created by pvdinh on 12/27/2016.
 */
public interface PermissionService {
    public Permission create(User user, Role role);
}
