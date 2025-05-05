
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { PenLine, Plus, Trash2, Check, X, Settings } from 'lucide-react';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { vendors, products } from '@/lib/mockData';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const VendorManage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
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
  
  // Mock update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (profileData: any) => {
      // This would make a real API call in production
      console.log('Updating profile with:', profileData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true };
    },
    onSuccess: () => {
      toast({
        title: "Perfil actualizado",
        description: "Tu perfil de vendedor ha sido actualizado exitosamente",
      });
    },
  });
  
  // Mock delete product mutation
  const deleteProductMutation = useMutation({
    mutationFn: async (productId: string) => {
      // This would make a real API call in production
      console.log('Deleting product:', productId);
      await new Promise(resolve => setTimeout(resolve, 800));
      return { success: true };
    },
    onSuccess: () => {
      toast({
        title: "Producto eliminado",
        description: "El producto ha sido eliminado exitosamente",
      });
    },
  });
  
  // Form states
  const [profileForm, setProfileForm] = useState({
    name: '',
    description: '',
    location: '',
    hours: '',
  });
  
  // Initialize form when vendor data is loaded
  React.useEffect(() => {
    if (vendor) {
      setProfileForm({
        name: vendor.name,
        description: vendor.description,
        location: vendor.location,
        hours: vendor.hours || '9AM - 6PM',
      });
    }
  }, [vendor]);
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate(profileForm);
  };
  
  const handleDeleteProduct = (productId: string) => {
    deleteProductMutation.mutate(productId);
  };
  
  // Check if the current user is the vendor owner
  const isVendorOwner = () => {
    return isAuthenticated && user?.id === vendor?.ownerId;
  };
  
  // If not authenticated or not the vendor owner, redirect
  React.useEffect(() => {
    if (!isLoadingVendor && vendor && !isVendorOwner()) {
      toast({
        title: "Acceso denegado",
        description: "No tienes permiso para administrar esta tienda",
        variant: "destructive"
      });
      navigate(`/vendor/${id}`);
    }
  }, [isLoadingVendor, vendor, isVendorOwner, navigate, id, toast]);
  
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
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Administrar mi Tienda</h1>
              <p className="text-gray-500">Actualiza tu perfil y gestiona tus productos</p>
            </div>
            
            <Button variant="outline" onClick={() => navigate(`/vendor/${id}`)}>
              Ver mi tienda
            </Button>
          </div>
          
          <Tabs defaultValue="profile" className="mb-12">
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Perfil</TabsTrigger>
              <TabsTrigger value="products">Productos</TabsTrigger>
              <TabsTrigger value="settings">Configuración</TabsTrigger>
            </TabsList>
            
            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Información del Perfil</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <div className="flex items-center space-x-4 mb-6">
                          <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden">
                            <img 
                              src={vendor.profileImage || '/placeholder.svg'} 
                              alt={vendor.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <Button variant="outline" size="sm" className="mb-2">
                              <PenLine className="w-4 h-4 mr-2" />
                              Cambiar imagen
                            </Button>
                            <p className="text-xs text-gray-500">
                              JPG, PNG o GIF. Máximo 2MB.
                            </p>
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <label className="block text-sm font-medium mb-2">
                            Imagen de portada
                          </label>
                          <div className="h-48 bg-gray-200 rounded-md overflow-hidden">
                            <img 
                              src={vendor.coverImage || '/placeholder.svg'} 
                              alt="Cover"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="mt-2 flex justify-end">
                            <Button variant="outline" size="sm">
                              <PenLine className="w-4 h-4 mr-2" />
                              Cambiar portada
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2" htmlFor="name">
                            Nombre de la Tienda
                          </label>
                          <Input
                            id="name"
                            name="name"
                            value={profileForm.name}
                            onChange={handleProfileChange}
                            placeholder="Nombre de tu tienda"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2" htmlFor="location">
                            Ubicación
                          </label>
                          <Input
                            id="location"
                            name="location"
                            value={profileForm.location}
                            onChange={handleProfileChange}
                            placeholder="Ej. Centro de Bogotá"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2" htmlFor="hours">
                            Horario de Atención
                          </label>
                          <Input
                            id="hours"
                            name="hours"
                            value={profileForm.hours}
                            onChange={handleProfileChange}
                            placeholder="Ej. 9AM - 6PM"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2" htmlFor="description">
                          Descripción
                        </label>
                        <Textarea
                          id="description"
                          name="description"
                          value={profileForm.description}
                          onChange={handleProfileChange}
                          placeholder="Describe tu tienda, productos y servicios"
                          rows={6}
                        />
                        <p className="text-xs text-gray-500 mt-2">
                          Descripción clara y atractiva de tu tienda y los productos que vendes.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-6">
                      <Button 
                        type="submit"
                        className="bg-barrio-orange hover:bg-barrio-orange/90"
                        disabled={updateProfileMutation.isPending}
                      >
                        {updateProfileMutation.isPending ? "Guardando..." : "Guardar Cambios"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Products Tab */}
            <TabsContent value="products">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Mis Productos</h2>
                <Button className="bg-barrio-green hover:bg-barrio-green/90">
                  <Plus className="w-4 h-4 mr-2" /> Nuevo Producto
                </Button>
              </div>
              
              {isLoadingProducts ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map(i => (
                    <Card key={i} className="animate-pulse">
                      <div className="h-48 bg-gray-200 rounded-t-md"></div>
                      <CardContent className="p-4">
                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : vendorProducts && vendorProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {vendorProducts.map(product => (
                    <Card key={product.id}>
                      <div className="h-48 overflow-hidden rounded-t-md">
                        <img 
                          src={product.image || '/placeholder.svg'} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                        <p className="text-gray-500 text-sm mb-2">{product.description}</p>
                        <p className="font-bold text-barrio-orange">
                          {new Intl.NumberFormat('es-CO', { 
                            style: 'currency', 
                            currency: product.currency || 'COP' 
                          }).format(product.price)}
                        </p>
                      </CardContent>
                      <CardFooter className="px-4 pb-4 pt-0 flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <PenLine className="w-4 h-4 mr-2" /> Editar
                        </Button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              <Trash2 className="w-4 h-4 mr-2" /> Eliminar
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>¿Eliminar producto?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción no se puede deshacer. El producto será eliminado permanentemente.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeleteProduct(product.id)} 
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Eliminar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <p className="text-gray-500 mb-4">Aún no has agregado productos a tu tienda.</p>
                    <Button className="bg-barrio-green hover:bg-barrio-green/90">
                      <Plus className="w-4 h-4 mr-2" /> Agregar tu primer producto
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            {/* Settings Tab */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Configuración de la Tienda</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                      <div>
                        <h3 className="font-medium">Estado de la Tienda</h3>
                        <p className="text-sm text-gray-500">Controla si tu tienda está visible para los compradores</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm px-2 py-1 bg-green-100 text-green-800 rounded-full">
                          Activa
                        </span>
                        <Button variant="outline" size="sm">
                          Desactivar
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                      <div>
                        <h3 className="font-medium">Categorías</h3>
                        <p className="text-sm text-gray-500">Administra las categorías de tus productos</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4 mr-2" /> Configurar
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                      <div>
                        <h3 className="font-medium">Métodos de Pago</h3>
                        <p className="text-sm text-gray-500">Configura cómo recibes pagos de tus clientes</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4 mr-2" /> Configurar
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                      <div>
                        <h3 className="font-medium">Eliminar Tienda</h3>
                        <p className="text-sm text-gray-500">Ten cuidado, esta acción no se puede deshacer</p>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            Eliminar Tienda
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Eliminar tienda?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción no se puede deshacer. Tu tienda y todos tus productos serán eliminados permanentemente.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                              Eliminar Tienda
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VendorManage;
