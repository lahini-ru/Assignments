package com.assignment.trackpocket.userservice.repository;

import com.assignment.trackpocket.trackpocketmodel.User.Role;
import com.assignment.trackpocket.trackpocketmodel.User.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository("RoleRepository")
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName roleName);
}
