package vn.axonactive.internship_program.events_webservice.common;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.text.pdf.codec.PngImage;
import org.imgscalr.Scalr;
import org.springframework.core.io.InputStreamResource;
import vn.axonactive.internship_program.events_webservice.entity.Enrollment;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.Font;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.text.SimpleDateFormat;

/**
 * Created by lmchuc on 16/01/2017.
 */
public class ImageProcessing {
    public static final int EVENT_WIDTH = 1920;
    public static final int EVENT_HEIGHT = 768;
    public static final int EVENT_COVER_WIDTH = 960;
    public static final int EVENT_COVER_HEIGHT = 384;
    public static final int EVENT_THUMB_WIDTH = 480;
    public static final int EVENT_THUMB_HEIGHT = 192;
    public static final int AVATAR_WIDTH = 400;
    public static final int AVATAR_HEIGHT = 400;
    public static final int AVATAR_THUMB_WIDTH = 100;
    public static final int AVATAR_THUMB_HEIGHT = 100;

    // ---------------------Resize Image------------------
    public static BufferedImage resizeImage(BufferedImage originalImage, int type, int IMG_WIDTH, int IMG_HEIGHT){
        BufferedImage resizedImage = new BufferedImage(IMG_WIDTH, IMG_HEIGHT, type);
        Graphics2D g = resizedImage.createGraphics();
        g.drawImage(originalImage, 0, 0, IMG_WIDTH, IMG_HEIGHT, null);
        g.dispose();

        return resizedImage;
    }

    public static BufferedImage resizeImageWithHint(BufferedImage originalImage, int type,int IMG_WIDTH, int IMG_HEIGHT) {

        BufferedImage resizedImage = new BufferedImage(IMG_WIDTH, IMG_HEIGHT, type);
        Graphics2D g = resizedImage.createGraphics();
        g.drawImage(originalImage, 0, 0, IMG_WIDTH, IMG_HEIGHT, null);
        g.dispose();
        g.setComposite(AlphaComposite.Src);

        g.setRenderingHint(RenderingHints.KEY_INTERPOLATION,
                RenderingHints.VALUE_INTERPOLATION_BILINEAR);
        g.setRenderingHint(RenderingHints.KEY_RENDERING,
                RenderingHints.VALUE_RENDER_QUALITY);
        g.setRenderingHint(RenderingHints.KEY_ANTIALIASING,
                RenderingHints.VALUE_ANTIALIAS_ON);

        return resizedImage;
    }

    public static BufferedImage resizeImageScalr(BufferedImage originalImage, int dWidth, int dHeight){
        return Scalr.resize(originalImage, Scalr.Method.ULTRA_QUALITY,Scalr.Mode.FIT_EXACT, dWidth, dHeight);
    }

    //    Crop image
    public static BufferedImage cropImageScalr(BufferedImage originalImage, int x, int y, int dWidth, int dHeight){
        return Scalr.crop(originalImage,x,y,dWidth,dHeight);
    }


    // ---------------------Draw Image-------------------
    public static void drawCenteredString(Graphics2D g, String text, int y, BufferedImage image, Font font, Color color) {
        FontMetrics metrics = g.getFontMetrics(font);
        int x = (image.getWidth() - metrics.stringWidth(text) - 120) / 2;
        g.setFont(font);
        g.setColor(color);
        g.drawString(text, x, y);
    }

    public static void drawPositionString(Graphics2D g, String text, int x, int y, Font font, Color color) {
        g.setFont(font);
        g.setColor(color);
        g.drawString(text, x, y);
    }

    public Font setFont(String fontName, float fontSize) throws IOException, FontFormatException, URISyntaxException {
        return Font.createFont(Font.TRUETYPE_FONT, new File(CommonPath.staticPath() + "/fonts/" + fontName)).deriveFont(fontSize);
    }

    public BufferedImage generateTicket(Enrollment enrollment, BufferedImage qrCode) throws IOException, FontFormatException, URISyntaxException {
        BufferedImage image = ImageIO.read(new File(CommonPath.staticPath() + "/images/ticket.png"));
//        Smoothly Text
        Graphics2D g = image.createGraphics();
        g.setRenderingHint(RenderingHints.KEY_TEXT_ANTIALIASING, RenderingHints.VALUE_TEXT_ANTIALIAS_ON);
        g.drawImage(qrCode, 28, 60, 124, 115, null);
        if (enrollment.getEvent().getTitle().length() < 10) {
            drawPositionString(g, enrollment.getEvent().getTitle().toUpperCase(), 210, 90, setFont("arrusb.ttf", 16f), Color.decode("#2CC990"));
        } else if (enrollment.getEvent().getTitle().length() < 20) {
            drawPositionString(g, enrollment.getEvent().getTitle().toUpperCase(), 185, 90, setFont("arrusb.ttf", 16f), Color.decode("#2CC990"));
        } else {
            drawPositionString(g, enrollment.getEvent().getTitle().toUpperCase(), 163, 90, setFont("arrusb.ttf", 15f), Color.decode("#2CC990"));
        }
        drawPositionString(g, new SimpleDateFormat("dd-MM-yyyy hh:mm a").format(enrollment.getEvent().getStartDate()).toLowerCase(), 240, 120, setFont("UVNHongHa_R.TTF", 12f), Color.BLACK);
        drawPositionString(g, new SimpleDateFormat("dd-MM-yyyy hh:mm a").format(enrollment.getEvent().getEndDate()).toLowerCase(), 240, 142, setFont("UVNHongHa_R.TTF", 12f), Color.BLACK);
        drawPositionString(g, enrollment.getAuthorizationCode(), 85, 50, setFont("UVNHongHa_R.TTF", 14f), Color.WHITE);
        drawPositionString(g, enrollment.getUser().getEmail(), 200, 50, setFont("UVNHongHa_R.TTF", 12f), Color.WHITE);
        if (enrollment.getEvent().getLocation() != null) {
            String[] location = enrollment.getEvent().getLocation().split(",");
            drawPositionString(g, location[0] + (location[1] == null ? "" : ", " + location[1]), 240, 162, setFont("UVNHongHa_R.TTF", 12f), Color.BLACK);
        }
        g.dispose();
        return image;
    }

    // -------------------Convert PNG to PDF--------------------------------------------
    public static InputStreamResource convertPNGtoPDF(ByteArrayOutputStream outputImageStream)
    {
        try{
            Document convertPngToPdf=new Document();
            convertPngToPdf.setPageSize(PageSize.A4.rotate());
            ByteArrayOutputStream outputPdfStream = new ByteArrayOutputStream();
            PdfWriter writer= PdfWriter.getInstance(convertPngToPdf, outputPdfStream);
            convertPngToPdf.open();
            com.itextpdf.text.Image convertBmp = PngImage.getImage(new ByteArrayInputStream(outputImageStream.toByteArray()));
            convertBmp.setAbsolutePosition(
                    (PageSize.POSTCARD.getWidth()-120),
                    (PageSize.POSTCARD.getHeight() - 200));
            convertPngToPdf.add(convertBmp);
            //Close Document
            convertPngToPdf.close();
            return new InputStreamResource(new ByteArrayInputStream(outputPdfStream.toByteArray()));
        }
        catch (Exception i1){
            i1.printStackTrace();
        }
        return null;
    }
}
