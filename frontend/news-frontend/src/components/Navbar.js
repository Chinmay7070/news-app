import { useNavigate } from "react-router-dom";
import "../css/Navbar.css";

function Navbar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <h2 className="navbar-logo">📰 NewsApp</h2>
            <button
                className="logout-button"
                onClick={handleLogout}
            >
                Logout
            </button>
        </nav>
    );
}

export default Navbar;