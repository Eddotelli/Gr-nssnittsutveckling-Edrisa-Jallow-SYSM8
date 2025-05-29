import React from "react";
import "./CategoryMenu.css";

export default function CategoryMenu({ currentCategory, setCategory }) {
  const categories = [
    { name: "All", label: "Popular", image: "/Populära objekt-märke.png" },
    {
      name: "Burgers",
      label: "Burgers",
      image: "/burger.png",
    },
    {
      name: "Poké Bowl",
      label: "Poké Bowl",
      image: "/poké.png",
    },
    {
      name: "Sides",
      label: "Sides",
      image: "/sides.png",
    },
    {
      name: "Drinks & Milkshakes",
      label: "Drinks",
      image: "/drinks.png",
    },
  ];

  return (
    <nav className="category-menu" aria-label="Category menu">
      {categories.map((cat) => (
        <button
          key={cat.name}
          className={`category-item ${
            currentCategory === cat.name ? "active" : ""
          }`}
          onClick={() => setCategory(cat.name)}
          aria-current={currentCategory === cat.name ? "true" : undefined}
        >
          <img src={cat.image} alt={`${cat.label} icon`} />
          <span>{cat.label}</span>
        </button>
      ))}
    </nav>
  );
}
