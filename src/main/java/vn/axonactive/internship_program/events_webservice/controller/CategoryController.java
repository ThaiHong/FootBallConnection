package vn.axonactive.internship_program.events_webservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import vn.axonactive.internship_program.events_webservice.entity.Category;
import vn.axonactive.internship_program.events_webservice.service.CategoryService;

import java.util.List;

/**
 * Created by dtnhat on 12/22/2016.
 */
@Controller
@RequestMapping(value = "api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<Category>> getAll(){
        return new ResponseEntity<List<Category>>(categoryService.getAll(), HttpStatus.OK);
    }
}
