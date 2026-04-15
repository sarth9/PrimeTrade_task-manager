import { useEffect, useState } from "react";
import API from "../api/client";
import { AuthContext } from "./auth-context";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const loadUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        if (!ignore) setLoading(false);
        return;
      }

      try {
        const res = await API.get("/auth/me");
        if (!ignore) {
          setUser(res.data.data);
        }
      } catch {
        localStorage.removeItem("token");
        if (!ignore) {
          setUser(null);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadUser();

    return () => {
      ignore = true;
    };
  }, []);

  const login = async (email, password) => {
    const res = await API.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.data.token);
    setUser(res.data.data.user);
    return res.data;
  };

  const register = async (name, email, password) => {
    const res = await API.post("/auth/register", { name, email, password });
    localStorage.setItem("token", res.data.data.token);
    setUser(res.data.data.user);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}