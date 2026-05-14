package com.newsapp.user_service.service;

import com.newsapp.user_service.dto.LoginRequest;
import com.newsapp.user_service.dto.RegisterRequest;

public interface IUserService {
    String resiter(RegisterRequest request);
    String login(LoginRequest request);
}
