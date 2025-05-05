
import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "Buscar productos, vendedores..." 
}) => {
  const [query, setQuery] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="search"
          className="block w-full p-4 pl-12 text-sm rounded-full bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-barrio-pink border-none"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-2.5 inset-y-2 px-6 rounded-full text-white font-medium bg-gradient-to-r from-barrio-pink to-barrio-secondary hover:opacity-90 transition-opacity"
        >
          Buscar
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
