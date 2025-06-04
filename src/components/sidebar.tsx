import React, { useState } from 'react';

const Sidebar: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <nav className="flex h-full flex-col bg-[#f7f7f7] p-6 text-black">
      {/* LOGO */}
      <div className="mb-8 flex items-center">
        <img src="/logotipo.jpg" alt="AgroSmart IA" className="w-12 h-12 rounded-full object-cover" />
        <span className="ml-3 text-xl font-bold text-gray-800">AgroSmart IA</span>
      </div>

      {/* MENÚ PRINCIPAL */}
      <ul className="flex-1 space-y-4">
        {[
          { href: '/dashboard', icon: '/ChartPieSlice.png', label: 'Dashboard' },
          { href: '/ubicacion', icon: '/ubicacion.png', label: 'Ubicación' },
          { href: '/datos', icon: '/FolderNotch.png', label: 'Datos históricos' },
          { href: '/programacion', icon: '/reloj.png', label: 'Programación' },
        ].map((item, idx) => (
          <li key={idx}>
            <a
              href={item.href}
              className="flex items-center space-x-3 rounded-lg p-2 text-gray-700 hover:bg-gray-200 transition-colors duration-200"
            >
              <img src={item.icon} alt={`${item.label} Icon`} className="h-6 w-6" />
              <span className="text-base font-medium">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>

      {/* SECCIONES INFORMATIVAS PARA MÓVIL */}
      <div className="mt-6 block lg:hidden">
        {[
          {
            title: "Alertas y Notificaciones",
            content: <p className="text-gray-600">No hay alertas recientes</p>,
          },
          {
            title: "Datos Ambientales",
            content: (
              <div className="space-y-1">
                <p>Temperatura: °C</p>
                <p>Luz: </p>
                <p>Humedad del Suelo: </p>
              </div>
            ),
          },
          {
            title: "Monitoreo Animal",
            content: (
              <div className="space-y-1">
                <p>Código: </p>
                <p>Temp. Animal (IR): </p>
                <p>Estado: </p>
                <p>Última Alimentación: </p>
              </div>
            ),
          },
          {
            title: "Acciones Rápidas",
            content: (
              <div className="space-y-1">
                <p>Riego</p>
                <p>Alimentador</p>
                <p>Ventilador</p>
              </div>
            ),
          },
        ].map((section, index) => (
          <div key={index} className="mb-4 rounded-lg border bg-white shadow">
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full cursor-pointer bg-gray-100 px-3 py-2 text-left font-semibold text-gray-700 hover:bg-gray-200"
            >
              {section.title}
            </button>
            {openIndex === index && (
              <div className="px-4 py-2 text-sm text-gray-600">
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
