import { useContext, useEffect, useState } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import { AuthContext } from "../context/AuthContext";
import MenuCard from "../components/MenuCard";
import "./Favorites.css";

export default function Favorites() {
  // Get favorites from FavoritesContext
  const { favorites } = useContext(FavoritesContext);
  // Get current user from AuthContext
  const { user } = useContext(AuthContext);
  // State to store all menu items from backend
  const [menuItems, setMenuItems] = useState([]);

  // Fetch all menu items from backend when component mounts
  useEffect(() => {
    fetch("http://localhost:3001/menu")
      .then((res) => res.json())
      .then((data) => setMenuItems(data))
      .catch((err) => console.error("Failed to fetch menu items", err));
  }, []);

  // Filter menu items to only those that are favorited by the current user
  const favoriteItems = menuItems.filter((item) =>
    favorites.some(
      (fav) => fav.productId === item.id && fav.userId === user?.id
    )
  );

  return (
    <main className="favorites-container">
      <h1 className="favorites-title">Your Favorites</h1>
  
      {/* If no favorites, show message. Otherwise, show favorite items */}
      {favoriteItems.length === 0 ? (
        <p className="favorites-empty">You have no favorite items yet.</p>
      ) : (
        <div className="favorites-horizontal-scroll">
          {/* Render a MenuCard for each favorite item */}
          {favoriteItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </main>
  );
}
