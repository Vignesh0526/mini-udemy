package com.miniudemy.config;

import com.miniudemy.entity.Course;
import com.miniudemy.entity.Role;
import com.miniudemy.entity.User;
import com.miniudemy.repository.CourseRepository;
import com.miniudemy.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Configuration
public class DataInitializer {

        @Bean
        public CommandLineRunner initData(UserRepository userRepository, CourseRepository courseRepository,
                        PasswordEncoder passwordEncoder) {
                return args -> {
                        // 1. Create Default Instructor if not exists
                        if (userRepository.findByEmail("instructor@test.com").isEmpty()) {
                                User instructor = new User();
                                instructor.setFirstName("Tim");
                                instructor.setLastName("Buchalka");
                                instructor.setEmail("instructor@test.com");
                                instructor.setPassword(passwordEncoder.encode("password"));
                                instructor.setRole(Role.INSTRUCTOR);
                                userRepository.save(instructor);

                                // Create other instructors
                                createInstructor(userRepository, passwordEncoder, "Jose", "Portilla", "jose@test.com");
                                createInstructor(userRepository, passwordEncoder, "Ranga", "Karanam", "ranga@test.com");
                                createInstructor(userRepository, passwordEncoder, "Brad", "Traversy", "brad@test.com");
                                createInstructor(userRepository, passwordEncoder, "Stephane", "Maarek",
                                                "stephane@test.com");
                                createInstructor(userRepository, passwordEncoder, "Rahul", "Shetty", "rahul@test.com");
                        }

                        // Create ADMIN user
                        if (userRepository.findByEmail("admin@test.com").isEmpty()) {
                                User admin = new User();
                                admin.setFirstName("Admin");
                                admin.setLastName("User");
                                admin.setEmail("admin@test.com");
                                admin.setPassword(passwordEncoder.encode("password"));
                                admin.setRole(Role.ADMIN);
                                userRepository.save(admin);
                        }

                        // 2. Create Default Courses safely (check if exists)
                        User tim = userRepository.findByEmail("instructor@test.com").orElse(null);
                        User jose = userRepository.findByEmail("jose@test.com").orElse(tim);
                        User ranga = userRepository.findByEmail("ranga@test.com").orElse(tim);
                        User brad = userRepository.findByEmail("brad@test.com").orElse(tim);
                        User stephane = userRepository.findByEmail("stephane@test.com").orElse(tim);
                        User rahul = userRepository.findByEmail("rahul@test.com").orElse(tim);

                        List<Course> courses = new java.util.ArrayList<>();

                        // Development (5 courses)
                        courses.add(createCourse("Java Programming Masterclass",
                                        "Learn Java In This Course And Become a Computer Programmer.", "Development",
                                        19.99,
                                        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                                        tim));
                        courses.add(createCourse("2024 Complete Python Bootcamp", "From Zero to Hero in Python.",
                                        "Development", 14.99,
                                        "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                                        jose));
                        courses.add(createCourse("The Web Developer Bootcamp 2024",
                                        "The only course you need to learn web development - HTML, CSS, JS, Node.",
                                        "Development", 24.99,
                                        "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                                        brad));
                        courses.add(createCourse("React - The Complete Guide 2024",
                                        "Dive in and learn React.js from scratch.", "Development", 22.99,
                                        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                                        ranga));
                        courses.add(createCourse("Angular - The Complete Guide",
                                        "Master Angular and build reactive web apps.", "Development", 21.99,
                                        "https://images.unsplash.com/photo-1561736778-92e52a7769ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                                        brad));
                        courses.add(createCourse("DevOps Beginners to Advanced with Projects",
                                        "Learn DevOps with real world projects including AWS, Jenkins, Docker, Kubernetes.",
                                        "Development", 22.99,
                                        "/assets/devops.png",
                                        tim));

                        // Business (5 courses)
                        courses.add(createCourse("The Complete SQL Bootcamp", "Become an expert at SQL!", "Business",
                                        18.99,
                                        "/assets/business.png",
                                        jose));
                        courses.add(createCourse("PMP Exam Prep Seminar", "Pass the PMP Exam on your first try.",
                                        "Business", 29.99,
                                        "/assets/business.png",
                                        tim));
                        courses.add(createCourse("Tableau 2024 A-Z", "Hands-On Tableau Training for Data Science.",
                                        "Business", 19.99,
                                        "/assets/business.png",
                                        jose));
                        courses.add(createCourse("Microsoft Power BI Desktop",
                                        "Power BI A-Z: Hands-On for Data Science.", "Business", 17.99,
                                        "/assets/business.png",
                                        ranga));
                        courses.add(createCourse("Agile Crash Course", "Agile Project Management and Agile Delivery.",
                                        "Business", 15.99,
                                        "/assets/business.png",
                                        tim));

                        // Finance (5 courses)
                        courses.add(createCourse("The Complete Financial Analyst Course",
                                        "Excel, Accounting, Financial Analysis, and more.", "Finance", 24.99,
                                        "/assets/finance.png",
                                        tim));
                        courses.add(createCourse("Investing in Stocks", "The Complete Course! (13 Hours)", "Finance",
                                        19.99,
                                        "/assets/finance.png",
                                        jose));
                        courses.add(createCourse("Excel to MySQL: Analytic Techniques",
                                        "Business Analytics Specialization.", "Finance", 29.99,
                                        "/assets/finance.png",
                                        ranga));
                        courses.add(createCourse("Cryptocurrency Investment Course",
                                        "A complete guide to buying and selling crypto.", "Finance", 22.99,
                                        "/assets/finance.png",
                                        stephane));
                        courses.add(createCourse("Accounting & Financial Statement Analysis",
                                        "Complete financial accounting course.", "Finance", 21.99,
                                        "/assets/finance.png",
                                        tim));

                        // Marketing (5 courses)
                        courses.add(createCourse("The Complete Digital Marketing Course",
                                        "12 Courses in 1. Master Digital Marketing.", "Marketing", 29.99,
                                        "/assets/marketing.png",
                                        tim));
                        courses.add(createCourse("Social Media Marketing MASTERY", "Ads on all platforms.", "Marketing",
                                        19.99,
                                        "/assets/marketing.png",
                                        jose));
                        courses.add(createCourse("Instagram Marketing 2024", "Grow your account to 100k followers.",
                                        "Marketing", 15.99,
                                        "/assets/marketing.png",
                                        brad));
                        courses.add(createCourse("Google Ads (AdWords) Certification", "Pass the Google Ads exam.",
                                        "Marketing", 24.99,
                                        "/assets/marketing.png",
                                        stephane));
                        courses.add(createCourse("SEO 2024: Complete SEO Training", "Rank #1 on Google with SEO 2024.",
                                        "Marketing", 14.99,
                                        "/assets/marketing.png",
                                        ranga));

                        // Design (5 courses)
                        courses.add(createCourse("User Experience Design Essentials", "Adobe XD UI UX Design.",
                                        "Design", 19.99,
                                        "/assets/design.png",
                                        jose));
                        courses.add(createCourse("Photoshop 2024 Masterclass", "Master Adobe Photoshop CC.", "Design",
                                        24.99,
                                        "/assets/design.png",
                                        brad));
                        courses.add(createCourse("Canva Graphics Design Masterclass", "Learn Canva for Social Media.",
                                        "Design", 12.99,
                                        "/assets/design.png",
                                        tim));
                        courses.add(createCourse("Graphic Design Bootcamp", "Photoshop, Illustrator, InDesign.",
                                        "Design", 27.99,
                                        "/assets/design.png",
                                        stephane));
                        courses.add(createCourse("Adobe Premiere Pro CC", "Video Editing in Premiere.", "Design", 22.99,
                                        "/assets/design.png",
                                        rahul));

                        int addedCount = 0;
                        int updatedCount = 0;
                        for (Course c : courses) {
                                java.util.Optional<Course> existingOpt = courseRepository.findByTitle(c.getTitle());
                                if (existingOpt.isEmpty()) {
                                        courseRepository.save(c);
                                        addedCount++;
                                } else {
                                        Course existing = existingOpt.get();
                                        boolean changed = false;
                                        if (c.getThumbnailUrl() != null
                                                        && !c.getThumbnailUrl().equals(existing.getThumbnailUrl())) {
                                                existing.setThumbnailUrl(c.getThumbnailUrl());
                                                changed = true;
                                        }
                                        if (changed) {
                                                courseRepository.save(existing);
                                                updatedCount++;
                                        }
                                }
                        }

                        if (addedCount > 0 || updatedCount > 0) {
                                System.out.println("--- Data Seeding Refreshed: Added " + addedCount
                                                + " new courses, Updated " + updatedCount + " existing courses. ---");
                        } else {
                                System.out.println(
                                                "--- Data Seeding Skipped: All courses already exist and are up to date. ---");
                        }
                };
        }

        private Course createCourse(String title, String desc, String category, double price, String imgUrl,
                        User instructor) {
                Course c = new Course();
                c.setTitle(title);
                c.setDescription(desc);
                c.setCategory(category);
                c.setPrice(price);
                c.setThumbnailUrl(imgUrl);
                c.setInstructor(instructor);
                c.setApproved(true);
                return c;
        }

        private void createInstructor(UserRepository repo, PasswordEncoder encoder, String first, String last,
                        String email) {
                if (repo.findByEmail(email).isEmpty()) {
                        User u = new User();
                        u.setFirstName(first);
                        u.setLastName(last);
                        u.setEmail(email);
                        u.setPassword(encoder.encode("password"));
                        u.setRole(Role.INSTRUCTOR);
                        repo.save(u);
                }
        }
}
