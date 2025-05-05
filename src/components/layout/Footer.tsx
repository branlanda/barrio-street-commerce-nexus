
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-barrio-dark text-white pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="font-display font-bold text-2xl mb-4">
              Barrio<span className="text-barrio-accent">Market</span>
            </div>
            <p className="text-gray-300 mb-4">
              Conectando vendedores locales con compradores en toda Latinoamérica.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Explorar</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white">Inicio</Link></li>
              <li><Link to="/categories" className="text-gray-300 hover:text-white">Categorías</Link></li>
              <li><Link to="/vendors" className="text-gray-300 hover:text-white">Vendedores</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white">Sobre Nosotros</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Para Vendedores</h3>
            <ul className="space-y-2">
              <li><Link to="/join" className="text-gray-300 hover:text-white">Únete como Vendedor</Link></li>
              <li><Link to="/vendor-login" className="text-gray-300 hover:text-white">Ingresa a tu Cuenta</Link></li>
              <li><Link to="/resources" className="text-gray-300 hover:text-white">Recursos</Link></li>
              <li><Link to="/success-stories" className="text-gray-300 hover:text-white">Historias de Éxito</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Soporte</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-gray-300 hover:text-white">Centro de Ayuda</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white">Contacto</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-white">Políticas de Privacidad</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white">Términos y Condiciones</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>© 2025 BarrioMarket. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
