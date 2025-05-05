
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Star, Heart, MessageSquare, User, Clock, MapPin, ChevronRight, Calendar } from 'lucide-react';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/products/ProductCard';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { vendors, products } from '@/lib/mockData';

const VendorDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [isFollowing, setIsFollowing] = useState(false);
  
  // Fetch vendor data
  const { data: vendor, isLoading: isLoadingVendor } = useQuery({
    queryKey: ['vendor', id],
    queryFn: async () => {
      // This would be a real API call in production
      await new Promise(resolve => setTimeout(resolve, 500));
      const foundVendor = vendors.find(v => v.id === id);
      if (!foundVendor) throw new Error('Vendor not found');
      return foundVendor;
    }
  });
  
  // Fetch vendor products
  const { data: vendorProducts, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['vendor-products', id],
    queryFn: async () => {
      // This would be a real API call in production
      await new Promise(resolve => setTimeout(resolve, 700));
      return products.filter(product => product.vendorId === id);
    },
    enabled: !!vendor,
  });
  
  const handleFollowVendor = () => {
    if (!isAuthenticated) {
      toast({
        title: "Inicia sesión primero",
        description: "Debes iniciar sesión para seguir a un vendedor.",
        variant: "destructive"
      });
      return;
    }
    
    // This would make an API call to follow/unfollow the vendor
    setIsFollowing(!isFollowing);
    
    toast({
      title: isFollowing ? "Vendedor no seguido" : "Ahora sigues a este vendedor",
      description: isFollowing 
        ? "Has dejado de seguir a este vendedor" 
        : "Recibirás notificaciones sobre nuevos productos",
    });
  };
  
  const handleContactVendor = () => {
    if (!isAuthenticated) {
      toast({
        title: "Inicia sesión primero",
        description: "Debes iniciar sesión para contactar a un vendedor.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Mensaje enviado",
      description: "El vendedor recibirá tu mensaje pronto",
    });
  };
  
  const isVendorOwner = () => {
    return isAuthenticated && user?.id === vendor?.ownerId;
  };
  
  if (isLoadingVendor) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-16 flex justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-32 w-32 bg-gray-200 rounded-full mb-4"></div>
            <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 w-48 bg-gray-200 rounded"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!vendor) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Vendedor no encontrado</h1>
          <p className="mb-8">El vendedor que buscas no existe o ha sido removido.</p>
          <Link to="/vendors">
            <Button>Ver todos los vendedores</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Vendor Cover */}
        <div className="relative h-64 md:h-80 bg-gradient-to-r from-orange-500 to-barrio-pink">
          {vendor.coverImage && (
            <img 
              src={vendor.coverImage} 
              alt={vendor.name}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        </div>
        
        {/* Vendor Info */}
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row -mt-20 md:-mt-16 mb-8">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-full border-4 border-white shadow-lg overflow-hidden z-10">
              <img 
                src={vendor.profileImage || '/placeholder.svg'} 
                alt={vendor.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="md:ml-6 mt-4 md:mt-12 flex-grow">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h1 className="text-3xl font-display font-bold">{vendor.name}</h1>
                  <div className="flex items-center mt-2">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
                      <span className="ml-1 font-medium">{vendor.rating}</span>
                      <span className="text-gray-500 text-sm ml-1">({vendor.reviewCount} reseñas)</span>
                    </div>
                    <span className="mx-3 text-gray-300">•</span>
                    <div className="flex items-center text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{vendor.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex mt-4 md:mt-0 space-x-3">
                  {isVendorOwner() ? (
                    <Link to={`/vendor/manage/${id}`}>
                      <Button className="bg-barrio-blue hover:bg-barrio-blue/90">
                        Administrar Tienda
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <Button 
                        variant="outline" 
                        className={isFollowing ? "bg-barrio-orange/10 border-barrio-orange text-barrio-orange" : "border-gray-300"}
                        onClick={handleFollowVendor}
                      >
                        <Heart className={`w-4 h-4 mr-1 ${isFollowing ? "fill-barrio-orange" : ""}`} />
                        {isFollowing ? "Siguiendo" : "Seguir"}
                      </Button>
                      <Button 
                        className="bg-barrio-orange hover:bg-barrio-orange/90"
                        onClick={handleContactVendor}
                      >
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Contactar
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Vendor Details and Products */}
          <Tabs defaultValue="products" className="mb-12">
            <TabsList className="mb-6">
              <TabsTrigger value="products">Productos</TabsTrigger>
              <TabsTrigger value="about">Acerca de</TabsTrigger>
              <TabsTrigger value="reviews">Reseñas</TabsTrigger>
            </TabsList>
            
            {/* Products Tab */}
            <TabsContent value="products">
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">Productos y Servicios</h2>
                
                {isLoadingProducts ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="animate-pulse">
                        <div className="h-48 bg-gray-200 rounded-t-md"></div>
                        <div className="p-4 border border-t-0 rounded-b-md">
                          <div className="h-4 bg-gray-200 rounded mb-2 w-1/4"></div>
                          <div className="h-8 bg-gray-200 rounded mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                          <div className="flex justify-between">
                            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : vendorProducts && vendorProducts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {vendorProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Este vendedor aún no ha agregado productos.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            {/* About Tab */}
            <TabsContent value="about">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h2 className="text-xl font-bold mb-4">Acerca de {vendor.name}</h2>
                  <div className="prose max-w-none">
                    <p className="text-gray-700">{vendor.description}</p>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-bold mb-3">Especialidades</h3>
                    <div className="flex flex-wrap gap-2">
                      {vendor.categories.map(category => (
                        <Badge key={category} variant="secondary" className="bg-barrio-orange/10 text-barrio-orange border-barrio-orange/20">
                          {category === 'fruits' ? 'Frutas Tropicales' : 
                           category === 'electronics' ? 'Electrónicos' :
                           category === 'entertainment' ? 'Entretenimiento' : 
                           category === 'food' ? 'Comida' :
                           category === 'clothing' ? 'Ropa' : category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-orange-50 rounded-lg p-6 border border-orange-100">
                    <h3 className="text-lg font-bold mb-4 text-orange-800">Información</h3>
                    
                    <div className="space-y-4">
                      <div className="flex">
                        <User className="w-5 h-5 text-orange-700 mr-3 mt-1" />
                        <div>
                          <p className="text-sm text-gray-500">Vendedor</p>
                          <p className="font-medium">{vendor.ownerName || "Propietario"}</p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <Calendar className="w-5 h-5 text-orange-700 mr-3 mt-1" />
                        <div>
                          <p className="text-sm text-gray-500">Miembro desde</p>
                          <p className="font-medium">{vendor.memberSince || "Enero 2025"}</p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <Clock className="w-5 h-5 text-orange-700 mr-3 mt-1" />
                        <div>
                          <p className="text-sm text-gray-500">Horario</p>
                          <p className="font-medium">{vendor.hours || "9AM - 6PM"}</p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <MapPin className="w-5 h-5 text-orange-700 mr-3 mt-1" />
                        <div>
                          <p className="text-sm text-gray-500">Ubicación</p>
                          <p className="font-medium">{vendor.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Reviews Tab */}
            <TabsContent value="reviews">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Reseñas y Calificaciones</h2>
                  
                  {isAuthenticated && !isVendorOwner() && (
                    <Button className="bg-barrio-orange hover:bg-barrio-orange/90">
                      Escribir Reseña
                    </Button>
                  )}
                </div>
                
                {/* Reviews Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  <div className="md:col-span-1 bg-orange-50 p-6 rounded-lg border border-orange-100 flex flex-col items-center justify-center">
                    <div className="text-4xl font-bold text-orange-800">{vendor.rating}</div>
                    <div className="flex mt-2 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star}
                          className={`w-5 h-5 ${star <= Math.floor(vendor.rating) ? "fill-yellow-400 stroke-yellow-400" : "stroke-gray-300"}`} 
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm">{vendor.reviewCount} reseñas</p>
                  </div>
                  
                  <div className="md:col-span-2">
                    <div className="space-y-3">
                      {/* Rating bars - these would be calculated from actual reviews */}
                      {[5, 4, 3, 2, 1].map((rating) => {
                        // Calculate percentage based on hypothetical data
                        const percentage = rating === 5 ? 65 :
                                         rating === 4 ? 20 :
                                         rating === 3 ? 10 :
                                         rating === 2 ? 3 : 2;
                        
                        return (
                          <div key={rating} className="flex items-center">
                            <div className="flex items-center w-20">
                              <span className="text-sm mr-2">{rating}</span>
                              <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                            </div>
                            <div className="flex-grow h-2 bg-gray-200 rounded-full mr-2">
                              <div 
                                className="h-2 bg-yellow-400 rounded-full" 
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-500 w-12">{percentage}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                
                {/* Reviews List - Would be real reviews from API */}
                <div className="space-y-6">
                  {/* Sample reviews - would come from API */}
                  {[
                    {
                      id: '1',
                      user: 'María González',
                      rating: 5,
                      date: '2 semanas atrás',
                      content: 'Las frutas son muy frescas y de excelente calidad. El servicio a domicilio es rápido y eficiente. ¡Totalmente recomendado!',
                    },
                    {
                      id: '2',
                      user: 'Carlos Ramírez',
                      rating: 4,
                      date: '1 mes atrás',
                      content: 'Muy buena calidad de productos. El mango está increíble. Solo le quito una estrella porque a veces tardan un poco en la entrega.',
                    },
                    {
                      id: '3',
                      user: 'Laura Pérez',
                      rating: 5,
                      date: '2 meses atrás',
                      content: 'Excelente variedad de frutas tropicales. Los precios son razonables y el vendedor es muy amable.',
                    },
                  ].map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6">
                      <div className="flex justify-between mb-2">
                        <div className="font-semibold">{review.user}</div>
                        <div className="text-sm text-gray-500">{review.date}</div>
                      </div>
                      
                      <div className="flex mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star}
                            className={`w-4 h-4 ${star <= review.rating ? "fill-yellow-400 stroke-yellow-400" : "stroke-gray-300"}`} 
                          />
                        ))}
                      </div>
                      
                      <p className="text-gray-700">{review.content}</p>
                    </div>
                  ))}
                  
                  <div className="text-center pt-4">
                    <Button variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-50">
                      Ver todas las reseñas <ChevronRight className="ml-1 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VendorDetail;
