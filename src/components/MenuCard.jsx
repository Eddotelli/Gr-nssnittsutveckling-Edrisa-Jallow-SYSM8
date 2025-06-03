// src/components/MenuCard.jsx
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./MenuCard.css";

export default function MenuCard({ item }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div
      className={`menu-card ${item.popular ? "popular" : ""}`}
      aria-label={`${item.title} menu item`}
    >
      {/* Image of the food item */}
      <img
        src={item.image}
        alt={item.title}
        className="menu-image"
        loading="lazy"
      />

      {/* Text details */}
      <div className="menu-details">
        <h3 className="menu-title">{item.title}</h3>
        <p className="menu-desc">{item.description}</p>
        <div className="menu-bottom">
          <span className="menu-price">{item.price} kr</span>
          <button
            className="add-btn"
            onClick={() => addToCart(item)}
            aria-label={`Add ${item.title} to cart`}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
