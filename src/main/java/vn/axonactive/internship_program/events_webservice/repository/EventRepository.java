package vn.axonactive.internship_program.events_webservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;
import vn.axonactive.internship_program.events_webservice.entity.Enrollment;
import vn.axonactive.internship_program.events_webservice.entity.Event;

import java.util.List;

/**
 * Created by dtnhat on 12/22/2016.
 */
@Repository
public interface EventRepository extends JpaRepository<Event,Long> {

    @Query(value="SELECT * FROM event WHERE start_date >= CURDATE() and status = 1 ORDER BY start_date ASC", nativeQuery=true)
    List<Event> findAllUpcomingEvents();

    List<Event> findAllByOrderByCreateDateDesc();

    @Query(value="SELECT * FROM event WHERE status = 1 and image_cover is not null ORDER BY create_date DESC LIMIT 0, 4", nativeQuery=true)
    List<Event> findAllByOrderByImageCoverDesc();

    @Query(value="SELECT * FROM event WHERE start_date >= CURDATE() and status = 1 ORDER BY start_date ASC LIMIT 0, :num", nativeQuery=true)
    List<Event> findUpcomingEvent(@Param("num") Long num);

    @Query(value = "SELECT * FROM event WHERE id IN (SELECT event_id FROM enrollment WHERE user_id = ?1 and type = 1) AND start_date >= CURDATE() LIMIT 0, ?2", nativeQuery = true)
    List<Event> getListLiveEventByUserId(Long id, Integer num);

    @Query(value="SELECT e.* FROM event as e left join cron_schedule as c ON e.id = c.event_id WHERE date(e.start_date) = DATE_ADD(CURDATE(), INTERVAL 1 DAY) OR date(c.start_date) = CURDATE() group by e.id", nativeQuery=true)
    List<Event> getAllEventAfterCurrentDateByOneDay();

    @Query(value = "SELECT * FROM event WHERE id IN (SELECT event_id FROM enrollment WHERE user_id = ?1 and type = 1) AND start_date >= CURDATE()", nativeQuery = true)
    List<Event> getListLiveEventByUserId(Long id);

    @Query(value = "SELECT * FROM event WHERE id IN (SELECT event_id FROM enrollment WHERE user_id = ?1 and type = 1) AND start_date < CURDATE() LIMIT 0, ?2", nativeQuery = true)
    List<Event> getListPassEventByUserId(Long id, Integer num);

    @Query(value = "SELECT COUNT(id) FROM event WHERE id IN (SELECT event_id FROM enrollment WHERE user_id = ?1 and type = 1) AND start_date >= CURDATE()", nativeQuery = true)
    public Integer getSizeOfListLiveEventByUserId(Long id);

    @Query(value = "SELECT COUNT(id) FROM event WHERE id IN (SELECT event_id FROM enrollment WHERE user_id = ?1 and type = 1) AND start_date < CURDATE()", nativeQuery = true)
    public Integer getSizeOfListPassEventByUserId(Long id);
}
