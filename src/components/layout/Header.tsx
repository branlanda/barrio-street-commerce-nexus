
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Menu, 
  ShoppingBag, 
  User, 
  LogOut,
  ChevronDown,
  Store,
  Settings,
  Shield,
  Sun,
  Moon,
  Globe,
  PlusCircle
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SearchBar from '@/components/search/SearchBar';

const Header = () => {
  const { user, logout, isAuthenticated, hasRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const [userType, setUserType] = useState<'products' | 'services'>('products');
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle theme function
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    // Here you would implement actual theme switching logic
  };

  // Handle search function
  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // Implement search functionality
  };

  // Effect to close mobile menu when navigating
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Get initial letters for avatar
  const getInitials = () => {
    if (!user?.name) return 'U';
    const nameParts = user.name.split(' ');
    if (nameParts.length > 1) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return user.name.substring(0, 2).toUpperCase();
  };

  return (
    <header className={`bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 transition-colors duration-200`}>
      <div className="container mx-auto px-4 py-3">
        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="font-display font-bold text-2xl text-barrio-primary dark:text-barrio-accent">
              Barrio<span className="text-barrio-secondary">Market</span>
            </div>
          </Link>

          {/* User Type Selector */}
          <div className="flex ml-6 bg-gray-100 dark:bg-gray-800 rounded-full p-1">
            <Button 
              variant={userType === "products" ? "default" : "ghost"} 
              size="sm"
              className={`rounded-full ${userType === "products" ? "bg-barrio-primary text-white" : "text-gray-600 dark:text-gray-300"}`}
              onClick={() => setUserType("products")}
            >
              Productos
            </Button>
            <Button 
              variant={userType === "services" ? "default" : "ghost"} 
              size="sm"
              className={`rounded-full ${userType === "services" ? "bg-barrio-primary text-white" : "text-gray-600 dark:text-gray-300"}`}
              onClick={() => setUserType("services")}
            >
              Servicios
            </Button>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-6">
            <SearchBar 
              onSearch={handleSearch} 
              placeholder={userType === "products" ? "Buscar productos..." : "Buscar servicios..."}
              initialValue=""
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Publish Button (only for vendors) */}
            {isAuthenticated && hasRole('vendor') && (
              <Button 
                variant="default" 
                className="bg-barrio-primary hover:bg-barrio-primary-dark"
                onClick={() => navigate('/vendor/publish')}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                {userType === "products" ? "Publicar Producto" : "Publicar Servicio"}
              </Button>
            )}

            {/* Become Vendor Button (only for buyers) */}
            {isAuthenticated && hasRole('buyer') && !hasRole('vendor') && (
              <Button 
                variant="outline" 
                className="border-barrio-primary text-barrio-primary hover:bg-barrio-primary/10"
                onClick={() => navigate('/vendor/become')}
              >
                <Store className="mr-2 h-4 w-4" />
                Hazte Vendedor
              </Button>
            )}

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem 
                  className={`cursor-pointer ${language === 'es' ? 'font-bold' : ''}`}
                  onClick={() => setLanguage('es')}
                >
                  Español (CO)
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className={`cursor-pointer ${language === 'en' ? 'font-bold' : ''}`}
                  onClick={() => setLanguage('en')}
                >
                  English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300" onClick={toggleTheme}>
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* User Menu / Authentication */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 pl-2 pr-1 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar || undefined} alt={user?.name || 'User'} />
                      <AvatarFallback>{getInitials()}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{user?.name}</span>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Mi perfil</span>
                  </DropdownMenuItem>
                  
                  {hasRole('buyer') && !hasRole('vendor') && (
                    <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/vendor/become')}>
                      <Store className="mr-2 h-4 w-4" />
                      <span>Convertirme en vendedor</span>
                    </DropdownMenuItem>
                  )}
                  
                  {hasRole('vendor') && (
                    <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/vendor/dashboard')}>
                      <Store className="mr-2 h-4 w-4" />
                      <span>Mi tienda</span>
                    </DropdownMenuItem>
                  )}
                  
                  {hasRole('admin') && (
                    <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/admin')}>
                      <Shield className="mr-2 h-4 w-4" />
                      <span>Panel de Administración</span>
                    </DropdownMenuItem>
                  )}
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem className="cursor-pointer" onClick={() => logout()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  className="text-gray-700 dark:text-gray-300"
                  onClick={() => navigate('/login')}
                >
                  Ingresar
                </Button>
                <Button 
                  variant="default" 
                  className="bg-barrio-primary hover:bg-barrio-primary-dark"
                  onClick={() => navigate('/register')}
                >
                  Registrarse
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="mr-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <Link to="/" className="flex items-center">
              <div className="font-display font-bold text-xl text-barrio-primary dark:text-barrio-accent">
                Barrio<span className="text-barrio-secondary">Market</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate('/search')}>
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate('/cart')}>
              <ShoppingBag className="h-5 w-5" />
            </Button>
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar || undefined} alt={user?.name || 'User'} />
                      <AvatarFallback>{getInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Mi perfil</span>
                  </DropdownMenuItem>
                  
                  {hasRole('vendor') && (
                    <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/vendor/dashboard')}>
                      <Store className="mr-2 h-4 w-4" />
                      <span>Mi tienda</span>
                    </DropdownMenuItem>
                  )}
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem className="cursor-pointer" onClick={() => logout()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate('/login')}
              >
                <User className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-gray-200 dark:border-gray-800 animate-fade-in">
            <div className="flex justify-between mb-3">
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-full p-1 text-sm">
                <Button 
                  variant={userType === "products" ? "default" : "ghost"} 
                  size="sm"
                  className={`rounded-full ${userType === "products" ? "bg-barrio-primary text-white" : "text-gray-600 dark:text-gray-300"}`}
                  onClick={() => setUserType("products")}
                >
                  Productos
                </Button>
                <Button 
                  variant={userType === "services" ? "default" : "ghost"} 
                  size="sm"
                  className={`rounded-full ${userType === "services" ? "bg-barrio-primary text-white" : "text-gray-600 dark:text-gray-300"}`}
                  onClick={() => setUserType("services")}
                >
                  Servicios
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300">
                  <Globe className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300" onClick={toggleTheme}>
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </div>
            </div>

            <div className="space-y-3 pb-3">
              <div className="w-full">
                <SearchBar 
                  onSearch={handleSearch} 
                  placeholder={userType === "products" ? "Buscar productos..." : "Buscar servicios..."}
                  initialValue=""
                />
              </div>

              {isAuthenticated && hasRole('vendor') && (
                <Button 
                  variant="default" 
                  className="w-full bg-barrio-primary hover:bg-barrio-primary-dark"
                  onClick={() => {
                    navigate('/vendor/publish');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  {userType === "products" ? "Publicar Producto" : "Publicar Servicio"}
                </Button>
              )}

              {isAuthenticated && hasRole('buyer') && !hasRole('vendor') && (
                <Button 
                  variant="outline" 
                  className="w-full border-barrio-primary text-barrio-primary hover:bg-barrio-primary/10"
                  onClick={() => {
                    navigate('/vendor/become');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Store className="mr-2 h-4 w-4" />
                  Hazte Vendedor
                </Button>
              )}

              {!isAuthenticated && (
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      navigate('/login');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Ingresar
                  </Button>
                  <Button 
                    variant="default" 
                    className="flex-1 bg-barrio-primary hover:bg-barrio-primary-dark"
                    onClick={() => {
                      navigate('/register');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Registrarse
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
