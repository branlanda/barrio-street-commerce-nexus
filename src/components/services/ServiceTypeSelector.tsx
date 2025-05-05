
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
  color: string;
  onClick: () => void;
}

const ServiceTypeCard: React.FC<ServiceTypeCardProps> = ({ 
  icon, 
  title, 
  description, 
  color, 
  onClick 
}) => {
  return (
    <div 
      className={`bg-white rounded-xl p-6 cursor-pointer transform transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg border-2 border-${color}/20 hover:border-${color}/50`}
      onClick={onClick}
    >
      <div className="flex items-start mb-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 bg-${color}/10 text-${color}`}>
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-medium mb-1">{title}</h3>
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
      icon: <Wrench className="w-6 h-6" />, 
      color: 'barrio-blue'
    },
    { 
      id: 'electrical', 
      title: 'Servicios Eléctricos', 
      description: 'Instalaciones, reparaciones eléctricas',
      icon: <Plug className="w-6 h-6" />, 
      color: 'barrio-accent'
    },
    { 
      id: 'tech', 
      title: 'Servicios Técnicos', 
      description: 'Reparación de PC, formateo, instalación de software',
      icon: <Briefcase className="w-6 h-6" />, 
      color: 'barrio-primary'
    },
    { 
      id: 'education', 
      title: 'Clases Particulares', 
      description: 'Matemáticas, idiomas, ciencias y más',
      icon: <School className="w-6 h-6" />, 
      color: 'barrio-pink'
    },
    { 
      id: 'copying', 
      title: 'Servicios de Copia', 
      description: 'Fotocopias, impresiones, escaneos',
      icon: <Copy className="w-6 h-6" />, 
      color: 'barrio-purple'
    },
    { 
      id: 'writing', 
      title: 'Trabajos Escritos', 
      description: 'Elaboración de documentos y trabajos',
      icon: <Pen className="w-6 h-6" />, 
      color: 'barrio-orange'
    },
    { 
      id: 'home', 
      title: 'Servicios del Hogar', 
      description: 'Limpieza, jardinería y mantenimiento',
      icon: <Store className="w-6 h-6" />, 
      color: 'barrio-green'
    },
    { 
      id: 'food', 
      title: 'Comida Casera', 
      description: 'Preparación de comidas y catering',
      icon: <Utensils className="w-6 h-6" />, 
      color: 'barrio-dark'
    }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {serviceTypes.map((type) => (
        <ServiceTypeCard
          key={type.id}
          icon={type.icon}
          title={type.title}
          description={type.description}
          color={type.color}
          onClick={() => handleSelectType(type.id)}
        />
      ))}
    </div>
  );
};

export default ServiceTypeSelector;
