import React, { useContext, useEffect, useState } from "react";
import { getCookie } from "../utils/cookie";
import authApi from "../api/authApi";
import dataApi from "../api/dataApi";

// Create the AuthContext
const AuthContext = React.createContext();

// Create a custom hook to use the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

// AuthProvider component to wrap your application and provide authentication state
export function AuthProvider(props) {
  const [isLogin, setIsLogin] = useState(false);

  // Value to be provided by the context
  useEffect(() => {
    const checkLogin = async () => {
      const token = getCookie("accessToken");
      const refreshToken = getCookie("refreshToken");
      if (token && refreshToken) {
        const checkLogin = await dataApi.getPosts();
        if (checkLogin) {
          setIsLogin(true);
        }
      } else {
        setIsLogin(false);
      }
    };
    checkLogin();
  }, []);

  const value = {
    isLogin,
    setIsLogin,
  };

  // Provide the AuthContext with the value
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
