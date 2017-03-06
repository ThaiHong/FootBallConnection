package vn.axonactive.internship_program.events_webservice.service;

import org.springframework.web.multipart.MultipartFile;
import vn.axonactive.internship_program.events_webservice.common.PixelCrop;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by lmchuc on 1/17/2017.
 */
public interface ImageService {
    public String uploadImageEventReturnImageName(MultipartFile file, Long idEvent, PixelCrop pixelCrop) throws IOException;
    public void createImage(HttpServletResponse response, String imagePath, int dWidth, int dHeight) throws IOException;
    public String uploadImageCreateSpeakerReturnImageName(MultipartFile file) throws IOException;
    public String uploadImageUpdateSpeakerReturnImageName(MultipartFile file, String url) throws IOException;
    public void deleteImageSpeaker(String url) throws IOException;
    public String uploadSponsorImageReturnImageName(MultipartFile file, Long idEvent, PixelCrop pixelCrop) throws IOException;
    public String uploadImageCreateUserProfileReturnImageName(MultipartFile file) throws IOException;
    public String uploadImageUpdateUserProfileReturnImageName(MultipartFile file, String url) throws IOException;
    public void deleteImageUserProfile(String url) throws IOException;
}
