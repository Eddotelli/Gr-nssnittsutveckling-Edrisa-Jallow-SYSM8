import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Profile.css";

export default function Profile() {
  // Get current user and logout function from AuthContext
  const { user, logout } = useContext(AuthContext);
  // State to store all orders for the user
  const [orders, setOrders] = useState([]);
  // Hook for navigation
  const navigate = useNavigate();

  // Fetch user's orders from backend when component mounts or user changes
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Fetch all orders from backend
        const res = await fetch("http://localhost:3001/orders");
        const data = await res.json();
        // Filter orders to only those belonging to the current user
        const userOrders = data.filter((order) => order.userId === user?.id);
        // Reverse to show latest orders first
        setOrders(userOrders.reverse());
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    // Only fetch if user is logged in
    if (user?.email) {
      fetchOrders();
    }
  }, [user]);

  // Handle logout: log out user and navigate to home page
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <main className="profile-container">
      {/* Profile header with logout button */}
      <div className="profile-header">
        <h1>Your Profile</h1>
        <button onClick={handleLogout} className="logout-btn">
          Log out
        </button>
      </div>

      <h2>Order History</h2>

      {/* If no orders, show message. Otherwise, show order history */}
      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order.id}>
            <div className="order-details">
              <p>
                <strong>Name:</strong> {order.customer.name}
              </p>
              <p>
                <strong>Email:</strong> {order.customer.email}
              </p>
              <p>
                <strong>Ordered:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Payment:</strong> {order.customer.payment}
              </p>
              <p>
                <strong>Total:</strong>{" "}
                {order.items
                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
                  .toFixed(2)}{" "}
                kr
              </p>
            </div>
            {/* List all items in the order */}
            <ul className="order-items">
              {order.items.map((item, i) => (
                <li key={i}>
                  {item.title} × {item.quantity || 1}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </main>
  );
}
