
import React, { useState } from 'react';
import SearchBar from '../search/SearchBar';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Filter } from 'lucide-react';

interface SearchPanelProps {
  title: string;
  description: string;
  onSearch: (query: string) => void;
  placeholder?: string;
  showExport?: boolean;
  showFilters?: boolean;
}

const SearchPanel: React.FC<SearchPanelProps> = ({
  title,
  description,
  onSearch,
  placeholder,
  showExport = false,
  showFilters = false
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="flex space-x-2">
            {showFilters && (
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            )}
            {showExport && (
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <SearchBar 
          onSearch={handleSearch} 
          placeholder={placeholder || "Buscar..."} 
        />
      </CardContent>
    </Card>
  );
};

export default SearchPanel;
