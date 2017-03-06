package vn.axonactive.internship_program.events_webservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.axonactive.internship_program.events_webservice.entity.Category;
import vn.axonactive.internship_program.events_webservice.repository.CategoryRepository;

import java.util.List;

/**
 * Created by dtnhat on 12/22/2016.
 */
@Service
public class CategoryServiceImpl implements CategoryService{

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Category> getAll() {
        return categoryRepository.findAll();
    }
}
