package vn.axonactive.internship_program.events_webservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import vn.axonactive.internship_program.events_webservice.service.FirebaseService;

/**
 * Created by dinhpv on 12/19/16.
 */
@Controller
public class IndexController {
    @Autowired
    FirebaseService firebaseService;

    @RequestMapping(value = {"/", "/event/*", "/event/*/manage/description", "/event/*/manage/speaker" ,"/event/*/manage/sponsor", "/event/*/manage/schedule","/event/*/manage/remind" ,"/event/*/participants", "/my-ticket", "/404", "/access-denied", "/my-event", "/my-profile" }, method = RequestMethod.GET)
    public String getIndexPage(Model model) {
        if (!"local".equals(System.getenv("ENV"))) {
            firebaseService.init(); }
        return "index";
    }
}
