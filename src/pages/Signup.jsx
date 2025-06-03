import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate();
  const nameRef = useRef(null);

  // State for all form fields
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    street: "",
    number: "",
  });

  // Focus the name input when the component mounts
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  // Handle input changes for all fields
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Check password length
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    try {
      // Check if email or username already exists in backend
      const [emailRes, usernameRes] = await Promise.all([
        fetch(`http://localhost:3001/users?email=${formData.email}`),
        fetch(`http://localhost:3001/users?username=${formData.username}`),
      ]);

      const existingEmail = await emailRes.json();
      const existingUsername = await usernameRes.json();

      if (existingEmail.length > 0) {
        alert("Email is already registered");
        return;
      }

      if (existingUsername.length > 0) {
        alert("Username is already taken");
        return;
      }

      // Register the new user in backend
      const res = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          street: formData.street,
          number: formData.number,
        }),
      });

      if (res.ok) {
        // If registration is successful, reset form and navigate to login
        alert("User registered successfully");
        setFormData({
          name: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
          street: "",
          number: "",
        });
        navigate("/login");
      } else {
        alert("Failed to register user");
      }
    } catch (err) {
      // Handle network or server errors
      console.error("Signup error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="signup-container">
      <h1 className="signup-title">Create Account</h1>
      {/* User avatar image */}
      <img
        src="/profile-avatar.png"
        alt="User icon"
        className="signup-avatar"
      />
      {/* Signup form */}
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          ref={nameRef}
          name="name"
          placeholder="Full name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password (min 6 characters)"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Phone number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          name="street"
          placeholder="Street"
          value={formData.street}
          onChange={handleChange}
          required
        />
        <input
          name="number"
          placeholder="Street number"
          value={formData.number}
          onChange={handleChange}
          required
        />
        <button type="submit" className="signup-btn">
          Sign up
        </button>
      </form>

      {/* Link to login page if user already has an account */}
      <p className="signup-login-prompt">
        Already have an account?{" "}
        <Link to="/login" className="signup-login-link">
          Log in
        </Link>
      </p>
    </main>
  );
}
