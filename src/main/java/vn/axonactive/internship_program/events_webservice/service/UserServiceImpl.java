package vn.axonactive.internship_program.events_webservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.axonactive.internship_program.events_webservice.common.UserUtils;
import vn.axonactive.internship_program.events_webservice.entity.Enrollment;
import vn.axonactive.internship_program.events_webservice.entity.Role;
import vn.axonactive.internship_program.events_webservice.entity.User;
import vn.axonactive.internship_program.events_webservice.repository.EnrollmentRepository;
import vn.axonactive.internship_program.events_webservice.repository.UserRepository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Created by phanvudinh on 12/10/2016.
 */
@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private RoleService roleService;

    @Autowired
    private PermissionService permissionService;

    private boolean checkString(String value) {
        if (value != null) {
            if (!value.trim().isEmpty()) {
                return true;
            }
        }
        return false;
    }

    @Override
    public User create(User user) {
        User newUser = this.userRepository.save(user);
        permissionService.create(newUser, this.roleService.findByRoleName("ROLE_USER"));
        return this.getById(user.getId());
    }

    @Override
    public List<User> getAll() {
        return (List<User>) this.userRepository.findAll();
    }

    @Override
    public User getById(Long userId) {
        return this.userRepository.findOne(userId);
    }

    @Override
    public User update(User user) {
        String accountCode = UserUtils.getAccountCodeByAuthorization();
        User oldUser = this.userRepository.findByAccountCode(accountCode);
        if(user.getId() == oldUser.getId()) {

            if (checkString(user.getFullName())) {
                oldUser.setFullName(user.getFullName());
            }
            if (checkString(user.getPassword())) {
                oldUser.setPassword(user.getPassword());
            }
            if (checkString(user.getEmail())) {
                oldUser.setEmail(user.getEmail());
            }
            if (checkString(user.getRangeAge())) {
                oldUser.setRangeAge(user.getRangeAge());
            }
            if (checkString(user.getJob())) {
                oldUser.setJob(user.getJob());
            }
            if (checkString(user.getPhone())) {
                oldUser.setPhone(user.getPhone());
            }

            try {
                if (user.getBirthday() != null) {
                    oldUser.setBirthday(user.getBirthday());
                    Date date = user.getBirthday();
                    Date today = new Date();
                    int age = today.getYear() - date.getYear();
                    if (age < 18) {
                        oldUser.setRangeAge("Under 18 ");
                    } else if (age < 25) {
                        oldUser.setRangeAge("18 - 25");
                    } else if (age < 35) {
                        oldUser.setRangeAge("25 - 35");
                    } else {
                        oldUser.setRangeAge("Over 35");
                    }
                }
            }
            catch(Exception e){
                e.printStackTrace();
            }

            if (checkString(user.getPhone())) {
                oldUser.setIgnoreJoin(user.isIgnoreJoin());
            }
            if (checkString(user.getAddress())){
                oldUser.setAddress(user.getAddress());
            }

            if(checkString(user.getAvatar())) {
                oldUser.setAvatar(user.getAvatar());
            }
        }
        return this.userRepository.save(oldUser);
    }

    @Override
    public User updatePassword(User user) {
        User oldUser = this.userRepository.findByAccountCode(user.getAccountCode());
        if(checkString(user.getPassword())) {
            oldUser.setPassword(user.getPassword());
        }
        oldUser.setIgnoreJoin(user.isIgnoreJoin());
        return this.userRepository.save(oldUser);
    }

    public User save(User user) {
        return this.userRepository.save(user);
    }

    @Override
    public void delete(Long userId) {
        this.userRepository.delete(userId);
    }

    @Override
    public void deleteAll() {
        this.userRepository.deleteAll();
    }

    @Override
    public User findByEmailAndPassword(String email, String password) {
        return this.userRepository.findByEmailAndPassword(email, password);
    }

    @Override
    public User findByEmail(String email) {
        return this.userRepository.findByEmail(email);
    }

    @Override
    public List<Role> getAllRoleByUserId(Long userId) {
        List<Role> list = this.userRepository.findOne(userId).getPermissionList().stream().map(x -> x.getRole()).collect(Collectors.toList());
        return list;
    }

    @Override
    public List<Enrollment> getAllEnrollmentsByUserId(Long userId) {
        Set<Enrollment> enrollmentSet = this.userRepository.findOne(userId).getEnrollments();
        List<Enrollment> enrollmentList = new ArrayList<Enrollment>();
        enrollmentList.addAll(enrollmentSet);
        return enrollmentList;
    }


    public User findByAccountCode(String accountCode) {
        return this.userRepository.findByAccountCode(accountCode);
    }


    @Override
    public List<String> getListUserByEventId(Long id) {
        return userRepository.getListUserByEventId(id);
    }

    @Override
    public String getUserOwnerByEventId(Long id) {
        return userRepository.getUserOwnerByEventId(id);
    }

    @Override
    public void changeStatusOfAllEmailReminder(Long userId, int status) {
        this.userRepository.changeStatusOfAllEmailReminder(userId, status);
        if (status == 0) {
            this.enrollmentRepository.changeStatusOfEmailReminderByUserId(userId, status);
        }
    }

}
