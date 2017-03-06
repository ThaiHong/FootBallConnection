package vn.axonactive.internship_program.events_webservice.service;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import vn.axonactive.internship_program.events_webservice.entity.Event;
import vn.axonactive.internship_program.events_webservice.entity.Speaker;
import vn.axonactive.internship_program.events_webservice.entity.Sponsor;
import vn.axonactive.internship_program.events_webservice.repository.SpeakerRepository;
import vn.axonactive.internship_program.events_webservice.service.SpeakerServiceImpl;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

import static org.mockito.Matchers.anyLong;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

/**
 * Created by dctruc on 1/5/2017.
 */

@RunWith(SpringJUnit4ClassRunner.class)
public class SpeakerServiceTest {

    @InjectMocks
    private SpeakerServiceImpl speakerService;

    @Mock
    private SpeakerRepository speakerRepository;
    private ArrayList<Speaker> speakers = new ArrayList<Speaker>();

    @Before
    public void prepare(){
        Speaker speaker1 = new Speaker(1L,"Linh","linh@gmail.com","0908365253","NguyenHuuTho","test");
        Speaker speaker2 = new Speaker(2L,"Long","long@gmail.com","0908365253","NguyenHuuTho","test");
        this.speakers.add(speaker1);
        this.speakers.add(speaker2);
    }

    @Test
    public void getByID_OK(){
        Long id = new Long (1);
        Speaker speaker = new Speaker(1L,"Linh","linh@gmail.com","0908365253","NguyenHuuTho","test");
        when(speakerRepository.findOne(id)).thenReturn(speaker);
        Assert.assertEquals(speaker,speakerService.getById(id));
    }

    @Test
    public void getSpeakerByEventId_OK(){
        List<Event> events = new ArrayList<>();
        Event event = new Event();
        event.setId(1L);
        Speaker speaker1 = new Speaker(1L,"Linh","linh@gmail.com","0908365253","NguyenHuuTho","test");
        Speaker speaker2 = new Speaker(1L,"Tri","tri@gmail.com","0908365253","NguyenHuuTho","test");
        List<Speaker> speakers = Arrays.asList(speaker1,speaker2);
        event.setSpeakers(speakers);
        when(speakerRepository.getSpeakerByEventId(anyLong())).thenReturn(speakers);
        Assert.assertEquals(speakers,speakerService.getSpeakerByEventId(anyLong()));
    }

    @Test
    public void delete_OK(){
        doNothing().when(speakerRepository).delete(anyLong());
        speakerService.delete(anyLong());
        verify(speakerRepository).delete(anyLong());
    }

    @Test
    public void update_OK(){

        Speaker newspeaker = new Speaker(1L,"Linh","linh@gmail.com","0908365253","NguyenHuuTho","test");
        Speaker oldspeaker = new Speaker(1L,"Long","long@gmail.com","0908365253","NguyenHuuTho","test");
        Mockito.when(speakerRepository.findOne(newspeaker.getId())).thenReturn(oldspeaker);
        Mockito.when(speakerRepository.save(oldspeaker)).thenReturn(oldspeaker);
        Assert.assertEquals(newspeaker.getName(),speakerService.update(newspeaker.getId(),newspeaker).getName());
    }

    @Test
    public void create_OK(){
        Speaker speaker1 = new Speaker(1L,"Linh","linh@gmail.com","0908365253","NguyenHuuTho","test");
        Speaker speaker2 = new Speaker(2L,"Long","long@gmail.com","0908365253","NguyenHuuTho","test");
        Mockito.when(speakerRepository.save(speaker1)).thenReturn(speaker1);
        Assert.assertEquals(speaker1,speakerService.create(speaker1));
    }
    @Test
    public void userOwnSpeakerByEvent_OK(){
        Long speakerId=new Long(1);
        Long userId=new Long(3);
        Speaker speaker = new Speaker(1L,"Linh","Nguyen Huu Tho","linh@gmail.com","0123456789","ABC");
        when(speakerRepository.userOwnSpeakerByEvent(speakerId,userId)).thenReturn(speaker);
        Assert.assertEquals(speaker,speakerService.userOwnSpeakerByEvent(1,3));
    }




}
