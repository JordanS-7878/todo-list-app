import { createContext, useState, useEffect, useContext } from "react";
import { getCurrentUser } from "../api/users";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      const response = await getCurrentUser();
      setUser(response.user);
      console.log("user: ", response.user);
    } catch (err) {
      console.error("Failed to fetch user", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        fetchUser,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
