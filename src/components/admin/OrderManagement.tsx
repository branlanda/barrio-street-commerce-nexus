
import React from 'react';
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
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Eye } from 'lucide-react';

// Mock order data
const mockOrders = [
  {
    id: '#ORD-001',
    customer: 'Juan Pérez',
    vendor: 'Delicias de María',
    products: 'Comida casera (x2)',
    total: '$250',
    date: '05/05/2025',
    status: 'completed'
  },
  {
    id: '#ORD-002',
    customer: 'Ana Rodríguez',
    vendor: 'Técnico Pedro',
    products: 'Servicio de plomería',
    total: '$450',
    date: '04/05/2025',
    status: 'in_progress'
  },
  {
    id: '#ORD-003',
    customer: 'Carlos Gómez',
    vendor: 'CellFix',
    products: 'Reparación de celular',
    total: '$350',
    date: '03/05/2025',
    status: 'completed'
  },
  {
    id: '#ORD-004',
    customer: 'María Torres',
    vendor: 'Moda Carmen',
    products: 'Blusa (x1), Pantalón (x1)',
    total: '$580',
    date: '02/05/2025',
    status: 'cancelled'
  },
  {
    id: '#ORD-005',
    customer: 'José López',
    vendor: 'Tejidos Julia',
    products: 'Tejido personalizado',
    total: '$300',
    date: '01/05/2025',
    status: 'pending'
  }
];

const OrderManagement = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Pedidos</h1>
        <p className="text-muted-foreground">Visualización de pedidos (solo lectura).</p>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar pedidos..."
            className="pl-8"
          />
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="rounded-full cursor-pointer">Todos</Badge>
          <Badge variant="outline" className="rounded-full cursor-pointer">Completados</Badge>
          <Badge variant="outline" className="rounded-full cursor-pointer">En Progreso</Badge>
          <Badge variant="outline" className="rounded-full cursor-pointer">Pendientes</Badge>
          <Badge variant="outline" className="rounded-full cursor-pointer">Cancelados</Badge>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Vendedor</TableHead>
                <TableHead>Productos</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.vendor}</TableCell>
                  <TableCell>{order.products}</TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Badge className={
                      order.status === 'completed' ? 'bg-green-500' : 
                      order.status === 'in_progress' ? 'bg-blue-500' : 
                      order.status === 'pending' ? 'bg-amber-500' : 
                      'bg-red-500'
                    }>
                      {order.status === 'completed' ? 'Completado' : 
                      order.status === 'in_progress' ? 'En Progreso' : 
                      order.status === 'pending' ? 'Pendiente' : 
                      'Cancelado'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
        <p className="text-amber-800 text-sm">
          <strong>Nota:</strong> Esta sección es de solo lectura. La gestión de pedidos se realiza directamente por los vendedores.
        </p>
      </div>
    </div>
  );
};

export default OrderManagement;
