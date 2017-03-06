package vn.axonactive.internship_program.events_webservice.service;

import com.google.zxing.WriterException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.stereotype.Service;
import vn.axonactive.internship_program.events_webservice.common.ImageProcessing;
import vn.axonactive.internship_program.events_webservice.entity.Enrollment;

import javax.imageio.ImageIO;
import java.awt.*;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.URISyntaxException;

/**
 * Created by dlong on 1/9/2017.
 */
@Service
public class DownloadTicketServiceImpl implements DownloadTicketService {

    @Autowired
    private QRCodeService qrCodeService;
    @Autowired
    private EnrollmentService enrollmentService;

    @Override
    public InputStreamResource downloadPDFFileByEventCode(String eventCode) {
        Enrollment enrollment = enrollmentService.findByAuthorizationCode(eventCode);

        if (enrollmentService.findByAuthorizationCode(eventCode).getEvent().getImageCover() != null) {
            ByteArrayOutputStream outputImageStream = new ByteArrayOutputStream();
            try {
                ImageIO.write(new ImageProcessing().generateTicket(enrollment, qrCodeService.createQRCodeBuffer(eventCode)), "png", outputImageStream );
                return ImageProcessing.convertPNGtoPDF(outputImageStream );
            } catch (IOException e) {
                e.printStackTrace();
            } catch (FontFormatException e) {
                e.printStackTrace();
            } catch (URISyntaxException e) {
                e.printStackTrace();
            } catch (WriterException e) {
                e.printStackTrace();
            }
        }
        return null;
    }
    @Override
    public InputStreamResource downloadPNGFileByEventCode(String eventCode) {
        Enrollment enrollment = enrollmentService.findByAuthorizationCode(eventCode);
        if (enrollmentService.findByAuthorizationCode(eventCode).getEvent().getImageCover() != null) {
            ByteArrayOutputStream outputImageStream = new ByteArrayOutputStream();
            try {
                ImageIO.write(new ImageProcessing().generateTicket(enrollment, qrCodeService.createQRCodeBuffer(eventCode)), "png", outputImageStream );
                return new InputStreamResource(new ByteArrayInputStream(outputImageStream.toByteArray()));
            } catch (IOException e) {
                e.printStackTrace();
            } catch (FontFormatException e) {
                e.printStackTrace();
            } catch (URISyntaxException e) {
                e.printStackTrace();
            } catch (WriterException e) {
                e.printStackTrace();
            }
        }
        return null;
    }
}