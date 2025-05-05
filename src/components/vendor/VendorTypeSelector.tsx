
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Apple, 
  Headphones, 
  Film, 
  Ticket, 
  Utensils, 
  ShoppingBag, 
  Shirt, 
  Book
} from 'lucide-react';

interface VendorTypeCardProps {
  icon: React.ReactNode;
  title: string;
  color: string;
  onClick: () => void;
}

const VendorTypeCard: React.FC<VendorTypeCardProps> = ({ icon, title, color, onClick }) => {
  return (
    <div 
      className={`bg-white rounded-xl p-6 text-center cursor-pointer transform transition-all duration-300 hover:scale-105 border-2 border-${color}/20 hover:border-${color}/50 shadow-md hover:shadow-lg group`}
      onClick={onClick}
    >
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-${color}/10 text-${color} group-hover:bg-${color}/20 transition-colors`}>
        {icon}
      </div>
      <h3 className="text-lg font-medium">{title}</h3>
    </div>
  );
};

const VendorTypeSelector: React.FC = () => {
  const navigate = useNavigate();
  
  const handleSelectType = (type: string) => {
    console.log(`Selected vendor type: ${type}`);
    // In a real app, navigate to the vendors of this type
    navigate(`/vendors?type=${type}`);
  };
  
  const vendorTypes = [
    { 
      id: 'fruits', 
      title: 'Frutas y Verduras', 
      icon: <Apple className="w-8 h-8" />, 
      color: 'barrio-primary'
    },
    { 
      id: 'electronics', 
      title: 'Electrónicos', 
      icon: <Headphones className="w-8 h-8" />, 
      color: 'barrio-blue'
    },
    { 
      id: 'entertainment', 
      title: 'Películas y Música', 
      icon: <Film className="w-8 h-8" />, 
      color: 'barrio-pink'
    },
    { 
      id: 'lottery', 
      title: 'Lotería', 
      icon: <Ticket className="w-8 h-8" />, 
      color: 'barrio-accent'
    },
    { 
      id: 'food', 
      title: 'Alimentos', 
      icon: <Utensils className="w-8 h-8" />, 
      color: 'barrio-orange'
    },
    { 
      id: 'clothing', 
      title: 'Ropa y Accesorios', 
      icon: <Shirt className="w-8 h-8" />, 
      color: 'barrio-purple'
    },
    { 
      id: 'stationery', 
      title: 'Papelería', 
      icon: <Book className="w-8 h-8" />, 
      color: 'barrio-green'
    },
    { 
      id: 'other', 
      title: 'Otros Productos', 
      icon: <ShoppingBag className="w-8 h-8" />, 
      color: 'barrio-dark'
    }
  ];
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {vendorTypes.map((type) => (
        <VendorTypeCard
          key={type.id}
          icon={type.icon}
          title={type.title}
          color={type.color}
          onClick={() => handleSelectType(type.id)}
        />
      ))}
    </div>
  );
};

export default VendorTypeSelector;
