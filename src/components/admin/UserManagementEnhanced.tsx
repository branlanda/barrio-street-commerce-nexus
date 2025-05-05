
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
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Edit, 
  Ban, 
  User, 
  Shield, 
  Store, 
  CheckCircle,
  Eye,
  Loader2,
  X,
  AlertCircle
} from 'lucide-react';
import SearchPanel from './SearchPanel';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Mock user data
const mockUsers = [
  {
    id: '1',
    name: 'Juan Pérez',
    email: 'juan@example.com',
    role: 'buyer',
    registrationDate: '12/01/2025',
    lastActive: '05/05/2025',
    status: 'active'
  },
  {
    id: '2',
    name: 'Ana Rodríguez',
    email: 'ana@example.com',
    role: 'vendor',
    registrationDate: '05/02/2025',
    lastActive: '04/05/2025',
    status: 'active'
  },
  {
    id: '3',
    name: 'Carlos Gómez',
    email: 'carlos@example.com',
    role: 'admin',
    registrationDate: '10/12/2024',
    lastActive: '05/05/2025',
    status: 'active'
  },
  {
    id: '4',
    name: 'María Torres',
    email: 'maria@example.com',
    role: 'buyer',
    registrationDate: '22/03/2025',
    lastActive: '01/05/2025',
    status: 'suspended'
  },
  {
    id: '5',
    name: 'José López',
    email: 'jose@example.com',
    role: 'vendor',
    registrationDate: '15/04/2025',
    lastActive: '03/05/2025',
    status: 'active'
  }
];

