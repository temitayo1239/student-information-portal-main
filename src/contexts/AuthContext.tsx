import React, { createContext, useContext, useState, ReactNode } from 'react';
import { studentData } from '@/data/mockData';

interface Student {
  id: string;
  matricNumber: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  department: string;
  collage: string;
  level: string;
  session: string;
  semester: string;
  cgpa: number;
  avatar: string | null;
}

interface AuthContextType {
  isAuthenticated: boolean;
  student: Student | null;
  login: (matricNumber: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [student, setStudent] = useState<Student | null>(null);

  const login = (matricNumber: string, password: string): boolean => {
    // Mock authentication - accepts any non-empty credentials
    if (matricNumber && password) {
      setIsAuthenticated(true);
      setStudent(studentData);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setStudent(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, student, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
