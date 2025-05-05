
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  email: string;
  name: string;
  isVendor: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for stored user in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // Mock login - in a real app, this would be an API call
      if (email && password) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Create mock user for development
        const mockUser = {
          id: '1',
          email,
          name: email.split('@')[0],
          isVendor: false
        };
        
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        toast({
          title: "Inicio de sesión exitoso",
          description: "Bienvenido/a de vuelta.",
        });
      } else {
        throw new Error("Correo o contraseña inválidos");
      }
    } catch (error: any) {
      toast({
        title: "Error de inicio de sesión",
        description: error.message || "No se pudo iniciar sesión. Intenta nuevamente.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      // Mock registration - in a real app, this would be an API call
      if (email && password && name) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Create mock user for development
        const mockUser = {
          id: Date.now().toString(),
          email,
          name,
          isVendor: false
        };
        
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        toast({
          title: "Registro exitoso",
          description: "Bienvenido/a a Barrio Market.",
        });
      } else {
        throw new Error("Por favor completa todos los campos");
      }
    } catch (error: any) {
      toast({
        title: "Error de registro",
        description: error.message || "No se pudo completar el registro. Intenta nuevamente.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Cierre de sesión",
      description: "Has cerrado sesión correctamente.",
    });
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        login, 
        register, 
        logout, 
        isAuthenticated: !!user 
      }}
    >
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
