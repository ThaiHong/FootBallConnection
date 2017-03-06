package vn.axonactive.internship_program.events_webservice.service;

import com.google.zxing.NotFoundException;
import com.google.zxing.WriterException;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.net.URISyntaxException;

/**
 * Created by lmchuc on 1/2/2017.
 */
public interface QRCodeService {
    public void createQRCode(String qrCodeData, String fileName) throws IOException, WriterException, URISyntaxException;
    public String readQRCode(String url) throws IOException, NotFoundException;
    public BufferedImage createQRCodeBuffer(String qrCodeData) throws IOException, WriterException, URISyntaxException;
    }
