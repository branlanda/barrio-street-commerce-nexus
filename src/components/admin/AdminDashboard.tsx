
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Users, 
  Store, 
  BarChart,
  ClipboardList, 
  Star, 
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Una visión general del rendimiento de la plataforma.</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Usuarios Totales"
          value="2,482"
          description="+180 en el último mes"
          icon={<Users className="h-5 w-5" />}
          trend={"+12%"}
          trendUp={true}
        />
        <StatsCard 
          title="Vendedores"
          value="384"
          description="+28 en el último mes"
          icon={<Store className="h-5 w-5" />}
          trend={"+8%"}
          trendUp={true}
        />
        <StatsCard 
          title="Solicitudes Pendientes"
          value="18"
          description="Tiempo promedio 1.5 días"
          icon={<ClipboardList className="h-5 w-5" />}
        />
        <StatsCard 
          title="Reseñas"
          value="4,126"
          description="Promedio 4.2 estrellas"
          icon={<Star className="h-5 w-5" />}
          trend={"+5%"}
          trendUp={true}
        />
      </div>
      
      {/* Recent Applications */}
      <Card>
        <CardHeader>
          <CardTitle>Solicitudes Recientes de Vendedores</CardTitle>
          <CardDescription>Las solicitudes más recientes que requieren revisión.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuario</TableHead>
                <TableHead>Tipo de Negocio</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Carlos Mendez</TableCell>
                <TableCell>Vendedor de Alimentos</TableCell>
                <TableCell>05/05/2025</TableCell>
                <TableCell>
                  <Badge className="bg-amber-500">
                    <Clock className="h-3 w-3 mr-1" />
                    Pendiente
                  </Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Laura Torres</TableCell>
                <TableCell>Artesanías</TableCell>
                <TableCell>04/05/2025</TableCell>
                <TableCell>
                  <Badge className="bg-amber-500">
                    <Clock className="h-3 w-3 mr-1" />
                    Pendiente
                  </Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Miguel Díaz</TableCell>
                <TableCell>Servicios</TableCell>
                <TableCell>02/05/2025</TableCell>
                <TableCell>
                  <Badge className="bg-green-500">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Aprobado
                  </Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Ana Gómez</TableCell>
                <TableCell>Electrónicos</TableCell>
                <TableCell>30/04/2025</TableCell>
                <TableCell>
                  <Badge className="bg-red-500">
                    <XCircle className="h-3 w-3 mr-1" />
                    Rechazado
                  </Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Placeholder for charts - would be implemented with Recharts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Nuevos Usuarios</CardTitle>
            <CardDescription>Últimos 30 días</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="flex flex-col items-center text-gray-400">
              <BarChart className="h-12 w-12 mb-2" />
              <span>Gráfico de Usuarios (Recharts)</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Nuevos Vendedores</CardTitle>
            <CardDescription>Últimos 30 días</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="flex flex-col items-center text-gray-400">
              <BarChart className="h-12 w-12 mb-2" />
              <span>Gráfico de Vendedores (Recharts)</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  description,
  icon,
  trend,
  trendUp
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-sm text-muted-foreground">
          <span>{description}</span>
          {trend && (
            <span className={`ml-2 font-medium ${trendUp ? 'text-green-500' : 'text-red-500'}`}>
              {trend}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminDashboard;
