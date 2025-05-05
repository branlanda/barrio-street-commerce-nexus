
import React, { useState } from 'react';
import {
  Card,
  CardContent,
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
  Eye
} from 'lucide-react';
import SearchPanel from './SearchPanel';

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

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === null || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

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
      
      <div className="flex gap-2 mb-4">
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
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{user.registrationDate}</TableCell>
                  <TableCell>{user.lastActive}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => setSelectedUser(user)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {user.status === 'active' ? (
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagementEnhanced;
