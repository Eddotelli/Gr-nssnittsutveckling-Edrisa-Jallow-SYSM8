import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import "./Header.css";

export default function Header() {
  const { isLoggedIn, logout, user } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false); // 🔹 Toggle menu
  const navigate = useNavigate();

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="header">
      {/* Logo and homepage link */}
      <Link to="/" className="header-left" aria-label="Go to homepage">
        <img src="/logo.png" alt="Drone Delights Logo" className="logo-img" />
        <div className="logo-text">
          <div>DRONE</div>
          <div>DELIGHTS</div>
        </div>
      </Link>

      {/* Hamburger icon (visible on small screens) */}
      <button
        className="hamburger"
        aria-label="Toggle menu"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      {/* Navigation links */}
      <nav className={`header-right ${menuOpen ? "open" : ""}`}>
        <Link to="/cart" className="cart-icon-wrapper" aria-label="Go to cart">
          <img src="/cart.png" alt="Shopping Cart" className="cart-icon" />
          {totalQuantity > 0 && (
            <span className="cart-count">{totalQuantity}</span>
          )}
        </Link>

        {isLoggedIn && (
          <Link
            to="/favorites"
            className="favorites-link"
            aria-label="Favorites"
          >
            ❤️
          </Link>
        )}

        {isLoggedIn ? (
          <>
            {user?.name && (
              <span className="nav-link" aria-label="Logged in user">
                👋 {user.name}
              </span>
            )}
            <Link to="/profile" className="nav-link" aria-label="Profile">
              Profile
            </Link>
            <button
              className="logout-btn"
              onClick={handleLogout}
              aria-label="Log out"
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="signin-btn" aria-label="Log in">
              Log in
            </Link>
            <Link to="/signup" className="nav-link" aria-label="Create account">
              Create account
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
