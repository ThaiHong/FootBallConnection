package vn.axonactive.internship_program.events_webservice.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.axonactive.internship_program.events_webservice.entity.Speaker;
import vn.axonactive.internship_program.events_webservice.entity.Topic;

import java.util.List;

/**
 * Created by phanvudinh on 1/4/2017.
 */
@Repository
public interface TopicRepository extends PagingAndSortingRepository<Topic, Long> {
    @Query("select t from Topic t where t.event.id = :eventId")
    List<Topic> getTopicsByEventId(@Param("eventId") long eventId);

    @Query(value = "SELECT t.* from topic t INNER JOIN event e on t.event_id = e.id INNER JOIN enrollment en on e.id = en.event_id WHERE t.id = :topicId AND en.user_id = :userId AND en.type = 1", nativeQuery = true)
    Topic userOwnTopicByEvent(@Param("topicId") long topicId, @Param("userId") long userId);

    @Query(value = "SELECT * FROM topic where event_id=?1 order by end_time desc limit 0, 1", nativeQuery = true)
    Topic getMaxDateTopicByEvent(Long eventId);

    @Query(value = "SELECT * FROM topic where event_id=?1 order by start_time asc limit 0, 1", nativeQuery = true)
    Topic getMinDateTopicByEvent(Long eventId);
}
