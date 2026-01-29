package com.miniudemy.controller;

import com.miniudemy.entity.Course;
import com.miniudemy.repository.CourseRepository;
import com.miniudemy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<Course> getAllCourses() {
        return courseRepository.findByIsApprovedTrue();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable Long id) {
        return courseRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createCourse(@RequestBody Course course) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email = userDetails.getUsername();
        var instructor = userRepository.findByEmail(email).orElseThrow();

        course.setInstructor(instructor);
        course.setApproved(false); // Default false, needs admin approval

        Course savedCourse = courseRepository.save(course);
        return ResponseEntity.ok(savedCourse);
    }
}
