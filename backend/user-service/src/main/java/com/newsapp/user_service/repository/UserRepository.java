package com.newsapp.user_service.repository;

import com.newsapp.user_service.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    boolean  existsByEmail(String email);
    Optional<User> findByEmail(String email);
    Optional<User> findByOtp(String otp);
}
