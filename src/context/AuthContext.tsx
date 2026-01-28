import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  avatar?: string | null;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updatedUser: Partial<User>) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const loadUser = () => {
    const savedUser = localStorage.getItem('currentUser');
    const savedProfile = localStorage.getItem('userProfile');
    
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (e) {
        console.error('Failed to parse user data', e);
      }
    } else if (savedProfile) {
      // Якщо є старий профіль, конвертуємо його в користувача
      try {
        const profile = JSON.parse(savedProfile);
        const userData: User = {
          id: Date.now().toString(),
          email: profile.email || '',
          name: profile.name || '',
          phone: profile.phone || '',
          address: profile.address || '',
          avatar: profile.avatar || null
        };
        setUser(userData);
        localStorage.setItem('currentUser', JSON.stringify(userData));
      } catch (e) {
        console.error('Failed to convert profile to user', e);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser();

    // Слухаємо зміни в localStorage
    const handleStorageChange = () => {
      loadUser();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Отримуємо всіх користувачів з localStorage
      const usersJson = localStorage.getItem('users');
      const users: Array<User & { password: string }> = usersJson ? JSON.parse(usersJson) : [];

      // Шукаємо користувача
      const foundUser = users.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        
        // Синхронізуємо з userProfile для сумісності
        const profile = {
          name: userWithoutPassword.name,
          email: userWithoutPassword.email,
          phone: userWithoutPassword.phone || '',
          address: userWithoutPassword.address || '',
          avatar: userWithoutPassword.avatar || null
        };
        localStorage.setItem('userProfile', JSON.stringify(profile));
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      // Отримуємо всіх користувачів
      const usersJson = localStorage.getItem('users');
      const users: Array<User & { password: string }> = usersJson ? JSON.parse(usersJson) : [];

      // Перевіряємо, чи не існує вже користувач з таким email
      if (users.some(u => u.email === email)) {
        return false;
      }

      // Створюємо нового користувача
      const newUser: User & { password: string } = {
        id: Date.now().toString(),
        email,
        password,
        name,
        phone: '',
        address: '',
        avatar: null
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // Автоматично логінимо нового користувача
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      
      // Створюємо профіль для сумісності
      const profile = {
        name: userWithoutPassword.name,
        email: userWithoutPassword.email,
        phone: '',
        address: '',
        avatar: null
      };
      localStorage.setItem('userProfile', JSON.stringify(profile));

      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const updateUser = (updatedUser: Partial<User>) => {
    if (user) {
      const newUser = { ...user, ...updatedUser };
      setUser(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      // Синхронізуємо з userProfile
      const profile = {
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone || '',
        address: newUser.address || '',
        avatar: newUser.avatar || null
      };
      localStorage.setItem('userProfile', JSON.stringify(profile));
      
      // Оновлюємо список користувачів
      const usersJson = localStorage.getItem('users');
      if (usersJson) {
        const users = JSON.parse(usersJson);
        const updatedUsers = users.map((u: any) => 
          u.email === user.email ? { ...u, ...newUser } : u
        );
        localStorage.setItem('users', JSON.stringify(updatedUsers));
      }
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userProfile');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateUser,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
