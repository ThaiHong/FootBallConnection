package vn.axonactive.internship_program.events_webservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.axonactive.internship_program.events_webservice.entity.Enrollment;
import vn.axonactive.internship_program.events_webservice.entity.EnrollmentPK;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by dctruc on 12/26/2016.
 */
@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, EnrollmentPK> {
    Enrollment findByAuthorizationCode(String code);

    @Query(value = "SELECT *  from enrollment where event_id in (select id from event where date(start_date) >= CURDATE()) and user_id=?1 and type=2 limit 0,?2", nativeQuery = true)
    List<Enrollment> getListUpComingByUserId(Long id, int num);

    @Query(value = "SELECT *  from enrollment where event_id in (select id from event where date(start_date) < CURDATE()) and user_id=?1 and type=2 limit 0,?2", nativeQuery = true)
    List<Enrollment> getListPassingByUserId(Long id, int num);

    @Query(value = "SELECT *  from enrollment where event_id = ?1 and type=2", nativeQuery = true)
    List<Enrollment> findByEventId(Long eventId);

    @Modifying
    @Transactional
    @Query(value = "update enrollment as en set en.optional_email_reminder = ?3 where en.event_id = ?1 and en.user_id = ?2", nativeQuery = true)
    void changeStatusOfEmailReminder(Long eventId, Long userId, int value);

    @Modifying
    @Transactional
    @Query(value = "update enrollment as en set en.optional_email_reminder = ?2 where en.user_id = ?1", nativeQuery = true)
    void changeStatusOfEmailReminderByUserId(Long userId, int value);


    @Query(value = "SELECT * from enrollment as en, user as u where en.event_id = ?1 and u.id=en.user_id and(u.email like ?2% or u.phone like ?2% or en.authorization_code like ?2% or u.full_name like ?2%)", nativeQuery = true)
    List<Enrollment> findByEventIdAndByKeyword(Long eventId, String keyword);

    @Query(value = "SELECT *  from enrollment where event_id = ?1 and type=2 limit ?2, ?3", nativeQuery = true)
    List<Enrollment> findByEventIdLimit(Long eventId, int start, int end);


    @Query(value = "SELECT e.* FROM enrollment e inner join event ev on e.event_id=ev.id where e.user_id = ?1 and e.type = ?2 and ev.status=1 ORDER BY enroll_date DESC limit 0, 4", nativeQuery = true)
    List<Enrollment> findUserEventByTypeLimit4(Long userId, int type);

    @Query(value = "SELECT * FROM enrollment where user_id = ?1 and type = ?2 ORDER BY enroll_date DESC limit 0, 4", nativeQuery = true)
    List<Enrollment> findUserEventByTypeAnyStatusLimit4(Long userId, int type);

    @Modifying
    @Transactional
    @Query(value = "update enrollment set check_in=:checkIn where event_id=:eventId and user_id=:userId", nativeQuery = true)
    void updateCheckInStatus(@Param("checkIn") int checkIn, @Param("eventId") long eventId, @Param("userId") long userId);

    @Modifying
    @Transactional
    @Query(value = "update enrollment set confirm=:confirm where event_id=:eventId and user_id=:userId", nativeQuery = true)
    void updateConfirmStatus(@Param("confirm") int confirm, @Param("eventId") long eventId, @Param("userId") long userId);

    @Query(value = "SELECT * from enrollment where  user_id = :userId AND event_id = :eventId AND type = 1", nativeQuery = true)
    Enrollment userOwnEvent(@Param("userId") long userId, @Param("eventId")long eventId);

    @Query(value = "SELECT authorization_code from enrollment where  user_id = ?2 AND event_id = ?1 AND type=2", nativeQuery = true)
    String findQRCodeByEventAndUser(Long eventId, Long userId);
}

