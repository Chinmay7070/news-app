package com.newsapp.news_service.service.impl;

import com.newsapp.news_service.dto.NewsResponse;
import com.newsapp.news_service.model.News;
import com.newsapp.news_service.repository.NewsRepository;
import com.newsapp.news_service.service.InewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NewsServiceImpl implements InewsService {

    private final NewsRepository newsRepository;


    @Override
    public List<NewsResponse> getAllNews() {
        return newsRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<NewsResponse> getNewsByCategory(String category) {
        return newsRepository.findByCategory(category)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private NewsResponse mapToResponse(News news){
        return NewsResponse.builder()
                .id(news.getId())
                .title(news.getTitle())
                .description(news.getDescription())
                .category(news.getCategory())
                .source(news.getSource())
                .url(news.getUrl())
                .imageUrl(news.getImageUrl())
                .publishedAt(news.getPublishedAt())
                .build();
    }
}
