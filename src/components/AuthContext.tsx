'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface AuthContextType {
  isLoggedIn: boolean;
  refreshAuth: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  refreshAuth: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const refreshAuth = () => {
    const token = Cookies.get('token');
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    refreshAuth(); // check on mount
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);