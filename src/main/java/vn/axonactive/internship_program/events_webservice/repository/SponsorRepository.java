package vn.axonactive.internship_program.events_webservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.axonactive.internship_program.events_webservice.entity.Sponsor;

import java.util.List;

/**
 * Created by dctruc on 1/3/2017.
 */

@Repository
public interface SponsorRepository extends JpaRepository<Sponsor,Long> {

    @Query(value="SELECT * FROM sponsor WHERE event_id = ?1", nativeQuery=true)
    List<Sponsor> findSponsorsByEventId(Long sponsorId);

}
