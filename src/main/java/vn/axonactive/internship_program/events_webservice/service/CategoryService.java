package vn.axonactive.internship_program.events_webservice.service;

import vn.axonactive.internship_program.events_webservice.entity.Category;

import java.util.List;

/**
 * Created by dtnhat on 12/22/2016.
 */
public interface CategoryService {

    List<Category> getAll();
}
