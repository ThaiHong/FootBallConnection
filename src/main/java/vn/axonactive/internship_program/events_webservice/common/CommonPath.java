package vn.axonactive.internship_program.events_webservice.common;

import com.google.common.io.Resources;

import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Created by lmchuc on 1/4/2017.
 */

public class CommonPath {
    public static String staticPath() throws URISyntaxException {
        return String.valueOf(Paths.get(Resources.getResource("static").toURI()));
    }

    public static String imagesPath(){
        return System.getProperty("user.home")+"/awesomeevents/images";
    }
    public static String eventImagesPath(){
        return System.getProperty("user.home")+"/awesomeevents/images/events";
    }
    public static String avatarImagesPath(){
        return System.getProperty("user.home")+"/awesomeevents/images/avatars";
    }
    public static String sponsorImagesPath(){
        return System.getProperty("user.home")+"/awesomeevents/images/sponsors";
    }
    public static String speakerImagesPath(){
        return System.getProperty("user.home")+"/awesomeevents/images/speakers";
    }


    public static void createImagesPath(String imgPath){
        Path path = Paths.get(imagesPath()+imgPath);
        if (!Files.exists(path)) {
            try {
                Files.createDirectories(path);
            } catch (IOException e) {
                //fail to create directory
                e.printStackTrace();
            }
        }
    }

    public  static void initCreatePath(){
        createImagesPath("/events");
        createImagesPath("/speakers");
        createImagesPath("/sponsors");
        createImagesPath("/avatars");
    }

    public static String awsResource(){ return System.getProperty("user.home")+"/awesomeevents";}
}