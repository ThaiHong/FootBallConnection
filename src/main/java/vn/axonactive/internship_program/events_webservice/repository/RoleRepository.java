package vn.axonactive.internship_program.events_webservice.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import vn.axonactive.internship_program.events_webservice.entity.Role;

/**
 * Created by nmtri on 12/20/2016.
 */
@Repository
public interface RoleRepository extends PagingAndSortingRepository<Role, Long> {
    public Role findByRoleName(String roleName);
}
