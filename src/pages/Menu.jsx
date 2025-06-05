// src/pages/Menu.jsx
import { useEffect, useState } from "react";
import MenuCard from "../components/MenuCard";
import CategoryMenu from "../components/CategoryMenu";
import "./Menu.css";

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [category, setCategory] = useState(
    localStorage.getItem("selectedCategory") || "Burgers"
  );

  // Fetch all menu items on mount
  useEffect(() => {
    fetch("http://localhost:3001/menu")
      .then((res) => res.json())
      .then((data) => setMenuItems(data))
      .catch((err) => console.error("Failed to load menu:", err));
  }, []);

  // Save selected category to localStorage
  useEffect(() => {
    localStorage.setItem("selectedCategory", category);
  }, [category]);

  // Filter based on selected category
  const filteredItems = menuItems.filter(
    (item) => item.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <main className="menu-page">
      <h1 className="menu-title">Explore the Menu</h1>

      {/* Category menu without Popular */}
      <CategoryMenu
        currentCategory={category}
        setCategory={setCategory}
        showPopular={false}
      />

      {/* Display filtered menu items */}
      {filteredItems.length > 0 ? (
        <div className="menu-grid">
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="no-items">No items in this category yet.</p>
      )}
    </main>
  );
}
