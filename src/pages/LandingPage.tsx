
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingBasket, Menu, X, ChevronRight, Search, User } from 'lucide-react';

const FruitAnimation = ({ className }: { className?: string }) => (
  <div className={`absolute ${className} animate-bounce-subtle transition-all duration-500`}>
    <div className="w-16 h-16 rounded-full bg-tropical-orange opacity-70"></div>
  </div>
);

const PalmTree = ({ className }: { className?: string }) => (
  <div className={`absolute ${className}`}>
    <div className="w-6 h-24 bg-tropical-dark rounded-full transform rotate-12"></div>
    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 animate-sway origin-bottom">
      <div className="w-24 h-12 bg-tropical-green rounded-full -rotate-45 -translate-x-6"></div>
      <div className="w-24 h-12 bg-tropical-green rounded-full rotate-45 -translate-x-6 -translate-y-4"></div>
      <div className="w-24 h-12 bg-tropical-green rounded-full -rotate-15 translate-x-6 -translate-y-8"></div>
      <div className="w-24 h-12 bg-tropical-green rounded-full rotate-15 translate-x-6 -translate-y-12"></div>
    </div>
  </div>
);

const Cloud = ({ className }: { className?: string }) => (
  <div className={`absolute ${className} animate-float`}>
    <div className="w-20 h-8 bg-white opacity-80 rounded-full"></div>
  </div>
);

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-white md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X /> : <Menu />}
            </Button>
            <Link to="/" className="text-white font-display font-bold text-2xl">
              Barrio<span className="text-tropical-yellow">Market</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white font-medium hover:text-tropical-yellow transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-white font-medium hover:text-tropical-yellow transition-colors">
              Productos
            </Link>
            <Link to="/services" className="text-white font-medium hover:text-tropical-yellow transition-colors">
              Servicios
            </Link>
            <Link to="/contact" className="text-white font-medium hover:text-tropical-yellow transition-colors">
              Contacto
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-white">
              <Search />
            </Button>
            <Button variant="ghost" size="icon" className="text-white mr-2">
              <User />
            </Button>
            <Button className="rounded-full bg-tropical-yellow text-tropical-dark hover:bg-tropical-yellow/90">
              Login
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-tropical-dark py-4 shadow-lg animate-fade-in">
            <div className="container mx-auto px-4 flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-white font-medium p-2 hover:bg-white/10 rounded-md transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="text-white font-medium p-2 hover:bg-white/10 rounded-md transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Productos
              </Link>
              <Link 
                to="/services" 
                className="text-white font-medium p-2 hover:bg-white/10 rounded-md transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Servicios
              </Link>
              <Link 
                to="/contact" 
                className="text-white font-medium p-2 hover:bg-white/10 rounded-md transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Contacto
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section with Tropical Gradient */}
      <section className="min-h-screen bg-gradient-to-b from-tropical-pink via-tropical-orange to-tropical-yellow pt-24 relative overflow-hidden">
        {/* Decorative elements */}
        <Cloud className="top-1/4 right-10 w-24 h-12" />
        <Cloud className="top-1/3 left-20 w-32 h-16" />
        <Cloud className="bottom-1/4 right-1/4 w-20 h-10" />
        
        <PalmTree className="bottom-0 left-10 hidden md:block" />
        <PalmTree className="bottom-0 right-10 hidden md:block" />
        
        <FruitAnimation className="top-1/4 left-1/5" />
        <FruitAnimation className="bottom-1/3 right-1/4" />

        <div className="container mx-auto px-4 pt-12 md:pt-32 pb-24 flex flex-col items-center relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            {/* Logo and Fruit Pile */}
            <div className="relative inline-block mb-6">
              <img 
                src="/lovable-uploads/4540be61-af0b-47d1-b320-b06162202f90.png" 
                alt="Barrio Market Logo" 
                className="w-full max-w-[280px] md:max-w-[400px] mx-auto" 
              />
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-8 leading-tight">
              <span className="block">Shop fresh</span>
              <span className="block">&amp; local</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-12">
              Conectamos vendedores de frutas tropicales con compradores en toda Latinoamérica. Frescura a un click de distancia.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-tropical-green hover:bg-tropical-green/90 text-white font-bold text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                asChild
              >
                <Link to="/vendors">
                  <span>Explorar el Mercado</span>
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white font-bold text-lg px-8 py-6 rounded-full hover:bg-white hover:text-tropical-pink transition-all hover:-translate-y-1"
              >
                <ShoppingBasket className="mr-2 h-5 w-5" />
                <span>Vender Productos</span>
              </Button>
            </div>
          </div>
        </div>
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="#ffffff">
            <path d="M0,96L60,85.3C120,75,240,53,360,53.3C480,53,600,75,720,80C840,85,960,75,1080,58.7C1200,43,1320,21,1380,10.7L1440,0L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"></path>
          </svg>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-tropical-dark mb-4">
              Descubre nuestro mercado tropical
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Frutas frescas directo de los agricultores locales a tu mesa. Apoya a los pequeños productores de tu barrio.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Card 1 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-2">
              <div className="h-48 bg-tropical-orange/20 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/9579469f-2a0e-45ee-a05d-9a1c1a7eda97.png" 
                    alt="Vendedores Locales" 
                    className="w-36 h-36 object-contain group-hover:scale-110 transition-transform duration-300" 
                  />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-display font-semibold text-tropical-dark mb-3">Vendedores Locales</h3>
                <p className="text-gray-600">
                  Conecta directamente con vendedores de frutas de tu barrio sin intermediarios.
                </p>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-2">
              <div className="h-48 bg-tropical-green/20 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/14bc304e-7f9c-4317-badd-5f7518c8c29b.png" 
                    alt="Frutas Frescas" 
                    className="w-36 h-36 object-contain group-hover:scale-110 transition-transform duration-300" 
                  />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-display font-semibold text-tropical-dark mb-3">Frutas Frescas</h3>
                <p className="text-gray-600">
                  Frutas tropicales recién cosechadas con la mejor calidad y sabor incomparable.
                </p>
              </div>
            </div>
            
            {/* Card 3 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-2">
              <div className="h-48 bg-tropical-pink/20 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <ShoppingBasket className="w-24 h-24 text-tropical-pink group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-display font-semibold text-tropical-dark mb-3">Compra Fácil</h3>
                <p className="text-gray-600">
                  Proceso sencillo para comprar tus frutas favoritas con entrega rápida a tu domicilio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-24 bg-gradient-to-br from-tropical-blue to-tropical-green text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white/10 animate-pulse-subtle"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white/5 animate-pulse-subtle"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                Únete a la comunidad de Barrio Market
              </h2>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                Ya sea que quieras comprar frutas tropicales frescas o vender tus productos, Barrio Market es el lugar perfecto para ti.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-tropical-yellow text-tropical-dark hover:bg-white font-bold rounded-full shadow-lg transition-all hover:-translate-y-1"
                >
                  Registrarme Ahora
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white/20 font-bold rounded-full transition-all hover:-translate-y-1"
                >
                  Saber Más
                </Button>
              </div>
            </div>
            
            <div className="md:w-1/2 flex justify-center md:justify-end">
              <img 
                src="/lovable-uploads/4540be61-af0b-47d1-b320-b06162202f90.png" 
                alt="Barrio Market Logo" 
                className="w-full max-w-[280px] animate-float" 
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-tropical-dark text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-display font-bold mb-4">
                Barrio<span className="text-tropical-yellow">Market</span>
              </h3>
              <p className="text-gray-400 mb-6">
                Conectando vendedores de frutas tropicales con compradores en toda Latinoamérica.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Enlaces</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-tropical-yellow transition-colors">Home</Link></li>
                <li><Link to="/products" className="text-gray-400 hover:text-tropical-yellow transition-colors">Productos</Link></li>
                <li><Link to="/services" className="text-gray-400 hover:text-tropical-yellow transition-colors">Servicios</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-tropical-yellow transition-colors">Contacto</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Recursos</h4>
              <ul className="space-y-2">
                <li><Link to="/how-it-works" className="text-gray-400 hover:text-tropical-yellow transition-colors">Cómo Funciona</Link></li>
                <li><Link to="/become-vendor" className="text-gray-400 hover:text-tropical-yellow transition-colors">Vender en Barrio Market</Link></li>
                <li><Link to="/faq" className="text-gray-400 hover:text-tropical-yellow transition-colors">Preguntas Frecuentes</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contáctanos</h4>
              <p className="text-gray-400">info@barriomarket.com</p>
              <p className="text-gray-400">+57 300 123 4567</p>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-500">© 2025 Barrio Market. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
