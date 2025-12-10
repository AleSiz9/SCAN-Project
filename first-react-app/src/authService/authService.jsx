import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { API_BASE_URL } from '../services/searchApi';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const decodeJWT = useCallback((token) => {
    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      return decoded;
    } catch (error) {
      return null;
    }
  }, []);


  const fetchUserData = useCallback(async () => {
    try {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        setLoading(false);
        return;
      }

      const jwtData = decodeJWT(token);

      if (jwtData) {
        const userData = {
          id: jwtData?.userId,
          email: jwtData?.email,
          username: jwtData?.preferred_username,
          emailVerified: jwtData?.email_verified,
          roles: jwtData?.realm_access?.roles,
          accessToken: token
        };
        setUser(userData);
      } else {
        localStorage.removeItem('accessToken');
        setUser(null);
      }
    } catch (error) {
      localStorage.removeItem('accessToken');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [decodeJWT]);

  const login = useCallback(async (login, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/account/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ login, password }),
      });

      if (response.status === 401) {
        throw new Error('Неверный логин или пароль')
      }
      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult?.error || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result && result.accessToken) {
        localStorage.setItem('accessToken', result.accessToken);
        localStorage.setItem('tokenExpire', result.expire);

        const jwtData = decodeJWT(result.accessToken)
        if (!jwtData) {
          throw new Error('Ошибка обработки токена')
        }

        const now = new Date();
        const expireDate = new Date(result.expire);

        if (now >= expireDate) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('tokenExpire');
          throw new Error('Полученный токен уже истек');
        }

        const userData = {
          id: jwtData?.userId,
          email: jwtData?.email,
          username: jwtData?.preferred_username,
          emailVerified: jwtData?.email_verified,
          roles: jwtData?.realm_access?.roles,
          accessToken: result.accessToken,
          tokenExpiry: result.expire
        };

        setUser(userData);
        return { success: true, user: userData };
      } else {
        throw new Error(result?.error || 'Ошибка аутентификации');
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [decodeJWT]);

  const logout = useCallback(() => {
    setUser(null);
    setError(null);
    localStorage.removeItem('accessToken');
  }, []);

  const clearError = useCallback(() => setError(null), []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const value = {
    user,
    login,
    logout,
    loading,
    error,
    clearError,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};