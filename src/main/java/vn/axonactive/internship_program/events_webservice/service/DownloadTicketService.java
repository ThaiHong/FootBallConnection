package vn.axonactive.internship_program.events_webservice.service;

import org.springframework.core.io.InputStreamResource;

/**
 * Created by dlong on 1/9/2017.
 */
public interface DownloadTicketService {
    public InputStreamResource downloadPDFFileByEventCode(String eventCode);
    public InputStreamResource downloadPNGFileByEventCode(String eventCode);
}
