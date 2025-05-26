import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function MenuCard({ item }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="menu-card">
      <img src={item.image} alt={item.name} />
      <h3>{item.name}</h3>
      <p>{item.price} kr</p>
      <button onClick={() => addToCart(item)}>Add</button>
    </div>
  );
}
