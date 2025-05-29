import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Header.css";

export default function Header() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="header">
      <Link to="/" className="header-left">
        <img src="/logo.png" alt="Drone Delights Logo" className="logo-img" />
        <div className="logo-text">
          <div>DRONE</div>
          <div>DELIGHTS</div>
        </div>
      </Link>

      <div className="header-right">
        <Link to="/cart">
          <img src="/cart.png" alt="Shopping Cart" className="cart-icon" />
        </Link>

        {isLoggedIn ? (
          <>
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
            <button className="logout-btn" onClick={handleLogout}>
              Log out
            </button>
          </>
        ) : (
          <Link to="/login" className="signin-btn">
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
}
