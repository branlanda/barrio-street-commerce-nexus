
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Menu, 
  ShoppingBag, 
  User, 
  LogOut,
  ChevronDown
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="lg:hidden mr-2">
            <Menu className="h-6 w-6" />
          </Button>
          <Link to="/" className="flex items-center">
            <div className="font-display font-bold text-2xl text-barrio-primary">
              Barrio<span className="text-barrio-secondary">Market</span>
            </div>
          </Link>
        </div>

        <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 flex-1 max-w-md mx-4">
          <Search className="h-5 w-5 text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="Buscar productos, vendedores..." 
            className="bg-transparent border-none outline-none flex-1 text-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <ShoppingBag className="h-6 w-6" />
          </Button>
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span className="hidden md:inline">{user?.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Mi perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => logout()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate('/login')}
                className="md:hidden"
              >
                <User className="h-6 w-6" />
              </Button>
              <Button 
                variant="default" 
                className="hidden md:flex bg-barrio-primary hover:bg-barrio-primary-dark"
                onClick={() => navigate('/login')}
              >
                Ingresar
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
