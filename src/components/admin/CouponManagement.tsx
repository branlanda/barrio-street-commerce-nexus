
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
import { Search, Plus, Edit, Trash } from 'lucide-react';

// Mock coupon data
const mockCoupons = [
  {
    id: '1',
    code: 'BIENVENIDA25',
    discount: '25%',
    applicableTo: 'Nuevos usuarios',
    validFrom: '01/05/2025',
    validTo: '31/05/2025',
    usageCount: 42,
    status: 'active'
  },
  {
    id: '2',
    code: 'VERANO2025',
    discount: '15%',
    applicableTo: 'Todos los usuarios',
    validFrom: '01/06/2025',
    validTo: '31/08/2025',
    usageCount: 0,
    status: 'upcoming'
  },
  {
    id: '3',
    code: 'VENDEDOR10',
    discount: '10%',
    applicableTo: 'Vendedores nuevos',
    validFrom: '01/04/2025',
    validTo: '30/04/2025',
    usageCount: 18,
    status: 'expired'
  },
  {
    id: '4',
    code: 'FIDELIDAD50',
    discount: '50%',
    applicableTo: 'Usuarios premium',
    validFrom: '01/05/2025',
    validTo: '15/05/2025',
    usageCount: 23,
    status: 'active'
  }
];

const CouponManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Cupones y Promociones</h1>
          <p className="text-muted-foreground">Gestiona los cupones de descuento y recompensas.</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Cupón
        </Button>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar cupones..."
            className="pl-8"
          />
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="rounded-full cursor-pointer">Todos</Badge>
          <Badge variant="outline" className="rounded-full cursor-pointer">Activos</Badge>
          <Badge variant="outline" className="rounded-full cursor-pointer">Próximos</Badge>
          <Badge variant="outline" className="rounded-full cursor-pointer">Expirados</Badge>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Descuento</TableHead>
                <TableHead>Aplicable a</TableHead>
                <TableHead>Válido desde</TableHead>
                <TableHead>Válido hasta</TableHead>
                <TableHead>Usos</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCoupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell className="font-medium">{coupon.code}</TableCell>
                  <TableCell>{coupon.discount}</TableCell>
                  <TableCell>{coupon.applicableTo}</TableCell>
                  <TableCell>{coupon.validFrom}</TableCell>
                  <TableCell>{coupon.validTo}</TableCell>
                  <TableCell>{coupon.usageCount}</TableCell>
                  <TableCell>
                    <Badge className={
                      coupon.status === 'active' ? 'bg-green-500' : 
                      coupon.status === 'upcoming' ? 'bg-blue-500' : 
                      'bg-gray-500'
                    }>
                      {coupon.status === 'active' ? 'Activo' : 
                      coupon.status === 'upcoming' ? 'Próximo' : 
                      'Expirado'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash className="h-4 w-4" />
                      </Button>
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

export default CouponManagement;
