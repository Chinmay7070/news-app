package com.newsapp.news_service.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class NewsResponse {

    private Long id;
    private String title;
    private String description;
    private String category;
    private String source;
    private String url;
    private String imageUrl;
    private LocalDateTime publishedAt;
}
