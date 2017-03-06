package vn.axonactive.internship_program.events_webservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.axonactive.internship_program.events_webservice.entity.Category;

/**
 * Created by dtnhat on 12/22/2016.
 */
@Repository
public interface CategoryRepository extends JpaRepository<Category,Long>{
}
