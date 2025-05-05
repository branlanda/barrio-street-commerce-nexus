
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  Store,
  Users,
  Tag,
  Ticket,
  Star,
  Package,
  FileOutput,
  Settings,
  ChevronLeft,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentSection: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, currentSection }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: 'dashboard' },
    { label: 'Vendedores', icon: Store, path: 'vendors' },
    { label: 'Usuarios', icon: Users, path: 'users' },
    { label: 'Categorías', icon: Tag, path: 'categories' },
    { label: 'Cupones', icon: Ticket, path: 'coupons' },
    { label: 'Reseñas', icon: Star, path: 'reviews' },
    { label: 'Pedidos', icon: Package, path: 'orders' },
    { label: 'Exportar Datos', icon: FileOutput, path: 'export' },
    { label: 'Configuración', icon: Settings, path: 'settings' },
  ];
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Sidebar Toggle */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X /> : <Menu />}
      </Button>
      
      {/* Sidebar */}
      <div className={`
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transition-transform lg:translate-x-0 lg:relative
      `}>
        <div className="flex flex-col h-full">
          <div className="px-6 py-4 border-b">
            <Link to="/" className="flex items-center space-x-2">
              <div className="font-display font-bold text-xl text-barrio-primary">
                Barrio<span className="text-barrio-secondary">Market</span>
              </div>
            </Link>
            <div className="text-xs text-gray-500 mt-1">Panel de Administración</div>
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={`/admin/${item.path}`}
                className={`
                  flex items-center px-4 py-3 text-sm rounded-lg transition-colors
                  ${currentSection === item.path 
                    ? 'bg-barrio-primary text-white' 
                    : 'text-gray-600 hover:bg-gray-100'}
                `}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="border-t p-4">
            <div className="space-y-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full flex items-center justify-center"
                onClick={() => navigate('/')}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Volver al Sitio
              </Button>
              <Button 
                variant="destructive" 
                size="sm" 
                className="w-full flex items-center justify-center"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
