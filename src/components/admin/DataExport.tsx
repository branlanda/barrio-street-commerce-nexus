
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileSpreadsheet, FileJson } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from 'date-fns';

const DataExport = () => {
  const [isExporting, setIsExporting] = useState<{[key: string]: boolean}>({
    users: false,
    vendors: false,
    products: false,
    orders: false,
    geojson: false
  });

  const handleExport = async (dataType: string, fileFormat: 'csv' | 'json') => {
    setIsExporting(prev => ({ ...prev, [dataType]: true }));
    
    try {
      // Mock export process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create filename with timestamp
      const timestamp = format(new Date(), 'yyyy-MM-dd-HHmm');
      const filename = `barrio-market-${dataType}-${timestamp}.${fileFormat}`;
      
      // In a real app, this would fetch data from API and create a file
      console.log(`Exporting ${dataType} as ${fileFormat} with filename: ${filename}`);
      
      // For demo purposes we'll just show how you might trigger a download
      // In a real app, you'd create a blob and use it to download the file
      const mockData = JSON.stringify({
        exportType: dataType,
        timestamp: new Date().toISOString(),
        entries: []
      });
      
      const blob = new Blob([mockData], { type: fileFormat === 'csv' ? 'text/csv' : 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      // If this were a real Storage system (e.g. browser's Storage API):
      // localStorage.setItem('lastExport', new Date().toISOString());
    } catch (error) {
      console.error(`Error exporting ${dataType}:`, error);
    } finally {
      setIsExporting(prev => ({ ...prev, [dataType]: false }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Exportar Datos</h2>
          <p className="text-muted-foreground">
            Exporta datos anonimizados del marketplace para análisis.
          </p>
        </div>
      </div>

      <Tabs defaultValue="tabular">
        <TabsList className="mb-4">
          <TabsTrigger value="tabular">Datos Tabulares</TabsTrigger>
          <TabsTrigger value="geo">Datos Geoespaciales</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tabular" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {id: 'users', name: 'Usuarios'},
              {id: 'vendors', name: 'Vendedores'},
              {id: 'products', name: 'Productos'},
              {id: 'orders', name: 'Pedidos'},
              {id: 'reviews', name: 'Reseñas'}
            ].map(dataset => (
              <Card key={dataset.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{dataset.name}</CardTitle>
                  <CardDescription>
                    Datos de {dataset.name.toLowerCase()} anonimizados
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleExport(dataset.id, 'csv')}
                    disabled={isExporting[dataset.id]}
                  >
                    <FileSpreadsheet className="mr-1 h-4 w-4" />
                    {isExporting[dataset.id] ? 'Exportando...' : 'CSV'}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleExport(dataset.id, 'json')}
                    disabled={isExporting[dataset.id]}
                  >
                    <FileJson className="mr-1 h-4 w-4" />
                    {isExporting[dataset.id] ? 'Exportando...' : 'JSON'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="geo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Datos GeoJSON</CardTitle>
              <CardDescription>
                Exporta la ubicación de vendedores y áreas de servicio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => handleExport('geojson', 'json')}
                disabled={isExporting.geojson}
              >
                <Download className="mr-2 h-4 w-4" />
                {isExporting.geojson ? 'Exportando...' : 'Exportar GeoJSON'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataExport;
