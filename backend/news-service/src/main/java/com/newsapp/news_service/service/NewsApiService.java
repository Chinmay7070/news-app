package com.newsapp.news_service.service;


import com.newsapp.news_service.model.News;
import com.newsapp.news_service.repository.NewsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class NewsApiService {

    private final NewsRepository newsRepository;
    private final WebClient.Builder webClientBuilder;

    @Value("${news.api.key}")
    private String apiKey;

    @Value("${news.api.url}")
    private String apiUrl;

    private final List<String> categories = List.of(
            "technology",
            "sports",
            "business",
            "health",
            "entertainment"
    );
    private final Map<String, List<String>> categoryKeywords = Map.of(
            "technology", List.of("AI", "software", "cybersecurity", "machine learning"),
            "sports", List.of("cricket", "football", "tennis", "basketball"),
            "business", List.of("stock market", "startup", "economy", "finance"),
            "health", List.of("fitness", "medicine", "mental health", "nutrition"),
            "entertainment", List.of("movies", "music", "gaming", "celebrity")
    );

    @Scheduled(fixedRate = 3600000)
    public void fetchNews() {

        for (String category : categories) {
            fetchNewsByCategory(category);
        }

        for(Map.Entry<String , List<String>> entry :  categoryKeywords.entrySet()) {
            String category = entry.getKey();
            List<String> keywords = entry.getValue();
            for (String keyword : keywords) {
                fetchNewsByKeyword(keyword, category);
            }
        }
    }

    private void fetchNewsByKeyword(String keyword, String category) {
        try {
            String url = apiUrl + "/everything" +
                    "?q=" + keyword +
                    "&language=en" +
                    "&sortBy=publishedAt" +
                    "&apiKey=" + apiKey;

            Map response = webClientBuilder.build()
                    .get()
                    .uri(url)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (response != null && response.get("articles") != null) {
                List<Map> articles = (List<Map>) response.get("articles");

                for (Map article : articles) {

                    String title = (String) article.get("title");

                    if (title == null || newsRepository.existsByTitle(title)) {
                        continue;
                    }

                    Map sourceMap = (Map) article.get("source");

                    News news = News.builder()
                            .title(title)
                            .description((String) article.get("description"))
                            .category(category)
                            .source(sourceMap != null ?
                                    (String) sourceMap.get("name") : "Unknown")
                            .url((String) article.get("url"))
                            .imageUrl((String) article.get("urlToImage"))
                            .publishedAt(LocalDateTime.now())
                            .build();

                    newsRepository.save(news);
                }
            }
        } catch (Exception e) {
            System.out.println("Error fetching keyword news: " + e.getMessage());
        }
    }

    private void fetchNewsByCategory(String category) {
        try {
            String url = apiUrl + "/top-headlines" +
                    "?category=" + category +
                    "&language=en" +
                    "&apiKey=" + apiKey;

            Map response = webClientBuilder.build()
                    .get()
                    .uri(url)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (response != null && response.get("articles") != null) {
                List<Map> articles = (List<Map>) response.get("articles");

                for (Map article : articles) {

                    String title = (String) article.get("title");

                    if (title == null || newsRepository.existsByTitle(title)) {
                        continue;
                    }

                    Map sourceMap = (Map) article.get("source");

                    News news = News.builder()
                            .title(title)
                            .description((String) article.get("description"))
                            .category(category)
                            .source(sourceMap != null ?
                                    (String) sourceMap.get("name") : "Unknown")
                            .url((String) article.get("url"))
                            .imageUrl((String) article.get("urlToImage"))
                            .publishedAt(LocalDateTime.now())
                            .build();

                    newsRepository.save(news);
                }
            }
        } catch (Exception e) {
            System.out.println("Error fetching news: " + e.getMessage());
        }
    }

}