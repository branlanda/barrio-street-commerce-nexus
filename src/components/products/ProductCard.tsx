
import React from 'react';
import { Product } from '@/types/supabase';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { formatCurrency } from '@/lib/mockData';

interface ProductCardProps {
  product: Product;
  onEditClick?: (product: Product) => void;
  hideActions?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onEditClick,
  hideActions = false
}) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="h-48 overflow-hidden relative">
        <img 
          src={product.image || '/placeholder.svg'} 
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            // Fallback if image fails to load
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
        {!product.available && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Badge variant="secondary" className="bg-white text-gray-700 text-sm px-3 py-1">
              Agotado
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-4 flex-1 flex flex-col">
        <h3 className="font-medium text-lg">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">{product.description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="font-bold text-barrio-orange">
            {formatCurrency(product.price, product.currency)}
          </div>
          
          {!hideActions && (
            onEditClick ? (
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onEditClick(product)}
              >
                Editar
              </Button>
            ) : (
              <Button 
                size="sm" 
                className="bg-barrio-green hover:bg-barrio-green/90"
                disabled={!product.available}
              >
                <ShoppingCart className="w-4 h-4 mr-1" />
                Comprar
              </Button>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
