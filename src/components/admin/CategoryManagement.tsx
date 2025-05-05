
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash } from 'lucide-react';

const CategoryManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestión de Categorías</h1>
          <p className="text-muted-foreground">Administra las categorías de productos y servicios.</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Categoría
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CategoryCard 
          title="Alimentos" 
          description="Vendedores de comida casera, snacks, postres"
          count={24}
        />
        <CategoryCard 
          title="Servicios" 
          description="Electricistas, plomeros, carpinteros, etc."
          count={18}
        />
        <CategoryCard 
          title="Electrónicos" 
          description="Reparación y venta de dispositivos electrónicos"
          count={12}
        />
        <CategoryCard 
          title="Artesanías" 
          description="Productos hechos a mano, souvenirs"
          count={15}
        />
        <CategoryCard 
          title="Ropa y Accesorios" 
          description="Prendas de vestir, bolsos, joyería"
          count={20}
        />
        <CategoryCard 
          title="Otros" 
          description="Categoría general para otros productos y servicios"
          count={8}
        />
      </div>
    </div>
  );
};

interface CategoryCardProps {
  title: string;
  description: string;
  count: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, description, count }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{count} vendedores</span>
          <div className="flex space-x-1">
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryManagement;
