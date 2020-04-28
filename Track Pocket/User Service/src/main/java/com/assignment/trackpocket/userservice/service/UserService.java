package com.assignment.trackpocket.userservice.service;

import com.assignment.trackpocket.trackpocketmodel.User.User;
import org.springframework.stereotype.Service;


@Service
public interface UserService {
        User save(User user);

        /*User findById(int uid);

        List<User> findAll();*/
}
