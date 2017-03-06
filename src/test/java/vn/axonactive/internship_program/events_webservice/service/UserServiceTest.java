package vn.axonactive.internship_program.events_webservice.service;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import vn.axonactive.internship_program.events_webservice.entity.Event;
import vn.axonactive.internship_program.events_webservice.entity.Permission;
import vn.axonactive.internship_program.events_webservice.entity.Role;
import vn.axonactive.internship_program.events_webservice.entity.User;
import vn.axonactive.internship_program.events_webservice.repository.PermissionRepository;
import vn.axonactive.internship_program.events_webservice.repository.RoleRepository;
import vn.axonactive.internship_program.events_webservice.repository.UserRepository;
import vn.axonactive.internship_program.events_webservice.service.PermissionServiceImpl;
import vn.axonactive.internship_program.events_webservice.service.RoleServiceImpl;
import vn.axonactive.internship_program.events_webservice.service.UserServiceImpl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.any;
import static org.mockito.Matchers.anyLong;
import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.*;

/**
 * Created by nhlinh2 on 12/13/2016.
 */
@RunWith(MockitoJUnitRunner.class)
public class UserServiceTest {
    @InjectMocks
    private UserServiceImpl userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private PermissionRepository permissionRepository;

    @Spy
    List<User> listuser = new ArrayList<User>();


    @Mock
    private PermissionServiceImpl permissionService;

    @Mock
    private RoleServiceImpl roleService;

    User user;
    Permission permission;

    @Before
    public void setUp(){
        user = new User();
    }

    @Test
    public void findAll_OK(){
        User user1 = new User();
        User user2 = new User();
        User user3 = new User();
        User user4 = new User();

        when(userRepository.findAll()).thenReturn(Arrays.asList(user1,user2,user3,user4));
        Assert.assertEquals(4,userService.getAll().size());
    }
    @Test
    public void  findByEmail_OK(){

        User user = new User();
        user.setEmail("linh@gmail");
        when(userRepository.findByEmail(anyString())).thenReturn(user);
        Assert.assertEquals(user,userService.findByEmail(anyString()));
    }

    @Test
    public void getById_OK(){

        User user = new User();
        Long userId = new Long(anyLong());

        when(userRepository.findOne(userId)).thenReturn(user);
        Assert.assertEquals(user,userService.getById(userId));
    }

    @Test
    public void findByEmailAndPassword_OK(){
        User user = new User();
        when(userRepository.findByEmailAndPassword(anyString(),anyString())).thenReturn(user);
        Assert.assertEquals(user,userService.findByEmailAndPassword(anyString(),anyString()));

    }
   @Test
   public void saveUser_OK(){
        when(userRepository.save(user)).thenReturn(user);
        Assert.assertEquals(user,userService.save(user));
    }
    @Test
    public void createUser_OK(){
        Role role = new Role();
        role.setRoleId(1);
        role.setRoleName("ROLE_USER");


        User user = new User();
        user.setId(1L);
        user.setEmail("linh@gmail.com");


        Permission permission = new Permission();
        permission.setRole(role);
        permission.setUser(user);

        when(userRepository.save(user)).thenReturn(user);
        when(userRepository.findOne(user.getId())).thenReturn(user);

        when(roleService.findByRoleName(role.getRoleName())).thenReturn(role);
        when(permissionService.create(user,role)).thenReturn(permission);
        user.setPermissionList(Arrays.asList(permission));

        Assert.assertEquals(user,userService.create(user));
        Assert.assertEquals(user.getPermissionList().get(0).getRole(),userService.create(user).getPermissionList().get(0).getRole());


    }

    @Test
    public void update_OK(){
        // Todo
//        User user = new User(5L, "fgfdg@yahoo.com", "abc", "vovan");
//        User olduser = new User();
//        String accountCode = SecurityContextHolder.getContext().getAuthentication().getName();
//        when(userRepository.findByAccountCode(accountCode)).thenReturn(olduser);
//        olduser.setFullName("axon");
//        olduser.setIgnoreJoin(user.isIgnoreJoin());
//        when(userRepository.save(olduser)).thenReturn(olduser);
//        Assert.assertEquals(user,userService.update(olduser));

    }


    @Test
    public void findByAccountCode(){
        when(userRepository.findByAccountCode(anyString())).thenReturn(user);
        Assert.assertEquals(user, userService.findByAccountCode(anyString()));
    }

    @Test
    public void getAllRoleByUserID(){
        User user = new User(5L, "fgfdg@yahoo.com", "abc", "vovan");
        when(userRepository.findOne(5L)).thenReturn(user);
        Assert.assertEquals(user, userService.getById(5L));
    }

    @Test
    public void delete(){
        Long userId = new Long(1);
        user.setId(userId);
        //when(repository.findOne(userId)).thenReturn(user1);
        doNothing().when(userRepository).delete(anyLong());
        //doThrow(IllegalArgumentException.class).when(repository).delete(anyLong());
        userService.delete(anyLong());
        verify(userRepository).delete(anyLong());
    }

    @Test
    public void deleteAll(){
        doNothing().when(userRepository).deleteAll();
        userService.deleteAll();
        verify(userRepository).deleteAll();
    }

    @Test
    public void checkString_isEmpty_OK(){
        String value = "ABC";
        Assert.assertNotNull(value.trim().isEmpty());
    }

//    @Test
//    public void changeStatusOfAllEmailReminder_OK(){
//        User user = new User(1L,0);
//        when(userRepository.findOne(1L)).thenReturn(user);
//        Assert.assertEquals(user,userService.getAll());
//
//    }

//    @Test
//    public void getUserOwnerByEventId_OK(){
//        User user = new User(5L, "fgfdg@yahoo.com", "abc", "vovan");
//        Event event = new Event(1L,"abc","50abc");
//
//        Long userId = new Long(5L);
//        when(userRepository.getUserOwnerByEventId(userId)).thenReturn(user);
//        Assert.assertEquals(user.getId(),userService.getUserOwnerByEventId(5L));
//
//    }







}