
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Heart, MessageSquare, User, Clock, MapPin, ChevronRight, Calendar } from 'lucide-react';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/products/ProductCard';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';
import { useVendor } from '@/api/vendors';
import { useVendorProducts } from '@/api/products';
import { useVendorReviews, useCreateReview } from '@/api/reviews';
import { useIsFollowing, useFollowVendor, useUnfollowVendor } from '@/api/vendors';
import { useCategories } from '@/api/categories';

const VendorDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [reviewContent, setReviewContent] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  
  // Fetch vendor data from Supabase
  const { data: vendor, isLoading: isLoadingVendor } = useVendor(id);
  
  // Fetch vendor products from Supabase
  const { data: vendorProducts, isLoading: isLoadingProducts } = useVendorProducts(id);
  
  // Fetch vendor reviews from Supabase
  const { data: vendorReviews, isLoading: isLoadingReviews } = useVendorReviews(id);
  
  // Fetch categories for displaying category names
  const { data: categories } = useCategories();
  
  // Check if the user is following this vendor
  const { data: isFollowing, isLoading: isLoadingFollowing } = useIsFollowing(id, user?.id);
  
  // Mutations for following/unfollowing
  const followVendorMutation = useFollowVendor();
  const unfollowVendorMutation = useUnfollowVendor();
  
  // Mutation for creating a review
  const createReviewMutation = useCreateReview();
  
  const handleFollowVendor = () => {
    if (!isAuthenticated) {
      toast({
        title: "Inicia sesión primero",
        description: "Debes iniciar sesión para seguir a un vendedor.",
        variant: "destructive"
      });
      return;
    }
    
    if (isFollowing) {
      unfollowVendorMutation.mutate(
        { vendorId: id as string, userId: user?.id as string },
        {
          onSuccess: () => {
            toast({
              title: "Vendedor no seguido",
              description: "Has dejado de seguir a este vendedor",
            });
          },
          onError: (error) => {
            toast({
              title: "Error",
              description: `No se pudo dejar de seguir al vendedor: ${error.message}`,
              variant: "destructive"
            });
          }
        }
      );
    } else {
      followVendorMutation.mutate(
        { vendorId: id as string, userId: user?.id as string },
        {
          onSuccess: () => {
            toast({
              title: "Ahora sigues a este vendedor",
              description: "Recibirás notificaciones sobre nuevos productos",
            });
          },
          onError: (error) => {
            toast({
              title: "Error",
              description: `No se pudo seguir al vendedor: ${error.message}`,
              variant: "destructive"
            });
          }
        }
      );
    }
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
  
  const handleSubmitReview = () => {
    if (!isAuthenticated) {
      toast({
        title: "Inicia sesión primero",
        description: "Debes iniciar sesión para dejar una reseña.",
        variant: "destructive"
      });
      return;
    }
    
    if (!reviewContent.trim()) {
      toast({
        title: "Contenido requerido",
        description: "Por favor escribe una reseña antes de enviar.",
        variant: "destructive"
      });
      return;
    }
    
    createReviewMutation.mutate(
      {
        vendor_id: id as string,
        user_id: user?.id as string,
        user_name: user?.name || user?.email?.split('@')[0] || 'Usuario',
        rating: reviewRating,
        content: reviewContent,
      },
      {
        onSuccess: () => {
          toast({
            title: "Reseña enviada",
            description: "Tu reseña ha sido publicada correctamente.",
          });
          setReviewContent('');
          setReviewRating(5);
          setIsReviewDialogOpen(false);
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: `No se pudo publicar la reseña: ${error.message}`,
            variant: "destructive"
          });
        }
      }
    );
  };
  
  const isVendorOwner = () => {
    return isAuthenticated && user?.id === vendor?.owner_id;
  };
  
  // Calculate rating distribution for the rating bars
  const calculateRatingPercentage = (rating: number) => {
    if (!vendorReviews || vendorReviews.length === 0) return 0;
    
    const reviewsWithRating = vendorReviews.filter(review => review.rating === rating);
    return Math.round((reviewsWithRating.length / vendorReviews.length) * 100);
  };
  
  // Format date to a readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Hoy';
    if (diffInDays === 1) return 'Ayer';
    if (diffInDays < 7) return `Hace ${diffInDays} días`;
    if (diffInDays < 30) return `Hace ${Math.floor(diffInDays / 7)} semanas`;
    if (diffInDays < 365) return `Hace ${Math.floor(diffInDays / 30)} meses`;
    return `Hace ${Math.floor(diffInDays / 365)} años`;
  };
  
  // Get category name from category id
  const getCategoryName = (categoryId: string) => {
    const category = categories?.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  };
  
  if (isLoadingVendor) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-16 flex justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <Skeleton className="h-32 w-32 rounded-full mb-4" />
            <Skeleton className="h-8 w-64 mb-4" />
            <Skeleton className="h-4 w-48" />
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
          <Button onClick={() => navigate('/vendors')}>
            Ver todos los vendedores
          </Button>
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
          {vendor.cover_image && (
            <img 
              src={vendor.cover_image} 
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
                src={vendor.profile_image || '/placeholder.svg'} 
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
                      <span className="ml-1 font-medium">{vendor.rating.toFixed(1)}</span>
                      <span className="text-gray-500 text-sm ml-1">({vendor.review_count} reseñas)</span>
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
                        disabled={followVendorMutation.isPending || unfollowVendorMutation.isPending}
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
                        <Skeleton className="h-48 rounded-t-md" />
                        <div className="p-4 border border-t-0 rounded-b-md">
                          <Skeleton className="h-4 w-1/4 mb-2" />
                          <Skeleton className="h-8 mb-2" />
                          <Skeleton className="h-4 w-3/4 mb-4" />
                          <div className="flex justify-between">
                            <Skeleton className="h-6 w-1/4" />
                            <Skeleton className="h-8 w-1/4" />
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
                      {vendor.category_ids.map(categoryId => (
                        <Badge 
                          key={categoryId} 
                          variant="secondary" 
                          className="bg-barrio-orange/10 text-barrio-orange border-barrio-orange/20"
                        >
                          {getCategoryName(categoryId)}
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
                          <p className="font-medium">{vendor.owner_name}</p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <Calendar className="w-5 h-5 text-orange-700 mr-3 mt-1" />
                        <div>
                          <p className="text-sm text-gray-500">Miembro desde</p>
                          <p className="font-medium">{vendor.member_since}</p>
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
                    <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-barrio-orange hover:bg-barrio-orange/90">
                          Escribir Reseña
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Escribe una reseña</DialogTitle>
                          <DialogDescription>
                            Comparte tu experiencia con este vendedor. Tu retroalimentación ayuda a otros compradores.
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="py-4">
                          <div className="mb-4">
                            <p className="mb-2 font-medium">Calificación</p>
                            <div className="flex gap-2">
                              {[1, 2, 3, 4, 5].map((rating) => (
                                <button
                                  key={rating}
                                  type="button"
                                  onClick={() => setReviewRating(rating)}
                                  className="focus:outline-none"
                                >
                                  <Star 
                                    className={`w-8 h-8 ${
                                      rating <= reviewRating 
                                        ? "fill-yellow-400 stroke-yellow-400" 
                                        : "stroke-gray-300"
                                    }`} 
                                  />
                                </button>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <p className="mb-2 font-medium">Tu reseña</p>
                            <Textarea
                              value={reviewContent}
                              onChange={(e) => setReviewContent(e.target.value)}
                              placeholder="Escribe tu experiencia con este vendedor..."
                              rows={5}
                            />
                          </div>
                        </div>
                        
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setIsReviewDialogOpen(false)}
                          >
                            Cancelar
                          </Button>
                          <Button
                            onClick={handleSubmitReview}
                            disabled={createReviewMutation.isPending}
                            className="bg-barrio-orange hover:bg-barrio-orange/90"
                          >
                            {createReviewMutation.isPending ? "Enviando..." : "Publicar Reseña"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
                
                {/* Reviews Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  <div className="md:col-span-1 bg-orange-50 p-6 rounded-lg border border-orange-100 flex flex-col items-center justify-center">
                    <div className="text-4xl font-bold text-orange-800">{vendor.rating.toFixed(1)}</div>
                    <div className="flex mt-2 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star}
                          className={`w-5 h-5 ${star <= Math.floor(vendor.rating) ? "fill-yellow-400 stroke-yellow-400" : "stroke-gray-300"}`} 
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm">{vendor.review_count} reseñas</p>
                  </div>
                  
                  <div className="md:col-span-2">
                    <div className="space-y-3">
                      {/* Rating bars calculated from actual reviews */}
                      {[5, 4, 3, 2, 1].map((rating) => {
                        const percentage = calculateRatingPercentage(rating);
                        
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
                
                {/* Reviews List */}
                {isLoadingReviews ? (
                  <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="border-b border-gray-200 pb-6">
                        <div className="flex justify-between mb-2">
                          <Skeleton className="h-6 w-40" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                        <Skeleton className="h-4 w-32 mb-3" />
                        <Skeleton className="h-20 w-full" />
                      </div>
                    ))}
                  </div>
                ) : vendorReviews && vendorReviews.length > 0 ? (
                  <div className="space-y-6">
                    {vendorReviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-6">
                        <div className="flex justify-between mb-2">
                          <div className="font-semibold">{review.user_name}</div>
                          <div className="text-sm text-gray-500">{formatDate(review.created_at)}</div>
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
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Este vendedor aún no tiene reseñas.</p>
                    {isAuthenticated && !isVendorOwner() && (
                      <Button 
                        onClick={() => setIsReviewDialogOpen(true)}
                        className="mt-4 bg-barrio-orange hover:bg-barrio-orange/90"
                      >
                        Sé el primero en dejar una reseña
                      </Button>
                    )}
                  </div>
                )}
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
