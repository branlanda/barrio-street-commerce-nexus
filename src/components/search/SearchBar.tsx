
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
  debounceTime?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "Buscar productos, vendedores...",
  initialValue = "",
  debounceTime = 300
}) => {
  const [query, setQuery] = useState(initialValue);
  const [debouncedQuery, setDebouncedQuery] = useState(initialValue);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  // Set up debounce effect for search-as-you-type
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceTime);

    return () => {
      clearTimeout(timer);
    };
  }, [query, debounceTime]);

  // Trigger search when debounced query changes
  useEffect(() => {
    if (debouncedQuery !== initialValue) {
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery, onSearch, initialValue]);

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Search className="h-5 w-5 text-barrio-orange" />
        </div>
        <input
          type="search"
          className="block w-full p-3 pl-12 text-base rounded-lg bg-white/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-barrio-orange border border-orange-100 text-gray-800"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-2.5 top-1/2 transform -translate-y-1/2 px-4 py-1.5 rounded-md text-white font-medium bg-gradient-to-r from-barrio-orange to-barrio-pink hover:opacity-90 transition-colors"
        >
          Buscar
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
