import React, { useState } from 'react';

const Sidebar: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="sidebar bg-[#f7f7f7] text-black w-47 h-full flex flex-col p-6">

      
      {/* LOGO */}
      <div className="logo flex items-center mb-8">
        <img src="/logotipo.jpg" alt="AgroSmart IA" className="w-12 h-12 mr-4" />
        <div className="text-lg font-bold">AgroSmart IA</div>
      </div>

      {/* MENÚ */}
      <ul className="menu space-y-4">
        <li>
          <a href="/dashboard" className="flex items-center space-x-2 hover:bg-gray-200 p-2 rounded">
            <img src="/ChartPieSlice.png" alt="Dashboard Icon" className="w-6 h-6" />
            <span>Dashboard</span>
          </a>
        </li>
        <li>
          <a href="/ubicacion" className="flex items-center space-x-2 hover:bg-gray-200 p-2 rounded">
            <img src="/ubicacion.png" alt="Ubicación Icon" className="w-6 h-6" />
            <span>Ubicación</span>
          </a>
        </li>
        <li>
          <a href="/datos" className="flex items-center space-x-2 hover:bg-gray-200 p-2 rounded">
            <img src="/FolderNotch.png" alt="Datos históricos Icon" className="w-6 h-6" />
            <span>Datos históricos</span>
          </a>
        </li>
      </ul>

      {/* SECCIONES INFORMATIVAS - MÓVIL (Acordeones) */}
      <div className="mt-6 block lg:hidden">
        {[
          {
            title: "Alertas y Notificaciones",
            content: <p>No hay alertas recientes</p>,
          },
          {
            title: "Datos Ambientales",
            content: (
              <>
                <p>Temperatura: °C</p>
                <p>Luz:</p>
                <p>Humedad del Suelo:</p>
              </>
            ),
          },
          {
            title: "Monitoreo Animal",
            content: (
              <>
                <p>Código:</p>
                <p>Temp. Animal (IR):</p>
                <p>Estado:</p>
                <p>Última Alimentación:</p>
              </>
            ),
          },
          {
            title: "Acciones Rápidas",
            content: (
              <>
                <p>Riego</p>
                <p>Alimentador</p>
                <p>Ventilador</p>
              </>
            ),
          }
        ].map((section, index) => (
          <div key={index} className="mb-4 border rounded shadow bg-white">
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full text-left font-semibold p-3 hover:bg-gray-100"
            >
              {section.title}
            </button>
            {openIndex === index && (
              <div className="px-4 pb-3 text-sm text-gray-700">
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
