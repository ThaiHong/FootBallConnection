package vn.axonactive.internship_program.events_webservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.axonactive.internship_program.events_webservice.entity.CronSchedule;
import vn.axonactive.internship_program.events_webservice.repository.CronScheduleRepository;

import java.util.List;

/**
 * Created by dtnhat on 1/11/2017.
 */

@Service
public class CronScheduleServiceImpl implements CronScheduleService {


    @Autowired
    private CronScheduleRepository cronScheduleRepository;

    @Override
    public CronSchedule create(CronSchedule cronSchedule) {
        return cronScheduleRepository.save(cronSchedule);
    }

    @Override
    public CronSchedule update(CronSchedule newCronSchedule, Long cronScheduleId) {
        CronSchedule oldCronSchedule = cronScheduleRepository.findOne(cronScheduleId);
        if(oldCronSchedule!=null){
            oldCronSchedule.setEvent(newCronSchedule.getEvent());
            oldCronSchedule.setStartDate(newCronSchedule.getStartDate());
            oldCronSchedule.setMessage(newCronSchedule.getMessage());
        }
        return cronScheduleRepository.save(oldCronSchedule);
    }

    @Override
    public void delete(Long cronScheduleId) {
        cronScheduleRepository.delete(cronScheduleId);
    }

    @Override
    public List<CronSchedule> getAll() {
        return cronScheduleRepository.findAll();
    }

    @Override
    public List<CronSchedule> getListCronScheduleByEventId(Long eventId) {
        return cronScheduleRepository.getListCronScheduleByEventId(eventId);
    }

    @Override
    public CronSchedule getCronScheduleById(Long id) {
        return cronScheduleRepository.findOne(id);
    }
}
