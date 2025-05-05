
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';

const Unauthorized = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <Header />
      <div className="container flex flex-col items-center justify-center min-h-[70vh] py-12 px-4">
        <div className="text-center">
          <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <ShieldAlert className="h-10 w-10 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">Acceso Restringido</h1>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            No tienes permisos suficientes para acceder a esta sección. Si crees que 
            esto es un error, contacta a soporte.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button 
              onClick={() => navigate('/')}
              className="bg-barrio-primary hover:bg-barrio-primary-dark"
            >
              Volver al Inicio
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
            >
              Volver Atrás
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Unauthorized;
