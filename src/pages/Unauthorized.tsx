
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';
import Footer from '@/components/layout/Footer';

const Unauthorized = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <Header />
      <div className="container flex flex-col items-center justify-center min-h-[70vh] py-12 px-4">
        <div className="text-center">
          <div className="mx-auto w-24 h-24 bg-barrio-pink/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
            <ShieldAlert className="h-12 w-12 text-barrio-pink" />
          </div>
          <h1 className="text-4xl font-bold text-barrio-dark mb-3">Acceso Restringido</h1>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            No tienes permisos suficientes para acceder a esta sección. Si crees que 
            esto es un error, contacta a soporte.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              onClick={() => navigate('/')}
              className="bg-barrio-pink hover:bg-barrio-pink/90 text-white barrio-button"
            >
              Volver al Inicio
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
              className="border-barrio-blue text-barrio-blue hover:bg-barrio-blue/10"
            >
              Volver Atrás
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Unauthorized;
