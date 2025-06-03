// src/pages/Home.jsx
import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import MenuCard from "../components/MenuCard";
import "./Home.css";

export default function Home() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/menu")
      .then((res) => res.json())
      .then((data) => setMenuItems(data))
      .catch((err) => console.error("Could not retrieve menu data:", err));
  }, []);

  const popularItems = menuItems.filter((item) => item.popular === true);

  return (
    <main className="home-container">
      {/* Hero section at the top */}
      <Hero />

      {/* Section title */}
      <h1 className="section-title" id="popular">
        Popular Items
      </h1>

      {/* Popular items */}
      {popularItems.length > 0 ? (
        <div className="menu-grid">
          {popularItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="no-items">No popular items available right now.</p>
      )}
    </main>
  );
}
