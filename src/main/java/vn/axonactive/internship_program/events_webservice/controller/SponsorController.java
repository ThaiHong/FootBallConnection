package vn.axonactive.internship_program.events_webservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import vn.axonactive.internship_program.events_webservice.common.CommonMessageException;
import vn.axonactive.internship_program.events_webservice.common.PixelCrop;
import vn.axonactive.internship_program.events_webservice.entity.Event;
import vn.axonactive.internship_program.events_webservice.entity.Sponsor;
import vn.axonactive.internship_program.events_webservice.service.ImageService;
import vn.axonactive.internship_program.events_webservice.service.SponsorService;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

/**
 * Created by dctruc on 1/3/2017.
 */

@RestController
@RequestMapping(value = "api/sponsor")
public class SponsorController {

    @Autowired
    private SponsorService sponsorService;

    @Autowired
    private ImageService imageService;
    @GetMapping(value = "")
    public ResponseEntity<List<Sponsor>> getAll() {
        return new ResponseEntity<List<Sponsor>>(sponsorService.getAll(), HttpStatus.OK);

    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping(value = "/{eventId}/addsponsor", consumes = {"multipart/form-data"})
    public ResponseEntity<Sponsor> addSponsor(@PathVariable Long eventId,@RequestPart("sponsor") String sponsor, @RequestPart("pixelCrop") String pixelCrop,
                                              @RequestPart(name="imgFile", required = false) MultipartFile file) throws IOException {
        Sponsor newSponsor = new ObjectMapper().readValue(sponsor, Sponsor.class);
        PixelCrop pixelCropObj = new ObjectMapper().readValue(pixelCrop, PixelCrop.class);
        Sponsor createdSponsor = sponsorService.addSponsor(eventId, newSponsor);

        if(file!=null && !file.isEmpty()){
            createdSponsor.setImage("/images/sponsors/"+imageService.uploadSponsorImageReturnImageName(file, createdSponsor.getId(), pixelCropObj));
        }

        sponsorService.update(eventId, createdSponsor, createdSponsor.getId());

        return null;
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping(value = "/{eventId}/update/{sponsorId}", consumes = {"multipart/form-data"})
    public ResponseEntity<?> update(@RequestPart("sponsor") String sponsor, @RequestPart("pixelCrop") String pixelCrop,
                                    @RequestPart(name="imgFile", required = false) MultipartFile file, @PathVariable Long sponsorId, @PathVariable Long eventId) throws IOException {

        if(eventId==null || sponsorId==null) return new CommonMessageException().unauthorized();
//        if(result.hasErrors())
//            return new CommonMessageException().badRequest();
        Sponsor newSponsor = new ObjectMapper().readValue(sponsor, Sponsor.class);
        PixelCrop pixelCropObj = new ObjectMapper().readValue(pixelCrop, PixelCrop.class);
        System.out.println(pixelCropObj.getX()+"-"+pixelCropObj.getY()+"-"+pixelCropObj.getWidth()+"-"+pixelCropObj.getHeight());
        if((file!=null && !file.isEmpty()) || !(pixelCropObj.getWidth()==0 &&pixelCropObj.getY()==0)){
            newSponsor.setImage("/images/sponsors/"+imageService.uploadSponsorImageReturnImageName(file, sponsorId, pixelCropObj));
        }else{
            newSponsor.setImage(sponsorService.findOneById(sponsorId).getImage());
        }
        Sponsor updatedSponsor = sponsorService.update(eventId, newSponsor, sponsorId);

        if (updatedSponsor == null) {
            return new ResponseEntity<Sponsor>(updatedSponsor, HttpStatus.EXPECTATION_FAILED);
        } else {
            return new ResponseEntity<Sponsor>(updatedSponsor, HttpStatus.OK);
        }
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping(value = "/{eventId}")
    public ResponseEntity<List<Sponsor>> getSponsorsByEventId(@PathVariable Long eventId) {
        List<Sponsor> sponsors = sponsorService.getSponsorsByEventId(eventId);
        if (sponsors == null) {
            return new ResponseEntity<List<Sponsor>>(sponsors, HttpStatus.EXPECTATION_FAILED);
        } else {
            return new ResponseEntity<List<Sponsor>>(sponsors, HttpStatus.OK);
        }
    }

    @PreAuthorize("isAuthenticated()")
    @DeleteMapping(value = "/{eventId}/delete/{sponsorId}")
    public ResponseEntity<Sponsor> deleteSponsor(@PathVariable Long sponsorId, @PathVariable Long eventId) {
        if (sponsorService.deleteById(eventId, sponsorId)) {
            return new ResponseEntity<Sponsor>(new Sponsor(), HttpStatus.OK);
        } else {
            return new ResponseEntity<Sponsor>(new Sponsor(), HttpStatus.EXPECTATION_FAILED);
        }

    }



    @GetMapping(value = "/one-sponsor/{sponsorId}")
    public ResponseEntity<Sponsor> getSponsorsById(@PathVariable Long sponsorId) {
        return new ResponseEntity<Sponsor>(sponsorService.getSponsorsById(sponsorId), HttpStatus.OK);
    }

    @GetMapping(value = "/image/{sponsorId}")
    public ResponseEntity<byte[]> getSponsorImage(@PathVariable Long sponsorId) {
        byte[] image = sponsorService.getSponsorImage(sponsorId);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);
        headers.setContentLength(image.length);
        return new ResponseEntity<>(image, headers, HttpStatus.OK);
    }

}
