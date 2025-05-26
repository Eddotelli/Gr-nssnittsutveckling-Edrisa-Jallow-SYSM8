import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">🍽️ DRONE DELIGHTS</Link>
      </div>
      <nav>
        <Link to="/cart">🛒</Link>
        <button className="signin-btn">Sign in</button>
      </nav>
    </header>
  );
}
