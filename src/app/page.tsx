"use client";
import React, { useState } from 'react';
import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import SidebarDer from '@/components/sidebarDer';
import Dashboard from '@/components/Dashboard';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar izquierdo - Posición fija */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>
      
      {/* Overlay para móviles cuando sidebar está abierto */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Contenido principal */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Header */}
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        {/* Dashboard y Sidebar derecho */}
        <div className="flex flex-1">
          {/* Dashboard central */}
          <div className="flex-1 min-w-0">
            <Dashboard />
          </div>
          
          {/* Sidebar derecho - oculto en móviles */}
          <div className="hidden xl:block w-80 flex-shrink-0">
            <SidebarDer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;