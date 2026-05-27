package com.newsapp.news_service.controller;

import com.newsapp.news_service.dto.NewsResponse;
import com.newsapp.news_service.service.InewsService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class NewsController {
    private final InewsService newsService;

    public ResponseEntity<List<NewsResponse>> getAllNews(){
        return ResponseEntity.ok(newsService.getAllNews());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<NewsResponse>> getNewsByCategory(
            @PathVariable String category) {
        return ResponseEntity.ok(newsService.getNewsByCategory(category));
    }

    @GetMapping("/search")
    public ResponseEntity<List<NewsResponse>> searchNews(
            @RequestParam String keyword) {
        return ResponseEntity.ok(newsService.searchNews(keyword));
    }
}
