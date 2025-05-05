
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
          <Search className="h-5 w-5 text-gray-500" />
        </div>
        <input
          type="search"
          className="block w-full p-3 pl-12 text-base rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-barrio-blue border border-gray-200 text-gray-800"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-2.5 top-1/2 transform -translate-y-1/2 px-4 py-1.5 rounded-md text-white font-medium bg-barrio-blue hover:bg-barrio-blue/90 transition-colors"
        >
          Buscar
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
