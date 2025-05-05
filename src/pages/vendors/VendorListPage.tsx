
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import VendorCard from '@/components/vendor/VendorCard';
import SearchBar from '@/components/search/SearchBar';
import { Button } from '@/components/ui/button';
import { Filter, MapPin, ChevronDown } from 'lucide-react';
import { useVendors } from '@/api/vendors';
import { useCategories } from '@/api/categories';
import { Vendor } from '@/types/supabase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";

const getVendorTypeTitle = (type: string | null, categories: any[]): string => {
  if (!type) return 'Todos los Vendedores';
  
  const category = categories.find(cat => cat.id === type);
  return category ? category.name : 'Todos los Vendedores';
};

const VendorListPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const vendorType = queryParams.get('type');
  const pageParam = queryParams.get('page');
  
  const [page, setPage] = useState(pageParam ? parseInt(pageParam) : 1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMapView, setIsMapView] = useState(false);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const itemsPerPage = 12;
  
  // Fetch vendors and categories from Supabase
  const { data: vendors, isLoading: isLoadingVendors } = useVendors(vendorType || undefined);
  const { data: categories, isLoading: isLoadingCategories } = useCategories();
  
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([]);
  
  useEffect(() => {
    if (vendors) {
      let filtered = [...vendors];
      
      // Apply search filter
      if (searchQuery) {
        filtered = filtered.filter(
          vendor => vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                   vendor.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      // Apply rating filter
      if (ratingFilter !== null) {
        filtered = filtered.filter(vendor => vendor.rating >= ratingFilter);
      }
      
      setFilteredVendors(filtered);
    }
  }, [vendors, searchQuery, ratingFilter]);
  
  // Update URL when page changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (page !== 1) {
      params.set('page', page.toString());
    } else {
      params.delete('page');
    }
    
    // Preserve the type parameter if it exists
    if (vendorType) {
      params.set('type', vendorType);
    }
    
    const newUrl = `${location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
    navigate(newUrl, { replace: true });
  }, [page, location.pathname, navigate, vendorType]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1); // Reset to first page on new search
  };
  
  const handleRatingFilterChange = (rating: number) => {
    setRatingFilter(rating === ratingFilter ? null : rating);
    setPage(1); // Reset to first page on filter change
  };
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredVendors.length / itemsPerPage);
  const paginatedVendors = filteredVendors.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section with color based on vendor type */}
        <div className="bg-gradient-to-r from-orange-500 to-barrio-pink py-10 px-4">
          <div className="container mx-auto">
            {isLoadingCategories ? (
              <Skeleton className="h-10 w-64 mb-2" />
            ) : (
              <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                {getVendorTypeTitle(vendorType, categories || [])}
              </h1>
            )}
            <p className="text-white/80 max-w-2xl">
              Encuentra vendedores locales que ofrecen las mejores productos y servicios cerca de ti.
            </p>
          </div>
        </div>
        
        {/* Search and Filter Section */}
        <div className="container mx-auto px-4 py-6">
          <div className="bg-white rounded-xl shadow-md p-4 -mt-8 relative z-10 mb-6 border-t-4 border-orange-400">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <SearchBar 
                  onSearch={handleSearch} 
                  placeholder="Buscar vendedores por nombre o productos..." 
                />
              </div>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 border-orange-200 text-orange-700 hover:bg-orange-50">
                      <Filter className="w-4 h-4" />
                      <span>Filtros</span>
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <div className="p-2 font-medium text-sm">Calificación mínima</div>
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <DropdownMenuItem 
                        key={rating}
                        className={`flex items-center ${ratingFilter === rating ? 'bg-orange-100' : ''}`}
                        onClick={() => handleRatingFilterChange(rating)}
                      >
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg 
                              key={i} 
                              className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-2">y más</span>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
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
                  <p className="text-orange-700 mb-2">Mapa de vendedores próximamente</p>
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
            <>
              {isLoadingVendors ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="h-64 rounded-lg overflow-hidden">
                      <Skeleton className="h-full w-full" />
                    </div>
                  ))}
                </div>
              ) : paginatedVendors.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {paginatedVendors.map((vendor) => (
                    <VendorCard key={vendor.id} vendor={vendor} />
                  ))}
                </div>
              ) : (
                <div className="col-span-full text-center py-12">
                  <h3 className="text-xl font-medium mb-2 text-orange-800">No se encontraron vendedores</h3>
                  <p className="text-gray-500">Intenta con otra búsqueda o categoría</p>
                </div>
              )}
              
              {totalPages > 1 && (
                <Pagination className="my-8">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          if (page > 1) setPage(page - 1);
                        }}
                        className={page === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                      const pageNumber = i + 1;
                      const showEllipsis = totalPages > 5 && i === 4;
                      
                      return showEllipsis ? (
                        <PaginationItem key="ellipsis">
                          <PaginationEllipsis />
                        </PaginationItem>
                      ) : (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink 
                            href="#" 
                            onClick={(e) => {
                              e.preventDefault();
                              setPage(pageNumber);
                            }}
                            isActive={pageNumber === page}
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}
                    
                    {totalPages > 5 && page > 5 && (
                      <PaginationItem>
                        <PaginationLink 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            setPage(page);
                          }}
                          isActive={true}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )}
                    
                    <PaginationItem>
                      <PaginationNext 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          if (page < totalPages) setPage(page + 1);
                        }}
                        className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VendorListPage;
