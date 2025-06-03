import { createContext, useState, useEffect } from "react";

// Create the authentication context
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // State to track if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // State to store the user object
  const [user, setUser] = useState(null);

  // Load user from localStorage when the page loads
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (err) {
        // If parsing fails, remove the invalid user from storage
        console.error("Error parsing stored user:", err);
        localStorage.removeItem("loggedInUser");
      }
    }
  }, []);

  // Login function: accepts email OR username and password
  const login = async (identifier, password) => {
    try {
      // Fetch all users from the backend
      const res = await fetch(`http://localhost:3001/users`);
      const users = await res.json();

      // Find user by email or username and check password
      const foundUser = users.find(
        (user) =>
          (user.email.toLowerCase() === identifier.toLowerCase() ||
            user.username.toLowerCase() === identifier.toLowerCase()) &&
          user.password === password
      );

      if (foundUser) {
        // If user found, set user state and save to localStorage
        setUser(foundUser);
        setIsLoggedIn(true);
        localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
        return true;
      }

      // If not found, return false
      return false;
    } catch (error) {
      // Handle fetch or other errors
      console.error("Login error:", error);
      return false;
    }
  };

  // Logout function: clears user state and localStorage
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("loggedInUser");
  };

  // Provide authentication state and functions to children components
  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
