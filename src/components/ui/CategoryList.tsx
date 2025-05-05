
import React from 'react';
import { categories } from '@/lib/mockData';
import { Apple, PaintBrush, Utensils, Shirt, Leaf, Flower } from 'lucide-react';

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'apple':
      return <Apple size={18} />;
    case 'paintbrush':
      return <PaintBrush size={18} />;
    case 'utensils':
      return <Utensils size={18} />;
    case 'shirt':
      return <Shirt size={18} />;
    case 'leaf':
      return <Leaf size={18} />;
    case 'flower':
      return <Flower size={18} />;
    default:
      return null;
  }
};

interface CategoryListProps {
  onSelectCategory?: (categoryId: string) => void;
  selectedCategoryId?: string;
}

const CategoryList: React.FC<CategoryListProps> = ({ onSelectCategory, selectedCategoryId }) => {
  return (
    <div className="overflow-x-auto py-4">
      <div className="flex space-x-3 min-w-max px-4">
        <button 
          className={`category-pill flex items-center gap-2 ${!selectedCategoryId 
            ? 'bg-barrio-primary text-white' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          onClick={() => onSelectCategory && onSelectCategory('')}
        >
          Todos
        </button>
        
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-pill flex items-center gap-2 ${selectedCategoryId === category.id 
              ? 'bg-barrio-primary text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => onSelectCategory && onSelectCategory(category.id)}
          >
            {getCategoryIcon(category.icon)}
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
