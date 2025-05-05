
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define user roles
type UserRole = 'buyer' | 'vendor' | 'admin';

// Define user interface
interface User {
  id: string;
  name: string;
  email: string;
  roles: UserRole[];
  avatar?: string;
}

// Define vendor application interface
interface VendorApplication {
  id: string;
  userId: string;
  businessType: string;
  description: string;
  serviceArea: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  images?: string[];
}

// Define auth context interface
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  hasRole: (role: UserRole) => boolean;
  submitVendorApplication: (application: Omit<VendorApplication, "id" | "userId" | "status" | "createdAt">) => Promise<void>;
  getVendorApplication: () => Promise<VendorApplication | null>;
}

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider props interface
interface AuthProviderProps {
  children: ReactNode;
}

// Mock users for development
const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'user@example.com',
    password: 'password',
    roles: ['buyer'] as UserRole[],
    avatar: 'https://ui-avatars.com/api/?name=John+Doe'
  },
  {
    id: '2',
    name: 'Vendor User',
    email: 'vendor@example.com',
    password: 'password',
    roles: ['buyer', 'vendor'] as UserRole[],
    avatar: 'https://ui-avatars.com/api/?name=Vendor+User'
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password',
    roles: ['buyer', 'admin'] as UserRole[],
    avatar: 'https://ui-avatars.com/api/?name=Admin+User'
  }
];

// Mock vendor applications
const mockVendorApplications: VendorApplication[] = [
  {
    id: '1',
    userId: '1',
    businessType: 'Frutas y Verduras',
    description: 'Venta de frutas y verduras frescas directamente de la finca',
    serviceArea: 'Ciudad Norte, Centro',
    status: 'pending',
    createdAt: new Date().toISOString(),
    images: ['https://example.com/image1.jpg']
  }
];

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Check if user is already logged in on component mount
  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = localStorage.getItem('user');
      
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error('Error parsing stored user:', error);
          localStorage.removeItem('user');
        }
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);
  
  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user by email
      const foundUser = mockUsers.find(u => u.email === email);
      
      // Check if user exists and password is correct
      if (!foundUser || foundUser.password !== password) {
        throw new Error('Invalid email or password');
      }
      
      // Exclude password from user object
      const { password: _, ...userWithoutPassword } = foundUser;
      
      // Set user in state
      setUser(userWithoutPassword);
      
      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Register function
  const register = async (name: string, email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const existingUser = mockUsers.find(u => u.email === email);
      
      if (existingUser) {
        throw new Error('User already exists');
      }
      
      // Create new user
      const newUser = {
        id: `${mockUsers.length + 1}`,
        name,
        email,
        password,
        roles: ['buyer'] as UserRole[],
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`
      };
      
      // Add user to mockUsers (in a real app, this would be an API call)
      mockUsers.push(newUser);
      
      // Exclude password from user object
      const { password: _, ...userWithoutPassword } = newUser;
      
      // Set user in state
      setUser(userWithoutPassword);
      
      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Logout function
  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('user');
  };
  
  // Check if user has a specific role
  const hasRole = (role: UserRole): boolean => {
    if (!user) return false;
    return user.roles.includes(role);
  };

  // Submit vendor application
  const submitVendorApplication = async (application: Omit<VendorApplication, "id" | "userId" | "status" | "createdAt">): Promise<void> => {
    if (!user) throw new Error('User must be logged in to submit an application');
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create new vendor application
      const newApplication: VendorApplication = {
        id: `${mockVendorApplications.length + 1}`,
        userId: user.id,
        ...application,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      // Add application to mockVendorApplications (in a real app, this would be an API call)
      mockVendorApplications.push(newApplication);
      
      // In a real app, this would update the backend
      console.log('Vendor application submitted:', newApplication);
    } catch (error) {
      console.error('Error submitting vendor application:', error);
      throw error;
    }
  };

  // Get vendor application
  const getVendorApplication = async (): Promise<VendorApplication | null> => {
    if (!user) return null;
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Find application by user ID
      const application = mockVendorApplications.find(app => app.userId === user.id);
      
      return application || null;
    } catch (error) {
      console.error('Error getting vendor application:', error);
      throw error;
    }
  };
  
  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isLoading, 
        login, 
        register, 
        logout,
        hasRole,
        submitVendorApplication,
        getVendorApplication
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
