// Home.jsx
import { useState, useEffect } from "react";
import Hero from "../components/Hero"; // ✅ Importera Hero-komponenten
import MenuCard from "../components/MenuCard";
import CategoryMenu from "../components/CategoryMenu";
import "./Home.css";

export default function Home() {
  // State to store all menu items fetched from backend
  const [menuItems, setMenuItems] = useState([]);
  // State to track the currently selected category
  const [category, setCategory] = useState("All");

  // Fetch menu items from backend when component mounts
  useEffect(() => {
    fetch("http://localhost:3001/menu")
      .then((res) => res.json())
      .then((data) => setMenuItems(data))
      .catch((err) => console.error("Could not retrieve menu data:", err));
  }, []);

  // Filter menu items based on selected category
  const filteredItems =
    category === "All"
      ? menuItems.filter((item) => item.popular === true) // Show only popular items if "All" is selected
      : menuItems.filter(
          (item) => item.category.toLowerCase() === category.toLowerCase()
        ); // Otherwise, filter by category

  return (
    <main className="home-container">
      {/* Hero section at the top */}
      <Hero />

      {/* Category navigation menu */}
      <CategoryMenu currentCategory={category} setCategory={setCategory} />

      {/* Section title changes depending on selected category */}
      <h1 className="section-title" id="popular">
        {category === "All" ? "Popular Items" : category}
      </h1>

      {/* Show menu items if any are found, otherwise show a message */}
      {filteredItems.length > 0 ? (
        <div className="menu-grid">
          {/* Render a MenuCard for each filtered item */}
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="no-items">No items to display in this category.</p>
      )}
    </main>
  );
}
