package vn.axonactive.internship_program.events_webservice.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.axonactive.internship_program.events_webservice.entity.Role;
import vn.axonactive.internship_program.events_webservice.entity.Speaker;

import java.util.List;

/**
 * Created by phanvudinh on 1/2/2017.
 */
@Repository
public interface SpeakerRepository extends PagingAndSortingRepository<Speaker, Long> {
    @Query("select s from Speaker s where s.event.id = :eventId")
    List<Speaker> getSpeakerByEventId(@Param("eventId") long eventId);

    @Query(value = "SELECT s.* from speaker s INNER JOIN event e on s.event = e.id INNER JOIN enrollment en on e.id = en.event_id WHERE s.id = :speakerId AND en.user_id = :userId AND en.type = 1", nativeQuery = true)
    Speaker userOwnSpeakerByEvent(@Param("speakerId") long speakerId, @Param("userId") long userId);
}
