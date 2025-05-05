
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Wrench,
  Plug,
  Briefcase,
  School,
  Copy,
  Pen,
  Store,
  Utensils
} from 'lucide-react';

interface ServiceTypeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

const ServiceTypeCard: React.FC<ServiceTypeCardProps> = ({ 
  icon, 
  title, 
  description, 
  onClick 
}) => {
  return (
    <div 
      className="bg-white rounded-lg p-5 cursor-pointer transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow-md border border-gray-100 hover:border-barrio-blue/30"
      onClick={onClick}
    >
      <div className="flex items-start">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 bg-gray-50 text-barrio-blue">
          {icon}
        </div>
        <div>
          <h3 className="text-base font-medium text-gray-800 mb-1">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
};

const ServiceTypeSelector: React.FC = () => {
  const navigate = useNavigate();
  
  const handleSelectType = (type: string) => {
    console.log(`Selected service type: ${type}`);
    // In a real app, navigate to the service providers of this type
    navigate(`/services?type=${type}`);
  };
  
  const serviceTypes = [
    { 
      id: 'plumbing', 
      title: 'Plomería', 
      description: 'Reparación de tuberías, instalaciones y más',
      icon: <Wrench className="w-6 h-6" />
    },
    { 
      id: 'electrical', 
      title: 'Servicios Eléctricos', 
      description: 'Instalaciones, reparaciones eléctricas',
      icon: <Plug className="w-6 h-6" />
    },
    { 
      id: 'tech', 
      title: 'Servicios Técnicos', 
      description: 'Reparación de PC, formateo, instalación de software',
      icon: <Briefcase className="w-6 h-6" />
    },
    { 
      id: 'education', 
      title: 'Clases Particulares', 
      description: 'Matemáticas, idiomas, ciencias y más',
      icon: <School className="w-6 h-6" />
    },
    { 
      id: 'copying', 
      title: 'Servicios de Copia', 
      description: 'Fotocopias, impresiones, escaneos',
      icon: <Copy className="w-6 h-6" />
    },
    { 
      id: 'writing', 
      title: 'Trabajos Escritos', 
      description: 'Elaboración de documentos y trabajos',
      icon: <Pen className="w-6 h-6" />
    },
    { 
      id: 'home', 
      title: 'Servicios del Hogar', 
      description: 'Limpieza, jardinería y mantenimiento',
      icon: <Store className="w-6 h-6" />
    },
    { 
      id: 'food', 
      title: 'Comida Casera', 
      description: 'Preparación de comidas y catering',
      icon: <Utensils className="w-6 h-6" />
    }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {serviceTypes.map((type) => (
        <ServiceTypeCard
          key={type.id}
          icon={type.icon}
          title={type.title}
          description={type.description}
          onClick={() => handleSelectType(type.id)}
        />
      ))}
    </div>
  );
};

export default ServiceTypeSelector;
