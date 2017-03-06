package vn.axonactive.internship_program.events_webservice.service;

import com.google.common.io.Resources;
import com.google.zxing.*;
import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.common.HybridBinarizer;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by lmchuc on 1/2/2017.
 */
@Service
public class QRCodeServiceImpl implements QRCodeService  {

    private static final int qrCodeWidth = 500;
    private static final int qrCodeHeight = 500;
    private Map hintMap;
    private static final String charset="UTF-8";
    public void init(){
        hintMap = new HashMap();
        hintMap.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.L);
    }

    @Override
    public void createQRCode(String qrCodeData, String fileName) throws IOException, WriterException, URISyntaxException {
        init();
        String filePath = String.valueOf(Paths.get(Resources.getResource("static").toURI())) +"/images/tickets/"+fileName;
        BitMatrix matrix = new MultiFormatWriter().encode(
                new String(qrCodeData.getBytes(charset), charset),
                BarcodeFormat.QR_CODE, qrCodeWidth, qrCodeHeight, hintMap);
        MatrixToImageWriter.writeToFile(matrix, filePath.substring(filePath
                .lastIndexOf('.') + 1), new File(filePath));
    }

    @Override
    public String readQRCode(String url) throws IOException, NotFoundException {
        init();
        BinaryBitmap binaryBitmap = new BinaryBitmap(new HybridBinarizer(
                new BufferedImageLuminanceSource(
                        ImageIO.read(new URL(url)))));
        Result qrCodeResult = new MultiFormatReader().decode(binaryBitmap,
                hintMap);
        return qrCodeResult.getText();
    }

    @Override
    public BufferedImage createQRCodeBuffer(String qrCodeData) throws IOException, WriterException, URISyntaxException {
        init();
        BitMatrix matrix = new MultiFormatWriter().encode(
                new String(qrCodeData.getBytes(charset), charset),
                BarcodeFormat.QR_CODE, qrCodeWidth, qrCodeHeight, hintMap);
        return MatrixToImageWriter.toBufferedImage(matrix);
    }

}
