import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: user?.email || "", // förifyll om inloggad
    city: "",
    street: "",
    number: "",
    payment: "swish",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Din varukorg är tom.");
      return;
    }

    const total = cartItems.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );

    const order = {
      customer: formData,
      items: cartItems,
      total,
      createdAt: new Date().toISOString(),
    };

    await fetch("http://localhost:3001/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    clearCart();
    navigate("/thankyou");
  };

  return (
    <>
      <Header />
      <main>
        <h1>Checkout</h1>
        <form onSubmit={handleSubmit} className="checkout-form">
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
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
          <input
            name="street"
            placeholder="Street"
            value={formData.street}
            onChange={handleChange}
            required
          />
          <input
            name="number"
            placeholder="House number"
            value={formData.number}
            onChange={handleChange}
            required
          />

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

          <button type="submit">Pay</button>
        </form>
      </main>
      <Footer />
    </>
  );
}
