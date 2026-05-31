import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import api from "../services/api";
import "../css/Login.css";

function Login() {

    const navigate = useNavigate();
    const { isDark, toggleTheme } = useTheme();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const handleLogin = async () => {

        if (!email || !password) {
            setIsError(true);
            setMessage("All fields are required!");
            return;
        }

        try {
            const response = await api.post("/api/user/login", {
                email: email,
                password: password
            });

            const data = response.data;

            if (!data.startsWith("eyJ")) {
                setIsError(true);
                setMessage(data);
                return;
            }

            localStorage.setItem("token", data);
            setIsError(false);
            navigate("/home");

        } catch (error) {
            setIsError(true);
            setMessage("Something went wrong!");
        }
    };

    return (
        <div className="login-container">

            {/* Left Side */}
            <div className="login-left">
                <div className="login-left-content">
                    <span className="login-left-icon">📰</span>
                    <h1 className="login-left-title">NewsPulse</h1>
                    <p className="login-left-subtitle">
                        Stay informed with the latest news from around the world.
                        Your personalized news experience starts here.
                    </p>
                    <div className="login-features">
                        <div className="feature-item">
                            ✅ Personalized News Feed
                        </div>
                        <div className="feature-item">
                            ✅ AI Recommendations
                        </div>
                        <div className="feature-item">
                            ✅ Real-time Updates
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className="login-right">

                {/* Theme Toggle */}
                <div className="theme-toggle">
                    <button
                        className="theme-button"
                        onClick={toggleTheme}
                    >
                        {isDark ? "☀️ Light" : "🌙 Dark"}
                    </button>
                </div>

                <div className="login-card">

                    <div className="logo-container">
                        <span className="logo-icon">📰</span>
                        <h2 className="login-logo">NewsPulse</h2>
                    </div>
                    <p className="login-subtitle">Welcome back!</p>

                    <div className="input-group">
                        <label className="input-label">Email Address</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="input-field"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {message && (
                        <p className={isError ? "message-error" : "message-success"}>
                            {message}
                        </p>
                    )}

                    <button
                        className="login-button"
                        onClick={handleLogin}
                    >
                        Login
                    </button>

                    <p className="register-text">
                        Don't have an account?{" "}
                        <span
                            className="register-link"
                            onClick={() => navigate("/register")}
                        >
                            Register
                        </span>
                    </p>

                </div>
            </div>
        </div>
    );
}

export default Login;