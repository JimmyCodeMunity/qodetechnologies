import React, { createContext, useContext, useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const savedToken = localStorage.getItem("qode_admin_token");
      const savedAdmin = localStorage.getItem("qode_admin_user");
      if (savedToken && savedAdmin) {
        setToken(savedToken);
        setAdmin(JSON.parse(savedAdmin));
      }
    } catch {
      localStorage.removeItem("qode_admin_token");
      localStorage.removeItem("qode_admin_user");
    } finally {
      setLoading(false);
    }
  }, []);

  const persist = (newToken, newAdmin) => {
    if (newToken) localStorage.setItem("qode_admin_token", newToken);
    else localStorage.removeItem("qode_admin_token");

    if (newAdmin) localStorage.setItem("qode_admin_user", JSON.stringify(newAdmin));
    else localStorage.removeItem("qode_admin_user");
  };

  const login = async (email, password) => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/v1/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || "Login failed");
      }

      const adminData = data.data?.admin;
      const authToken = data.data?.token;

      if (!adminData || !authToken) {
        throw new Error("Invalid server response");
      }

      const normalized = {
        id: adminData._id || adminData.id,
        name: adminData.fullname || adminData.name || adminData.username,
        handle: adminData.username || "admin",
        email: adminData.email,
        phone: adminData.phone || "",
        role: "Super Admin",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${adminData.username || "admin"}&backgroundColor=84cc16`,
      };

      setToken(authToken);
      setAdmin(normalized);
      persist(authToken, normalized);
      return { success: true, admin: normalized };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAdmin(null);
    setToken(null);
    setError(null);
    persist(null, null);
    fetch(`${API_BASE}/api/v1/admin/logout`, { method: "POST", credentials: "include" }).catch(() => {});
  };

  const getAdminProfile = async (id) => {
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/v1/admin/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: "include",
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Failed to fetch profile");
      return { success: true, data: data.data };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    }
  };

  const updateProfile = async (id, payload) => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/v1/admin/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Update failed");

      const updated = data.data;
      const normalized = {
        id: updated._id || updated.id,
        name: updated.fullname || updated.name || updated.username,
        handle: updated.username || "admin",
        email: updated.email,
        phone: updated.phone || "",
        role: "Super Admin",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${updated.username || "admin"}&backgroundColor=84cc16`,
      };

      setAdmin(normalized);
      persist(token, normalized);
      return { success: true, admin: normalized };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    admin,
    token,
    loading,
    error,
    isAuthenticated: !!admin && !!token,
    login,
    logout,
    getAdminProfile,
    updateProfile,
    clearError: () => setError(null),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
