package vn.axonactive.internship_program.events_webservice.security.service;

import vn.axonactive.internship_program.events_webservice.entity.User;
import vn.axonactive.internship_program.events_webservice.security.JwtUser;
import vn.axonactive.internship_program.events_webservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by stephan on 20.03.16.
 */
@Service
public class JwtUserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String accountCode) throws UsernameNotFoundException {
        User user = userService.findByAccountCode(accountCode);

        if (user == null) {
            throw new UsernameNotFoundException(String.format("No user found with username '%s'.", accountCode));
        } else {
            return new JwtUser(
                    user.getId(),
                    user.getAccountCode(),
                    user.getFullName(),
                    this.mapToGrantedAuthorities(user.getId()));
        }
    }

    private List<GrantedAuthority> mapToGrantedAuthorities(Long userId) {
        return this.userService.getAllRoleByUserId(userId)
                .stream()
                .map(x -> new SimpleGrantedAuthority(x.getRoleName()))
                .collect(Collectors.toList());
    }
}
