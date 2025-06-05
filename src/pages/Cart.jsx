import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

export default function Cart() {
  // Get cart state and functions from CartContext
  const { cartItems, updateQuantity, removeFromCart, clearCart } =
    useContext(CartContext);
  // Hook for navigation
  const navigate = useNavigate();
  // State to track which item is being removed (for animation)
  const [removingItem, setRemovingItem] = useState(null);

  // Handle removing an item with a fade-out effect
  const handleRemove = (id) => {
    setRemovingItem(id);
    setTimeout(() => {
      removeFromCart(id);
      setRemovingItem(null);
    }, 300);
  };

  // Calculate total price of all items in the cart
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="cart-container">
      <h1 className="cart-title">Your Cart</h1>

      {/* If cart is empty, show message. Otherwise, show cart items */}
      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <>
          {/* Scrollable wrapper for cart items */}
          <div className="cart-item-scroll-wrapper">
            <div className="cart-item-list">
              {/* Render each item in the cart */}
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className={`cart-item ${
                    removingItem === item.id ? "fade-out" : ""
                  }`}
                >
                  {/* Product image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="cart-item-img"
                  />
                  {/* Product info */}
                  <div className="cart-item-info">
                    <p className="cart-item-title">{item.title}</p>
                    <p className="cart-item-price">{item.price} kr</p>
                  </div>

                  {/* Quantity controls */}
                  <div className="cart-qty-controls">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                    >
                      −
                    </button>
                  </div>

                  {/* Remove item button */}
                  <button
                    className="cart-remove-btn"
                    onClick={() => handleRemove(item.id)}
                    aria-label="Remove item"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Cart summary section */}
          <div className="cart-summary">
            <p>Subtotal</p>
            <p>{total} kr</p>
            <p>{cartItems.length} items</p>
          </div>

          {/* Cart action buttons */}
          <div className="cart-buttons">
            <button onClick={() => navigate("/")}>Continue Shopping</button>
            <button onClick={clearCart}>Clear Cart</button>
            <button
              onClick={() => navigate("/checkout")}
              className="checkout-btn"
            >
              Go to Checkout
            </button>
          </div>
        </>
      )}
    </main>
  );
}
