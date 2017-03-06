package vn.axonactive.internship_program.events_webservice.service;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import vn.axonactive.internship_program.events_webservice.entity.Event;
import vn.axonactive.internship_program.events_webservice.entity.Sponsor;
import vn.axonactive.internship_program.events_webservice.repository.EventRepository;
import vn.axonactive.internship_program.events_webservice.repository.SponsorRepository;
import vn.axonactive.internship_program.events_webservice.service.SponsorServiceImpl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

import static org.mockito.Matchers.any;
import static org.mockito.Mockito.*;

/**
 * Created by Kevin Doan on 1/4/2017.
 */


@RunWith(SpringJUnit4ClassRunner.class)
public class SponsorServiceTest {

    @InjectMocks
    private SponsorServiceImpl sponsorService;

    @Mock
    private SponsorRepository sponsorRepository;

    @Mock
    private EventRepository eventRepository;

    private ArrayList<Sponsor>  sponsors = new ArrayList<Sponsor>();

    @Before
    public void prepage(){
        Sponsor sponsor1 = new Sponsor(1L,"Axon","AxonActive","Nguyen Huu Tho");
        Sponsor sponsor2 = new Sponsor(2L,"BachKhoa","BachKhoa","Nguyen Huu Tho");
        Sponsor sponsor3 = new Sponsor(3L,"Amazon","Amazon","Nguyen Dang Dao");
        this.sponsors.add(sponsor1);
        this.sponsors.add(sponsor2);
        this.sponsors.add(sponsor3);
    }
    @Test
    public void getAll_OK(){

        Mockito.when(sponsorRepository.findAll()).thenReturn(this.sponsors);
        Assert.assertEquals(3,sponsorService.getAll().size());
    }

//    @Test
//    public void update_OK(){
//        Sponsor oldsponsor = new Sponsor(3L,"Amazon","Amazon","NguyenDangDao");
//        Sponsor newsponsor = new Sponsor(3L,"AxonActive","AxonActive","NguyenHuuTHo");
//        newsponsor.setImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgA".getBytes());
//        Mockito.when(sponsorRepository.findOne(newsponsor.getId())).thenReturn(oldsponsor);
//        Mockito.when(sponsorRepository.save(oldsponsor)).thenReturn(oldsponsor);
//        Assert.assertEquals(newsponsor.getSponsorName(),sponsorService.update(newsponsor,newsponsor.getId()).getSponsorName());
//    }

 // @Test
//    public void deleteById_OK(){
//        doNothing().when(sponsorRepository).delete(anyLong());
//        sponsorService.deleteById(anyLong());
//        verify(sponsorRepository).delete(anyLong());
//    }

    @Test
    public void getSponsorsById_OK(){
        Long id = new Long(1);
        Sponsor sponsors =  new Sponsor(1L, "Axon", "abc", "NguyenHuuTho");
        Mockito.when(sponsorRepository.findOne(id)).thenReturn(sponsors);
        Assert.assertEquals(sponsors,sponsorService.getSponsorsById(id));

    }
   @Test
   public void addSponsor_OK(){
        // Todo impediment
//       Sponsor addsponsor = new Sponsor(1L,"AxonActive","AxonActive","NguyenHuuTHo");
//       Event event = new Event();
//       event.setId(1l);
//       addsponsor.setEvent(event);
//       addsponsor.setImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgA".getBytes());
//       when(sponsorRepository.save(addsponsor)).thenReturn(addsponsor);
//       Mockito.when(sponsorRepository.findOne(event.getId())).thenReturn(addsponsor);
//       Assert.assertEquals(addsponsor,sponsorService.addSponsor(event.getId(),addsponsor));
  }
    @Test
    public void getSponsorsByEventId(){
        // Todo impediment
    }
//        List<Event> events = new ArrayList<>();
//        Event event = new Event();
//        event.setId(1l);
//        Sponsor sponsor1 = new Sponsor(1L,"AxonActive","AxonActive","NguyenHuuTHo");
//        List<Sponsor> sponsors = Arrays.asList(sponsor1);
//        event.setSponsors(new HashSet<>(sponsors));
//        when(sponsorRepository.findSponsorsByEventId(event.getId())).thenReturn(sponsors);
//        Assert.assertEquals(sponsors,sponsorService.getSponsorsByEventId(event.getId()));
//    }



}
