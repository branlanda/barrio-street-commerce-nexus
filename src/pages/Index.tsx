
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CategoryList from '@/components/ui/CategoryList';
import VendorCard from '@/components/vendor/VendorCard';
import ProductCard from '@/components/products/ProductCard';
import SearchBar from '@/components/search/SearchBar';
import { vendors, products, categories } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { MapPin, TrendingUp, ShieldCheck } from 'lucide-react';

const Index = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  
  const filteredVendors = selectedCategoryId 
    ? vendors.filter(vendor => vendor.categories.includes(selectedCategoryId))
    : vendors;
    
  const filteredProducts = selectedCategoryId
    ? products.filter(product => product.categoryId === selectedCategoryId)
    : products;
    
  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // Implement actual search functionality
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-barrio-primary bg-opacity-10 py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-display font-bold text-barrio-dark mb-6 leading-tight">
                El mercado local <span className="text-barrio-primary">en tus manos</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-700">
                Conectamos vendedores locales con compradores en toda Latinoamérica. Descubre productos frescos y artesanales a solo unos clics.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-barrio-primary hover:bg-barrio-primary-dark text-white px-6">
                  Explorar Mercado
                </Button>
                <Button size="lg" variant="outline" className="border-barrio-primary text-barrio-primary hover:bg-barrio-primary hover:text-white px-6">
                  Vender Productos
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Search Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-medium text-center mb-4">¿Qué estás buscando hoy?</h2>
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
        
        {/* Categories */}
        <div className="border-b border-gray-200">
          <div className="container mx-auto">
            <CategoryList 
              onSelectCategory={setSelectedCategoryId}
              selectedCategoryId={selectedCategoryId}
            />
          </div>
        </div>
        
        {/* Featured Vendors */}
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-display font-bold">Vendedores Destacados</h2>
            <Button variant="link" className="text-barrio-primary">
              Ver Todos
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVendors.slice(0, 4).map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        </div>
        
        {/* Featured Products */}
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-display font-bold">Productos Populares</h2>
              <Button variant="link" className="text-barrio-primary">
                Ver Todos
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
        
        {/* Features */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-2xl font-display font-bold text-center mb-12">¿Por qué Barrio Market?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="bg-barrio-primary bg-opacity-10 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
                <MapPin className="h-8 w-8 text-barrio-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">Compra Local</h3>
              <p className="text-gray-600">
                Apoya a vendedores locales y encuentra productos frescos cerca de ti.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="bg-barrio-secondary bg-opacity-10 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-barrio-secondary" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">Impulsa tu Negocio</h3>
              <p className="text-gray-600">
                Alcanza a más clientes y haz crecer tu negocio con nuestra plataforma.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="bg-barrio-accent bg-opacity-10 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
                <ShieldCheck className="h-8 w-8 text-barrio-accent" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">Confianza y Seguridad</h3>
              <p className="text-gray-600">
                Sistema de reseñas, verificación de vendedores y atención al cliente.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
