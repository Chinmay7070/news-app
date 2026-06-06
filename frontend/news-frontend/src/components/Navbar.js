import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "../css/Navbar.css";

function Navbar() {

    const navigate = useNavigate();
    const { isDark, toggleTheme } = useTheme();

    // Token मधून Email घेतो
    const getEmail = () => {
        const token = localStorage.getItem("token");
        if (!token) return "";
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            return payload.sub;
        } catch (error) {
            return "";
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="navbar">

            {/* Left Side - Logo */}
            <div className="navbar-logo-container"
                onClick={() => navigate("/home")}
            >
                <span className="navbar-logo-icon">📰</span>
                <h2 className="navbar-logo">NewsPulse</h2>
            </div>

            {/* Right Side */}
            <div className="navbar-right">

                {/* Dark/Light Toggle */}
                <button
                    className="theme-button"
                    onClick={toggleTheme}
                >
                    {isDark ? "☀️" : "🌙"}
                </button>

                {/* Username */}
                <span className="navbar-email">
                    👤 {getEmail()}
                </span>

                {/* Logout */}
                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>
        </nav>
    );
}

export default Navbar;