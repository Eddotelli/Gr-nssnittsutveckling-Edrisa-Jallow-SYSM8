// src/pages/Menu.jsx
import { useState, useEffect } from "react";
import CategoryMenu from "../components/CategoryMenu";
import MenuCard from "../components/MenuCard";
import "./Menu.css";

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetch("http://localhost:3001/menu")
      .then((res) => res.json())
      .then((data) => setMenuItems(data))
      .catch((err) => console.error("Could not retrieve menu data:", err));
  }, []);

  const filteredItems =
    category === "All"
      ? menuItems
      : menuItems.filter(
          (item) => item.category.toLowerCase() === category.toLowerCase()
        );

  return (
    <main className="menu-page-container">
      <h1 className="menu-title">Menu</h1>
      <CategoryMenu currentCategory={category} setCategory={setCategory} />
      <div className="menu-grid">
        {filteredItems.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}
