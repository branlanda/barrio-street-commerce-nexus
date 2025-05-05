
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

import Header from '@/components/layout/Header';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Store, MapPin, Upload } from 'lucide-react';

const applicationSchema = z.object({
  businessType: z.string().min(1, { message: "Selecciona un tipo de negocio" }),
  description: z.string().min(20, { message: "La descripción debe tener al menos 20 caracteres" }),
  serviceArea: z.string().min(5, { message: "Indica tu área de servicio" }),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

const businessTypes = [
  { value: "food_vendor", label: "Vendedor de Alimentos" },
  { value: "electronics", label: "Electrónicos" },
  { value: "services", label: "Servicios (Plomería, Electricidad, etc.)" },
  { value: "clothing", label: "Ropa y Accesorios" },
  { value: "crafts", label: "Artesanías" },
  { value: "other", label: "Otro" },
];

const BecomeVendor = () => {
  const { applyForVendor, pendingVendorApplication } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      businessType: '',
      description: '',
      serviceArea: '',
    },
  });

  const onSubmit = async (data: ApplicationFormValues) => {
    try {
      await applyForVendor(data);
      navigate('/vendor/application-status');
    } catch (error) {
      // Error already handled in auth context
    }
  };

  // If the user already has a pending application, show the status instead
  if (pendingVendorApplication) {
    navigate('/vendor/application-status');
    return null;
  }

  return (
    <>
      <Header />
      <div className="container mx-auto max-w-2xl py-8 px-4">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Conviértete en Vendedor</h1>
            <p className="text-gray-500 mt-2">
              Completa el formulario a continuación para solicitar tu cuenta de vendedor
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="businessType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Negocio</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecciona el tipo de negocio" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {businessTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción del Negocio</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe qué vendes, servicios que ofreces, etc." 
                        className="min-h-[120px]" 
                        {...field} 
                      />
                    </FormControl>
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
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Ej: Centro de la ciudad, Barrio Norte, etc."
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="border border-dashed border-gray-300 rounded-lg p-6">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <Upload className="h-8 w-8 text-gray-400" />
                  <p className="text-sm text-gray-500">
                    Arrastra imágenes o documentos relevantes para tu solicitud (opcional)
                  </p>
                  <Button type="button" variant="outline" size="sm" className="mt-2">
                    Seleccionar archivos
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full bg-barrio-primary hover:bg-barrio-primary-dark">
                Enviar Solicitud
              </Button>
            </form>
          </Form>

          <div className="text-center text-sm text-gray-500">
            <p>Tu solicitud será revisada por nuestro equipo. Te notificaremos cuando sea aprobada.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BecomeVendor;
