import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../css/Register.css";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [isOtpSent, setIsOtpSent] = useState(false);

    const handleRegister = async () => {

        if (!name || !email || !password) {
        setIsError(true);
        setMessage("All fields are required!");
        return;
    }
    
        try {
            const response = await api.post("/api/user/register", {
                name: name,
                email: email,
                password: password
            });
            setIsError(false);
            setMessage(response.data);
            setIsOtpSent(true);

        } catch (error) {
            setIsError(true);
            setMessage("Something went wrong!");
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const response = await api.post("/api/user/verify-otp", {
                email: email,
                otp: otp
            });
            setIsError(false);
            setMessage(response.data);

            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (error) {
            setIsError(true);
            setMessage("Something went wrong!");
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">

                <h2 className="register-logo">📰 NewsApp</h2>

                {!isOtpSent ? (
                    <>
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
                    </>
                ) : (
                    <>
                        <p className="register-subtitle">OTP sent to your email</p>
                        <p className="otp-email">{email}</p>

                        <div className="input-group">
                            <label className="input-label">Enter OTP</label>
                            <input
                                type="text"
                                placeholder="_ _ _ _ _ _"
                                className="input-field otp-input"
                                maxLength={6}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>

                        {message && (
                            <p className={isError ? "message-error" : "message-success"}>
                                {message}
                            </p>
                        )}

                        <button
                            className="register-button"
                            onClick={handleVerifyOtp}
                        >
                            Verify OTP
                        </button>

                        <p className="login-text">
                            Already verified?{" "}
                            <span
                                className="login-link"
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </span>
                        </p>
                    </>
                )}

            </div>
        </div>
    );
}

export default Register;