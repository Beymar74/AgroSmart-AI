import React, { useState } from 'react';
import { 
  Home, 
  MapPin, 
  FolderOpen, 
  Clock, 
  Activity,
  TrendingUp,
  X,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard', active: true },
    { icon: MapPin, label: 'Ubicación', href: '/ubicacion' },
    { icon: FolderOpen, label: 'Datos históricos', href: '/datos' },
    { icon: Clock, label: 'Programación', href: '/programacion' },
  ];

  const accordionItems = [
    {
      title: "Alertas y Notificaciones",
      content: <p className="text-sm text-gray-600">No hay alertas recientes</p>,
    },
    {
      title: "Datos Ambientales",
      content: (
        <div className="space-y-2 text-sm text-gray-600">
          <p>🌡️ Temperatura: 22.7°C</p>
          <p>🔆 Luz: 100</p>
          <p>🌱 Humedad del Suelo: 4095</p>
        </div>
      ),
    },
    {
      title: "Monitoreo Animal",
      content: (
        <div className="space-y-2 text-sm text-gray-600">
          <p>Código: COW001</p>
          <p>Temp. Animal (IR): 19.89°C</p>
          <p>Estado: Normal</p>
          <p>Última Alimentación: 08:00</p>
        </div>
      ),
    },
    {
      title: "Acciones Rápidas",
      content: (
        <div className="space-y-2 text-sm text-gray-600">
          <p>🚰 Riego: Automático</p>
          <p>🍽️ Alimentador: Desactivado</p>
          <p>💨 Ventilador: Automático</p>
        </div>
      ),
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenAccordion(prev => (prev === index ? null : index));
  };

  return (
    <>
      {/* Overlay para móvil */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:shadow-none border-r border-gray-200 flex flex-col h-full
      `}>
        {/* Header del sidebar */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div className="ml-3">
              <h1 className="text-lg font-bold text-gray-900">AgroSmart IA</h1>
              <p className="text-xs text-gray-500">Agricultura Inteligente</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navegación principal */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className={`
                flex items-center px-4 py-3 rounded-lg transition-colors duration-200
                ${item.active 
                  ? 'bg-green-50 text-green-700 border-r-2 border-green-500' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Acordeones para móvil */}
        <div className="flex-1 overflow-y-auto p-4 lg:hidden">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Información del Sistema</h3>
          {accordionItems.map((item, index) => (
            <div key={index} className="mb-3 border border-gray-200 rounded-lg bg-gray-50">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full text-left font-medium p-3 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
              >
                <span className="text-sm text-gray-900">{item.title}</span>
                {openAccordion === index ? (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                )}
              </button>
              {openAccordion === index && (
                <div className="px-3 pb-3 border-t border-gray-200">
                  {item.content}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer del sidebar */}
        <div className="p-4 border-t border-gray-200">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Sistema Activo</p>
                <p className="text-xs text-gray-500">Monitoreo en tiempo real</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;