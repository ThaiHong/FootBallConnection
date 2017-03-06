package vn.axonactive.internship_program.events_webservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import vn.axonactive.internship_program.events_webservice.entity.*;
import vn.axonactive.internship_program.events_webservice.repository.EnrollmentRepository;
import vn.axonactive.internship_program.events_webservice.repository.EventRepository;
import vn.axonactive.internship_program.events_webservice.repository.SponsorRepository;

import java.util.List;

/**
 * Created by dctruc on 1/3/2017.
 */

@Service
public class SponsorServiceImpl implements SponsorService {
    @Autowired
    private SponsorRepository sponsorRepository;
    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Override
    public List<Sponsor> getAll() {
        return this.sponsorRepository.findAll();
    }

    @Override
    public Sponsor findOneById(Long sponsorId) {
        return sponsorRepository.findOne(sponsorId);
    }

    @Override
    public Sponsor addSponsor(Long eventId, Sponsor sponsor) {
        String accountCode = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByAccountCode(accountCode);
        EnrollmentPK enrollmentPK = new EnrollmentPK(eventId, user.getId());
        if(enrollmentRepository.exists(enrollmentPK)){
            Enrollment enrollment = enrollmentRepository.findOne(enrollmentPK);
            if(enrollment.getType()==1){
                Event evt = eventRepository.findOne(eventId);
                if (evt == null) {
                    System.out.println("null");
                }

                System.out.println(evt.getId());

                sponsor.setEvent(evt);
                Sponsor newSponsor = sponsorRepository.save(sponsor);
                return newSponsor;
            }
        }
        return null;

    }

    @Override
    public List<Sponsor> getSponsorsByEventId(Long eventId) {
        String accountCode = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByAccountCode(accountCode);
        EnrollmentPK enrollmentPK = new EnrollmentPK(eventId, user.getId());
        if(enrollmentRepository.exists(enrollmentPK)){
            Enrollment enrollment = enrollmentRepository.findOne(enrollmentPK);
            if(enrollment.getType()==1){
                List<Sponsor> sponsors = sponsorRepository.findSponsorsByEventId(eventId);
                return sponsors;
            }
        }
        return null;

    }

    @Override
    public boolean deleteById(Long eventId, Long sponsorId) {
        String accountCode = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByAccountCode(accountCode);
        EnrollmentPK enrollmentPK = new EnrollmentPK(eventId, user.getId());
        if(enrollmentRepository.exists(enrollmentPK)){
            Enrollment enrollment = enrollmentRepository.findOne(enrollmentPK);
            if(enrollment.getType()==1){
                this.sponsorRepository.delete(sponsorId);
                return true;
            }
        }
        return false;

    }

    @Override
    public Sponsor update(Long eventId, Sponsor sponsor, Long sponsorId) {
        String accountCode = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByAccountCode(accountCode);
        EnrollmentPK enrollmentPK = new EnrollmentPK(eventId, user.getId());
        if(enrollmentRepository.exists(enrollmentPK)){
            Enrollment enrollment = enrollmentRepository.findOne(enrollmentPK);
            if(enrollment.getType()==1){
                Sponsor oldSponsor = this.sponsorRepository.findOne(sponsorId);
                oldSponsor.setImage(sponsor.getImage());
                oldSponsor.setSponsorName(sponsor.getSponsorName());
                oldSponsor.setDescription(sponsor.getDescription());
                oldSponsor.setLocation(sponsor.getLocation());
                return this.sponsorRepository.save(oldSponsor);
            }
        }
        return null;
    }


    @Override
    public Sponsor getSponsorsById(Long sponsorId) {
        return this.sponsorRepository.findOne(sponsorId);
    }

    @Override
    public byte[] getSponsorImage(Long sponsorId) {
//        return this.sponsorRepository.findOne(sponsorId).getImage();
        return null;
    }


}
