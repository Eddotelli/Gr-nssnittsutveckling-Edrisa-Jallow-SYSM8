import { createContext, useState } from "react";

// Create the cart context
export const CartContext = createContext();

export function CartProvider({ children }) {
  // State to store all items in the cart
  const [cartItems, setCartItems] = useState([]);

  // Function to clear the entire cart
  const clearCart = () => setCartItems([]);

  // Function to add an item to the cart
  function addToCart(item) {
    // Check if the item already exists in the cart
    const exists = cartItems.find((i) => i.id === item.id);
    if (exists) {
      // If it exists, increase its quantity by 1
      setCartItems((prev) =>
        prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      // If it doesn't exist, add it with quantity 1
      setCartItems((prev) => [...prev, { ...item, quantity: 1 }]);
    }
  }

  // Function to remove an item from the cart by id
  function removeFromCart(id) {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  }

  // Function to update the quantity of a specific item
  function updateQuantity(id, quantity) {
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  }

  // Provide cart state and functions to all children components
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
