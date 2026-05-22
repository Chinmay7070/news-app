package com.newsapp.user_service.service;

public  interface IJwtService {
    public String generateToken(String email, String role);
}
