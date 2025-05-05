
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Store, MapPin, Upload } from 'lucide-react';

// Form schema
const formSchema = z.object({
  businessType: z.string().min(3, {
    message: 'Tipo de negocio debe tener al menos 3 caracteres',
  }),
  description: z.string().min(10, {
    message: 'La descripción debe tener al menos 10 caracteres',
  }),
  serviceArea: z.string().min(3, {
    message: 'Área de servicio debe tener al menos 3 caracteres',
  }),
});

type FormValues = z.infer<typeof formSchema>;

const BecomeVendor = () => {
  const navigate = useNavigate();
  const { submitVendorApplication } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessType: '',
      description: '',
      serviceArea: '',
    },
  });
  
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Submit application with required fields
      await submitVendorApplication({
        businessType: data.businessType,
        description: data.description,
        serviceArea: data.serviceArea
      });
      
      toast.success('¡Solicitud enviada con éxito!');
      navigate('/vendor/application-status');
    } catch (error) {
      console.error('Error al enviar solicitud:', error);
      toast.error('Error al enviar la solicitud. Intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-barrio-dark mb-2">Conviértete en Vendedor</h1>
            <p className="text-gray-600">
              Completa el formulario para comenzar a vender tus productos o servicios en Barrio Market.
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5 text-barrio-primary" />
                Detalles de tu Negocio
              </CardTitle>
              <CardDescription>
                Cuéntanos sobre tu negocio para que podamos revisar tu solicitud.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="businessType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Negocio</FormLabel>
                        <FormControl>
                          <Input placeholder="Ej: Frutas y Verduras, Servicios de Plomería..." {...field} />
                        </FormControl>
                        <FormDescription>
                          Selecciona la categoría que mejor describa tu negocio.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descripción</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe tu negocio, productos o servicios que ofreces..." 
                            className="min-h-32"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Detalla qué vendes o qué servicios ofreces.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="serviceArea"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Área de Servicio</FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <Input placeholder="Ej: Norte de Bogotá, Centro de Medellín..." {...field} />
                            <Button 
                              type="button" 
                              size="icon" 
                              variant="ghost"
                              className="ml-2"
                              onClick={() => alert('Función de mapa próximamente')}
                            >
                              <MapPin className="h-4 w-4" />
                            </Button>
                          </div>
                        </FormControl>
                        <FormDescription>
                          Indica dónde ofreces tus productos o servicios.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div>
                    <div className="mb-2 flex justify-between items-center">
                      <div>
                        <h3 className="text-sm font-medium">Imágenes (Opcional)</h3>
                        <p className="text-xs text-gray-500">
                          Añade fotos de tus productos o servicios.
                        </p>
                      </div>
                      <Button type="button" variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" /> Subir
                      </Button>
                    </div>
                    
                    <div className="border border-dashed border-gray-300 rounded-md p-8 text-center">
                      <p className="text-sm text-gray-500">
                        Arrastra y suelta imágenes aquí o haz clic en 'Subir'
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="mr-2"
                      onClick={() => navigate('/')}
                    >
                      Cancelar
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-barrio-primary hover:bg-barrio-primary-dark"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BecomeVendor;
