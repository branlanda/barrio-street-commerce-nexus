
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PenLine, Plus, Trash2, Check, X, Settings, Upload } from 'lucide-react';

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
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

import { useVendor, useUpdateVendor } from '@/api/vendors';
import { useVendorProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from '@/api/products';
import { useCategories } from '@/api/categories';
import { supabase } from '@/lib/supabase';
import { formatCurrency } from '@/lib/mockData';

const VendorManage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  // Fetch vendor data from Supabase
  const { data: vendor, isLoading: isLoadingVendor } = useVendor(id);
  
  // Fetch vendor products from Supabase
  const { data: vendorProducts, isLoading: isLoadingProducts } = useVendorProducts(id);
  
  // Fetch categories for product creation
  const { data: categories, isLoading: isLoadingCategories } = useCategories();
  
  // Mutations for vendor and products
  const updateVendorMutation = useUpdateVendor();
  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();
  
  // Form states
  const [profileForm, setProfileForm] = useState({
    name: '',
    description: '',
    location: '',
    hours: '',
  });
  
  // Product form states
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    currency: 'COP',
    category_id: '',
    image: '',
    available: true,
  });
  const [productImageFile, setProductImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // Initialize form when vendor data is loaded
  useEffect(() => {
    if (vendor) {
      setProfileForm({
        name: vendor.name,
        description: vendor.description,
        location: vendor.location,
        hours: vendor.hours || '',
      });
    }
  }, [vendor]);
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!vendor || !id) return;
    
    updateVendorMutation.mutate(
      { 
        id, 
        updates: {
          name: profileForm.name,
          description: profileForm.description,
          location: profileForm.location,
          hours: profileForm.hours,
        } 
      },
      {
        onSuccess: () => {
          toast({
            title: "Perfil actualizado",
            description: "Tu perfil de vendedor ha sido actualizado exitosamente",
          });
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: `No se pudo actualizar el perfil: ${error.message}`,
            variant: "destructive"
          });
        }
      }
    );
  };
  
  const openProductDialog = (product?: any) => {
    if (product) {
      setEditingProduct(product);
      setProductForm({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        currency: product.currency,
        category_id: product.category_id,
        image: product.image,
        available: product.available,
      });
    } else {
      setEditingProduct(null);
      setProductForm({
        name: '',
        description: '',
        price: '',
        currency: 'COP',
        category_id: '',
        image: '',
        available: true,
      });
    }
    setIsProductDialogOpen(true);
  };
  
  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setProductForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleToggleAvailable = () => {
    setProductForm(prev => ({ ...prev, available: !prev.available }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProductImageFile(e.target.files[0]);
    }
  };
  
  const uploadProductImage = async (): Promise<string> => {
    if (!productImageFile) return productForm.image;
    
    setIsUploading(true);
    
    try {
      const fileExt = productImageFile.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `products/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, productImageFile);
      
      if (uploadError) throw uploadError;
      
      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);
      
      setIsUploading(false);
      return data.publicUrl;
    } catch (error: any) {
      setIsUploading(false);
      toast({
        title: "Error de carga",
        description: `No se pudo cargar la imagen: ${error.message}`,
        variant: "destructive"
      });
      return productForm.image;
    }
  };
  
  const handleSubmitProduct = async () => {
    if (!id) return;
    
    // Validate form
    if (!productForm.name.trim() || !productForm.description.trim() || !productForm.price || !productForm.category_id) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive"
      });
      return;
    }
    
    // Upload image if selected
    const imageUrl = await uploadProductImage();
    
    const productData = {
      name: productForm.name,
      description: productForm.description,
      price: parseFloat(productForm.price),
      currency: productForm.currency,
      category_id: productForm.category_id,
      image: imageUrl || '/placeholder.svg',
      available: productForm.available,
      vendor_id: id,
    };
    
    if (editingProduct) {
      // Update existing product
      updateProductMutation.mutate(
        { id: editingProduct.id, updates: productData },
        {
          onSuccess: () => {
            toast({
              title: "Producto actualizado",
              description: "El producto ha sido actualizado exitosamente",
            });
            setIsProductDialogOpen(false);
          },
          onError: (error) => {
            toast({
              title: "Error",
              description: `No se pudo actualizar el producto: ${error.message}`,
              variant: "destructive"
            });
          }
        }
      );
    } else {
      // Create new product
      createProductMutation.mutate(
        productData,
        {
          onSuccess: () => {
            toast({
              title: "Producto creado",
              description: "El producto ha sido creado exitosamente",
            });
            setIsProductDialogOpen(false);
          },
          onError: (error) => {
            toast({
              title: "Error",
              description: `No se pudo crear el producto: ${error.message}`,
              variant: "destructive"
            });
          }
        }
      );
    }
  };
  
  const handleDeleteProduct = (productId: string) => {
    if (!id) return;
    
    deleteProductMutation.mutate(
      { id: productId, vendorId: id },
      {
        onSuccess: () => {
          toast({
            title: "Producto eliminado",
            description: "El producto ha sido eliminado exitosamente",
          });
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: `No se pudo eliminar el producto: ${error.message}`,
            variant: "destructive"
          });
        }
      }
    );
  };
  
  // Check if the current user is the vendor owner
  const isVendorOwner = () => {
    return isAuthenticated && user?.id === vendor?.owner_id;
  };
  
  // If not authenticated or not the vendor owner, redirect
  useEffect(() => {
    if (!isLoadingVendor && vendor && !isVendorOwner()) {
      toast({
        title: "Acceso denegado",
        description: "No tienes permiso para administrar esta tienda",
        variant: "destructive"
      });
      navigate(`/vendor/${id}`);
    }
  }, [isLoadingVendor, vendor, navigate, id, toast]);
  
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
                              src={vendor.profile_image || '/placeholder.svg'} 
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
                              src={vendor.cover_image || '/placeholder.svg'} 
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
                        disabled={updateVendorMutation.isPending}
                      >
                        {updateVendorMutation.isPending ? "Guardando..." : "Guardar Cambios"}
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
                <Button 
                  className="bg-barrio-green hover:bg-barrio-green/90"
                  onClick={() => openProductDialog()}
                >
                  <Plus className="w-4 h-4 mr-2" /> Nuevo Producto
                </Button>
              </div>
              
              {isLoadingProducts ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map(i => (
                    <Card key={i} className="animate-pulse">
                      <Skeleton className="h-48 rounded-t-md" />
                      <CardContent className="p-4">
                        <Skeleton className="h-6 w-3/4 mb-4" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-2/3" />
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
                        <div className="flex justify-between items-center">
                          <p className="font-bold text-barrio-orange">
                            {formatCurrency(product.price, product.currency)}
                          </p>
                          <Badge 
                            variant={product.available ? "default" : "secondary"}
                            className={product.available ? "bg-green-500" : "bg-gray-400"}
                          >
                            {product.available ? "Disponible" : "No disponible"}
                          </Badge>
                        </div>
                      </CardContent>
                      <CardFooter className="px-4 pb-4 pt-0 flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openProductDialog(product)}
                        >
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
                    <Button 
                      className="bg-barrio-green hover:bg-barrio-green/90"
                      onClick={() => openProductDialog()}
                    >
                      <Plus className="w-4 h-4 mr-2" /> Agregar tu primer producto
                    </Button>
                  </CardContent>
                </Card>
              )}
              
              {/* Product Dialog */}
              <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingProduct ? "Editar Producto" : "Agregar Nuevo Producto"}
                    </DialogTitle>
                    <DialogDescription>
                      Completa la información del producto para agregarlo a tu catálogo.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="product-name">Nombre del Producto</Label>
                        <Input 
                          id="product-name" 
                          name="name"
                          value={productForm.name}
                          onChange={handleProductChange}
                          placeholder="Ej. Mango Tommy Atkins"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="product-price">Precio</Label>
                        <Input 
                          id="product-price" 
                          name="price"
                          value={productForm.price}
                          onChange={handleProductChange}
                          type="number"
                          placeholder="Ej. 5000"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="product-currency">Moneda</Label>
                        <Select 
                          value={productForm.currency} 
                          onValueChange={(value) => handleSelectChange('currency', value)}
                        >
                          <SelectTrigger id="product-currency">
                            <SelectValue placeholder="Selecciona moneda" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="COP">Peso Colombiano (COP)</SelectItem>
                            <SelectItem value="USD">Dólar (USD)</SelectItem>
                            <SelectItem value="MXN">Peso Mexicano (MXN)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="product-category">Categoría</Label>
                        {isLoadingCategories ? (
                          <Skeleton className="h-10 w-full" />
                        ) : (
                          <Select 
                            value={productForm.category_id} 
                            onValueChange={(value) => handleSelectChange('category_id', value)}
                          >
                            <SelectTrigger id="product-category">
                              <SelectValue placeholder="Selecciona categoría" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories?.map(category => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button 
                          type="button" 
                          variant={productForm.available ? "default" : "outline"}
                          size="sm"
                          className={productForm.available ? "bg-green-500 hover:bg-green-600" : ""}
                          onClick={handleToggleAvailable}
                        >
                          {productForm.available ? (
                            <>
                              <Check className="w-4 h-4 mr-2" /> Disponible
                            </>
                          ) : (
                            <>
                              <X className="w-4 h-4 mr-2" /> No Disponible
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="product-description">Descripción</Label>
                        <Textarea 
                          id="product-description" 
                          name="description"
                          value={productForm.description}
                          onChange={handleProductChange}
                          placeholder="Describe tu producto y sus características..."
                          rows={3}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="product-image">Imagen del Producto</Label>
                        <div className="mt-2">
                          <div className="h-40 bg-gray-100 rounded-md overflow-hidden mb-3">
                            {productForm.image || productImageFile ? (
                              <img 
                                src={productImageFile ? URL.createObjectURL(productImageFile) : productForm.image} 
                                alt="Product preview" 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <span>Vista previa de la imagen</span>
                              </div>
                            )}
                          </div>
                          <Label htmlFor="image-upload" className="cursor-pointer">
                            <div className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-md py-3 hover:bg-gray-50 transition-colors">
                              <Upload className="w-5 h-5 mr-2 text-gray-500" />
                              <span className="text-sm text-gray-600">Seleccionar imagen</span>
                            </div>
                            <input 
                              id="image-upload" 
                              type="file" 
                              className="hidden" 
                              accept="image/*"
                              onChange={handleFileChange}
                            />
                          </Label>
                          <p className="text-xs text-gray-500 mt-2">
                            JPG, PNG o GIF. Tamaño máximo 2MB.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsProductDialogOpen(false)}
                    >
                      Cancelar
                    </Button>
                    <Button 
                      onClick={handleSubmitProduct}
                      disabled={createProductMutation.isPending || updateProductMutation.isPending || isUploading}
                      className="bg-barrio-green hover:bg-barrio-green/90"
                    >
                      {isUploading 
                        ? "Subiendo imagen..." 
                        : createProductMutation.isPending || updateProductMutation.isPending 
                          ? "Guardando..." 
                          : editingProduct 
                            ? "Actualizar Producto" 
                            : "Agregar Producto"
                      }
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
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
