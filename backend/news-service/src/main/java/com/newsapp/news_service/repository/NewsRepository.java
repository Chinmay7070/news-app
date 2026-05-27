package com.newsapp.news_service.repository;

import com.newsapp.news_service.model.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsRepository extends JpaRepository<News, Long> {

    List<News> findByCategory(String category);

    boolean existsByTitle(String title);

    List<News> findByTitleContainingIgnoreCase(String keyword);
}
