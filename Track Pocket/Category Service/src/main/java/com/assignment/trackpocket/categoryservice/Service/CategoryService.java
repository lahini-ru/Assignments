package com.assignment.trackpocket.categoryservice.Service;

import com.assignment.trackpocket.categoryservice.Repository.CategoryRepository;
import com.assignment.trackpocket.trackpocketmodel.Category.AddBy;
import com.assignment.trackpocket.trackpocketmodel.Category.Category;
import com.assignment.trackpocket.trackpocketmodel.User.User;
import com.assignment.trackpocket.trackpocketmodel.User.UserSecurity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    CategoryRepository categoryRepository;

    private static final Logger logger = LoggerFactory.getLogger(CategoryService.class);

    UserSecurity currentUser;

    public List<Category> getCategoryByUser(String username) {
        User user = new User(currentUser.getUsername());

        List<Category> userAddedCategoryList = categoryRepository.findByCreatedByAndAddBy(user.getuid(), AddBy.USER);

        return userAddedCategoryList;
    }

    public List<Category> getDefaultCategoryList() {
        List<Category> systemAddedCategoryList = categoryRepository.findByAddBy(AddBy.SYSTEM);

        return systemAddedCategoryList;
    }
}