const UserManagementEnhanced = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const [users, setUsers] = useState(mockUsers);
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogAction, setDialogAction] = useState<'promote' | 'demote' | 'suspend' | 'activate' | null>(null);
  const [processingUserId, setProcessingUserId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  const handleRoleFilter = (role: string | null) => {
    setRoleFilter(role);
  };

  const getStatusBadge = (status: string) => {
    return (
      <Badge className={status === 'active' ? 'bg-green-500' : 'bg-red-500'}>
        {status === 'active' ? 'Activo' : 'Suspendido'}
      </Badge>
    );
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'buyer':
        return (
          <Badge variant="default">
            <User className="h-3 w-3 mr-1" />
            Comprador
          </Badge>
        );
      case 'vendor':
        return (
          <Badge variant="secondary">
            <Store className="h-3 w-3 mr-1" />
            Vendedor
          </Badge>
        );
      case 'admin':
        return (
          <Badge variant="destructive">
            <Shield className="h-3 w-3 mr-1" />
            Administrador
          </Badge>
        );
      default:
        return null;
    }
  };

  const openPromoteDialog = (user: any) => {
    setSelectedUser(user);
    setDialogAction('promote');
    setShowDialog(true);
  };

  const openDemoteDialog = (user: any) => {
    setSelectedUser(user);
    setDialogAction('demote');
    setShowDialog(true);
  };

  const openSuspendDialog = (user: any) => {
    setSelectedUser(user);
    setDialogAction('suspend');
    setShowDialog(true);
  };

  const openActivateDialog = (user: any) => {
    setSelectedUser(user);
    setDialogAction('activate');
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
    setDialogAction(null);
  };

  const getDialogTitle = () => {
    if (!dialogAction || !selectedUser) return '';
    
    switch (dialogAction) {
      case 'promote':
        return `Promover a ${selectedUser.name}`;
      case 'demote':
        return `Degradar a ${selectedUser.name}`;
      case 'suspend':
        return `Suspender a ${selectedUser.name}`;
      case 'activate':
        return `Activar a ${selectedUser.name}`;
      default:
        return '';
    }
  };

  const getDialogDescription = () => {
    if (!dialogAction || !selectedUser) return '';
    
    switch (dialogAction) {
      case 'promote':
        return selectedUser.role === 'buyer' 
          ? `¿Estás seguro de que deseas promover a ${selectedUser.name} al rol de Vendedor?`
          : `¿Estás seguro de que deseas promover a ${selectedUser.name} al rol de Administrador?`;
      case 'demote':
        return selectedUser.role === 'admin' 
          ? `¿Estás seguro de que deseas degradar a ${selectedUser.name} al rol de Vendedor?`
          : `¿Estás seguro de que deseas degradar a ${selectedUser.name} al rol de Comprador?`;
      case 'suspend':
        return `¿Estás seguro de que deseas suspender la cuenta de ${selectedUser.name}?`;
      case 'activate':
        return `¿Estás seguro de que deseas activar la cuenta de ${selectedUser.name}?`;
      default:
        return '';
    }
  };

  const executeAction = async () => {
    if (!selectedUser || !dialogAction) return;
    
    setProcessingUserId(selectedUser.id);
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update the user in the local state
      const updatedUsers = users.map(user => {
        if (user.id === selectedUser.id) {
          let updatedUser = { ...user };
          
          switch (dialogAction) {
            case 'promote':
              updatedUser.role = user.role === 'buyer' ? 'vendor' : 'admin';
              break;
            case 'demote':
              updatedUser.role = user.role === 'admin' ? 'vendor' : 'buyer';
              break;
            case 'suspend':
              updatedUser.status = 'suspended';
              break;
            case 'activate':
              updatedUser.status = 'active';
              break;
          }
          
          return updatedUser;
        }
        return user;
      });
      
      setUsers(updatedUsers);
      
      // Show success message
      let successMessage = '';
      switch (dialogAction) {
        case 'promote':
          successMessage = `${selectedUser.name} ha sido promovido correctamente.`;
          break;
        case 'demote':
          successMessage = `${selectedUser.name} ha sido degradado correctamente.`;
          break;
        case 'suspend':
          successMessage = `La cuenta de ${selectedUser.name} ha sido suspendida.`;
          break;
        case 'activate':
          successMessage = `La cuenta de ${selectedUser.name} ha sido activada.`;
          break;
      }
      
      toast({
        title: "Acción completada",
        description: successMessage,
      });
      
    } catch (error) {
      console.error("Error executing action:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo completar la acción. Intente nuevamente.",
      });
    } finally {
      setIsLoading(false);
      setProcessingUserId(null);
      closeDialog();
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === null || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  const viewUserDetails = (user: any) => {
    setSelectedUser(user);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Gestión de Usuarios</h1>
        <p className="text-muted-foreground">Administra los usuarios de la plataforma.</p>
      </div>
      
      <SearchPanel 
        title="Usuarios del sistema"
        description="Visualiza y gestiona todos los usuarios registrados"
        onSearch={handleSearch}
        placeholder="Buscar por nombre o email..."
        showFilters={true}
        showExport={true}
      />
      
      <div className="flex gap-2 mb-4 flex-wrap">
        <Badge 
          variant={roleFilter === null ? "default" : "outline"} 
          className="rounded-full cursor-pointer"
          onClick={() => handleRoleFilter(null)}
        >
          Todos
        </Badge>
        <Badge 
          variant={roleFilter === 'buyer' ? "default" : "outline"} 
          className="rounded-full cursor-pointer"
          onClick={() => handleRoleFilter('buyer')}
        >
          Compradores
        </Badge>
        <Badge 
          variant={roleFilter === 'vendor' ? "default" : "outline"} 
          className="rounded-full cursor-pointer"
          onClick={() => handleRoleFilter('vendor')}
        >
          Vendedores
        </Badge>
        <Badge 
          variant={roleFilter === 'admin' ? "default" : "outline"} 
          className="rounded-full cursor-pointer"
          onClick={() => handleRoleFilter('admin')}
        >
          Administradores
        </Badge>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuario</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Registro</TableHead>
                <TableHead>Último Acceso</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No hay usuarios que coincidan con tu búsqueda
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{user.registrationDate}</TableCell>
                    <TableCell>{user.lastActive}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => viewUserDetails(user)}
                          disabled={processingUserId === user.id}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            if (user.role === 'admin') {
                              openDemoteDialog(user);
                            } else if (user.role === 'vendor') {
                              openPromoteDialog(user);
                            } else {
                              openPromoteDialog(user);
                            }
                          }}
                          disabled={processingUserId === user.id}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {user.status === 'active' ? (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => openSuspendDialog(user)}
                            disabled={processingUserId === user.id}
                          >
                            <Ban className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => openActivateDialog(user)}
                            disabled={processingUserId === user.id}
                          >
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

      {selectedUser && showDialog && (
        <Dialog open={showDialog} onOpenChange={closeDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{getDialogTitle()}</DialogTitle>
              <DialogDescription>
                {getDialogDescription()}
              </DialogDescription>
            </DialogHeader>
            {dialogAction === 'suspend' && (
              <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-md p-3 flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm">
                  Al suspender esta cuenta, el usuario no podrá acceder a la plataforma 
                  hasta que su cuenta sea reactivada por un administrador.
                </p>
              </div>
            )}
            <DialogFooter>
              <Button 
                variant="outline"
                onClick={closeDialog}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button 
                variant={dialogAction === 'suspend' ? 'destructive' : 'default'}
                onClick={executeAction}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : null}
                Confirmar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {selectedUser && !showDialog && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Detalles del Usuario</CardTitle>
              <CardDescription>Información detallada de {selectedUser.name}</CardDescription>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSelectedUser(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Información Personal</h3>
                <div className="mt-2 space-y-2">
                  <p><span className="font-medium">Nombre:</span> {selectedUser.name}</p>
                  <p><span className="font-medium">Email:</span> {selectedUser.email}</p>
                  <p><span className="font-medium">Rol:</span> {' '}
                    {selectedUser.role === 'buyer' ? 'Comprador' : 
                     selectedUser.role === 'vendor' ? 'Vendedor' : 'Administrador'}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Actividad</h3>
                <div className="mt-2 space-y-2">
                  <p><span className="font-medium">Fecha de Registro:</span> {selectedUser.registrationDate}</p>
                  <p><span className="font-medium">Último Acceso:</span> {selectedUser.lastActive}</p>
                  <p><span className="font-medium">Estado:</span> {' '}
                    {selectedUser.status === 'active' ? 'Activo' : 'Suspendido'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              {selectedUser.role !== 'admin' && (
                <Button 
                  onClick={() => openPromoteDialog(selectedUser)}
                  disabled={isLoading}
                >
                  Promover a {selectedUser.role === 'buyer' ? 'Vendedor' : 'Administrador'}
                </Button>
              )}
              {selectedUser.role !== 'buyer' && (
                <Button 
                  variant="outline"
                  onClick={() => openDemoteDialog(selectedUser)}
                  disabled={isLoading}
                >
                  Degradar a {selectedUser.role === 'admin' ? 'Vendedor' : 'Comprador'}
                </Button>
              )}
              {selectedUser.status === 'active' ? (
                <Button 
                  variant="destructive"
                  onClick={() => openSuspendDialog(selectedUser)}
                  disabled={isLoading}
                >
                  Suspender Cuenta
                </Button>
              ) : (
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => openActivateDialog(selectedUser)}
                  disabled={isLoading}
                >
                  Activar Cuenta
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserManagementEnhanced;
