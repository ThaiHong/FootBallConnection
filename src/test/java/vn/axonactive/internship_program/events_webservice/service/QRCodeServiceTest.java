package vn.axonactive.internship_program.events_webservice.service;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.runners.MockitoJUnitRunner;
import vn.axonactive.internship_program.events_webservice.service.QRCodeService;
import vn.axonactive.internship_program.events_webservice.service.QRCodeServiceImpl;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.util.Random;

/**
 * Created by lmchuc on 1/4/2017.
 */
@RunWith(MockitoJUnitRunner.class)
public class QRCodeServiceTest {

    @InjectMocks
    QRCodeServiceImpl qrCodeService;


    @Test
    public void readQRCode_OK() throws Exception{

        String url = "http://www.qrstuff.com/images/sample.png";
        String qrCodeResult = "http://www.qrstuff.com/";
        Assert.assertEquals(qrCodeResult,qrCodeService.readQRCode(url));
    }

    @Test
    public void readQRCode_Failed() throws Exception{

        String url = "http://www.qrstuff.com/images/sample.png";
        String qrCodeResult = "http://www.qrstufffff.com/";
        Assert.assertNotEquals(qrCodeResult,qrCodeService.readQRCode(url));
    }

    @Test
    public void createQRCodeBuffer_OK() throws Exception{
        String input = "dang thanh nhat";
        BufferedImage outImage = qrCodeService.createQRCodeBuffer(input);
        int h = outImage.getHeight();
        int w = outImage.getWidth();
        Assert.assertTrue(h==500&&w==500);
        Random r = new Random();
        int x = r.nextInt(w-1)+1;
        int y = r.nextInt(h-1)+1;
        Color c = new Color(outImage.getRGB(x,y));
        Assert.assertTrue(c.getRed()==255||c.getRed()==0);
    }

    @Test
    public void createQRCode_OK(){
        //todo implement later
    }

}
