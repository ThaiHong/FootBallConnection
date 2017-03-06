package vn.axonactive.internship_program.events_webservice.service;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import vn.axonactive.internship_program.events_webservice.entity.CronSchedule;
import vn.axonactive.internship_program.events_webservice.entity.Event;
import vn.axonactive.internship_program.events_webservice.repository.CronScheduleRepository;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

import static org.mockito.Matchers.anyLong;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;

/**
 * Created by nhlinh2 on 1/19/2017.
 */
@RunWith(SpringJUnit4ClassRunner.class)
public class CronScheduleServiceTest {

    @InjectMocks
    private CronScheduleServiceImpl cronScheduleService;

    @Mock
    private CronScheduleRepository cronScheduleRepository;

    @Test
    public void create(){
        CronSchedule cronSchedule = new CronSchedule(1L,"ABC");
        Mockito.when(cronScheduleRepository.save(cronSchedule)).thenReturn(cronSchedule);
        Assert.assertEquals(cronSchedule,cronScheduleService.create(cronSchedule));
    }

    @Test
    public void update(){
        CronSchedule cronSchedule = new CronSchedule(1L,"ABC");
        CronSchedule newcronSchedule = new CronSchedule(2L,"ABCD");
        Long cronId= new Long(1L);
        Mockito.when(cronScheduleRepository.findOne(cronId)).thenReturn(cronSchedule);
        if(cronSchedule!=null){
            cronSchedule.setEvent(newcronSchedule.getEvent());
            cronSchedule.setStartDate(newcronSchedule.getStartDate());
            cronSchedule.setMessage(newcronSchedule.getMessage());
        }
        Mockito.when(cronScheduleRepository.save(cronSchedule)).thenReturn(cronSchedule);
        Assert.assertEquals(cronSchedule,cronScheduleService.update(newcronSchedule,cronId));
    }

    @Test
    public void delete(){
        doNothing().when(cronScheduleRepository).delete(anyLong());
        cronScheduleService.delete(anyLong());
        verify(cronScheduleRepository).delete(anyLong());
    }

    @Test
    public void getAll(){
        CronSchedule cronSchedule1 = new CronSchedule();
        CronSchedule cronSchedule2 = new CronSchedule();
        CronSchedule cronSchedule3 = new CronSchedule();
        Mockito.when(cronScheduleRepository.findAll()).thenReturn(Arrays.asList(cronSchedule1,cronSchedule2,cronSchedule3));
        Assert.assertEquals(3,cronScheduleService.getAll().size());
    }

    @Test
    public void getCronById(){
        Long id=new Long(1);
        CronSchedule cronSchedule = new CronSchedule(1L,"ABC");
        Mockito.when(cronScheduleRepository.findOne(anyLong())).thenReturn(cronSchedule);
        Assert.assertEquals(cronSchedule,cronScheduleService.getCronScheduleById(anyLong()));
    }

    @Test
    public void getListCronByEventId(){
        Event event = new Event();
        event.setId(1L);
        CronSchedule cronSchedule1 = new CronSchedule(1L,"ABC");
        CronSchedule cronSchedule2 = new CronSchedule(1L,"ABC");
        List<CronSchedule> topics = Arrays.asList(cronSchedule1,cronSchedule2);
        event.setCronSchedules(new HashSet<>(topics));
        Mockito.when(cronScheduleRepository.getListCronScheduleByEventId(anyLong())).thenReturn(topics);
        Assert.assertEquals(topics,cronScheduleService.getListCronScheduleByEventId(anyLong()));
    }
}
