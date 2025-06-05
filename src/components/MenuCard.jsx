// src/components/MenuCard.jsx
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { FavoritesContext } from "../context/FavoritesContext";
import "./MenuCard.css";

export default function MenuCard({ item }) {
  const { addToCart } = useContext(CartContext);
  const { isFavorite, addFavorite, removeFavorite } =
    useContext(FavoritesContext);

  const [showPopup, setShowPopup] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  const handleAdd = () => {
    addToCart(item);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  const toggleFavorite = () => {
    if (isFavorite(item.id)) {
      removeFavorite(item.id);
    } else {
      addFavorite(item.id);
    }
  };

  return (
    <div className="menu-card">
      {/* Favorite icon */}
      <button
        className="favorite-icon"
        onClick={toggleFavorite}
        aria-label="Toggle favorite"
      >
        {isFavorite(item.id) ? "❤️" : "🤍"}
      </button>

      {/* Image container */}
      <div className="menu-card-image-wrapper">
        <img src={item.image} alt={item.title} className="menu-card-image" />
      </div>

      {/* Text and buttons */}
      <div className="menu-card-content">
        <h3 className="menu-card-title">{item.title}</h3>

        <button
          className="toggle-description-btn"
          onClick={() => setShowDescription((prev) => !prev)}
          aria-label="Toggle description"
        >
          {showDescription ? "−" : "+"}
        </button>

        {showDescription && (
          <p className="menu-card-description">{item.description}</p>
        )}

        <p className="menu-card-price">{item.price} kr</p>

        <button className="menu-card-button" onClick={handleAdd}>
          Add to cart
        </button>

        {showPopup && (
          <div className="popup-notification">
            {item.title} was added to the cart!
          </div>
        )}
      </div>
    </div>
  );
}
