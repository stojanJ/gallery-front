import React, { createContext, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { authService } from "../services/AuthService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const history = useHistory();
  const userToken = localStorage.getItem("user");
  const userData = userToken ? JSON.parse(userToken) : {}
  const [user, setUser] = useState(userData);

  const handleLogin = async (data) => {
    try {
      const response = await authService.login(data);
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user))
      history.push("/");
    } catch (error) { 
    }
  };
  const handleRegister = async (data) => {
    try {
      const response = await authService.register(data);
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user))
      history.push("/");
    } catch (error) { }
  };
  const handleLogout = async (data) => {
    try {
      const response = await authService.logout(data);
      setUser({});
      localStorage.removeItem("token")
      localStorage.removeItem('user')

      history.push("/login");
    } catch (error) { 
    }
  };
  
  const handleRefreshToken = async () => {
    const token = handleGetItemFromLS("token");

    if (token) {
      try {
        const response = await authService.refresh();
        setUser(response.data.user);
      } catch (error) {}
    }
  };

  const handleGetItemFromLS = (value) => {
    return localStorage.getItem(value);
  };

  // useEffect(() => {
  //   handleRefreshToken();
  // }, []);


  return (
    <AuthContext.Provider
      value={{
        user,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        handleRefreshToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
