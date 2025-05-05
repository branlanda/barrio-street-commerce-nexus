import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// Define the interfaces needed
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
  userId?: string;
  businessType: string;
  businessTypeLabel: string;
  description: string;
  serviceArea: string;
  // Add the missing properties that are used in mock data
  name?: string;
  email?: string;
  date?: string;
  // Other fields relevant to the application
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
  getVendorApplications: () => Promise<VendorApplication[]>;
  approveVendorApplication: (applicationId: string) => Promise<void>;
  rejectVendorApplication: (applicationId: string) => Promise<void>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Authentication provider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingVendorApplication, setPendingVendorApplication] = useState<VendorApplication | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Load user from localStorage on start
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        
        // Check if there's a pending application (mock)
        const hasApplication = Math.random() > 0.5;
        if (hasApplication) {
          setPendingVendorApplication({
            id: 'app-1',
            status: 'pending',
            createdAt: new Date().toISOString(),
            businessType: 'food_vendor',
            businessTypeLabel: 'Vendedor de Alimentos',
            description: 'Vendo comida casera y postres tradicionales.',
            serviceArea: 'Centro de la ciudad',
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
      
      // Simulate authentication (for development)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - add admin role for testing
      const userData: User = {
        id: '1',
        name: email.split('@')[0],
        email,
        roles: email.includes('admin') ? ['buyer', 'admin'] : ['buyer'],
      };
      
      // Store in localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      toast({
        title: "Inicio de sesión exitoso",
        description: `Bienvenido, ${userData.name}`,
      });
      
      // Redirect to home page
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

  // Get all vendor applications (mock implementation)
  const getVendorApplications = async (): Promise<VendorApplication[]> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return mock data from the VendorManagement component
    return [
      { 
        id: '1', 
        userId: '101',
        name: 'Carlos Mendez', 
        email: 'carlos@example.com',
        businessType: 'food_vendor', 
        businessTypeLabel: 'Vendedor de Alimentos',
        description: 'Vendo comida casera y postres tradicionales.',
        serviceArea: 'Centro de la ciudad',
        date: '05/05/2025', 
        status: 'pending',
        createdAt: '2025-05-05T10:00:00Z',
      },
      { 
        id: '2', 
        userId: '102',
        name: 'Laura Torres', 
        email: 'laura@example.com',
        businessType: 'crafts',
        businessTypeLabel: 'Artesanías',
        description: 'Artesanías hechas a mano, principalmente de madera y tejidos.',
        serviceArea: 'Todo el barrio norte',
        date: '04/05/2025', 
        status: 'pending',
        createdAt: '2025-05-04T15:30:00Z',
      },
      { 
        id: '3', 
        userId: '103',
        name: 'Miguel Díaz', 
        email: 'miguel@example.com',
        businessType: 'services',
        businessTypeLabel: 'Servicios',
        description: 'Ofrezco servicios de electricidad, plomería y carpintería.',
        serviceArea: 'Sur de la ciudad, radio de 5km',
        date: '02/05/2025', 
        status: 'approved',
        createdAt: '2025-05-02T09:15:00Z',
      },
      { 
        id: '4', 
        userId: '104',
        name: 'Ana Gómez', 
        email: 'ana@example.com',
        businessType: 'electronics',
        businessTypeLabel: 'Electrónicos',
        description: 'Vendo y reparo celulares y tablets.',
        serviceArea: 'Todo el municipio',
        date: '30/04/2025', 
        status: 'rejected',
        createdAt: '2025-04-30T11:45:00Z',
      },
      { 
        id: '5', 
        userId: '105',
        name: 'Jorge Ramírez', 
        email: 'jorge@example.com',
        businessType: 'clothing',
        businessTypeLabel: 'Ropa y Accesorios',
        description: 'Vendo ropa importada a precios accesibles.',
        serviceArea: 'Centro comercial y alrededores',
        date: '28/04/2025', 
        status: 'pending',
        createdAt: '2025-04-28T14:20:00Z',
      },
    ];
  };

  // Approve a vendor application
  const approveVendorApplication = async (applicationId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real implementation, this would:
      // 1. Update the application status in the database
      // 2. Add the 'vendor' role to the user
      // 3. Create a vendor profile
      
      toast({
        title: "Solicitud aprobada",
        description: "La solicitud de vendedor ha sido aprobada exitosamente.",
      });
      
    } catch (err) {
      console.error('Error approving application:', err);
      setError('Error al aprobar la solicitud.');
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo aprobar la solicitud. Inténtalo de nuevo más tarde.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Reject a vendor application
  const rejectVendorApplication = async (applicationId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real implementation, this would update the application status in the database
      
      toast({
        title: "Solicitud rechazada",
        description: "La solicitud de vendedor ha sido rechazada.",
      });
      
    } catch (err) {
      console.error('Error rejecting application:', err);
      setError('Error al rechazar la solicitud.');
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo rechazar la solicitud. Inténtalo de nuevo más tarde.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle vendor application submission
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
        businessType: data.businessType,
        businessTypeLabel: data.businessType === 'food_vendor' ? 'Vendedor de Alimentos' : 
                          data.businessType === 'crafts' ? 'Artesanías' : 
                          data.businessType === 'services' ? 'Servicios' : 
                          data.businessType === 'electronics' ? 'Electrónicos' : 'Otro',
        description: data.description,
        serviceArea: data.serviceArea,
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
    getVendorApplications,
    approveVendorApplication,
    rejectVendorApplication,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
