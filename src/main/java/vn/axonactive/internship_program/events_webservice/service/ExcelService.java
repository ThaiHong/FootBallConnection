package vn.axonactive.internship_program.events_webservice.service;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import javax.servlet.http.HttpServletResponse;

/**
 * Created by nhlinh2 on 1/12/2017.
 */
public interface ExcelService {
    public XSSFWorkbook exportListParticipantToExcel(Long eventId);
    public Document exportListParticipantToPDF(Long eventId, Document doc) throws DocumentException;
}
