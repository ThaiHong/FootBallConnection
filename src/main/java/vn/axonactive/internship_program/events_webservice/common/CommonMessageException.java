package vn.axonactive.internship_program.events_webservice.common;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by pvdinh on 1/16/2017.
 */
public class CommonMessageException {
    public static ResponseEntity<?> unauthorized() {
        Map<String, Object> metadata = new HashMap<String, Object>();
        metadata.put("status", 401);
        metadata.put("message","Unauthorized");
        return new ResponseEntity<Object>(metadata, HttpStatus.OK);
    }

    public static ResponseEntity<?> forbidden() {
        Map<String, Object> metadata = new HashMap<String, Object>();
        metadata.put("status", 403);
        metadata.put("message","Forbidden");
        return new ResponseEntity<Object>(metadata, HttpStatus.OK);
    }

    public static ResponseEntity<?> badRequest(){
        Map<String, Object> metadata = new HashMap<String, Object>();
        metadata.put("status", 400);
        metadata.put("message","Bad Request");
        return new ResponseEntity<Object>(metadata, HttpStatus.OK);
    }

    public static ResponseEntity<?> unprocessableEntity() {
        Map<String, Object> metadata = new HashMap<String, Object>();
        metadata.put("status", 422);
        metadata.put("message","Unprocessable Entity");
        return new ResponseEntity<Object>(metadata, HttpStatus.OK);
    }

    public static ResponseEntity<?> conflict() {
        Map<String, Object> metadata = new HashMap<String, Object>();
        metadata.put("status", 409);
        metadata.put("message","Conflict");
        return new ResponseEntity<Object>(metadata, HttpStatus.OK);
    }

    public static ResponseEntity<?> notFound() {
        Map<String, Object> metadata = new HashMap<String, Object>();
        metadata.put("status", 404);
        metadata.put("message","Not Found");
        return new ResponseEntity<Object>(metadata, HttpStatus.OK);
    }

    public static ResponseEntity<?> notFoundEntity() {
        Map<String, Object> metadata = new HashMap<String, Object>();
        metadata.put("status", 404);
        metadata.put("message","Not Found Entity");
        return new ResponseEntity<Object>(metadata, HttpStatus.OK);
    }

    public static  ResponseEntity<?> ServerError(){
        Map<String, Object> metadata = new HashMap<String, Object>();
        metadata.put("status", 500);
        metadata.put("message","Internal server error");
        return new ResponseEntity<Object>(metadata, HttpStatus.OK);
    }

    public static  ResponseEntity<?> UnsupportedMediaType(){
        Map<String, Object> metadata = new HashMap<String, Object>();
        metadata.put("status", 415);
        metadata.put("message","Unsupported Media Type");
        return new ResponseEntity<Object>(metadata, HttpStatus.OK);
    }
    public static  ResponseEntity<?> Expectation(){
        Map<String, Object> metadata = new HashMap<String, Object>();
        metadata.put("status", 417);
        metadata.put("message","Expectation Failed");
        return new ResponseEntity<Object>(metadata, HttpStatus.OK);
    }

//    public static ResponseEntity<?> handleCustomException(Exception ex) {
//        Map<String, Object> metadata = new HashMap<String, Object>();
//        metadata.put("status", 500);
//        metadata.put("message","Internal Server Error");
//        return new ResponseEntity<Object>(metadata, HttpStatus.INTERNAL_SERVER_ERROR);
//    }
}
