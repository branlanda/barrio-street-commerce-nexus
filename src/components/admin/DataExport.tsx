
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { 
  FileDown, 
  FileSpreadsheet, 
  FileJson, 
  Calendar,
  Users,
  MapPin,
  Star,
  BarChart
} from 'lucide-react';

const DataExport = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Exportar Datos</h1>
        <p className="text-muted-foreground">Exporta datos anonimizados en diferentes formatos.</p>
      </div>
      
      <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6">
        <p className="text-amber-800 text-sm">
          <strong>Nota:</strong> Todos los datos exportados son anonimizados para proteger la privacidad de los usuarios.
          Solo se incluyen datos agregados o despersonalizados.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ExportCard
          title="Datos de Vendedores"
          description="Información anonimizada sobre vendedores, categorías y ubicaciones."
          icon={<Store className="h-8 w-8" />}
          csvAvailable={true}
          jsonAvailable={true}
          geojsonAvailable={true}
        />
        
        <ExportCard
          title="Estadísticas de Usuarios"
          description="Datos agregados sobre usuarios, comportamientos y tendencias."
          icon={<Users className="h-8 w-8" />}
          csvAvailable={true}
          jsonAvailable={true}
        />
        
        <ExportCard
          title="Datos Geográficos"
          description="Información sobre áreas de servicio y densidad de vendedores."
          icon={<MapPin className="h-8 w-8" />}
          csvAvailable={true}
          geojsonAvailable={true}
        />
        
        <ExportCard
          title="Análisis de Reseñas"
          description="Datos agregados sobre reseñas, puntuaciones y feedback."
          icon={<Star className="h-8 w-8" />}
          csvAvailable={true}
          jsonAvailable={true}
        />
        
        <ExportCard
          title="Estadísticas Mensuales"
          description="Reporte mensual con métricas clave de la plataforma."
          icon={<Calendar className="h-8 w-8" />}
          csvAvailable={true}
        />
        
        <ExportCard
          title="Tendencias de Mercado"
          description="Análisis de tendencias y patrones en categorías de vendedores."
          icon={<BarChart className="h-8 w-8" />}
          csvAvailable={true}
          jsonAvailable={true}
        />
      </div>
    </div>
  );
};

interface ExportCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  csvAvailable?: boolean;
  jsonAvailable?: boolean;
  geojsonAvailable?: boolean;
}

const ExportCard: React.FC<ExportCardProps> = ({
  title,
  description,
  icon,
  csvAvailable,
  jsonAvailable,
  geojsonAvailable
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>{title}</CardTitle>
          <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
            {icon}
          </div>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-2">Exportar como:</p>
      </CardContent>
      <CardFooter className="flex justify-start gap-2 pt-0">
        {csvAvailable && (
          <Button variant="outline" size="sm">
            <FileSpreadsheet className="h-4 w-4 mr-1" />
            CSV
          </Button>
        )}
        {jsonAvailable && (
          <Button variant="outline" size="sm">
            <FileJson className="h-4 w-4 mr-1" />
            JSON
          </Button>
        )}
        {geojsonAvailable && (
          <Button variant="outline" size="sm">
            <FileDown className="h-4 w-4 mr-1" />
            GeoJSON
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default DataExport;
