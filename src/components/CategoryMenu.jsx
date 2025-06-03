import React from "react";
import "./CategoryMenu.css";

export default function CategoryMenu({ currentCategory, setCategory }) {
  // List of categories to display in the menu
  const categories = [
    { name: "All", label: "Popular", image: "/Populära objekt-märke.png" },
    { name: "Burgers", label: "Burgers", image: "/burger.png" },
    { name: "Poké Bowl", label: "Poké Bowl", image: "/poké.png" },
    { name: "Sides", label: "Sides", image: "/sides.png" },
    { name: "Drinks & Milkshakes", label: "Drinks", image: "/drinks.png" },
  ];

  return (
    // Navigation menu for categories
    <nav className="category-menu" aria-label="Category menu">
      {/* Loop through each category and render a button */}
      {categories.map((cat) => (
        <button
          key={cat.name}
          className={`category-item ${
            currentCategory === cat.name ? "active" : ""
          }`}
          onClick={() => setCategory(cat.name)} // Set selected category on click
          aria-pressed={currentCategory === cat.name} // Accessibility: indicate active
        >
          {/* Category icon */}
          <img src={cat.image} alt={`${cat.label} icon`} />
          {/* Category label */}
          <p>{cat.label}</p>
        </button>
      ))}
    </nav>
  );
}
