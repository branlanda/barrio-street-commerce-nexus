
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
      <div className="market-card group h-full flex flex-col overflow-hidden">
        <div className="h-40 bg-gradient-to-br from-yellow-100 to-orange-100 relative">
          <img 
            src={vendor.coverImage || '/placeholder.svg'} 
            alt={vendor.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full p-3">
            <h3 className="text-white font-display font-semibold text-lg">{vendor.name}</h3>
          </div>
          {vendor.isVerified && (
            <Badge variant="secondary" className="absolute top-3 right-3 bg-white text-barrio-orange flex items-center gap-1 shadow-sm">
              <Check size={12} /> Verificado
            </Badge>
          )}
        </div>
        
        <div className="p-4 flex-grow bg-white border-t-4 border-orange-300">
          <p className="text-sm text-gray-500 mb-2 flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-2"></span>
            {vendor.location}
          </p>
          <p className="text-sm line-clamp-2 mb-4">{vendor.description}</p>
          
          <div className="flex items-center mt-auto">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-barrio-orange stroke-barrio-orange mr-1" />
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
