import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../css/HomePage.css";

function HomePage() {

    const navigate = useNavigate();
    const [news, setNews] = useState([]);

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
        }

    }, []);

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

                <h3 className="news-section-title">Latest News</h3>

                <div className="news-grid">

                    <div className="news-card">
                        <span className="news-card-category">Technology</span>
                        <h4 className="news-card-title">
                            AI is changing the world!
                        </h4>
                        <p className="news-card-description">
                            Artificial Intelligence is transforming
                            industries across the globe...
                        </p>
                        <div className="news-card-footer">
                            <span className="news-card-source">TechCrunch</span>
                            <button className="read-more-button">
                                Read More
                            </button>
                        </div>
                    </div>

                    <div className="news-card">
                        <span className="news-card-category">Sports</span>
                        <h4 className="news-card-title">
                            IPL 2025 Finals Today!
                        </h4>
                        <p className="news-card-description">
                            Mumbai Indians vs Chennai Super Kings
                            in the grand finale...
                        </p>
                        <div className="news-card-footer">
                            <span className="news-card-source">ESPN</span>
                            <button className="read-more-button">
                                Read More
                            </button>
                        </div>
                    </div>

                    <div className="news-card">
                        <span className="news-card-category">Business</span>
                        <h4 className="news-card-title">
                            Stock Market hits record high!
                        </h4>
                        <p className="news-card-description">
                            Sensex crosses 80,000 mark for
                            the first time in history...
                        </p>
                        <div className="news-card-footer">
                            <span className="news-card-source">Bloomberg</span>
                            <button className="read-more-button">
                                Read More
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default HomePage;