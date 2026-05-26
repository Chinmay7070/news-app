package com.newsapp.user_service.controller;

import com.newsapp.user_service.dto.LoginRequest;
import com.newsapp.user_service.dto.RegisterRequest;
import com.newsapp.user_service.dto.VerifyOtpRequest;
import com.newsapp.user_service.service.IUserService;
import com.newsapp.user_service.service.Impl.UserServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final IUserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterRequest request) {
        String result = userService. resiter(request);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@Valid @RequestBody LoginRequest request) {
        String result = userService.login(request);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyotp(@Valid @RequestBody VerifyOtpRequest request){
        String result = userService.verifyOtp(request);
        return ResponseEntity.ok(result);
    }

}
