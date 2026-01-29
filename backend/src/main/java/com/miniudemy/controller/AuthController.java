package com.miniudemy.controller;

import com.miniudemy.entity.Role;
import com.miniudemy.entity.User;
import com.miniudemy.repository.UserRepository;
import com.miniudemy.security.JwtUtils;
import com.miniudemy.dto.JwtResponse;
import com.miniudemy.dto.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        // Create new user's account
        user.setPassword(encoder.encode(user.getPassword()));
        // Default role if null (frontend should send it though)
        if (user.getRole() == null) {
            user.setRole(Role.USER);
        }

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        // 1. Check if user exists
        if (!userRepository.existsByEmail(loginRequest.getEmail())) {
            return ResponseEntity.status(404).body("Error: User not found with this email.");
        }

        try {
            // 2. Try authentication
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String role = userDetails.getAuthorities().iterator().next().getAuthority();

            User user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow();

            return ResponseEntity.ok(new JwtResponse(jwt,
                    user.getId(),
                    user.getEmail(),
                    role));
        } catch (org.springframework.security.core.AuthenticationException e) {
            // 3. If authentication fails but user existed, it's a wrong password
            return ResponseEntity.status(401).body("Error: Incorrect password.");
        }
    }
}
