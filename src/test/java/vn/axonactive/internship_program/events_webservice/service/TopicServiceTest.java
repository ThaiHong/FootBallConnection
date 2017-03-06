package vn.axonactive.internship_program.events_webservice.service;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import vn.axonactive.internship_program.events_webservice.entity.Event;
import vn.axonactive.internship_program.events_webservice.entity.Topic;
import vn.axonactive.internship_program.events_webservice.repository.TopicRepository;

import java.util.*;

import static org.mockito.Matchers.any;
import static org.mockito.Matchers.anyLong;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

/**
 * Created by nhlinh2 on 1/19/2017.
 */
@RunWith(SpringJUnit4ClassRunner.class)
public class TopicServiceTest {

    @InjectMocks
    private TopicServiceImpl topicService;

    @Mock
    private TopicRepository topicRepository;

    @Mock
    Topic topic1,topic2,topic3;

    @Before
    public void setUp(){
        topic1=new Topic(1L,"ABC","DEF","DN");
        topic2=new Topic(1L,"ABC","DEF","DN");
        topic3=new Topic(1L,"ABC","DEF","DN");
    }

    @Test
    public void create(){
        //Todo impediment
    }

    @Test
    public void getById_OK(){
        Long id=new Long(1);
        Topic topic=new Topic(1L,"ABC","DEF","DN");
        Mockito.when(topicRepository.findOne(anyLong())).thenReturn(topic);
        Assert.assertEquals(topic,topicService.getById(anyLong()));
    }

    @Test
    public void delete_OK(){
        Long id =new Long(1);
        topic1.setId(id);
        doNothing().when(topicRepository).delete(id);
        topicService.delete(anyLong());
        verify(topicRepository).delete(anyLong());
    }

    @Test
    public void getTopicsByEventId_OK(){
        Event event = new Event();
        event.setId(1L);
        List<Topic> topics = Arrays.asList(topic2,topic3);
        event.setTopics(new HashSet<>(topics));
        when(topicRepository.getTopicsByEventId(anyLong())).thenReturn(topics);
        Assert.assertEquals(topics,topicService.getTopicsByEventId(anyLong()));
    }

    @Test
    public void update(){
        //Todo impediment
    }

    @Test
    public void userOwnTopicByEvent(){
        Long topicId=new Long(1L);
        Long userId=new Long(3L);
        when(topicRepository.userOwnTopicByEvent(topicId,userId)).thenReturn(topic1);
        Assert.assertEquals(topic1,topicService.userOwnTopicByEvent(1L,3L));
    }

    @Test
    public void getMaxDateTopicByEvent(){
        //Todo impediment
    }

    @Test
    public void getMinDateTopicByEvent(){
        //Todo impediment
    }


}
