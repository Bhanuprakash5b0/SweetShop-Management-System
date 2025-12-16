import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Validate token format (JWT should have 3 parts separated by dots)
        const parts = token.split('.');
        if (parts.length !== 3) {
          throw new Error('Invalid token format');
        }
        
        const decoded = jwtDecode(token);
        
        // Check if token is expired
        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
          throw new Error('Token expired');
        }
        
        setUser(decoded);
      } catch (error) {
        // Invalid or expired token - clear it
        console.error('Invalid token:', error);
        localStorage.removeItem("token");
        setUser(null);
      }
    }
  }, []);

  const login = (token) => {
    try {
      // Validate token format
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid token format');
      }
      
      const decoded = jwtDecode(token);
      
      // Check if token is expired
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        throw new Error('Token expired');
      }
      
      localStorage.setItem("token", token);
      setUser(decoded);
    } catch (error) {
      console.error('Failed to login with token:', error);
      localStorage.removeItem("token");
      setUser(null);
      throw error; // Re-throw so the calling component can handle it
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
