
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, CheckCircle, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ServiceProviderCardProps {
  provider: {
    id: string;
    name: string;
    location: string;
    image?: string;
    rating: number;
    jobsCompleted: number;
    categories: string[];
    isVerified?: boolean;
  };
}

const ServiceProviderCard: React.FC<ServiceProviderCardProps> = ({ provider }) => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="p-4 flex">
        <div className="flex-shrink-0 mr-4">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 border-2 border-white shadow-md">
            <img 
              src={provider.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(provider.name)}&background=random`} 
              alt={provider.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-display font-semibold text-xl flex items-center">
                {provider.name}
                {provider.isVerified && (
                  <CheckCircle className="h-4 w-4 ml-1 text-barrio-blue" />
                )}
              </h3>
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{provider.location}</span>
              </div>
            </div>
            <div className="flex items-center bg-barrio-accent/10 text-barrio-accent font-medium rounded-full px-2 py-0.5 text-sm">
              <Star className="h-3 w-3 mr-1 fill-barrio-accent" />
              {provider.rating.toFixed(1)}
            </div>
          </div>
          
          <div className="mt-2">
            <div className="text-xs text-gray-500 mb-2">
              {provider.jobsCompleted} trabajos completados
            </div>
            <div className="flex flex-wrap gap-2">
              {provider.categories.map((category, index) => (
                <span 
                  key={index} 
                  className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs text-gray-700"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-4 pb-4 pt-2 flex gap-2">
        <Button 
          className="flex-1 bg-barrio-blue hover:bg-barrio-blue/90 text-white"
          onClick={() => navigate(`/services/${provider.id}`)}
        >
          Ver Perfil
        </Button>
        <Button 
          variant="outline" 
          className="flex-1 border-barrio-blue text-barrio-blue hover:bg-barrio-blue/10"
        >
          <MessageCircle className="h-4 w-4 mr-1" />
          Contactar
        </Button>
      </div>
    </div>
  );
};

export default ServiceProviderCard;
