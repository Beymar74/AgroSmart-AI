// Sidebar.tsx
import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar bg-[#fafbfc] text-black w-64 h-full flex flex-col p-6">

      <div className="logo flex items-center mb-8">
        <img src="/logotipo.jpg" alt="AgroSmart IA" className="w-12 h-12 mr-4" />
        <div className="text-lg font-bold">AgroSmart IA</div>
      </div>
      
      <ul className="menu space-y-4">
        <li>
          <a href="#dashboard" className="flex items-center space-x-2 hover:bg-gray-200 p-2 rounded">
            <img src="/ChartPieSlice.png" alt="Dashboard Icon" className="w-6 h-6" />
            <span>Dashboard</span>
          </a>
        </li>
        <li>
          <a href="#ubicacion" className="flex items-center space-x-2 hover:bg-gray-200 p-2 rounded">
            <img src="/ubicacion.png" alt="Ubicación Icon" className="w-6 h-6" />
            <span>Ubicación</span>
          </a>
        </li>
        <li>
          <a href="#datos-historicos" className="flex items-center space-x-2 hover:bg-gray-200 p-2 rounded">
            <img src="/FolderNotch.png" alt="Datos históricos Icon" className="w-6 h-6" />
            <span>Datos históricos</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
