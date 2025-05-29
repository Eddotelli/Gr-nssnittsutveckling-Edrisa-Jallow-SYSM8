import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // sparar användardata

  const login = (username, password) => {
    if (username === "user" && password === "password") {
      setIsLoggedIn(true);
      setUser({
        username: "user",
        email: "user@example.com", // 🧠 används i Profile.jsx och Checkout
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
