package vn.axonactive.internship_program.events_webservice.common;

/**
 * Created by pvdinh on 1/16/2017.
 */
import java.text.Normalizer;
import java.util.regex.Pattern;

public class StringUtils {

    public static String removeAccent(String s) {

        String temp = Normalizer.normalize(s, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        return pattern.matcher(temp).replaceAll("").replaceAll("\\s+","-");
    }
}