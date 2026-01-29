package com.miniudemy.controller;

import com.miniudemy.entity.Course;
import com.miniudemy.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private CourseRepository courseRepository;

    @GetMapping("/courses")
    public java.util.List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @PutMapping("/courses/{id}/approve")
    public ResponseEntity<?> approveCourse(@PathVariable Long id) {
        Course course = courseRepository.findById(id).orElseThrow();
        course.setApproved(true);
        courseRepository.save(course);
        return ResponseEntity.ok("Course approved successfully");
    }
}
