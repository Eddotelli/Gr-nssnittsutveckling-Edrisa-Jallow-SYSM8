// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";

// Skapar autentiseringskontext
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // 🔸 Väntar på inläsning

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (err) {
        console.error("Error parsing stored user:", err);
        localStorage.removeItem("loggedInUser");
      }
    }

    setIsLoading(false); // 🔸 Klart att använda
  }, []);

  // Inloggningsfunktion (e-post eller användarnamn + lösenord)
  const login = async (identifier, password) => {
    try {
      const res = await fetch(`http://localhost:3001/users`);
      const users = await res.json();

      const foundUser = users.find(
        (user) =>
          (user.email.toLowerCase() === identifier.toLowerCase() ||
            user.username.toLowerCase() === identifier.toLowerCase()) &&
          user.password === password
      );

      if (foundUser) {
        setUser(foundUser);
        setIsLoggedIn(true);
        localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
        return true;
      }

      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  // Utloggning
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("loggedInUser");
  };

  // Tillgängliggör värden till komponenter
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading, // 🔸 Nyckel till korrekt kontroll i PrivateRoute
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
