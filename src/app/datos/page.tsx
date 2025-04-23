"use client";

import React, { useState } from "react";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import SidebarDer from "@/components/sidebarDer";
import Datos from "@/components/datoshistoricos";

export default function Page() {
  const [mostrarSidebar, setMostrarSidebar] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header fijo arriba */}
      <Header title="Panel de Control" setMostrarSidebar={setMostrarSidebar} />

      {/* Contenido principal dividido en tres partes */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar izquierdo */}
        <div className="hidden md:block w-64">
          <Sidebar />
        </div>

        {/* Sidebar móvil */}
        {mostrarSidebar && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-40 z-40"
              onClick={() => setMostrarSidebar(false)}
            />
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

        {/* Dashboard (contenido central) */}
        <div className="flex-grow overflow-y-auto p-4">
          <Datos />
        </div>

        {/* Sidebar derecho */}
        <div className="hidden xl:block w-96">
          <SidebarDer />
        </div>
      </div>
    </div>
  );
}
