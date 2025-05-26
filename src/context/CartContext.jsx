import { createContext, useState } from "react";

// Skapar en ny context för varukorgen
export const CartContext = createContext();

export function CartProvider({ children }) {
  // State för att lagra varukorgens produkter
  const [cartItems, setCartItems] = useState([]);

  // Funktion för att lägga till en produkt i varukorgen
  function addToCart(item) {
    // Kollar om produkten redan finns i varukorgen
    const exists = cartItems.find((i) => i.id === item.id);
    if (exists) {
      // Om produkten finns, öka dess antal med 1
      setCartItems((prev) =>
        prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      // Om produkten inte finns, lägg till den med quantity 1
      setCartItems((prev) => [...prev, { ...item, quantity: 1 }]);
    }
  }

  // Funktion för att ta bort en produkt från varukorgen
  function removeFromCart(id) {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  }

  // Funktion för att uppdatera antalet av en produkt i varukorgen
  function updateQuantity(id, quantity) {
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  }

  // Gör funktionerna och varukorgens innehåll tillgängliga för barnkomponenter
  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}
