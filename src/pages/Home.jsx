import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MenuCard from "../components/MenuCard";
import CategoryMenu from "../components/CategoryMenu";

export default function Home() {
  const [menuItems, setMenuItems] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetch("http://localhost:3001/menu")
      .then((res) => res.json())
      .then((data) => setMenuItems(data))
      .catch((err) => console.error("Could not retrieve menu data:", err));
  }, []);

  // Filtrera baserat på kategori
  const filteredItems =
    category === "All"
      ? menuItems.filter((item) => item.popular === true)
      : menuItems.filter(
          (item) => item.category.toLowerCase() === category.toLowerCase()
        );

  return (
    <>
      <Header />

      <main className="home-container">
        {/* Kategorirad */}
        <CategoryMenu currentCategory={category} setCategory={setCategory} />

        {/* Titel */}
        <h1 className="section-title">
          {category === "All" ? "Popular Items" : category}
        </h1>

        {/* Menykort */}
        <div className="menu-grid">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => <MenuCard key={item.id} item={item} />)
          ) : (
            <p>Inga rätter att visa.</p>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
