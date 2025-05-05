
import React from 'react';
import { Product, formatCurrency } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="market-card h-full flex flex-col overflow-hidden">
      <div className="h-48 bg-gradient-to-br from-yellow-50 to-orange-50 overflow-hidden">
        <img 
          src={product.image || '/placeholder.svg'} 
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-4 flex-grow flex flex-col bg-white">
        <span className="text-xs font-medium text-green-600 mb-1 bg-green-50 rounded-full px-2 py-0.5 self-start">
          Fresco
        </span>
        <h3 className="font-medium text-lg mb-1 text-orange-800">{product.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-3 flex-grow">{product.description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="font-display font-bold text-lg text-barrio-orange">
            {formatCurrency(product.price, product.currency)}
          </div>
          
          <Button size="sm" variant="outline" className="rounded-full border-barrio-orange text-barrio-orange hover:bg-barrio-orange hover:text-white">
            <ShoppingBag className="h-4 w-4 mr-1" />
            Agregar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
