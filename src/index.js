import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext"; // 🆕

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <CartProvider>
      <FavoritesProvider> {/* ✅ Lägg till här */}
        <App />
      </FavoritesProvider>
    </CartProvider>
  </AuthProvider>
);
