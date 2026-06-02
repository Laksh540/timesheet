// authentication state
// logged-in user
// token management

// Avoid prop drilling.

// context/AuthContext.tsx

import { createContext, useContext, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const checkForAuthentication = () => {
  const token = sessionStorage.getItem("token");

  if (token) {
    return true;
  }
  return false;
};
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    checkForAuthentication,
  );

  const login = (token: string) => {
    sessionStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
