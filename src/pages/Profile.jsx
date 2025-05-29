import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";
import "./Profile.css";

export default function Profile() {
  const { user, logout } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/orders")
      .then((res) => res.json())
      .then((data) => {
        const userOrders = data.filter(
          (order) => order.customer?.email === user?.email
        );
        setOrders(userOrders.reverse());
      });
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <Header />
      <main className="profile-container">
        <div className="profile-header">
          <h1>Din Profil</h1>
          <button onClick={handleLogout} className="logout-btn">
            Logga ut
          </button>
        </div>

        <h2>Orderhistorik</h2>

        {orders.length === 0 ? (
          <p>Du har ännu inga beställningar.</p>
        ) : (
          orders.map((order) => (
            <div className="order-card" key={order.id}>
              <p>
                <strong>Namn:</strong> {order.customer.name}
              </p>
              <p>
                <strong>E-post:</strong> {order.customer.email}
              </p>
              <p>
                <strong>Beställd:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Betalsätt:</strong> {order.customer.payment}
              </p>
              <p>
                <strong>Totalt:</strong> {order.total} kr
              </p>
              <ul>
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
      <Footer />
    </>
  );
}
