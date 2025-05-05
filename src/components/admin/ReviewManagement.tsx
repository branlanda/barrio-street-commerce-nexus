
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
import { Search, Star, Flag, Check, X, Eye } from 'lucide-react';

// Mock review data
const mockReviews = [
  {
    id: '1',
    user: 'Juan Pérez',
    vendor: 'Delicias de María',
    rating: 4,
    comment: 'Excelente comida, muy buena atención y precios razonables.',
    date: '04/05/2025',
    status: 'approved',
    reported: false
  },
  {
    id: '2',
    user: 'Ana Rodríguez',
    vendor: 'Técnico Pedro',
    rating: 5,
    comment: 'Muy profesional, arregló mi refrigerador rápidamente.',
    date: '03/05/2025',
    status: 'approved',
    reported: false
  },
  {
    id: '3',
    user: 'Carlos Gómez',
    vendor: 'CellFix',
    rating: 2,
    comment: 'No quedé conforme con la reparación, sigue fallando.',
    date: '02/05/2025',
    status: 'pending',
    reported: true
  },
  {
    id: '4',
    user: 'María Torres',
    vendor: 'Moda Carmen',
    rating: 1,
    comment: 'La ropa es de pésima calidad, nada que ver con las fotos.',
    date: '01/05/2025',
    status: 'pending',
    reported: true
  },
  {
    id: '5',
    user: 'José López',
    vendor: 'Tejidos Julia',
    rating: 5,
    comment: 'Hermosos trabajos artesanales, muy detallistas.',
    date: '30/04/2025',
    status: 'approved',
    reported: false
  }
];

const ReviewManagement = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Gestión de Reseñas</h1>
        <p className="text-muted-foreground">Modera las reseñas de usuarios y resuelve disputas.</p>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar reseñas..."
            className="pl-8"
          />
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="rounded-full cursor-pointer">Todas</Badge>
          <Badge variant="outline" className="rounded-full cursor-pointer">Aprobadas</Badge>
          <Badge variant="outline" className="rounded-full cursor-pointer">Pendientes</Badge>
          <Badge variant="outline" className="rounded-full cursor-pointer">Reportadas</Badge>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuario</TableHead>
                <TableHead>Vendedor</TableHead>
                <TableHead>Valoración</TableHead>
                <TableHead>Comentario</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="font-medium">{review.user}</TableCell>
                  <TableCell>{review.vendor}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {review.rating}
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 ml-1" />
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{review.comment}</TableCell>
                  <TableCell>{review.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Badge className={
                        review.status === 'approved' ? 'bg-green-500' : 'bg-amber-500'
                      }>
                        {review.status === 'approved' ? 'Aprobada' : 'Pendiente'}
                      </Badge>
                      {review.reported && (
                        <Badge variant="destructive" className="flex items-center">
                          <Flag className="h-3 w-3 mr-1" />
                          Reportada
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {review.status === 'pending' && (
                        <>
                          <Button variant="ghost" size="sm" className="text-green-600">
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <X className="h-4 w-4" />
                          </Button>
                        </>
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

export default ReviewManagement;
