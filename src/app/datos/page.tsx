"use client";
import React from 'react';
import Header from '@/components/header';  // Asegúrate de que la ruta sea correcta
import Sidebar from '@/components/sidebar';  // Asegúrate de que la ruta sea correcta
import SidebarDer from '@/components/sidebarDer'; // Asegúrate de que la ruta sea correcta
import Datos from '@/components/datos'; // Asegúrate de que la ruta sea correcta

function App() {
  return (
    <div className="App flex min-h-screen">
      {/* Sidebar izquierdo */}
      <Sidebar /> 

      {/* Panel de control en la parte central */}
      <div className="main-content flex flex-col flex-grow ml-1 mr-1">
        <Header title="Panel de Control" setMostrarSidebar={function (value: boolean): void {
          throw new Error('Function not implemented.');
        } } />
        <div className="dashboard-container flex-1">
          <Datos />
        </div>
      </div>

      {/* Sidebar derecho */}
      <SidebarDer />
    </div>
  );
}

export default App;
