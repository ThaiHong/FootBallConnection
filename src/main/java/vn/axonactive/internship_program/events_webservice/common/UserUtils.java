package vn.axonactive.internship_program.events_webservice.common;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import vn.axonactive.internship_program.events_webservice.security.JwtUser;

/**
 * Created by phanvudinh on 1/16/2017.
 */
public class UserUtils {

    public static Long getIdByAuthorization(){
        return ((JwtUser) (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
    }

    public static String getAccountCodeByAuthorization(){
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
