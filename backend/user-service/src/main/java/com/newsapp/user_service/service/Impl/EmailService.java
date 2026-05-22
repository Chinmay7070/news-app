package com.newsapp.user_service.service.Impl;

import com.newsapp.user_service.service.IEmailserice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService implements IEmailserice {

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendOtpEmail(String toEmail, String otp) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(toEmail);
        message.setSubject("NewsApp - Email Verification OTP");

        message.setText(
                "Hello!\n\n" +
                        "Your OTP for NewsApp registration is: " + otp + "\n\n" +
                        "This OTP will expire in 5 minutes.\n\n" +
                        "Thank you!"
        );

        mailSender.send(message);
    }
}