package vn.axonactive.internship_program.events_webservice.common;

import vn.axonactive.internship_program.events_webservice.entity.Enrollment;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.text.SimpleDateFormat;

/**
 * Created by lmchuc on 1/4/2017.
 */
public class DrawImage {

    public void drawCenteredString(Graphics2D g, String text, int y, BufferedImage image, Font font, Color color) {
        FontMetrics metrics = g.getFontMetrics(font);
        int x = (image.getWidth() - metrics.stringWidth(text)-120) / 2;
        g.setFont(font);
        g.setColor(color);
        g.drawString(text, x, y);
    }
    public void drawPositionString(Graphics2D g, String text, int x, int y, Font font, Color color) {
        g.setFont(font);
        g.setColor(color);
        g.drawString(text, x, y);
    }
    public Font setFont(String fontName, float fontSize) throws IOException, FontFormatException, URISyntaxException {
        return Font.createFont(Font.TRUETYPE_FONT, new File(CommonPath.staticPath()+ "/fonts/" +fontName)).deriveFont(fontSize);
    }
    public BufferedImage generateTicket(Enrollment enrollment, BufferedImage qrCode) throws IOException, FontFormatException, URISyntaxException {
        BufferedImage image = ImageIO.read(new File(CommonPath.staticPath()+"/images/ticket.png"));
//        Smoothly Text
        Graphics2D g = image.createGraphics();
        g.setRenderingHint(RenderingHints.KEY_TEXT_ANTIALIASING, RenderingHints.VALUE_TEXT_ANTIALIAS_ON );
        g.drawImage(qrCode,28,60,124,115,null);
//        drawCenteredString(g,enrollment.getEvent().getTitle().toUpperCase(), 195, image, setFont("arrusb.ttf",20f), Color.decode("#2CC990"));
//        drawCenteredString(g,"Awesome", 500, image, setFont("NewRocker-Regular.ttf",39f), Color.decode("#F04903"));
//        drawCenteredString(g,"Events", 550, image, setFont("NewRocker-Regular.ttf",39f), Color.decode("#F04903"));
        if(enrollment.getEvent().getTitle().length()<10){
            drawPositionString(g,enrollment.getEvent().getTitle().toUpperCase(), 210, 90, setFont("arrusb.ttf",16f), Color.decode("#2CC990"));
        }
        else if(enrollment.getEvent().getTitle().length()<20){
            drawPositionString(g,enrollment.getEvent().getTitle().toUpperCase(), 185, 90, setFont("arrusb.ttf",16f), Color.decode("#2CC990"));
        }
        else {
            drawPositionString(g,enrollment.getEvent().getTitle().toUpperCase(), 163, 90, setFont("arrusb.ttf",15f), Color.decode("#2CC990"));
        }
        drawPositionString(g,new SimpleDateFormat("dd-MM-yyyy hh:mm a").format(enrollment.getEvent().getStartDate()).toLowerCase(), 240, 120, setFont("UVNHongHa_R.TTF",12f), Color.BLACK);
        drawPositionString(g,new SimpleDateFormat("dd-MM-yyyy hh:mm a").format(enrollment.getEvent().getEndDate()).toLowerCase(), 240, 142, setFont("UVNHongHa_R.TTF",12f), Color.BLACK);
        drawPositionString(g,enrollment.getAuthorizationCode(), 85, 50, setFont("UVNHongHa_R.TTF",14f), Color.WHITE);
        drawPositionString(g,enrollment.getUser().getEmail(), 200, 50, setFont("UVNHongHa_R.TTF",12f), Color.WHITE);
        if (enrollment.getEvent().getLocation()!=null) {
            String[] location = enrollment.getEvent().getLocation().split(",");
            drawPositionString(g, location[0] + (location[1]==null?"": ", " + location[1]), 240, 162, setFont("UVNHongHa_R.TTF", 12f), Color.BLACK);
//            drawPositionString(g,location[location.length-2], 490, 200, setFont("libel-suit-rg.ttf",25f), Color.BLACK);
        }
        g.dispose();
        return image;
    }
}
