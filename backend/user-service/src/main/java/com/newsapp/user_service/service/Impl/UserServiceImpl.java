package com.newsapp.user_service.service.Impl;

import com.newsapp.user_service.dto.LoginRequest;
import com.newsapp.user_service.dto.RegisterRequest;
import com.newsapp.user_service.dto.VerifyOtpRequest;
import com.newsapp.user_service.model.User;
import com.newsapp.user_service.repository.UserRepository;
import com.newsapp.user_service.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements IUserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JwtServiceImpl jwtService;
    private final EmailService emailService;

    @Override
    public String resiter(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())){
            return "Email already existes";
        }
        String otp = String.valueOf(
                (int)(Math.random() * 900000) + 100000
        );

       User user = User.builder()
               .name(request.getName())
               .email(request.getEmail())
               .password(bCryptPasswordEncoder.encode(request.getPassword()))
               .role("FREE")
               .isVerified(false)
               .otp(otp)
               .otpExpiry(LocalDateTime.now().plusMinutes(5))
               .createdAt(LocalDateTime.now())
               .build();
        userRepository.save(user);

        emailService.sendOtpEmail(request.getEmail(), otp);

        return "User registered successfully";
    }

    @Override
    public String login(LoginRequest request) {

        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());
        if (optionalUser.isEmpty()){
            return "user not found";
        }
        User user = optionalUser.get();

        if (!bCryptPasswordEncoder.matches(request.getPassword(), user.getPassword())) {
            return "Invalid password";
        }
        if (!user.isVerified()) {
            return "Please verify your email first!";
        }

        String token = jwtService.generateToken(user.getEmail(),user.getRole());
        return token;

    }

    @Override
    public String verifyOtp(VerifyOtpRequest request) {

        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());
        if (optionalUser.isEmpty()){
            return "user not found";
        }
        User user = optionalUser.get();

        if (!user.getOtp().equals(request.getOtp())) {
            return "Invalid OTP";
        }

        if(user.getOtpExpiry().isBefore(LocalDateTime.now())){
            return "otp expired";
        }
        user.setVerified(true);
        user.setOtp(null);
        user.setOtpExpiry(null);
        userRepository.save(user);

        return "Email verified successfully!";
    }

}
