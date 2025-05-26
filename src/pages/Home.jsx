import { useEffect, useState } from "react";
import MenuCard from "../components/MenuCard";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/menu")
      .then((res) => res.json())
      .then((data) => setMenu(data));
  }, []);

  return (
    <>
      <Header />
      <main>
        <h1>Popular Items</h1>
        <div className="menu-grid">
          {menu.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
