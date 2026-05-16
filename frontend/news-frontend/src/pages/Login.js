import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Login.css";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await api.post("/api/user/login", {
                email: email,
                password: password
            });
            setIsError(false);
            setMessage("Login successful!");
            localStorage.setItem("token", response.data);
        } catch (error) {
            setIsError(true);
            setMessage("Invalid email or password!");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">

                <h2 className="login-logo">📰 NewsApp</h2>
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
    );
}

export default Login;