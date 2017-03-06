package vn.axonactive.internship_program.events_webservice.service;

import com.google.firebase.database.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.axonactive.internship_program.events_webservice.entity.Enrollment;
import vn.axonactive.internship_program.events_webservice.entity.Event;
import vn.axonactive.internship_program.events_webservice.entity.User;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by lmchuc on 1/9/2017.
 */
@Service
public class FirebaseServiceImpl implements FirebaseService {
    @Autowired
    EventService eventService;
    @Autowired
    EnrollmentService enrollmentService;

    public static boolean firstTime = true;

    @Override
    public void init() {
        if (firstTime) {
            FirebaseDatabase database = FirebaseDatabase.getInstance();
            DatabaseReference eventRef = database.getReference("events");
            eventRef.setValue(null);
            List<Event> eventList = eventService.getAll();
            for (Event e : eventList) {
                DatabaseReference userRef = eventRef.child(e.getId().toString());
                for (Enrollment enroll : e.getEnrollments()) {
                    if (enroll.getType() == 2) {
                        User user = enroll.getUser();
                        Map data = new HashMap();
                        data.put("confirm", enroll.getConfirm());
                        data.put("check", enroll.getCheckIn());
                        data.put("email", enroll.getUser().getEmail());
                        data.put("fullName", enroll.getUser().getFullName());
                        data.put("rangeAge", enroll.getUser().getRangeAge());
                        data.put("phone", enroll.getUser().getPhone());
                        data.put("code", enroll.getAuthorizationCode());

                        userRef.child(user.getId().toString()).setValue(data);
                        userRef.child(user.getId().toString()).child("check").addValueEventListener(new ValueEventListener() {
                            @Override
                            public void onDataChange(DataSnapshot dataSnapshot) {
                                int checkIn = dataSnapshot.getValue(Integer.class);
                                enrollmentService.updateCheckInStatus(checkIn, Long.parseLong(e.getId().toString()), user.getId());
                            }

                            @Override
                            public void onCancelled(DatabaseError databaseError) {

                            }
                        });

                        userRef.child(user.getId().toString()).child("confirm").addValueEventListener(new ValueEventListener() {
                            @Override
                            public void onDataChange(DataSnapshot dataSnapshot) {
                                int confirm = dataSnapshot.getValue(Integer.class);
                                enrollmentService.updateConfirmStatus(confirm, Long.parseLong(e.getId().toString()), user.getId());
                            }

                            @Override
                            public void onCancelled(DatabaseError databaseError) {

                            }
                        });
                    }
                }
            }
            firstTime=false;
        }
    }
}