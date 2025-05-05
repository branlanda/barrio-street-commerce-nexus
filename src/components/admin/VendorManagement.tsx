
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  XCircle, 
  PauseCircle, 
  Clock,
  Edit,
  Ban,
  Eye,
  Loader2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import SearchPanel from './SearchPanel';

// Mock vendor data
const mockVendors = [
  {
    id: '101',
    name: 'María López',
    businessName: 'Delicias de María',
    type: 'Vendedor de Alimentos',
    location: 'Centro',
    rating: 4.8,
    status: 'active',
    joinDate: '15/01/2025'
  },
  {
    id: '102',
    name: 'Pedro Sánchez',
    businessName: 'Técnico Pedro',
    type: 'Servicios',
    location: 'Norte',
    rating: 4.5,
    status: 'active',
    joinDate: '22/02/2025'
  },
  {
    id: '103',
    name: 'Julia Ortiz',
    businessName: 'Tejidos Julia',
    type: 'Artesanías',
    location: 'Sur',
    rating: 4.9,
    status: 'suspended',
    joinDate: '05/03/2025'
  },
  {
    id: '104',
    name: 'Roberto Méndez',
    businessName: 'CellFix',
    type: 'Electrónicos',
    location: 'Este',
    rating: 4.2,
    status: 'active',
    joinDate: '18/03/2025'
  },
  {
    id: '105',
    name: 'Carmen Díaz',
    businessName: 'Moda Carmen',
    type: 'Ropa y Accesorios',
    location: 'Oeste',
    rating: 4.7,
    status: 'active',
    joinDate: '02/04/2025'
  },
];

