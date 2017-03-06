package vn.axonactive.internship_program.events_webservice.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import vn.axonactive.internship_program.events_webservice.entity.Permission;
import vn.axonactive.internship_program.events_webservice.entity.Role;

/**
 * Created by pvdinh on 12/27/2016.
 */
@Repository
public interface PermissionRepository extends PagingAndSortingRepository<Permission, Integer> {
}
