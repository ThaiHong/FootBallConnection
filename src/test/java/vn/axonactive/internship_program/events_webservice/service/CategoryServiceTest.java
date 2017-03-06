package vn.axonactive.internship_program.events_webservice.service;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import vn.axonactive.internship_program.events_webservice.entity.Category;
import vn.axonactive.internship_program.events_webservice.repository.CategoryRepository;
import vn.axonactive.internship_program.events_webservice.service.CategoryServiceImpl;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by vdhong on 12/27/2016.
 */
@RunWith(SpringJUnit4ClassRunner.class)
public class CategoryServiceTest {
    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private CategoryServiceImpl categoryService;

    private List<Category> categories = new ArrayList<Category>();
    @Before
    public void init(){
        MockitoAnnotations.initMocks(this);
        categories.add(new Category(0l,"Cat0","Category 0"));
        categories.add(new Category(1l,"Cat1","Category 1"));
        categories.add(new Category(2l,"Cat2","Category 2"));
        categories.add(new Category(3l,"Cat3","Category 3"));
    }

    @Test
    public void testGetAll_OK(){
        Mockito.when(categoryRepository.findAll()).thenReturn(categories);
        Assert.assertEquals(categories,categoryService.getAll());
    }

}
