package vn.axonactive.internship_program.events_webservice.common;
import java.io.*;
//The image class which will hold the PNG image as an object
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.text.Document;
//This class is required to read PNG image into Image object
import com.itextpdf.text.pdf.codec.PngImage;
import org.springframework.core.io.InputStreamResource;

public class ConvertPNGtoPDF {
    public static InputStreamResource convert(ByteArrayOutputStream outputImageStream)
    {
        try{
            Document convertPngToPdf=new Document();
            convertPngToPdf.setPageSize(PageSize.A4.rotate());
            ByteArrayOutputStream outputPdfStream = new ByteArrayOutputStream();
            PdfWriter writer= PdfWriter.getInstance(convertPngToPdf, outputPdfStream);
            convertPngToPdf.open();
            Image convertBmp = PngImage.getImage(new ByteArrayInputStream(outputImageStream.toByteArray()));
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