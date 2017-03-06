package vn.axonactive.internship_program.events_webservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import vn.axonactive.internship_program.events_webservice.entity.CronSchedule;

import java.util.List;

/**
 * Created by dtnhat on 1/11/2017.
 */
@Repository
public interface CronScheduleRepository extends JpaRepository<CronSchedule,Long>{

    @Query(value = "select * from cron_schedule as c where c.event_id = ?1 order by c.start_date asc",nativeQuery = true)
    public List<CronSchedule> getListCronScheduleByEventId(Long eventId);
}
