import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import "./MenuCard.css";

export default function MenuCard({ item }) {
  const { addToCart } = useContext(CartContext);
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div className="menu-card">
      <img src={item.image} alt={item.title} className="menu-card-image" />
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
      <button className="menu-card-button" onClick={() => addToCart(item)}>
        Lägg till
      </button>
    </div>
  );
}
