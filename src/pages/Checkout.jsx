import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

export default function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Customer input form state
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    number: "",
    city: "",
    payment: "swish",
  });

  // Update form field state on change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle order submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Build order data
    const order = {
      userId: user?.id || null,
      email: user?.email || null,
      customer: formData,
      items: cartItems,
      createdAt: new Date(),
    };

    try {
      const res = await fetch("http://localhost:3001/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      if (res.ok) {
        localStorage.setItem("lastOrder", JSON.stringify(order));
        clearCart();
        navigate("/thankyou");
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Order error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  // Calculate total order price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <main className="checkout-container">
      <h1>Checkout</h1>

      <div className="checkout-content">
        {/* Checkout form */}
        <form onSubmit={handleSubmit} className="checkout-form">
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            name="street"
            placeholder="Street"
            value={formData.street}
            onChange={handleChange}
            required
          />
          <input
            name="number"
            placeholder="House Number"
            value={formData.number}
            onChange={handleChange}
            required
          />
          <input
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />

          {/* Payment method */}
          <div className="payment-options">
            <label>
              <input
                type="radio"
                name="payment"
                value="swish"
                checked={formData.payment === "swish"}
                onChange={handleChange}
              />
              Swish
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="card"
                checked={formData.payment === "card"}
                onChange={handleChange}
              />
              Card
            </label>
          </div>

          <button type="submit">Confirm Order</button>
        </form>

        {/* Cart summary */}
        <div className="checkout-summary">
          <h2>Your Order</h2>
          <div className="checkout-item-list">
            {cartItems.map((item, index) => (
              <div className="checkout-item" key={index}>
                <img src={item.image} alt={item.title} />
                <div className="item-info">
                  <p>{item.title}</p>
                  <p>
                    {item.quantity} × {item.price} kr
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="checkout-total">Total: {totalPrice} kr</p>
        </div>
      </div>
    </main>
  );
}
