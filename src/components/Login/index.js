import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // State to control loading spinner
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      // Redirect to home if token exists
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading spinner

    try {
      const credentials = { email, password };

      const response = await fetch(
        "https://healu-backend.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Login failed: ${errorData.message}`);
        setLoading(false); // Stop loading spinner
        return;
      }

      const result = await response.json();
      Cookies.set("authToken", result.token, { expires: 1 });
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please try again later.");
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <div className="auth-container">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleLogin}
        className="auth-form"
      >
        <h2 className="auth-title">Login to HealU</h2>

        {loading ? (
          <div className="spinner-container">
            <div className="spinner"></div>{" "}
            {/* Spinner is shown during loading */}
          </div>
        ) : (
          <>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder = "healu@gmail.com"
              required
              className="auth-input"
            />
            <input
              type="password"
              placeholder = "healu2024"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="auth-input"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="auth-button"
            >
              Login
            </motion.button>
          </>
        )}

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </motion.form>
    </div>
  );
};

export default Login;
