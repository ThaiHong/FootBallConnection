package vn.axonactive.internship_program.events_webservice.service;

import vn.axonactive.internship_program.events_webservice.entity.CronSchedule;

import java.util.List;

/**
 * Created by dtnhat on 1/11/2017.
 */
public interface CronScheduleService {

    public CronSchedule create(CronSchedule cronSchedule);
    public CronSchedule update(CronSchedule newCronSchedule,Long cronScheduleId);
    public void delete(Long cronScheduleId);
    public List<CronSchedule> getAll();
    public List<CronSchedule> getListCronScheduleByEventId(Long eventId);
    public  CronSchedule getCronScheduleById(Long id);

}
