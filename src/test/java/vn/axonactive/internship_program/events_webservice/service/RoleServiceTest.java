package vn.axonactive.internship_program.events_webservice.service;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import vn.axonactive.internship_program.events_webservice.entity.Role;
import vn.axonactive.internship_program.events_webservice.entity.Speaker;
import vn.axonactive.internship_program.events_webservice.repository.RoleRepository;
import vn.axonactive.internship_program.events_webservice.service.RoleService;
import vn.axonactive.internship_program.events_webservice.service.RoleServiceImpl;

import java.io.DataOutputStream;
import java.util.ArrayList;

import static org.mockito.Mock.*;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

/**
 * Created by dctruc on 1/6/2017.
 */

@RunWith(SpringJUnit4ClassRunner.class)
public class RoleServiceTest {

    @InjectMocks
    private RoleServiceImpl roleService;

    @Mock
    private RoleRepository roleRepository;


    private ArrayList<Role> roles = new ArrayList<Role>();

    @Before
    public void prepare(){
        Role role1 = new Role(1, "username");
        Role role2 = new Role(2,"username2");
        this.roles.add(role1);
        this.roles.add(role2);
    }

    @Test
    public void getAll_OK(){
        Mockito.when(roleRepository.findAll()).thenReturn(this.roles);
        Assert.assertEquals(2,roleService.getAll().size());
    }

    @Test
    public void findByRoleName_OK(){
        String role = new String("user");
        Role newrole = new Role(1, "user");
        Mockito.when(roleRepository.findByRoleName(role)).thenReturn(newrole);
        Assert.assertEquals(newrole,roleService.findByRoleName(role));
    }
    @Test
    public void create_OK(){
        // Todo impediment
//        String roleName = "ROLE_USER";
//        Role role = new Role();
//        role.setRoleName(roleName);
//        //role.setRoleName(roleName);
//        when(roleRepository.save(role)).thenReturn(role);
//        Assert.assertEquals("ROLE_USER",roleService.create(roleName));
    }
    @Test
    public void deleteAll(){
        //Todo impediment
    }



}
