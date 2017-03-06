package vn.axonactive.internship_program.events_webservice.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.axonactive.internship_program.events_webservice.entity.TopicSpeaker;

/**
 * Created by phanvudinh on 1/4/2017.
 */
@Repository
public interface TopicSpeakerRepository extends PagingAndSortingRepository<TopicSpeaker, Long> {
    @Modifying
    @Query("DELETE FROM TopicSpeaker t WHERE t.topic.id = :topicId")
    void deleteAllSpeakerByTopicId(@Param("topicId") long topicId);
}
