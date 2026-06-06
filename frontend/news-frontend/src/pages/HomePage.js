import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaLaptop, FaFootballBall, FaChartLine, FaHeartbeat, FaFilm } from "react-icons/fa";
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

    const categoryColors = {
        technology: { bg: "#ede9fe", color: "#4f46e5" },
        sports: { bg: "#d1fae5", color: "#059669" },
        business: { bg: "#fef3c7", color: "#d97706" },
        health: { bg: "#fee2e2", color: "#dc2626" },
        entertainment: { bg: "#fce7f3", color: "#db2777" },
        all: { bg: "#ede9fe", color: "#4f46e5" }
    };

    const categoryIcons = {
        technology: <FaLaptop size={32} color="#ffffff" />,
        sports: <FaFootballBall size={32} color="#ffffff" />,
        business: <FaChartLine size={32} color="#ffffff" />,
        health: <FaHeartbeat size={32} color="#ffffff" />,
        entertainment: <FaFilm size={32} color="#ffffff" />
    };

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
            setSelectedCategory("all");
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

                {/* Hero Section */}
                <div className="hero-section">
                    <div className="hero-content">
                        <h2 className="hero-title">Good Morning! 👋</h2>
                        <p className="hero-subtitle">
                            Stay updated with today's top stories
                        </p>
                        <div className="hero-stats">
                            <div className="hero-stat">
                                📰 {news.length} Articles
                            </div>
                            <div className="hero-stat">
                                🔥 Trending Now
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search + Category */}
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

                {/* News Section Title */}
                <h3 className="news-section-title">
                    {selectedCategory === "all" ? "Latest News" : `${selectedCategory} News`}
                </h3>

                {/* Loading */}
                {loading && (
                    <p className="loading-text">Loading news...</p>
                )}

                {/* News Grid */}
                {!loading && (
                    <div className="news-grid">
                        {news.length === 0 ? (
                            <p className="no-news-text">No news found!</p>
                        ) : (
                            news.map((item) => (
                                <div key={item.id} className="news-card">

                                    {/* Image */}
                                    {item.imageUrl ? (
                                        <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            className="news-card-image"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'flex';
                                            }}
                                        />
                                    ) : null}

                                    {/* Placeholder */}
                                    <div
                                        className="news-card-placeholder"
                                        style={{
                                            display: item.imageUrl ? 'none' : 'flex',
                                            background: `linear-gradient(135deg, ${categoryColors[item.category]?.color || '#4f46e5'}, #7c3aed)`
                                        }}
                                    >
                                        {categoryIcons[item.category]}
                                    </div>

                                    <div className="news-card-body">
                                        <span
                                            className="news-card-category"
                                            style={{
                                                backgroundColor: categoryColors[item.category]?.bg || '#ede9fe',
                                                color: categoryColors[item.category]?.color || '#4f46e5'
                                            }}
                                        >
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