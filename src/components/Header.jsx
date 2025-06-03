import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext"; // 🔹 New import
import "./Header.css";

export default function Header() {
  const { isLoggedIn, logout, user } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext); // 🔹 Get cart items
  const navigate = useNavigate();

  // Count total quantity of items in cart
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

      {/* Navigation links on the right */}
      <nav className="header-right">
        {/* Cart icon with count */}
        <Link to="/cart" className="cart-icon-wrapper" aria-label="Go to cart">
          <img src="/cart.png" alt="Shopping Cart" className="cart-icon" />
          {totalQuantity > 0 && (
            <span className="cart-count">{totalQuantity}</span>
          )}
        </Link>

        {/* Favorites link (if logged in) */}
        {isLoggedIn && (
          <Link
            to="/favorites"
            className="favorites-link"
            aria-label="Your favorites"
          >
            ❤️
          </Link>
        )}

        {/* User links */}
        {isLoggedIn ? (
          <>
            {user?.name && (
              <span className="nav-link" aria-label="Logged in user">
                👋 {user.name}
              </span>
            )}
            <Link to="/profile" className="nav-link" aria-label="Go to profile">
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
