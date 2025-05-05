
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import VendorCard from '@/components/vendor/VendorCard';
import SearchBar from '@/components/search/SearchBar';
import { vendors } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Filter, MapPin } from 'lucide-react';

const getVendorTypeTitle = (type: string | null): string => {
  const vendorTypeMap: Record<string, string> = {
    'fruits': 'Frutas Tropicales',
    'electronics': 'Electrónicos',
    'entertainment': 'Películas y Música',
    'lottery': 'Lotería',
    'food': 'Alimentos',
    'clothing': 'Ropa y Accesorios',
    'stationery': 'Papelería',
    'other': 'Otros Productos'
  };
  
  return type ? (vendorTypeMap[type] || 'Todos los Vendedores') : 'Todos los Vendedores';
};

const VendorListPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const vendorType = queryParams.get('type');
  
  const [filteredVendors, setFilteredVendors] = useState(vendors);
  const [isMapView, setIsMapView] = useState(false);
  
  useEffect(() => {
    // Filter vendors by type
    if (vendorType) {
      setFilteredVendors(
        vendors.filter(vendor => 
          vendor.categories.includes(vendorType)
        )
      );
    } else {
      setFilteredVendors(vendors);
    }
  }, [vendorType]);
  
  const handleSearch = (query: string) => {
    if (query) {
      const results = vendors.filter(
        vendor => vendor.name.toLowerCase().includes(query.toLowerCase()) ||
                 vendor.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredVendors(results);
    } else {
      // Reset to filtered by type if no query
      if (vendorType) {
        setFilteredVendors(
          vendors.filter(vendor => 
            vendor.categories.includes(vendorType)
          )
        );
      } else {
        setFilteredVendors(vendors);
      }
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section with color based on vendor type */}
        <div className="bg-gradient-to-r from-orange-500 to-barrio-pink py-10 px-4">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
              {getVendorTypeTitle(vendorType)}
            </h1>
            <p className="text-white/80 max-w-2xl">
              Encuentra vendedores locales que ofrecen las mejores frutas tropicales cerca de ti.
            </p>
          </div>
        </div>
        
        {/* Search and Filter Section */}
        <div className="container mx-auto px-4 py-6">
          <div className="bg-white rounded-xl shadow-md p-4 -mt-8 relative z-10 mb-6 border-t-4 border-orange-400">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <SearchBar onSearch={handleSearch} placeholder="Buscar vendedores por nombre o productos..." />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-2 border-orange-200 text-orange-700 hover:bg-orange-50">
                  <Filter className="w-4 h-4" />
                  <span>Filtros</span>
                </Button>
                <Button 
                  variant={isMapView ? "default" : "outline"}
                  className={isMapView ? "bg-barrio-orange" : "border-orange-200 text-orange-700 hover:bg-orange-50"} 
                  onClick={() => setIsMapView(!isMapView)}
                >
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>Mapa</span>
                </Button>
              </div>
            </div>
          </div>
          
          {isMapView ? (
            <div className="bg-yellow-50 rounded-xl overflow-hidden h-[400px] mb-6 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-orange-700 mb-2">Mapa de vendedores de frutas tropicales próximamente</p>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsMapView(false)}
                    className="border-orange-300 text-orange-700 hover:bg-orange-50"
                  >
                    Ver Lista
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVendors.length > 0 ? (
                filteredVendors.map((vendor) => (
                  <VendorCard key={vendor.id} vendor={vendor} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <h3 className="text-xl font-medium mb-2 text-orange-800">No se encontraron vendedores</h3>
                  <p className="text-gray-500">Intenta con otra búsqueda o categoría</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VendorListPage;
