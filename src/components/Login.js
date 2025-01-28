import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { useUser } from "./userContext";
import "./Login.css";

const Login = () => {
    const { login } = useUser(); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (email === "" || password === "") {
            setError("Both fields are required.");
            return;
        }

        // Simulate a successful login
        if (email === "user@example.com" && password === "password123") {
            setError("");
            login(email); 
            if (rememberMe) {
                localStorage.setItem("user", JSON.stringify({ email }));
            }
            navigate("/"); 
        } else {
            setError("Invalid email or password.");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleLogin(e); 
        }
    };

    return (
        <div>
            <Header />
            <div className="login-page">
                <div className="login-container">
                    <h2>Welcome back</h2>
                    <div className="login-form">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                onKeyDown={handleKeyDown} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                                onKeyDown={handleKeyDown} 
                            />
                        </div>
                        <div className="form-actions">
                            <div className="form-group remember-me">
                                <div>
                                    <input
                                        type="checkbox"
                                        id="rememberMe"
                                        checked={rememberMe}
                                        onChange={() => setRememberMe(!rememberMe)}
                                    />
                                </div>
                                <div><label htmlFor="rememberMe">Remember me</label></div>
                            </div>
                            <div className="forgot-password">
                                <a href="/forgot-password">Forgot password?</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
