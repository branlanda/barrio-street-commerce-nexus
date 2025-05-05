
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/search/SearchBar';
import VendorTypeSelector from '@/components/vendor/VendorTypeSelector';
import { vendors, products, categories } from '@/lib/mockData';
import ServiceTypeSelector from '@/components/services/ServiceTypeSelector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<string>('vendors');
  
  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // Implement actual search functionality
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section with tropical fruit gradient background */}
        <div className="bg-gradient-to-r from-barrio-orange via-orange-400 to-barrio-pink py-16 md:py-24 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute right-0 bottom-0 w-48 h-48 bg-yellow-300 rounded-full -mr-20 -mb-20"></div>
            <div className="absolute left-20 top-10 w-24 h-24 bg-green-400 rounded-full"></div>
            <div className="absolute right-1/4 top-1/3 w-32 h-32 bg-pink-400 rounded-full"></div>
          </div>
          
          <div className="container mx-auto px-4 z-10 relative">
            <div className="max-w-3xl">
              <div className="flex mb-4">
                <div className="bg-white p-2 rounded-full mr-3">
                  <img 
                    src="/lovable-uploads/f6b826b7-3428-49a2-bf00-6ea8176a9e6c.png" 
                    alt="Barrio Market Logo" 
                    className="w-12 h-12 object-contain"
                  />
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
                Tu <span className="text-yellow-300">barrio</span> tropical
              </h1>
              <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl">
                Conectamos vendedores de frutas tropicales y servicios locales con compradores en toda Latinoamérica. Frescura a unos clics de distancia.
              </p>
              
              <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl mb-8 max-w-2xl">
                <SearchBar 
                  onSearch={handleSearch} 
                  placeholder="Buscar frutas, vendedores o servicios..."
                />
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-barrio-orange hover:bg-barrio-orange/90 text-white barrio-button"
                >
                  Explorar Mercado
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/20 barrio-button"
                >
                  Vender Productos
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Selection Area */}
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-display font-bold mb-3">¿Qué frutas buscas hoy?</h2>
            <p className="text-gray-600">Selecciona entre vendedores de frutas o servicios locales</p>
          </div>
          
          <Tabs 
            defaultValue="vendors" 
            value={selectedTab} 
            onValueChange={setSelectedTab}
            className="w-full max-w-4xl mx-auto"
          >
            <TabsList className="grid grid-cols-2 mb-10 w-full max-w-md mx-auto">
              <TabsTrigger value="vendors" className="text-lg py-3">Vendedores</TabsTrigger>
              <TabsTrigger value="services" className="text-lg py-3">Servicios</TabsTrigger>
            </TabsList>
            
            <TabsContent value="vendors" className="mt-0">
              <VendorTypeSelector />
            </TabsContent>
            
            <TabsContent value="services" className="mt-0">
              <ServiceTypeSelector />
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Location-based section */}
        <div className="bg-gradient-to-br from-yellow-100 to-orange-100 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold mb-3 text-orange-800">Encuentra las mejores frutas cerca de ti</h2>
              <p className="text-orange-700 max-w-2xl mx-auto">
                Barrio Market te conecta con vendedores de frutas tropicales frescas y servicios en tu vecindario.
              </p>
            </div>
            
            <div className="relative w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-xl">
              <img 
                src="/lovable-uploads/371cdf8b-6b38-48dd-a159-c0e6c7147f28.png" 
                alt="Barrio Market Map View" 
                className="w-full h-auto object-cover rounded-xl"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-8">
                <h3 className="text-white text-2xl font-display font-bold mb-2">Colombia</h3>
                <p className="text-white/80">Descubre las frutas de tu barrio</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Benefits Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-3 text-orange-800">¿Por qué elegir Barrio Market?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Conectamos vendedores de frutas tropicales con la tecnología para crear mejores oportunidades.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-orange-100 hover:border-orange-300 transition-all">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-barrio-orange" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z"></path>
                  <path d="M16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold mb-3 text-orange-800">Frutas Frescas</h3>
              <p className="text-gray-600">
                Conectamos compradores con vendedores de frutas tropicales frescas sin intermediarios.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-100 hover:border-green-300 transition-all">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold mb-3 text-green-800">Comunidad Local</h3>
              <p className="text-gray-600">
                Construimos comunidad al apoyar pequeños comerciantes de frutas de tu barrio.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-yellow-100 hover:border-yellow-300 transition-all">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold mb-3 text-yellow-800">Calidad Garantizada</h3>
              <p className="text-gray-600">
                Sistema de calificaciones para garantizar la mejor calidad en frutas tropicales.
              </p>
            </div>
          </div>
        </div>
        
        {/* Call to action */}
        <div className="bg-gradient-to-r from-orange-500 to-barrio-pink text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-display font-bold mb-4">¿Vendes frutas tropicales o servicios locales?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Únete a Barrio Market y conecta con miles de clientes potenciales en tu área.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-orange-600 hover:bg-white/90 barrio-button px-8"
              onClick={() => navigate('/vendor/become')}
            >
              Comienza a Vender
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
