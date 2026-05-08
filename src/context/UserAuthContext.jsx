import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import apiConfig from "../config/api";

const UserAuthContext = createContext(null);

export const useUserAuth = () => {
  const ctx = useContext(UserAuthContext);
  if (!ctx) throw new Error("useUserAuth must be used within a UserAuthProvider");
  return ctx;
};

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const savedToken = localStorage.getItem("qode_user_token");
      const savedUser = localStorage.getItem("qode_user_data");
      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }
    } catch {
      localStorage.removeItem("qode_user_token");
      localStorage.removeItem("qode_user_data");
    } finally {
      setLoading(false);
    }
  }, []);

  const persist = (newToken, newUser) => {
    if (newToken) localStorage.setItem("qode_user_token", newToken);
    else localStorage.removeItem("qode_user_token");

    if (newUser) localStorage.setItem("qode_user_data", JSON.stringify(newUser));
    else localStorage.removeItem("qode_user_data");
  };

  const apiRequest = async (url, options = {}) => {
    const res = await fetch(apiConfig.getEndpoint(url), {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
      credentials: "include",
    });
    return res.json();
  };

  const register = async (payload) => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(apiConfig.getEndpoint('/api/v1/users/register'), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Registration failed");

      const userData = data.data?.user;
      const authToken = data.data?.token;
      if (!userData || !authToken) throw new Error("Invalid server response");

      setToken(authToken);
      setUser(userData);
      persist(authToken, userData);
      return { success: true, user: userData };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(apiConfig.getEndpoint('/api/v1/users/login'), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Login failed");

      const userData = data.data?.user;
      const authToken = data.data?.token;
      if (!userData || !authToken) throw new Error("Invalid server response");

      setToken(authToken);
      setUser(userData);
      persist(authToken, userData);
      return { success: true, user: userData };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setError(null);
    persist(null, null);
    fetch(apiConfig.getEndpoint('/api/v1/users/logout'), { method: "POST", credentials: "include" }).catch(() => { });
  };

  const forgotPassword = async (email) => {
    setError(null);
    try {
      const data = await apiRequest("/api/v1/users/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      if (!data.success) throw new Error(data.message || "Request failed");
      return { success: true, message: data.message, devToken: data.devToken };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    }
  };

  const resetPassword = async (tokenVal, password) => {
    setError(null);
    try {
      const data = await apiRequest("/api/v1/users/reset-password", {
        method: "POST",
        body: JSON.stringify({ token: tokenVal, password }),
      });
      if (!data.success) throw new Error(data.message || "Reset failed");
      return { success: true, message: data.message };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    }
  };

  const updateProfile = async (id, payload) => {
    setError(null);
    setLoading(true);
    try {
      const data = await apiRequest(`/api/v1/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      if (!data.success) throw new Error(data.message || "Update failed");
      setUser(data.data);
      persist(token, data.data);
      return { success: true, user: data.data };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    token,
    loading,
    error,
    isAuthenticated: !!user && !!token,
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
    updateProfile,
    clearError: () => setError(null),
  };

  return <UserAuthContext.Provider value={value}>{children}</UserAuthContext.Provider>;
};

export default UserAuthContext;
