
import React, { useState, useEffect } from 'react';
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
  XCircle,
  Loader2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const { getVendorApplications } = useAuth();
  const { toast } = useToast();
  const [recentApplications, setRecentApplications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Stats data - would come from API in a real app
  const stats = {
    totalUsers: 2482,
    newUsers: 180,
    userGrowth: "12%",
    vendors: 384,
    newVendors: 28,
    vendorGrowth: "8%",
    pendingApplications: 18,
    avgApplicationTime: "1.5 días",
    reviews: 4126,
    avgRating: "4.2 estrellas",
    reviewGrowth: "5%"
  };

  useEffect(() => {
    // Load recent applications when component mounts
    loadRecentApplications();
  }, []);

  const loadRecentApplications = async () => {
    setIsLoading(true);
    try {
      const data = await getVendorApplications();
      // Sort by date (newest first) and take only the first 4
      const sortedData = [...data].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ).slice(0, 4);
      
      setRecentApplications(sortedData);
    } catch (error) {
      console.error("Error loading applications:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron cargar las solicitudes recientes.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge className="bg-amber-500">
            <Clock className="h-3 w-3 mr-1" />
            Pendiente
          </Badge>
        );
      case 'approved':
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="h-3 w-3 mr-1" />
            Aprobado
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-red-500">
            <XCircle className="h-3 w-3 mr-1" />
            Rechazado
          </Badge>
        );
      default:
        return null;
    }
  };

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
          value={stats.totalUsers.toString()}
          description={`+${stats.newUsers} en el último mes`}
          icon={<Users className="h-5 w-5" />}
          trend={`+${stats.userGrowth}`}
          trendUp={true}
        />
        <StatsCard 
          title="Vendedores"
          value={stats.vendors.toString()}
          description={`+${stats.newVendors} en el último mes`}
          icon={<Store className="h-5 w-5" />}
          trend={`+${stats.vendorGrowth}`}
          trendUp={true}
        />
        <StatsCard 
          title="Solicitudes Pendientes"
          value={stats.pendingApplications.toString()}
          description={`Tiempo promedio ${stats.avgApplicationTime}`}
          icon={<ClipboardList className="h-5 w-5" />}
        />
        <StatsCard 
          title="Reseñas"
          value={stats.reviews.toString()}
          description={`Promedio ${stats.avgRating}`}
          icon={<Star className="h-5 w-5" />}
          trend={`+${stats.reviewGrowth}`}
          trendUp={true}
        />
      </div>
      
      {/* Recent Applications */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle>Solicitudes Recientes de Vendedores</CardTitle>
            <CardDescription>Las solicitudes más recientes que requieren revisión.</CardDescription>
          </div>
          <Button 
            variant="ghost" 
            onClick={() => loadRecentApplications()}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : null}
            Actualizar
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading && recentApplications.length === 0 ? (
            <div className="flex justify-center items-center h-32">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
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
                {recentApplications.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      No hay solicitudes recientes
                    </TableCell>
                  </TableRow>
                ) : (
                  recentApplications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell className="font-medium">{application.name}</TableCell>
                      <TableCell>{application.businessTypeLabel}</TableCell>
                      <TableCell>{application.date}</TableCell>
                      <TableCell>{getStatusBadge(application.status)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
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
