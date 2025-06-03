import { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  // Get login function from AuthContext
  const { login } = useContext(AuthContext);
  // State for form fields
  const [form, setForm] = useState({ identifier: "", password: "" });
  // State for error messages
  const [error, setError] = useState("");
  // Hook for navigation
  const navigate = useNavigate();
  // Ref for focusing the first input
  const inputRef = useRef(null);

  // Focus the identifier input when component mounts
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Handle input changes for both fields
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Try to log in with identifier (email or username) and password
      const success = await login(form.identifier, form.password); // ✅ ändrat här

      if (success) {
        // If login is successful, navigate to profile page
        navigate("/profile");
      } else {
        // If login fails, show error message
        setError("Incorrect username/email or password");
      }
    } catch (err) {
      // Handle network or other errors
      console.error("Login error:", err);
      setError("Failed to log in. Please try again.");
    }
  };

  return (
    <main className="login-container">
      <h1 className="login-title">Login</h1>
      {/* Login form */}
      <form onSubmit={handleSubmit} className="login-form">
        <input
          ref={inputRef}
          name="identifier"
          type="text"
          placeholder="Email or username"
          aria-label="Email or username"
          onChange={handleChange}
          value={form.identifier}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          aria-label="Password"
          onChange={handleChange}
          value={form.password}
          required
        />
        {/* Show error message if login fails */}
        {error && <p className="error">{error}</p>}
        <button type="submit" className="login-btn">
          Log in
        </button>
      </form>
      {/* Link to signup page if user doesn't have an account */}
      <p className="register-prompt">
        Don’t have an account?{" "}
        <Link to="/signup" className="signup-link">
          Sign up
        </Link>
      </p>
    </main>
  );
}