const VendorManagement = () => {
  const { getVendorApplications, approveVendorApplication, rejectVendorApplication } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('applications');
  const [applications, setApplications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Load applications when component mounts
    loadApplications();
  }, []);

  const loadApplications = async () => {
    setIsLoading(true);
    try {
      const data = await getVendorApplications();
      setApplications(data);
    } catch (error) {
      console.error("Error loading applications:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron cargar las solicitudes. Intente nuevamente.",
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
      case 'active':
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="h-3 w-3 mr-1" />
            Activo
          </Badge>
        );
      case 'suspended':
        return (
          <Badge className="bg-orange-500">
            <PauseCircle className="h-3 w-3 mr-1" />
            Suspendido
          </Badge>
        );
      default:
        return null;
    }
  };
  
  const handleViewApplication = (application: any) => {
    setSelectedApplication(application);
  };

  const handleSearchApplications = (query: string) => {
    setSearchTerm(query);
  };

  const handleSearchVendors = (query: string) => {
    setSearchTerm(query);
  };

  const handleApproveApplication = async (applicationId: string) => {
    setProcessingId(applicationId);
    try {
      await approveVendorApplication(applicationId);
      
      // Update local state to reflect the change
      setApplications(prevApplications => 
        prevApplications.map(app => 
          app.id === applicationId ? { ...app, status: 'approved' } : app
        )
      );
      
      if (selectedApplication?.id === applicationId) {
        setSelectedApplication(prev => ({ ...prev, status: 'approved' }));
      }
      
      toast({
        title: "Solicitud aprobada",
        description: "La solicitud de vendedor ha sido aprobada exitosamente",
      });
    } catch (error) {
      console.error("Error approving application:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo aprobar la solicitud. Intente nuevamente.",
      });
    } finally {
      setProcessingId(null);
    }
  };

  const handleRejectApplication = async (applicationId: string) => {
    setProcessingId(applicationId);
    try {
      await rejectVendorApplication(applicationId);
      
      // Update local state to reflect the change
      setApplications(prevApplications => 
        prevApplications.map(app => 
          app.id === applicationId ? { ...app, status: 'rejected' } : app
        )
      );
      
      if (selectedApplication?.id === applicationId) {
        setSelectedApplication(prev => ({ ...prev, status: 'rejected' }));
      }
      
      toast({
        title: "Solicitud rechazada",
        description: "La solicitud de vendedor ha sido rechazada",
      });
    } catch (error) {
      console.error("Error rejecting application:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo rechazar la solicitud. Intente nuevamente.",
      });
    } finally {
      setProcessingId(null);
    }
  };

  const filteredApplications = applications.filter(app => 
    app.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.businessTypeLabel?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredVendors = mockVendors.filter(vendor => 
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Gestión de Vendedores</h1>
        <p className="text-muted-foreground">Administra vendedores y solicitudes de registro.</p>
      </div>
      
      <Tabs defaultValue="applications" onValueChange={tab => {
        setActiveTab(tab);
        setSearchTerm('');
        setSelectedApplication(null);
      }}>
        <TabsList>
          <TabsTrigger value="applications">Solicitudes</TabsTrigger>
          <TabsTrigger value="vendors">Vendedores</TabsTrigger>
        </TabsList>
        <TabsContent value="applications" className="space-y-4">
          <SearchPanel 
            title="Solicitudes de vendedores"
            description="Revisa y gestiona las solicitudes para convertirse en vendedor"
            onSearch={handleSearchApplications}
            placeholder="Buscar por nombre, email o tipo de negocio..."
            showFilters={true}
          />
          
          <Card>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
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
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApplications.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          No hay solicitudes que coincidan con tu búsqueda
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredApplications.map((application) => (
                        <TableRow key={application.id}>
                          <TableCell className="font-medium">{application.name}</TableCell>
                          <TableCell>{application.businessTypeLabel}</TableCell>
                          <TableCell>{application.date}</TableCell>
                          <TableCell>{getStatusBadge(application.status)}</TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleViewApplication(application)}
                              disabled={processingId === application.id}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Ver
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
          
          {selectedApplication && (
            <Card>
              <CardHeader>
                <CardTitle>Detalles de la Solicitud</CardTitle>
                <CardDescription>Revisión de la solicitud de {selectedApplication.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Información Personal</h3>
                    <div className="mt-2 space-y-2">
                      <p><span className="font-medium">Nombre:</span> {selectedApplication.name}</p>
                      <p><span className="font-medium">Email:</span> {selectedApplication.email}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Información del Negocio</h3>
                    <div className="mt-2 space-y-2">
                      <p><span className="font-medium">Tipo:</span> {selectedApplication.businessTypeLabel}</p>
                      <p><span className="font-medium">Área de Servicio:</span> {selectedApplication.serviceArea}</p>
                      <p><span className="font-medium">Fecha de Solicitud:</span> {selectedApplication.date}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Descripción</h3>
                  <p className="mt-2">{selectedApplication.description}</p>
                </div>
                
                {selectedApplication.status === 'pending' && (
                  <div className="flex justify-end gap-3">
                    <Button 
                      variant="destructive"
                      onClick={() => handleRejectApplication(selectedApplication.id)}
                      disabled={processingId === selectedApplication.id}
                    >
                      {processingId === selectedApplication.id ? (
                        <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                      ) : (
                        <XCircle className="h-4 w-4 mr-1" />
                      )}
                      Rechazar
                    </Button>
                    <Button 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleApproveApplication(selectedApplication.id)}
                      disabled={processingId === selectedApplication.id}
                    >
                      {processingId === selectedApplication.id ? (
                        <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                      ) : (
                        <CheckCircle className="h-4 w-4 mr-1" />
                      )}
                      Aprobar
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="vendors" className="space-y-4">
          <SearchPanel 
            title="Gestión de vendedores"
            description="Administra los vendedores activos en la plataforma"
            onSearch={handleSearchVendors}
            placeholder="Buscar por nombre, negocio o ubicación..."
            showFilters={true}
            showExport={true}
          />
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendedor</TableHead>
                    <TableHead>Negocio</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Ubicación</TableHead>
                    <TableHead>Valoración</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVendors.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No hay vendedores que coincidan con tu búsqueda
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredVendors.map((vendor) => (
                      <TableRow key={vendor.id}>
                        <TableCell className="font-medium">{vendor.name}</TableCell>
                        <TableCell>{vendor.businessName}</TableCell>
                        <TableCell>{vendor.type}</TableCell>
                        <TableCell>{vendor.location}</TableCell>
                        <TableCell>{vendor.rating}</TableCell>
                        <TableCell>{getStatusBadge(vendor.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            {vendor.status === 'active' ? (
                              <Button variant="ghost" size="sm">
                                <Ban className="h-4 w-4" />
                              </Button>
                            ) : (
                              <Button variant="ghost" size="sm">
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VendorManagement;
