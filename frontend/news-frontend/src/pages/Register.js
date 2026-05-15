import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Register.css";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const response = await api.post("/api/user/register", {
                name: name,
                email: email,
                password: password
            });
            setIsError(false);
            setMessage(response.data);

        } catch (error) {
            setIsError(true);
            setMessage("Something went wrong!");
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">

                <h2 className="register-logo">📰 NewsApp</h2>
                <p className="register-subtitle">Create your account</p>

                <div className="input-group">
                    <label className="input-label">Full Name</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        className="input-field"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

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
                    className="register-button"
                    onClick={handleRegister}
                >
                    Create Account
                </button>

                <p className="login-text">
                    Already have an account?{" "}
                    <span
                        className="login-link"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>
                </p>

            </div>
        </div>
    );
}

export default Register;