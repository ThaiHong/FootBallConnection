package vn.axonactive.internship_program.events_webservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import vn.axonactive.internship_program.events_webservice.common.CommonPath;
import vn.axonactive.internship_program.events_webservice.common.ImageProcessing;
import vn.axonactive.internship_program.events_webservice.service.ImageService;

import javax.servlet.http.HttpServletResponse;

/**
 * Created by lmchuc on 16/01/2017.
 */
@RestController
@RequestMapping(value = "images")
public class ImageController {
    @Autowired
    ImageService imageService;

    @RequestMapping(value = "/events/{eventImage}/cover", method = RequestMethod.GET)
    public void createEventCover(HttpServletResponse response, @PathVariable("eventImage") String eventImage) throws Exception {
        String imagePath= CommonPath.eventImagesPath() + "/"+ eventImage;
        imageService.createImage(response,imagePath,ImageProcessing.EVENT_COVER_WIDTH,ImageProcessing.EVENT_COVER_HEIGHT);
    }

    @RequestMapping(value = "/events/{eventImage}/thumb", method = RequestMethod.GET)
    public void createEventThumb(HttpServletResponse response, @PathVariable("eventImage") String eventImage) throws Exception {
        String imagePath= CommonPath.eventImagesPath() + "/"+ eventImage;
        imageService.createImage(response,imagePath,ImageProcessing.EVENT_THUMB_WIDTH,ImageProcessing.EVENT_THUMB_HEIGHT);
    }
}
