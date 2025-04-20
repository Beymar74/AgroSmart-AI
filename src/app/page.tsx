"use client";

import React, { useState } from 'react';
import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import SidebarDer from '@/components/sidebarDer';
import Dashboard from '@/components/Dashboard';

export default function App() {
  const [mostrarSidebar, setMostrarSidebar] = useState(false);

  return (
    <div className="flex min-h-screen relative overflow-x-hidden">
      {/* Sidebar fijo en escritorio */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Sidebar flotante para móviles con scroll */}
      {mostrarSidebar && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setMostrarSidebar(false)}
          />

          {/* Panel flotante con scroll interno */}
          <div className="fixed top-0 left-0 z-50 bg-white shadow-lg w-64 h-full overflow-y-auto animate-slide-in-left">
            <Sidebar />
            <button
              onClick={() => setMostrarSidebar(false)}
              className="text-red-600 font-semibold px-6 py-2"
            >
              ✖ Cerrar
            </button>
          </div>
        </>
      )}

      {/* Contenido principal */}
      <div className="flex flex-col flex-grow w-full">
        <Header title="Panel de Control" setMostrarSidebar={setMostrarSidebar} />
        <div className="dashboard-container flex-1">
          <Dashboard />
        </div>
      </div>

      {/* Sidebar derecho solo en pantallas grandes */}
      <div className="hidden lg:block">
        <SidebarDer />
      </div>
    </div>
  );
}
