import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ThankYou.css";

export default function ThankYou() {
  const navigate = useNavigate();
  // State to store the last order
  const [order, setOrder] = useState(null);

  // On mount, get the last order from localStorage and remove it
  useEffect(() => {
    const savedOrder = localStorage.getItem("lastOrder");
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
      localStorage.removeItem("lastOrder");
    }
  }, []);

  return (
    <main className="thankyou-container">
      <div className="thankyou-content">
        {/* Thank you message */}
        <h1 className="thankyou-title">Thank you for your order!</h1>
        <p className="thankyou-message">Your food is on its way 🛸</p>

        {/* Show receipt if order exists */}
        {order && (
          <div className="receipt">
            <h2>Order Summary</h2>
            <p>
              <strong>Name:</strong> {order.customer.name}
            </p>
            <p>
              <strong>Address:</strong> {order.customer.street}{" "}
              {order.customer.number}, {order.customer.city}
            </p>
            <p>
              <strong>Payment:</strong> {order.customer.payment}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>

            {/* List all ordered items */}
            <ul className="receipt-items">
              {order.items.map((item, index) => (
                <li key={index}>
                  {item.title} × {item.quantity} — {item.price} kr
                </li>
              ))}
            </ul>

            {/* Show total price */}
            <p className="receipt-total">
              <strong>Total:</strong>{" "}
              {order.items.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
              )}{" "}
              kr
            </p>
          </div>
        )}

        {/* Button to go back to home page */}
        <button className="back-home-btn" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </main>
  );
}
