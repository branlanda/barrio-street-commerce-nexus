
import React from 'react';
import { Star, Check } from 'lucide-react';
import { Vendor } from '@/lib/mockData';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface VendorCardProps {
  vendor: Vendor;
}

const VendorCard: React.FC<VendorCardProps> = ({ vendor }) => {
  return (
    <Link to={`/vendor/${vendor.id}`}>
      <div className="market-card group h-full flex flex-col">
        <div className="h-32 bg-gray-200 relative overflow-hidden">
          <img 
            src={vendor.coverImage || '/placeholder.svg'} 
            alt={vendor.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-3">
            <h3 className="text-white font-display font-semibold text-lg">{vendor.name}</h3>
          </div>
          {vendor.isVerified && (
            <Badge variant="secondary" className="absolute top-3 right-3 bg-white text-barrio-primary flex items-center gap-1 vendor-badge-verified">
              <Check size={12} /> Verificado
            </Badge>
          )}
        </div>
        
        <div className="p-4 flex-grow">
          <p className="text-sm text-gray-500 mb-2">{vendor.location}</p>
          <p className="text-sm line-clamp-2 mb-4">{vendor.description}</p>
          
          <div className="flex items-center mt-auto">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-barrio-accent stroke-barrio-accent mr-1" />
              <span className="font-medium">{vendor.rating}</span>
            </div>
            <span className="text-gray-500 text-sm ml-1">({vendor.reviewCount} reseñas)</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VendorCard;
