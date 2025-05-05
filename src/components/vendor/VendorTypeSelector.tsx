
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
  onClick: () => void;
}

const VendorTypeCard: React.FC<VendorTypeCardProps> = ({ icon, title, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg p-5 text-center cursor-pointer transition-all duration-300 hover:scale-[1.02] border border-gray-100 hover:border-barrio-blue/30 shadow-sm hover:shadow-md group"
      onClick={onClick}
    >
      <div className="w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4 bg-gray-50 text-barrio-blue group-hover:bg-barrio-blue/10 transition-colors">
        {icon}
      </div>
      <h3 className="text-base font-medium text-gray-800">{title}</h3>
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
      icon: <Apple className="w-7 h-7" />
    },
    { 
      id: 'electronics', 
      title: 'Electrónicos', 
      icon: <Headphones className="w-7 h-7" />
    },
    { 
      id: 'entertainment', 
      title: 'Películas y Música', 
      icon: <Film className="w-7 h-7" />
    },
    { 
      id: 'lottery', 
      title: 'Lotería', 
      icon: <Ticket className="w-7 h-7" />
    },
    { 
      id: 'food', 
      title: 'Alimentos', 
      icon: <Utensils className="w-7 h-7" />
    },
    { 
      id: 'clothing', 
      title: 'Ropa y Accesorios', 
      icon: <Shirt className="w-7 h-7" />
    },
    { 
      id: 'stationery', 
      title: 'Papelería', 
      icon: <Book className="w-7 h-7" />
    },
    { 
      id: 'other', 
      title: 'Otros Productos', 
      icon: <ShoppingBag className="w-7 h-7" />
    }
  ];
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {vendorTypes.map((type) => (
        <VendorTypeCard
          key={type.id}
          icon={type.icon}
          title={type.title}
          onClick={() => handleSelectType(type.id)}
        />
      ))}
    </div>
  );
};

export default VendorTypeSelector;
