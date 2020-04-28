package com.assignment.trackpocket.categoryservice.Repository;

import com.assignment.trackpocket.trackpocketmodel.Category.AddBy;
import com.assignment.trackpocket.trackpocketmodel.Category.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {

    List<Category> findByCreatedBy(Long userId);

    List<Category> findByAddBy(AddBy addBy);

    Optional<Category> findByCategoryName(String name);

    @Query("SELECT c FROM Category c where c.createdBy =:userId and c.addBy = :addBy")
    List<Category> findByCreatedByAndAddBy(@Param("userId") Long userId, @Param("addBy") AddBy addBy);
}

