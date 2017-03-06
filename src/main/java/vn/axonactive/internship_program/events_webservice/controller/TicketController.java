package vn.axonactive.internship_program.events_webservice.controller;

import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import vn.axonactive.internship_program.events_webservice.common.CommonMessageException;
import vn.axonactive.internship_program.events_webservice.common.ImageProcessing;
import vn.axonactive.internship_program.events_webservice.common.UserUtils;
import vn.axonactive.internship_program.events_webservice.entity.Enrollment;
import vn.axonactive.internship_program.events_webservice.entity.User;
import vn.axonactive.internship_program.events_webservice.service.EmailService;
import vn.axonactive.internship_program.events_webservice.service.EnrollmentService;
import vn.axonactive.internship_program.events_webservice.service.QRCodeService;
import vn.axonactive.internship_program.events_webservice.service.UserService;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.ByteArrayOutputStream;

/**
 * Created by lmchuc on 1/3/2017.
 */
@RestController
public class TicketController {

    @Autowired
    private QRCodeService qrCodeService;

    @Autowired
    private EnrollmentService enrollmentService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/images/tickets/{code}", method = RequestMethod.GET)
    public void createTicket(HttpServletResponse response, @PathVariable("code") String cnt) throws Exception {
        Enrollment enrollment = enrollmentService.findByAuthorizationCode(cnt);

        if (enrollment != null) {
            ByteArrayOutputStream jpegOutputStream = new ByteArrayOutputStream();

            try {
                ImageIO.write(new ImageProcessing().generateTicket(enrollment, qrCodeService.createQRCodeBuffer(cnt)), "png", jpegOutputStream);
            } catch (IllegalArgumentException e) {
                response.sendError(HttpServletResponse.SC_NOT_FOUND);
            }

            byte[] imgByte = jpegOutputStream.toByteArray();

            response.setHeader("Cache-Control", "no-store");
            response.setHeader("Pragma", "no-cache");
            response.setDateHeader("Expires", 0);
            response.setContentType("image/jpeg");
            ServletOutputStream responseOutputStream = response.getOutputStream();
            responseOutputStream.write(imgByte);
            responseOutputStream.flush();
            responseOutputStream.close();
        } else response.setStatus(404);
    }

    @RequestMapping(value = "/images/tickets/qr/{code}", method = RequestMethod.GET)
    public void createQrTicket(HttpServletResponse response, @PathVariable("code") String cnt) throws Exception {
        Enrollment enrollment = enrollmentService.findByAuthorizationCode(cnt);

        if (enrollment != null) {
            ByteArrayOutputStream jpegOutputStream = new ByteArrayOutputStream();

            try {
                ImageIO.write(qrCodeService.createQRCodeBuffer(cnt), "jpg", jpegOutputStream);
            } catch (IllegalArgumentException e) {
                response.sendError(HttpServletResponse.SC_NOT_FOUND);
            }

            byte[] imgByte = jpegOutputStream.toByteArray();

            response.setHeader("Cache-Control", "no-store");
            response.setHeader("Pragma", "no-cache");
            response.setDateHeader("Expires", 0);
            response.setContentType("image/jpeg");
            ServletOutputStream responseOutputStream = response.getOutputStream();
            responseOutputStream.write(imgByte);
            responseOutputStream.flush();
            responseOutputStream.close();
        } else response.setStatus(404);
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "/api/tickets/checkIn", method = RequestMethod.POST)
    public ResponseEntity<?> checkInMobile(@Valid @RequestBody String code) {

        User ownerUser = this.userService.findByAccountCode(UserUtils.getAccountCodeByAuthorization());
        Enrollment enrollment = enrollmentService.findByAuthorizationCode(code);
        if (enrollment != null&&enrollment.getCheckIn()==0&&enrollmentService.userOwnEvent(ownerUser.getId(),enrollment.getEvent().getId())!=null) {

//            Update Through Firebase
            DatabaseReference checkRef = FirebaseDatabase.getInstance().getReference("events")
                    .child(enrollment.getEvent().getId().toString())
                    .child(enrollment.getUser().getId().toString()).child("check");
            checkRef.setValue(1);

            return new ResponseEntity<Object>(HttpStatus.OK);
        } else return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "/api/tickets/RemindTicket/{code}", method = RequestMethod.GET)
    public ResponseEntity<?> sendRemindMail(HttpServletResponse response, @PathVariable("code") String code) {
        Enrollment enrollment = enrollmentService.findByAuthorizationCode(code);
        if (enrollment != null) {
            emailService.sendEmailRemindTicket(code);
            return new ResponseEntity<Object>(HttpStatus.OK);
        } else return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);
    }
}
