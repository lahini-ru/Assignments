package com.assignment.trackpocket.userservice.service;


import com.assignment.trackpocket.userservice.repository.UserRepository;
import com.assignment.trackpocket.trackpocketmodel.User.User;
import com.assignment.trackpocket.trackpocketmodel.User.UserSecurity;
import com.assignment.trackpocket.userservice.Exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomUserDetailsService implements UserDetailsService, UserService{

    @Autowired
    UserRepository userRepository;

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String usernameOrEmail)
            throws UsernameNotFoundException {
        User user = userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with username or email : " + usernameOrEmail)
        );

        return UserSecurity.create(user);
    }

    @Transactional
    public UserDetails loadUserById(int uId) {
        User user = userRepository.findById(uId).orElseThrow(
            () -> new ResourceNotFoundException("User", "uId", uId)
        );

        return UserSecurity.create(user);
    }


}