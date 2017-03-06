package vn.axonactive.internship_program.events_webservice.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.axonactive.internship_program.events_webservice.entity.Permission;
import vn.axonactive.internship_program.events_webservice.entity.Role;
import vn.axonactive.internship_program.events_webservice.entity.User;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by phanvudinh on 12/10/2016.
 */
@Repository
public interface UserRepository extends PagingAndSortingRepository<User, Long> {
    User findByEmailAndPassword(String email, String password);
    User findByEmail(String email);
    User findByAccountCode(String accountCode);

    @Query(value = "select email from user where id in (select user_id from enrollment where event_id = ?1 and type = 2)", nativeQuery = true)
    List<String> getListUserByEventId(Long id);

    @Query(value = "select email from user where id in (select user_id from enrollment where event_id = ?1 and type = 1)", nativeQuery = true)
    String getUserOwnerByEventId(Long id);

    @Modifying
    @Transactional
    @Query(value = "update user as us set us.optional_all_email_reminder = ?2 where us.id = ?1", nativeQuery = true)
    void changeStatusOfAllEmailReminder(Long userId, int value);

}
