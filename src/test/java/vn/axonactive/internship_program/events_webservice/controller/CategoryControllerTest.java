package vn.axonactive.internship_program.events_webservice.controller;

import com.google.gson.Gson;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;
import vn.axonactive.internship_program.events_webservice.controller.CategoryController;
import vn.axonactive.internship_program.events_webservice.entity.Category;
import vn.axonactive.internship_program.events_webservice.repository.CategoryRepository;
import vn.axonactive.internship_program.events_webservice.service.CategoryServiceImpl;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.assertNotNull;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

/**
 * Created by vdhong on 12/27/2016.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@WebMvcTest(CategoryController.class)
public class CategoryControllerTest {
    private MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
            MediaType.APPLICATION_JSON.getSubtype(),
            Charset.forName("utf8"));

    @Autowired
    private MockMvc mockMvc;

    private HttpMessageConverter mappingJackson2HttpMessageConverter;

    @MockBean
    CategoryRepository categoryRepository;

    @MockBean
    CategoryServiceImpl categoryService;

    @Autowired
    private WebApplicationContext webApplicationContext;

    private Gson gson = new Gson();

    @Autowired
    void setConverters(HttpMessageConverter<?>[] converters) {

        this.mappingJackson2HttpMessageConverter = Arrays.asList(converters).stream()
                .filter(hmc -> hmc instanceof MappingJackson2HttpMessageConverter)
                .findAny()
                .orElse(null);

        assertNotNull("the JSON message converter must not be null",
                this.mappingJackson2HttpMessageConverter);
    }
    @Before
    public void init(){
        MockitoAnnotations.initMocks(this);
        this.mockMvc = webAppContextSetup(webApplicationContext).build();
    }

    @Test
    public void getALL(){

        List<Category> categories = new ArrayList<Category>();
        categories.add(new Category(0l,"Cat0","Category 0"));
        categories.add(new Category(1l,"Cat1","Category 1"));
        categories.add(new Category(2l,"Cat2","Category 2"));
        categories.add(new Category(3l,"Cat3","Category 3"));

        given(this.categoryService.getAll()).willReturn(categories);
        try {
            this.mockMvc.perform(get("/api/categories").accept(MediaType.APPLICATION_JSON_UTF8))
                    .andExpect(status().isOk()).andExpect(content().json(gson.toJson(categories)));
        } catch (Exception e) {
            e.printStackTrace();
        }


    }

}
