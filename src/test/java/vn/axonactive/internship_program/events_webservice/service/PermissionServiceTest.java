package vn.axonactive.internship_program.events_webservice.service;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import vn.axonactive.internship_program.events_webservice.entity.Category;
import vn.axonactive.internship_program.events_webservice.entity.Permission;
import vn.axonactive.internship_program.events_webservice.entity.Role;
import vn.axonactive.internship_program.events_webservice.entity.User;
import vn.axonactive.internship_program.events_webservice.repository.PermissionRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by nhlinh2 on 1/19/2017.
 */
@RunWith(SpringJUnit4ClassRunner.class)
public class PermissionServiceTest {

    @InjectMocks
    private PermissionServiceImpl permissionService;

    @Mock
    private PermissionRepository permissionRepository;

    private Permission permission;
    private User users = new User();
    private Role roles = new Role();


    @Before
    public void setUp(){
        users=new User(5L, "fgfdg@yahoo.com", "abc", "vovan");
        roles=new Role(1, "username");
    }

    @Test
    public void create_OK(){

        Permission permission=new Permission();
        User user = new User(6L, "fgfdg@yahoo.com", "abc", "vovan");
        Role role = new Role(2, "username");
        permission.setUser(user);
        permission.setRole(role);
        Mockito.when(permissionRepository.save(permission)).thenReturn(permission);
        Assert.assertEquals(null,permissionService.create(user,role));
    }
}
