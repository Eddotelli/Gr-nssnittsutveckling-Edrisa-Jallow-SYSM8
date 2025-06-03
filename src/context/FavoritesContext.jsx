import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

// Create the favorites context
export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  // Get current user from AuthContext
  const { user } = useContext(AuthContext);
  // State to store all favorites for the user
  const [favorites, setFavorites] = useState([]);

  // Fetch favorites for the logged-in user when user changes
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) {
        setFavorites([]);
        return;
      }

      try {
        // Fetch favorites from backend for the current user
        const res = await fetch(
          `http://localhost:3001/favorites?userId=${user.id}`
        );
        const data = await res.json();
        setFavorites(data);
      } catch (error) {
        console.error("Failed to fetch favorites", error);
      }
    };

    fetchFavorites();
  }, [user]);

  // Add a product to favorites
  const addFavorite = async (productId) => {
    if (!user) return;

    const newFavorite = {
      userId: user.id,
      productId,
    };

    try {
      // Send new favorite to backend
      const res = await fetch("http://localhost:3001/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFavorite),
      });

      if (res.ok) {
        const saved = await res.json();
        // Add the new favorite to state
        setFavorites((prev) => [...prev, saved]);
      }
    } catch (error) {
      console.error("Failed to add favorite", error);
    }
  };

  // Remove a product from favorites
  const removeFavorite = async (productId) => {
    // Find the favorite object for this product and user
    const favorite = favorites.find(
      (fav) => fav.productId === productId && fav.userId === user?.id
    );

    if (!favorite) return;

    try {
      // Delete favorite from backend
      await fetch(`http://localhost:3001/favorites/${favorite.id}`, {
        method: "DELETE",
      });

      // Remove from state
      setFavorites((prev) => prev.filter((f) => f.id !== favorite.id));
    } catch (error) {
      console.error("Failed to remove favorite", error);
    }
  };

  // Check if a product is a favorite
  const isFavorite = (productId) => {
    return favorites.some((fav) => fav.productId === productId);
  };

  // Provide favorites state and functions to all children components
  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
