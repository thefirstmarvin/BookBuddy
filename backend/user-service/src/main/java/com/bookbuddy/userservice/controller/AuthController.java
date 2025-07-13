package com.bookbuddy.userservice.controller;

import com.bookbuddy.userservice.model.AuthRequest;
import com.bookbuddy.userservice.model.AuthResponse;
import com.bookbuddy.userservice.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.logging.Logger;

@RestController
@RequestMapping("/api/users")
public class AuthController {
    @Autowired
    private AuthService authService;

    Logger logger = Logger.getLogger(AuthController.class.getName());

    @PostMapping("/register")
    public String register (@RequestBody AuthRequest request){
        System.out.println("REGISTERING: " + request.getEmail());
        authService.register(request);
        return "User registered successfully";
    }

    @PostMapping("/login")
    public AuthResponse login (@RequestBody AuthRequest request){
        System.out.println("LOGGING IN: " + request.getEmail());
        return authService.login(request);
    }
}
