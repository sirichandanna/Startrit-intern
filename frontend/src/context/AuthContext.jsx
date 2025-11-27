import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

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
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Configure axios defaults
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get('http://localhost:5001/api/auth/profile');
      console.log('Profile data:', data);
      setUser(data.user || data);
    } catch (error) {
      console.error('Profile fetch failed:', error.response?.data);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    try {
      const { data } = await axios.post('http://localhost:5001/api/auth/signup', userData);
      console.log('Signup response:', data);
      
      // Handle different response formats
      const authToken = data.token;
      const userInfo = data.user || data;
      
      if (authToken) {
        localStorage.setItem('token', authToken);
        setToken(authToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
        setUser(userInfo);
      } else {
        throw new Error('No token received from server');
      }
      
      return data;
    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
      throw error;
    }
  };

  const login = async (credentials) => {
    try {
      const { data } = await axios.post('http://localhost:5001/api/auth/login', credentials);
      console.log('Login response:', data);
      
      // Handle different response formats
      const authToken = data.token;
      const userInfo = data.user || data;
      
      if (authToken) {
        localStorage.setItem('token', authToken);
        setToken(authToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
        setUser(userInfo);
      } else {
        throw new Error('No token received from server');
      }
      
      return data;
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
