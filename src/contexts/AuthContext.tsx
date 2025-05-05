import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// Define las interfaces necesarias
interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

interface VendorApplication {
  id: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  // Otros campos relevantes para la solicitud
}

// Interface for vendor application submission
interface VendorApplicationSubmission {
  businessType: string;
  description: string;
  serviceArea: string;
  [key: string]: any; // For any additional fields
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  hasRole: (role: string) => boolean;
  pendingVendorApplication: VendorApplication | null;
  submitVendorApplication: (data: VendorApplicationSubmission) => Promise<void>;
}

// Crea el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Proveedor del contexto de autenticación
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingVendorApplication, setPendingVendorApplication] = useState<VendorApplication | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        
        // Verificar si hay solicitud pendiente (mock)
        const hasApplication = Math.random() > 0.5;
        if (hasApplication) {
          setPendingVendorApplication({
            id: 'app-1',
            status: 'pending',
            createdAt: new Date().toISOString(),
          });
        }
      } catch (e) {
        console.error('Error parsing stored user', e);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simular autenticación (para desarrollo)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const userData: User = {
        id: '1',
        name: email.split('@')[0],
        email,
        roles: ['buyer'],
      };
      
      // Almacenar en localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      toast({
        title: "Inicio de sesión exitoso",
        description: `Bienvenido, ${userData.name}`,
      });
      
      // Redirigir a la página principal
      navigate('/');
    } catch (err) {
      console.error('Login error', err);
      setError('Error al iniciar sesión. Verifica tus credenciales.');
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo iniciar sesión. Verifica tus credenciales.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simular registro (para desarrollo)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const userData: User = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
        roles: ['buyer'],
      };
      
      // Almacenar en localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      toast({
        title: "Registro exitoso",
        description: `Tu cuenta ha sido creada, ${name}`,
      });
      
      // Redirigir a la página principal
      navigate('/');
    } catch (err) {
      console.error('Register error', err);
      setError('Error al crear la cuenta. Inténtalo de nuevo.');
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo crear la cuenta. Inténtalo de nuevo más tarde.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setPendingVendorApplication(null);
    navigate('/');
    
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión exitosamente",
    });
  };

  // Add the implementation for submitVendorApplication
  const submitVendorApplication = async (data: VendorApplicationSubmission) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Mock API call - in a real app, this would be an API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a mock application
      const application: VendorApplication = {
        id: Math.random().toString(36).substring(2, 9),
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      
      // Store the application
      setPendingVendorApplication(application);
      
      toast({
        title: "Solicitud enviada",
        description: "Tu solicitud ha sido enviada y está pendiente de revisión",
      });
      
    } catch (err) {
      console.error('Application submission error:', err);
      setError('Error al enviar la solicitud. Inténtalo de nuevo más tarde.');
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo enviar la solicitud. Inténtalo de nuevo más tarde.",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const hasRole = (role: string) => {
    return user?.roles.includes(role) || false;
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    register,
    logout,
    hasRole,
    pendingVendorApplication,
    submitVendorApplication,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
