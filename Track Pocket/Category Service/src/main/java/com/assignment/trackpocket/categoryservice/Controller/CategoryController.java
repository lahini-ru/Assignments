package com.assignment.trackpocket.categoryservice.Controller;

import com.assignment.trackpocket.categoryservice.Service.CategoryService;
import com.assignment.trackpocket.trackpocketmodel.Category.Category;
import com.assignment.trackpocket.trackpocketmodel.User.CurrentUser;
import com.assignment.trackpocket.trackpocketmodel.User.UserSecurity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    private static final Logger logger = LoggerFactory.getLogger(CategoryController.class);

    public void removeCategory() {

    }

    @GetMapping
    public List<Category> getCategory(@CurrentUser UserSecurity currentUser){
        List<Category> categoryList = new ArrayList<>();

        categoryList.addAll(categoryService.getCategoryByUser(currentUser.getUsername()));
        categoryList.addAll(categoryService.getDefaultCategoryList());

        logger.info(categoryList.toString());
        return categoryList;
    }
}
