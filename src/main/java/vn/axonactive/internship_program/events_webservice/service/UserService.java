package vn.axonactive.internship_program.events_webservice.service;

import vn.axonactive.internship_program.events_webservice.entity.Enrollment;
import vn.axonactive.internship_program.events_webservice.entity.Role;
import vn.axonactive.internship_program.events_webservice.entity.User;

import java.util.List;

/**
 * Created by phanvudinh on 12/10/2016.
 */
public interface UserService {

    public User create(User user);

    public List<User> getAll();

    public User getById(Long userId);

    public User update(User user);

    public User save(User user);

    public void delete(Long userId);

    public void deleteAll();

    public User findByEmailAndPassword(String email, String password);

    public User findByEmail(String email);

    public List<Role> getAllRoleByUserId(Long userId);

    public List<Enrollment> getAllEnrollmentsByUserId(Long userId);

    User findByAccountCode(String accountCode);

    public List<String> getListUserByEventId(Long id);

    public String getUserOwnerByEventId(Long id);

    public void changeStatusOfAllEmailReminder(Long userId, int status);

    public User updatePassword(User user);

}