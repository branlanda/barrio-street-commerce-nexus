
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  email: string;
  name: string;
  role: 'buyer' | 'vendor' | 'admin';
  isVendor: boolean; // Keeping for backward compatibility
}

interface VendorApplication {
  id: string;
  userId: string;
  businessType: string;
  description: string;
  serviceArea: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  applyForVendor: (application: Omit<VendorApplication, 'id' | 'userId' | 'status' | 'createdAt'>) => Promise<void>;
  hasRole: (role: 'buyer' | 'vendor' | 'admin') => boolean;
  pendingVendorApplication: VendorApplication | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingVendorApplication, setPendingVendorApplication] = useState<VendorApplication | null>(null);
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
    
    // Check for pending vendor application
    const storedApplication = localStorage.getItem('vendorApplication');
    if (storedApplication) {
      try {
        setPendingVendorApplication(JSON.parse(storedApplication));
      } catch (error) {
        console.error("Failed to parse stored application:", error);
        localStorage.removeItem('vendorApplication');
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
        let role: 'buyer' | 'vendor' | 'admin' = 'buyer';
        
        // For testing purposes, set specific roles based on email
        if (email === 'admin@barrio.com') {
          role = 'admin';
        } else if (email === 'vendor@barrio.com') {
          role = 'vendor';
        }
        
        const mockUser = {
          id: '1',
          email,
          name: email.split('@')[0],
          role,
          isVendor: role === 'vendor',
        };
        
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        // Check for pending vendor application for this user
        const storedApp = localStorage.getItem('vendorApplications');
        if (storedApp) {
          const apps = JSON.parse(storedApp);
          const userApp = apps.find((app: VendorApplication) => app.userId === mockUser.id && app.status === 'pending');
          if (userApp) {
            setPendingVendorApplication(userApp);
          }
        }
        
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
          role: 'buyer' as const,
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
    setPendingVendorApplication(null);
    localStorage.removeItem('user');
    toast({
      title: "Cierre de sesión",
      description: "Has cerrado sesión correctamente.",
    });
  };
  
  const applyForVendor = async (application: Omit<VendorApplication, 'id' | 'userId' | 'status' | 'createdAt'>) => {
    try {
      if (!user) throw new Error("Debes iniciar sesión para aplicar");
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newApplication: VendorApplication = {
        ...application,
        id: Date.now().toString(),
        userId: user.id,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      // Store in localStorage for development
      let applications = [];
      const storedApps = localStorage.getItem('vendorApplications');
      
      if (storedApps) {
        applications = JSON.parse(storedApps);
      }
      
      applications.push(newApplication);
      localStorage.setItem('vendorApplications', JSON.stringify(applications));
      
      setPendingVendorApplication(newApplication);
      
      toast({
        title: "Solicitud enviada",
        description: "Tu solicitud para ser vendedor ha sido enviada y está en revisión.",
      });
      
      return newApplication;
    } catch (error: any) {
      toast({
        title: "Error al enviar solicitud",
        description: error.message || "No se pudo enviar tu solicitud. Intenta nuevamente.",
        variant: "destructive",
      });
      throw error;
    }
  };
  
  const hasRole = (role: 'buyer' | 'vendor' | 'admin') => {
    if (!user) return false;
    
    // Admin has all permissions
    if (user.role === 'admin') return true;
    
    // Vendor has vendor and buyer permissions
    if (user.role === 'vendor' && (role === 'vendor' || role === 'buyer')) return true;
    
    // Buyer only has buyer permissions
    return user.role === role;
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        login, 
        register, 
        logout, 
        isAuthenticated: !!user,
        applyForVendor,
        hasRole,
        pendingVendorApplication
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
