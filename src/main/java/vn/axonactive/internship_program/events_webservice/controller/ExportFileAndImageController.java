package vn.axonactive.internship_program.events_webservice.controller;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.pdf.PdfWriter;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import vn.axonactive.internship_program.events_webservice.common.CommonMessageException;
import vn.axonactive.internship_program.events_webservice.service.DownloadTicketService;
import vn.axonactive.internship_program.events_webservice.service.ExcelService;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URISyntaxException;

/**
 * Created by nhlinh2 on 1/12/2017.
 */
@RestController
@RequestMapping(value = "api/downloads")
public class ExportFileAndImageController {
    @Autowired
    public ExcelService excelService;
    @Autowired
    public HttpServletResponse httpServletResponse;
    @Autowired
    ServletContext context;
    @Autowired
    private DownloadTicketService downloadTicketService;

    @RequestMapping(value = "pdf/{eventCode:.+}", method = RequestMethod.GET, produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<InputStreamResource> downloadPDFFile(@PathVariable("eventCode") String eventCode) throws IOException, URISyntaxException {
        return new ResponseEntity<InputStreamResource>(downloadTicketService.downloadPDFFileByEventCode(eventCode), HttpStatus.OK);
    }

    @RequestMapping(value = "png/{eventCode:.+}", method = RequestMethod.GET, produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<InputStreamResource> downloadPNGFile(@PathVariable("eventCode") String eventCode) throws IOException, URISyntaxException {
        return new ResponseEntity<InputStreamResource>(downloadTicketService.downloadPNGFileByEventCode(eventCode), HttpStatus.OK);
    }

    @RequestMapping(value = "/excellist/{eventId}", method = RequestMethod.GET)
    public ResponseEntity<InputStreamResource> exportListParticipantByExcel(@PathVariable Long eventId) throws IOException {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        XSSFWorkbook xssfWorkbook = excelService.exportListParticipantToExcel(eventId);
        httpServletResponse.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        httpServletResponse.setHeader("Content-Disposition","attachmen;filename=list.xlsx");
        xssfWorkbook.write(httpServletResponse.getOutputStream());
        try {
            xssfWorkbook.write(byteArrayOutputStream);
            InputStreamResource inputStreamResource = new InputStreamResource(new ByteArrayInputStream(byteArrayOutputStream.toByteArray()));
            return new ResponseEntity<InputStreamResource>(inputStreamResource, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<InputStreamResource>(HttpStatus.NOT_FOUND);
    }
    @RequestMapping(value = "/pdflist/{eventId}", method = RequestMethod.GET)
    public ResponseEntity<InputStreamResource> exportListParticipantByPDF(@PathVariable Long eventId) throws IOException, URISyntaxException, DocumentException {
        System.out.println("ok");
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        httpServletResponse.setContentType("application/pdf");
        httpServletResponse.setHeader("Content-disposition", "attachment; filename="+ "ListParticipant.pdf");
        try{
            Document document = new Document();
            PdfWriter.getInstance(document, byteArrayOutputStream);
            document.open();
            document = excelService.exportListParticipantToPDF(eventId,document);
            document.close();
            OutputStream outputStream = httpServletResponse.getOutputStream();
            byteArrayOutputStream.writeTo(outputStream);
            outputStream.flush();
            return new ResponseEntity<InputStreamResource>(new InputStreamResource(new ByteArrayInputStream(byteArrayOutputStream.toByteArray())),HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<InputStreamResource>(HttpStatus.NOT_FOUND);
    }
}
