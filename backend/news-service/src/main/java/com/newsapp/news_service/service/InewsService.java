package com.newsapp.news_service.service;

import com.newsapp.news_service.dto.NewsResponse;
import com.newsapp.news_service.model.News;

import java.util.List;

public interface InewsService {

    public List<NewsResponse> getAllNews();

    public List<NewsResponse> getNewsByCategory(String category);

    public List<NewsResponse> searchNews(String keyword);
}
