
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Sun, Moon, Globe, ShoppingBag, Wrench, Apple, Sandwich, Phone, Lightbulb, GraduationCap } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { PalmLeaf } from '@/components/illustrations/PalmLeaf';
import { FruitBubble } from '@/components/illustrations/FruitBubble';

const Index = () => {
  const { user, isAuthenticated } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<'es' | 'en'>('es');

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real implementation, this would update the theme
  };

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
    // In a real implementation, this would update the language
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-tropical-dark text-white' : 'bg-gradient-to-br from-tropical-pink via-tropical-orange to-tropical-yellow text-white'}`}>
      {/* Header */}
      <header className="py-4 px-6 flex justify-between items-center sticky top-0 z-10 bg-transparent">
        <div className="text-2xl md:text-3xl font-display font-bold">
          Barrio<span className="text-tropical-yellow">Market</span>
        </div>
        
        <div className="flex items-center gap-3">
          <Link to="/vendors">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              Explorar Mercado
            </Button>
          </Link>
          
          {isAuthenticated ? (
            <Link to="/profile">
              <Avatar>
                <AvatarImage src={user?.name ? `/avatars/${user.name[0].toUpperCase()}.png` : ""} alt={user?.name || "User"} />
                <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <Link to="/login">
              <Button className="bg-tropical-yellow text-tropical-dark hover:bg-tropical-yellow/90 rounded-full px-6">
                Iniciar Sesión
              </Button>
            </Link>
          )}
        </div>
      </header>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 opacity-50 pointer-events-none">
        <PalmLeaf className="text-tropical-dark/20 w-48 h-48" />
      </div>
      {/* Removed the middle image (FruitBubble) that was here */}
      <div className="absolute bottom-1/3 left-8 opacity-50 pointer-events-none">
        <FruitBubble className="text-tropical-dark/20 w-24 h-24" />
      </div>
      
      {/* Main Content */}
      <main className="flex-1 px-6 pt-6 pb-24 flex flex-col items-center justify-center relative">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Compra productos frescos y servicios locales.
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-white/90">
            Encuentra vendedores y profesionales de tu barrio.
          </p>
          
          {/* Main Action Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-xl mx-auto mb-12">
            <Link to="/vendors" className="col-span-1">
              <div className="bg-tropical-yellow text-tropical-dark rounded-xl p-4 h-full flex flex-col items-center justify-center gap-2 hover:scale-105 transition-transform shadow-lg">
                <div className="bg-tropical-dark/10 p-3 rounded-full">
                  <Apple className="w-8 h-8" />
                </div>
                <span className="font-bold text-lg mt-2">Explorar Productos</span>
              </div>
            </Link>
            
            <Link to="/services" className="col-span-1">
              <div className="bg-tropical-green text-white rounded-xl p-4 h-full flex flex-col items-center justify-center gap-2 hover:scale-105 transition-transform shadow-lg">
                <div className="bg-white/10 p-3 rounded-full">
                  <Wrench className="w-8 h-8" />
                </div>
                <span className="font-bold text-lg mt-2">Buscar Servicios</span>
              </div>
            </Link>
            
            <Link to="/vendor/become" className="col-span-2 md:col-span-1">
              <div className="bg-tropical-pink text-white rounded-xl p-4 h-full flex flex-col items-center justify-center gap-2 hover:scale-105 transition-transform shadow-lg">
                <div className="bg-white/10 p-3 rounded-full">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <span className="font-bold text-lg mt-2">Quiero Vender</span>
              </div>
            </Link>
          </div>
          
          {/* Category Icons */}
          <div className="grid grid-cols-5 gap-3 max-w-2xl mx-auto mb-6">
            <div className="flex flex-col items-center">
              <div className="bg-tropical-yellow p-3 rounded-full mb-2 hover:scale-110 transition-transform">
                <Apple className="w-6 h-6 text-tropical-dark" />
              </div>
              <span className="text-xs text-white/90">Frutas y verduras</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-tropical-blue p-3 rounded-full mb-2 hover:scale-110 transition-transform">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs text-white/90">Electrónica</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-tropical-pink p-3 rounded-full mb-2 hover:scale-110 transition-transform">
                <Sandwich className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs text-white/90">Comida casera</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-tropical-green p-3 rounded-full mb-2 hover:scale-110 transition-transform">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs text-white/90">Plomería y electricidad</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-tropical-orange p-3 rounded-full mb-2 hover:scale-110 transition-transform">
                <GraduationCap className="w-6 h-6 text-tropical-dark" />
              </div>
              <span className="text-xs text-white/90">Clases particulares</span>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-6 px-6 mt-auto">
        <div className="flex justify-between items-center max-w-3xl mx-auto">
          <div className="flex gap-6">
            <Link to="/about" className="text-white/90 hover:text-white">Sobre Nosotros</Link>
            <Link to="/contact" className="text-white/90 hover:text-white">Contacto</Link>
            <Link to="/privacy" className="text-white/90 hover:text-white">Política de Privacidad</Link>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white rounded-full hover:bg-white/10"
              onClick={toggleLanguage}
            >
              <Globe className="h-5 w-5" />
              <span className="ml-1 text-xs">{language.toUpperCase()}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white rounded-full hover:bg-white/10"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
