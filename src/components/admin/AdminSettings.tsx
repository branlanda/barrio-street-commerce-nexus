
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save } from 'lucide-react';

const AdminSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configuración</h1>
        <p className="text-muted-foreground">Gestiona la configuración de la plataforma.</p>
      </div>
      
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Apariencia</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
          <TabsTrigger value="permissions">Permisos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración General</CardTitle>
              <CardDescription>Configura los ajustes básicos de la plataforma.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="platform-name">Nombre de la Plataforma</Label>
                <Input id="platform-name" defaultValue="Barrio Market" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact-email">Email de Contacto</Label>
                <Input id="contact-email" defaultValue="contacto@barriomarket.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="language">Idioma Predeterminado</Label>
                <Select defaultValue="es">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Seleccionar idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="pt">Português</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="maintenance-mode">Modo de Mantenimiento</Label>
                <Switch id="maintenance-mode" />
              </div>
              
              <Button className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Guardar Cambios
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Apariencia</CardTitle>
              <CardDescription>Personaliza la apariencia de la plataforma.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Color Principal</Label>
                <div className="grid grid-cols-5 gap-2">
                  <div className="h-8 w-8 rounded-full bg-barrio-primary cursor-pointer border-2 border-black"></div>
                  <div className="h-8 w-8 rounded-full bg-blue-500 cursor-pointer"></div>
                  <div className="h-8 w-8 rounded-full bg-green-500 cursor-pointer"></div>
                  <div className="h-8 w-8 rounded-full bg-amber-500 cursor-pointer"></div>
                  <div className="h-8 w-8 rounded-full bg-purple-500 cursor-pointer"></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Tamaño de Fuente</Label>
                <Slider defaultValue={[16]} max={24} min={12} step={1} />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode">Modo Oscuro</Label>
                <Switch id="dark-mode" />
              </div>
              
              <Button className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Guardar Cambios
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notificaciones</CardTitle>
              <CardDescription>Configura las notificaciones del sistema.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications">Notificaciones por Email</Label>
                <Switch id="email-notifications" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="vendor-applications">Solicitudes de Vendedor</Label>
                <Switch id="vendor-applications" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="new-reviews">Nuevas Reseñas</Label>
                <Switch id="new-reviews" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="reported-content">Contenido Reportado</Label>
                <Switch id="reported-content" defaultChecked />
              </div>
              
              <Button className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Guardar Cambios
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="permissions" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Permisos</CardTitle>
              <CardDescription>Configura los permisos de los roles de usuario.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <h3 className="font-medium mb-2">Permisos de Administrador</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <PermissionSwitch label="Gestionar Usuarios" defaultChecked />
                    <PermissionSwitch label="Gestionar Vendedores" defaultChecked />
                    <PermissionSwitch label="Gestionar Categorías" defaultChecked />
                    <PermissionSwitch label="Gestionar Cupones" defaultChecked />
                    <PermissionSwitch label="Moderar Reseñas" defaultChecked />
                    <PermissionSwitch label="Exportar Datos" defaultChecked />
                    <PermissionSwitch label="Configuración del Sistema" defaultChecked />
                    <PermissionSwitch label="Promover Admin" />
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Permisos de Vendedor</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <PermissionSwitch label="Gestionar Perfil" defaultChecked />
                    <PermissionSwitch label="Gestionar Productos" defaultChecked />
                    <PermissionSwitch label="Gestionar Pedidos" defaultChecked />
                    <PermissionSwitch label="Ver Estadísticas" defaultChecked />
                    <PermissionSwitch label="Responder Reseñas" defaultChecked />
                    <PermissionSwitch label="Crear Promociones" defaultChecked />
                  </div>
                </div>
              </div>
              
              <Button className="w-full mt-4">
                <Save className="h-4 w-4 mr-2" />
                Guardar Cambios
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface PermissionSwitchProps {
  label: string;
  defaultChecked?: boolean;
}

const PermissionSwitch: React.FC<PermissionSwitchProps> = ({ label, defaultChecked }) => {
  return (
    <div className="flex items-center justify-between border rounded-lg p-2">
      <span className="text-sm">{label}</span>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
};

export default AdminSettings;
