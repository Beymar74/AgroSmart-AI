"use client";
import React, { useState, useEffect } from 'react';
import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import SidebarDer from '@/components/sidebarDer';
import Dashboard from '@/components/Dashboard';

function App() {
  // Estado para controlar visibilidad de sidebars en móviles
  const [mostrarSidebarIzq, setMostrarSidebarIzq] = useState(false);
  const [mostrarSidebarDer, setMostrarSidebarDer] = useState(false);
  
  useEffect(() => {
    // Al recibir el evento "toggle-sidebar-der", alternamos sidebarDer
    const handler = () => setMostrarSidebarDer(prev => !prev);
    window.addEventListener('toggle-sidebar-der', handler);
    return () => window.removeEventListener('toggle-sidebar-der', handler);
  }, []);

  return (
    <div className="App flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar izquierdo: oculto en mobile, aparece como off-canvas cuando mostrarSidebarIzq = true */}
      <div
        className={`
          fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg 
          transition-transform duration-300 ease-in-out
          md:static md:translate-x-0 md:flex
          ${mostrarSidebarIzq ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <Sidebar />
      </div>

      {/* Overlay semitransparente cuando el sidebar izquierdo está abierto en mobile */}
      {mostrarSidebarIzq && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-30 md:hidden"
          onClick={() => setMostrarSidebarIzq(false)}
        />
      )}

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <Header
          title="Panel de Control"
          // Al pulsar hamburguesa, abrimos el sidebar izquierdo en móviles
          setMostrarSidebar={() => setMostrarSidebarIzq(prev => !prev)}
        />

        <div className="flex flex-1 overflow-hidden">
          {/* Contenido central (Dashboard) con padding y overflow auto */}
          <main className="flex flex-1 flex-col overflow-auto p-4">
            <Dashboard />
          </main>

          {/* Sidebar derecho: oculto en mobile, aparece como off-canvas posicionado a la derecha */}
          <div
            className={`
              fixed inset-y-0 right-0 z-30 w-64 transform bg-white shadow-lg 
              transition-transform duration-300 ease-in-out
              md:static md:translate-x-0 md:flex
              ${mostrarSidebarDer ? 'translate-x-0' : 'translate-x-full'}
            `}
          >
            <SidebarDer />
          </div>

          {/* Overlay semitransparente cuando el sidebar derecho está abierto en mobile */}
          {mostrarSidebarDer && (
            <div
              className="fixed inset-0 z-20 bg-black bg-opacity-30 md:hidden"
              onClick={() => setMostrarSidebarDer(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
