package com.miniudemy.repository;

import com.miniudemy.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByInstructorId(Long instructorId);

    List<Course> findByCategory(String category);

    List<Course> findByIsApprovedTrue();

    boolean existsByTitle(String title);

    java.util.Optional<Course> findByTitle(String title);
}
