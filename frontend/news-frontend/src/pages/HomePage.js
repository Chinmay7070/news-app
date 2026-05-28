import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import "../css/HomePage.css";

function HomePage() {

    const navigate = useNavigate();
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [keyword, setKeyword] = useState("");

    const categories = [
        "all",
        "technology",
        "sports",
        "business",
        "health",
        "entertainment"
    ];

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            const currentTime = Math.floor(Date.now() / 1000);

            if (payload.exp < currentTime) {
                localStorage.removeItem("token");
                navigate("/login");
                return;
            }
        } catch (error) {
            localStorage.removeItem("token");
            navigate("/login");
            return;
        }

        fetchNews("all");
    }, []);

    const fetchNews = async (category) => {
        try {
            setLoading(true);
            let response;
            if (category === "all") {
                response = await api.get("/api/news/all");
            } else {
                response = await api.get(`/api/news/category/${category}`);
            }
            setNews(response.data);
        } catch (error) {
            console.log("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
        fetchNews(category);
    };

    const handleSearch = async () => {
        if (!keyword.trim()) {
            fetchNews(selectedCategory);
            return;
        }
        try {
            setLoading(true);
            const response = await api.get(`/api/news/search?keyword=${keyword}`);
            setNews(response.data);
        } catch (error) {
            console.log("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home-container">

            <Navbar />

            <div className="home-content">

                <div className="welcome-section">
                    <h2 className="welcome-title">Welcome to NewsApp! 👋</h2>
                    <p className="welcome-subtitle">
                        Stay updated with the latest news!
                    </p>
                </div>

                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search news..."
                        className="search-input"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button
                        className="search-button"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                    <select
                        className="category-select"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                    >
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                {loading && (
                    <p className="loading-text">Loading news...</p>
                )}

                {!loading && (
                    <div className="news-grid">
                        {news.length === 0 ? (
                            <p className="no-news-text">No news found!</p>
                        ) : (
                            news.map((item) => (
                                <div key={item.id} className="news-card">
                                    {item.imageUrl && (
                                        <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            className="news-card-image"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    )}
                                    <span className="news-card-category">
                                        {item.category}
                                    </span>
                                    <h4 className="news-card-title">
                                        {item.title}
                                    </h4>
                                    <p className="news-card-description">
                                        {item.description}
                                    </p>
                                    <div className="news-card-footer">
                                        <span className="news-card-source">
                                            {item.source}
                                        </span>
                                        <button
                                            className="read-more-button"
                                            onClick={() => window.open(item.url, "_blank")}
                                        >
                                            Read More
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}

export default HomePage;