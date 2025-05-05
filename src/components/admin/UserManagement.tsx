
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Edit, Ban, User, Shield, Store, CheckCircle } from 'lucide-react';

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

const UserManagement = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Gestión de Usuarios</h1>
        <p className="text-muted-foreground">Administra los usuarios de la plataforma.</p>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar usuarios..."
            className="pl-8"
          />
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="rounded-full cursor-pointer">Todos</Badge>
          <Badge variant="outline" className="rounded-full cursor-pointer">Compradores</Badge>
          <Badge variant="outline" className="rounded-full cursor-pointer">Vendedores</Badge>
          <Badge variant="outline" className="rounded-full cursor-pointer">Administradores</Badge>
        </div>
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
              {mockUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'admin' ? 'destructive' : user.role === 'vendor' ? 'secondary' : 'default'}>
                      {user.role === 'buyer' && <User className="h-3 w-3 mr-1" />}
                      {user.role === 'vendor' && <Store className="h-3 w-3 mr-1" />}
                      {user.role === 'admin' && <Shield className="h-3 w-3 mr-1" />}
                      {user.role === 'buyer' ? 'Comprador' : user.role === 'vendor' ? 'Vendedor' : 'Administrador'}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.registrationDate}</TableCell>
                  <TableCell>{user.lastActive}</TableCell>
                  <TableCell>
                    <Badge className={user.status === 'active' ? 'bg-green-500' : 'bg-red-500'}>
                      {user.status === 'active' ? 'Activo' : 'Suspendido'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
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

export default UserManagement;
