import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">🍽️ DRONE DELIGHTS</Link>
      </div>
      <nav>
        <Link to="/cart">🛒</Link>
        {isLoggedIn ? (
          <>
            <Link to="/profile">Profile</Link>
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Log out
            </button>
          </>
        ) : (
          <Link to="/login">Sign in</Link>
        )}
      </nav>
    </header>
  );
}
