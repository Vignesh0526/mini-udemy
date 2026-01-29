package com.miniudemy.controller;

import com.miniudemy.entity.Enrollment;
import com.miniudemy.repository.CourseRepository;
import com.miniudemy.repository.EnrollmentRepository;
import com.miniudemy.repository.UserRepository;
import com.miniudemy.service.CertificateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/enrollments")
public class EnrollmentController {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CertificateService certificateService;

    // Simulate payment and enroll
    @PostMapping("/{courseId}")
    public ResponseEntity<?> enrollInCourse(@PathVariable Long courseId) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow();
        var course = courseRepository.findById(courseId).orElseThrow();

        if (enrollmentRepository.findByUserIdAndCourseId(user.getId(), course.getId()).isPresent()) {
            return ResponseEntity.badRequest().body("Already enrolled");
        }

        Enrollment enrollment = new Enrollment();
        enrollment.setUser(user);
        enrollment.setCourse(course);
        enrollment.setProgress(0);

        enrollmentRepository.save(enrollment);

        return ResponseEntity.ok("Enrolled successfully");
    }

    @GetMapping("/my")
    public java.util.List<Enrollment> getMyEnrollments() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow();
        return enrollmentRepository.findByUserId(user.getId());
    }

    @PostMapping("/{courseId}/progress")
    public ResponseEntity<?> updateProgress(@PathVariable Long courseId, @RequestParam Integer progress) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow();

        var enrollment = enrollmentRepository.findByUserIdAndCourseId(user.getId(), courseId)
                .orElseThrow(() -> new RuntimeException("Not enrolled"));

        enrollment.setProgress(progress);
        if (progress >= 100) {
            enrollment.setCompleted(true);
        }

        enrollmentRepository.save(enrollment);
        return ResponseEntity.ok("Progress updated");
    }

    @GetMapping("/{courseId}/certificate")
    public ResponseEntity<?> downloadCertificate(@PathVariable Long courseId) {
        try {
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                    .getPrincipal();
            var user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow();
            var course = courseRepository.findById(courseId).orElseThrow();

            var enrollment = enrollmentRepository.findByUserIdAndCourseId(user.getId(), courseId)
                    .orElseThrow(() -> new RuntimeException("Not enrolled"));

            if (!enrollment.isCompleted()) {
                return ResponseEntity.badRequest().body("Course not completed yet.");
            }

            byte[] pdfBytes = certificateService.generateCertificate(user, course);

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=certificate.pdf")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdfBytes);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error generating certificate");
        }
    }
}
