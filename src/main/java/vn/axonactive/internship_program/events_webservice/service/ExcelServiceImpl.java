package vn.axonactive.internship_program.events_webservice.service;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import org.apache.poi.sl.usermodel.TextParagraph;
import org.apache.poi.xssf.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.axonactive.internship_program.events_webservice.entity.Enrollment;
import vn.axonactive.internship_program.events_webservice.entity.User;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.util.List;

/**
 * Created by nhlinh2 on 1/12/2017.
 */
@Service
public class ExcelServiceImpl implements ExcelService {

    @Autowired
    EnrollmentService enrollmentService;

    @Override
    public XSSFWorkbook exportListParticipantToExcel(Long eventId) {


        List<Enrollment> erolls = enrollmentService.getEnrollmentsByEvent(eventId);
        System.out.println(erolls.size()+"++++++++++++++++++++++++++++++++++++++++++");
        XSSFWorkbook workbook = new XSSFWorkbook();
        XSSFSheet sheet= workbook.createSheet("List of participant");
        XSSFRow header = sheet.createRow(0);
        header.createCell(0).setCellValue("Name");
        header.createCell(1).setCellValue("Age range");
        header.createCell(2).setCellValue("Email");
        header.createCell(3).setCellValue("Phone");
        header.createCell(4).setCellValue("Job");
        header.createCell(5).setCellValue("Address");
        header.createCell(6).setCellValue("Authentication code");
        header.createCell(7).setCellValue("Confirm");
        header.createCell(8).setCellValue("Checkin");
        int i = 1;
        for (Enrollment enrollment: erolls) {
            XSSFRow row = sheet.createRow(i++);
            User user = enrollment.getUser();
            row.createCell(0).setCellValue(user.getFullName());
            row.createCell(1).setCellValue(user.getRangeAge());
            row.createCell(2).setCellValue(user.getEmail());
            row.createCell(3).setCellValue(user.getPhone());
            row.createCell(4).setCellValue(user.getJob());
            row.createCell(5).setCellValue(user.getAddress());
            row.createCell(6).setCellValue(enrollment.getAuthorizationCode());
            if(enrollment.getConfirm()==0){
                row.createCell(7).setCellValue("");
            }
            else
                row.createCell(7).setCellValue("X");
            if(enrollment.getCheckIn()==0){
                row.createCell(8).setCellValue("");
            }
            else
                row.createCell(8).setCellValue("X");

            XSSFCellStyle style=workbook.createCellStyle();
            XSSFFont font=workbook.createFont();
            font.setFontName("Arial");
            font.setBold(true);
            style.setFont(font);
            XSSFCellStyle style_border = workbook.createCellStyle();
            style_border.setBorderTop((short)1);
            style_border.setBorderBottom((short)1);
            style_border.setBorderLeft((short)1);
            style_border.setBorderRight((short)1);
            for(int j=0;j<=8;j++){
                header.getCell(j).setCellStyle(style);
                header.getCell(j).setCellStyle(style_border);
                row.getCell(j).setCellStyle(style_border);
                sheet.autoSizeColumn(j);
            }
        }
        return workbook;
    }
    public Document exportListParticipantToPDF(Long eventId, Document doc) throws DocumentException {
        Paragraph paragraph = new Paragraph("List Participant", new Font(Font.FontFamily.HELVETICA, 20));
        paragraph.setAlignment(Element.ALIGN_MIDDLE);
        List<Enrollment> enrollments = enrollmentService.getEnrollmentsByEvent(eventId);
        PdfPTable table = new PdfPTable(7);
        table.setWidthPercentage(100);
        table.setWidths(new float[] {3.0f, 2.0f, 4.5f, 3.0f, 3.0f, 2.0f, 2.0f});
        table.setSpacingBefore(10);
        Font font = FontFactory.getFont(FontFactory.HELVETICA);
        font.setColor(BaseColor.WHITE);
        font.setSize(12.0f);
        PdfPCell cell = new PdfPCell();
        cell.setBackgroundColor(BaseColor.DARK_GRAY);
        //cell.setPadding(8);
        cell.setPhrase(new Phrase("Full name", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Range Age", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Email", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Phone", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Code", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Confirm", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Checkin", font));
        table.addCell(cell);
        for (Enrollment enrollment : enrollments) {
            User user = enrollment.getUser();
            table.addCell(user.getFullName());
            table.addCell(user.getRangeAge());
            table.addCell(user.getEmail());
            table.addCell(user.getPhone());
            table.addCell(enrollment.getAuthorizationCode());
            if (enrollment.getConfirm() == 0) table.addCell("");
            else table.addCell("X");
            if (enrollment.getCheckIn() == 0) table.addCell("");
            else table.addCell("X");
        }
        doc.addCreator("Terminal");
        doc.addTitle("LIST OF PARTICIPANTS");
        doc.add(paragraph);
        doc.add(Chunk.SPACETABBING);
        doc.add(table);
        return doc;
    }
}

