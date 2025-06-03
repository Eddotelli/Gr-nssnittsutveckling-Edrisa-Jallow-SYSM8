import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { FavoritesContext } from "../context/FavoritesContext";
import "./MenuCard.css";

export default function MenuCard({ item }) {
  // Get addToCart function from CartContext
  const { addToCart } = useContext(CartContext);

  // Get favorite functions from FavoritesContext
  const { isFavorite, addFavorite, removeFavorite } =
    useContext(FavoritesContext);

  // State for showing popup notification when item is added to cart
  const [showPopup, setShowPopup] = useState(false);

  // State for showing/hiding the description
  const [showDescription, setShowDescription] = useState(false);

  // Handle adding item to cart and show popup
  const handleAdd = () => {
    addToCart(item);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  // Handle toggling favorite status
  const toggleFavorite = () => {
    if (isFavorite(item.id)) {
      removeFavorite(item.id);
    } else {
      addFavorite(item.id);
    }
  };

  return (
    <div className="menu-card">
      {/* Favorite icon button */}
      <button
        className="favorite-icon"
        onClick={toggleFavorite}
        aria-label="Toggle favorite"
      >
        {isFavorite(item.id) ? "❤️" : "🤍"}
      </button>

      {/* Product image */}
      <img src={item.image} alt={item.title} className="menu-card-image" />

      {/* Product title */}
      <h3 className="menu-card-title">{item.title}</h3>

      {/* Button to show/hide description */}
      <button
        className="toggle-description-btn"
        onClick={() => setShowDescription((prev) => !prev)}
        aria-label="Toggle description"
      >
        {showDescription ? "−" : "+"}
      </button>

      {/* Product description, shown if showDescription is true */}
      {showDescription && (
        <p className="menu-card-description">{item.description}</p>
      )}

      {/* Product price */}
      <p className="menu-card-price">{item.price} kr</p>

      {/* Add to cart button */}
      <button className="menu-card-button" onClick={handleAdd}>
        Add to cart
      </button>

      {/* Popup notification when item is added to cart */}
      {showPopup && (
        <div className="popup-notification">
          {item.title} was added to the cart!
        </div>
      )}
    </div>
  );
}
