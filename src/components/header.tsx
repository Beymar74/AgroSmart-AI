import React from 'react';
import { Menu, Bell } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  showMenuButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, showMenuButton = true }) => {
  const handleNotificationClick = () => {
    // Aquí puedes agregar la lógica que necesites para las notificaciones
    console.log('Notificaciones clickeadas');
    // Ejemplo: abrir un dropdown, mostrar un modal, etc.
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-4 lg:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="block p-2 hover:bg-gray-100 rounded-lg mr-2 transition-colors duration-200"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Panel de Control</h1>
            <p className="text-sm text-gray-500">Monitoreo y gestión inteligente</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Indicador de estado en línea */}
          <div className="hidden sm:flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-700">En línea</span>
          </div>
          
          {/* Botón de notificaciones */}
          <button 
            onClick={handleNotificationClick}
            className="p-2 hover:bg-gray-100 rounded-lg relative transition-colors duration-200"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;