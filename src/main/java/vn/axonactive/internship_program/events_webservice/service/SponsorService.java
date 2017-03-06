package vn.axonactive.internship_program.events_webservice.service;

import vn.axonactive.internship_program.events_webservice.entity.Category;
import vn.axonactive.internship_program.events_webservice.entity.Sponsor;

import java.util.List;

/**
 * Created by dtnhat on 12/22/2016.
 */
public interface SponsorService {

    public List<Sponsor> getAll();

    public Sponsor findOneById(Long sponsorId);

    public Sponsor addSponsor(Long eventId, Sponsor sponsor);

    public List<Sponsor> getSponsorsByEventId(Long eventId);

    public boolean deleteById(Long eventId,Long sponsorId);

    public Sponsor update(Long eventId, Sponsor sponsor, Long sponsorId);

    public Sponsor getSponsorsById(Long sponsorId);

    public byte[] getSponsorImage(Long sponsorId);


}
