package vn.axonactive.internship_program.events_webservice.common;
import com.google.firebase.database.*;
import com.google.zxing.*;
import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.common.HybridBinarizer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import vn.axonactive.internship_program.events_webservice.entity.Enrollment;
import vn.axonactive.internship_program.events_webservice.entity.Event;
import vn.axonactive.internship_program.events_webservice.entity.User;
import vn.axonactive.internship_program.events_webservice.service.EnrollmentService;
import vn.axonactive.internship_program.events_webservice.service.EventService;
import vn.axonactive.internship_program.events_webservice.service.EventServiceImpl;
import vn.axonactive.internship_program.events_webservice.service.QRCodeService;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
public class TestQRCode {

    @Autowired
    EventService eventService;

    @Autowired
    EnrollmentService enrollmentService;

    @Autowired
    private QRCodeService qrCodeService;

    @GetMapping(value = "/testqr/{maqr}")
    public ResponseEntity<?> getLinkQR(HttpServletRequest request, @PathVariable("maqr") String maqr) throws IOException, WriterException, URISyntaxException {
//        Map hintMap = new HashMap();
//        hintMap.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.L);
//        String filePath = null;
//        try {
//            filePath = String.valueOf(Paths.get(Resources.getResource("static").toURI())) +"/images/tickets/"+"QRCode.png";
//        } catch (URISyntaxException e) {
//            e.printStackTrace();
//        }
     //   createQRCode("Le Manh Chuc", filePath, "UTF-8", hintMap, 500, 500);
        qrCodeService.createQRCode(maqr,"test.png");
        return new ResponseEntity<String>(request.getRequestURL().toString().replace(request.getRequestURI(), request.getContextPath()) +"/images/tickets/test.png", HttpStatus.OK);
    }

    @GetMapping(value = "/testqr")
    public ResponseEntity<?> createQR(@RequestParam("url") String url) throws Exception {
        return new ResponseEntity<String>(qrCodeService.readQRCode(url), HttpStatus.OK);
    }


    @GetMapping(value = "/testfirebase")
    public void testQr(){
//        // Write a message to the database
//        DatabaseReference myRef = database.getReference("message");
//
//        myRef.setValue("Hello, World!");

//        FirebaseDatabase database = FirebaseDatabase.getInstance();
//        DatabaseReference eventRef = database.getReference("events");
//        eventRef.setValue(null);
//
//        List<Event> eventList= eventService.getAll();
//        for (Event e: eventList) {
//            DatabaseReference userRef= eventRef.child(e.getId().toString());
//            for (Enrollment enroll: e.getEnrollments()){
//                if (enroll.getType()==2) {
//                    User user = enroll.getUser();
//                    userRef.child(user.getId().toString()).setValue(enroll.getCheckIn());
//                }
//            }
//
//            eventRef.child(e.getId().toString()).addChildEventListener(new ChildEventListener() {
//                @Override
//                public void onChildAdded(DataSnapshot dataSnapshot, String s) {
//
//                }
//
//                @Override
//                public void onChildChanged(DataSnapshot dataSnapshot, String s) {
//                    int checkIn = dataSnapshot.getValue(Integer.class);
//                    enrollmentService.updateCheckInStatus(checkIn,Long.parseLong(e.getId().toString()),Long.parseLong(dataSnapshot.getKey()));
//                }
//
//                @Override
//                public void onChildRemoved(DataSnapshot dataSnapshot) {
//
//                }
//
//                @Override
//                public void onChildMoved(DataSnapshot dataSnapshot, String s) {
//
//                }
//
//                @Override
//                public void onCancelled(DatabaseError databaseError) {
//
//                }
//            });
//        }


//        // Read from the database
//        myRef.addValueEventListener(new ValueEventListener() {
//            @Override
//            public void onDataChange(DataSnapshot dataSnapshot) {
//                // This method is called once with the initial value and again
//                // whenever data at this location is updated.
//                String value = dataSnapshot.getValue(String.class);
//                System.out.println(("Value is: " + value));
//            }
//
//            @Override
//            public void onCancelled(DatabaseError error) {
//                // Failed to read value
//                System.out.println("Failed to read value."+ error.toException());
//            }
//        });
    }

    public static void createQRCode(String qrCodeData, String filePath,
                                    String charset, Map hintMap, int qrCodeheight, int qrCodewidth)
            throws WriterException, IOException {
        BitMatrix matrix = new MultiFormatWriter().encode(
                new String(qrCodeData.getBytes(charset), charset),
                BarcodeFormat.QR_CODE, qrCodewidth, qrCodeheight, hintMap);
        MatrixToImageWriter.writeToFile(matrix, filePath.substring(filePath
                .lastIndexOf('.') + 1), new File(filePath));
    }

    public static String readQRCode(String filePath, String charset, Map hintMap)
            throws FileNotFoundException, IOException, NotFoundException {
        BinaryBitmap binaryBitmap = new BinaryBitmap(new HybridBinarizer(
                new BufferedImageLuminanceSource(
                        ImageIO.read(new FileInputStream(filePath)))));
        Result qrCodeResult = new MultiFormatReader().decode(binaryBitmap,
                hintMap);
        return qrCodeResult.getText();
    }
}