import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(form.username, form.password);
    if (success) {
      navigate("/profile");
    } else {
      setError("Incorrect username or password");
    }
  };

  return (
    <>
      <Header />
      <main>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            value={form.username}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={form.password}
            required
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit">Log in</button>
        </form>
      </main>
      <Footer />
    </>
  );
}
