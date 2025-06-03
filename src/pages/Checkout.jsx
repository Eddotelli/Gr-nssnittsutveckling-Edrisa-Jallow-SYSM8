import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

export default function Checkout() {
  // Get cart items and clearCart function from CartContext
  const { cartItems, clearCart } = useContext(CartContext);
  // Get current user from AuthContext
  const { user } = useContext(AuthContext);
  // Hook for navigation
  const navigate = useNavigate();

  // State for form data (customer info and payment method)
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    number: "",
    city: "",
    payment: "swish",
  });

  // Handle changes in form fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (place order)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // If user is not logged in, show alert and stop
    if (!user) {
      alert("You must be logged in to place an order.");
      return;
    }

    // Create order object to send to backend
    const order = {
      userId: user.id,
      customer: formData,
      email: user.email,
      items: cartItems,
      createdAt: new Date(),
    };

    try {
      // Send order to backend (json-server)
      const res = await fetch("http://localhost:3001/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      if (res.ok) {
        // Save last order in localStorage, clear cart, and go to thank you page
        localStorage.setItem("lastOrder", JSON.stringify(order));
        clearCart();
        navigate("/thankyou");
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      // Handle network or server errors
      console.error("Order error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  // Calculate total price for all items in the cart
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <main className="checkout-container">
      <h1>Checkout</h1>

      <div className="checkout-content">
        {/* Order form */}
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
          {/* Payment method radio buttons */}
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

        {/* Order summary */}
        <div className="checkout-summary">
          <h2>Your Order</h2>
          <div className="checkout-item-list">
            {/* List each item in the cart */}
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
          {/* Show total price */}
          <p className="checkout-total">Total: {totalPrice} kr</p>
        </div>
      </div>
    </main>
  );
}
