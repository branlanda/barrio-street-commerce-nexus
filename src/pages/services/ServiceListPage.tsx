
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SearchBar from '@/components/search/SearchBar';
import ServiceProviderCard from '@/components/services/ServiceProviderCard';
import { vendors } from '@/lib/mockData'; // Reuse vendor data for now
import { Button } from '@/components/ui/button';
import { Filter, MapPin, Star } from 'lucide-react';

const getServiceTypeTitle = (type: string | null): string => {
  const serviceTypeMap: Record<string, string> = {
    'plumbing': 'Plomería',
    'electrical': 'Servicios Eléctricos',
    'tech': 'Servicios Técnicos',
    'education': 'Clases Particulares',
    'copying': 'Servicios de Copia',
    'writing': 'Trabajos Escritos',
    'home': 'Servicios del Hogar',
    'food': 'Comida Casera'
  };
  
  return type ? (serviceTypeMap[type] || 'Todos los Servicios') : 'Todos los Servicios';
};

// Convert vendor data to service providers for demonstration
const convertToServiceProviders = (vendors: any[]) => {
  return vendors.map(vendor => ({
    ...vendor,
    serviceType: vendor.categories[0],
    rating: Math.floor(Math.random() * 50) / 10 + 3, // Random rating between 3 and 8
    jobsCompleted: Math.floor(Math.random() * 100)
  }));
};

const ServiceListPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const serviceType = queryParams.get('type');
  
  const serviceProviders = convertToServiceProviders(vendors);
  const [filteredProviders, setFilteredProviders] = useState(serviceProviders);
  const [isMapView, setIsMapView] = useState(false);
  const [sortOption, setSortOption] = useState('rating');
  
  useEffect(() => {
    // Filter service providers by type
    if (serviceType) {
      setFilteredProviders(
        serviceProviders.filter(provider => 
          provider.categories.includes(serviceType)
        )
      );
    } else {
      setFilteredProviders(serviceProviders);
    }
  }, [serviceType]);
  
  const handleSearch = (query: string) => {
    if (query) {
      const results = serviceProviders.filter(
        provider => provider.name.toLowerCase().includes(query.toLowerCase()) ||
                   provider.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProviders(results);
    } else {
      // Reset to filtered by type if no query
      if (serviceType) {
        setFilteredProviders(
          serviceProviders.filter(provider => 
            provider.categories.includes(serviceType)
          )
        );
      } else {
        setFilteredProviders(serviceProviders);
      }
    }
  };
  
  const handleSort = (option: string) => {
    setSortOption(option);
    
    const sortedProviders = [...filteredProviders];
    switch(option) {
      case 'rating':
        sortedProviders.sort((a, b) => b.rating - a.rating);
        break;
      case 'jobs':
        sortedProviders.sort((a, b) => b.jobsCompleted - a.jobsCompleted);
        break;
      case 'distance':
        // Placeholder for distance sorting
        break;
      default:
        break;
    }
    
    setFilteredProviders(sortedProviders);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section with color based on service type */}
        <div className="bg-gradient-to-r from-barrio-blue to-barrio-purple py-10 px-4">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
              {getServiceTypeTitle(serviceType)}
            </h1>
            <p className="text-white/80 max-w-2xl">
              Encuentra profesionales calificados que ofrecen servicios de calidad en tu área.
            </p>
          </div>
        </div>
        
        {/* Search and Filter Section */}
        <div className="container mx-auto px-4 py-6">
          <div className="bg-white rounded-xl shadow-md p-4 -mt-8 relative z-10 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <SearchBar 
                  onSearch={handleSearch} 
                  placeholder="Buscar por nombre o tipo de servicio..." 
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <span>Filtros</span>
                </Button>
                <Button 
                  variant={isMapView ? "default" : "outline"}
                  className={isMapView ? "bg-barrio-blue" : ""} 
                  onClick={() => setIsMapView(!isMapView)}
                >
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>Mapa</span>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Sort options */}
          <div className="flex gap-2 mb-6 overflow-x-auto py-2">
            <Button
              variant={sortOption === 'rating' ? "default" : "outline"}
              className={`rounded-full ${sortOption === 'rating' ? "bg-barrio-blue" : ""}`}
              onClick={() => handleSort('rating')}
            >
              <Star className="w-4 h-4 mr-1" />
              Mejor puntuación
            </Button>
            <Button
              variant={sortOption === 'jobs' ? "default" : "outline"}
              className={`rounded-full ${sortOption === 'jobs' ? "bg-barrio-blue" : ""}`}
              onClick={() => handleSort('jobs')}
            >
              Más experiencia
            </Button>
            <Button
              variant={sortOption === 'distance' ? "default" : "outline"}
              className={`rounded-full ${sortOption === 'distance' ? "bg-barrio-blue" : ""}`}
              onClick={() => handleSort('distance')}
            >
              Más cercanos
            </Button>
          </div>
          
          {isMapView ? (
            <div className="bg-gray-100 rounded-xl overflow-hidden h-[400px] mb-6 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-500 mb-2">Mapa próximamente</p>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsMapView(false)}
                  >
                    Ver Lista
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredProviders.length > 0 ? (
                filteredProviders.map((provider) => (
                  <ServiceProviderCard 
                    key={provider.id} 
                    provider={provider} 
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No se encontraron proveedores de servicios</h3>
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

export default ServiceListPage;
