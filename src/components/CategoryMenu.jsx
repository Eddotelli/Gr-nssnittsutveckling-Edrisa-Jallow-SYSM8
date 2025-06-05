import React from "react";
import "./CategoryMenu.css";

export default function CategoryMenu({
  currentCategory,
  setCategory,
  showPopular = true,
}) {
  // Define the list of categories
  const categories = [
    ...(showPopular
      ? [{ name: "All", label: "Popular", image: "/Populära objekt-märke.png" }]
      : []),
    { name: "Burgers", label: "Burgers", image: "/burger.png" },
    { name: "Poké Bowl", label: "Poké Bowl", image: "/poké.png" },
    { name: "Sides", label: "Sides", image: "/sides.png" },
    { name: "Drinks & Milkshakes", label: "Drinks", image: "/drinks.png" },
  ];

  return (
    <nav className="category-menu" aria-label="Category navigation">
      {categories.map((cat) => (
        <button
          key={cat.name}
          className={`category-item ${
            currentCategory === cat.name ? "active" : ""
          }`}
          onClick={() => setCategory(cat.name)}
          aria-pressed={currentCategory === cat.name}
        >
          <img src={cat.image} alt={`${cat.label} icon`} />
          <p>{cat.label}</p>
        </button>
      ))}
    </nav>
  );
}
