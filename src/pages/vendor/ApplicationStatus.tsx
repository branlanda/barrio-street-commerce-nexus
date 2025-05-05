
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

const ApplicationStatus = () => {
  const { pendingVendorApplication } = useAuth();
  const navigate = useNavigate();
  
  // If there's no application, redirect to the become vendor page
  if (!pendingVendorApplication) {
    navigate('/vendor/become');
    return null;
  }
  
  const { status, createdAt } = pendingVendorApplication;
  const formattedDate = new Date(createdAt).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <>
      <Header />
      <div className="container mx-auto max-w-md py-12 px-4">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          {status === 'pending' && (
            <>
              <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-amber-500" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Solicitud en Revisión</h1>
              <p className="mt-2 text-gray-600">
                Tu solicitud enviada el {formattedDate} se encuentra en revisión por nuestro equipo.
              </p>
              <div className="mt-6 space-y-4">
                <div className="bg-amber-50 rounded-lg p-4">
                  <p className="text-sm text-amber-800">
                    El tiempo aproximado de revisión es de 1-3 días hábiles. Recibirás una notificación cuando se complete el proceso.
                  </p>
                </div>
              </div>
            </>
          )}
          
          {status === 'approved' && (
            <>
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">¡Solicitud Aprobada!</h1>
              <p className="mt-2 text-gray-600">
                Tu cuenta ha sido actualizada a vendedor. Ahora puedes comenzar a configurar tu perfil y añadir productos.
              </p>
              <div className="mt-6">
                <Button 
                  onClick={() => navigate('/vendor/profile')}
                  className="bg-barrio-primary hover:bg-barrio-primary-dark"
                >
                  Ir a Mi Perfil de Vendedor
                </Button>
              </div>
            </>
          )}
          
          {status === 'rejected' && (
            <>
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="h-8 w-8 text-red-500" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Solicitud Rechazada</h1>
              <p className="mt-2 text-gray-600">
                Lo sentimos, tu solicitud ha sido rechazada. Revisa los requisitos e intenta nuevamente.
              </p>
              <div className="mt-6 space-y-4">
                <Button 
                  onClick={() => navigate('/vendor/become')}
                  className="bg-barrio-primary hover:bg-barrio-primary-dark"
                >
                  Intentar Nuevamente
                </Button>
              </div>
            </>
          )}
          
          <Button 
            variant="outline" 
            onClick={() => navigate('/')} 
            className="mt-4 w-full"
          >
            Volver al Inicio
          </Button>
        </div>
      </div>
    </>
  );
};

export default ApplicationStatus;
