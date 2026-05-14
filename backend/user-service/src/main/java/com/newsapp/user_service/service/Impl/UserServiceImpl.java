package com.newsapp.user_service.service.Impl;

import com.newsapp.user_service.dto.LoginRequest;
import com.newsapp.user_service.dto.RegisterRequest;
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

    @Override
    public String resiter(RegisterRequest request) {

        if (userRepository.existesByEmail(request.getEmail())){
            return "Email already existes";
        }

       User user = User.builder()
               .name(request.getName())
               .email(request.getEmail())
               .password(bCryptPasswordEncoder.encode(request.getPassword()))
               .role("FREE")
               .createdAt(LocalDateTime.now())
               .build();
        userRepository.save(user);

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

        String token = jwtService.generateToken(user.getEmail(),user.getRole());
        return token;

    }
}
