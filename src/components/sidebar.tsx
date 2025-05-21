"use client";

import React, { useState } from 'react';
import { Menu, X } from "lucide-react";

const Sidebar: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleAccordion = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {/* Botón hamburguesa para móviles */}
      <div className="lg:hidden p-4">
        <button onClick={toggleMenu} className="text-black focus:outline-none">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`sidebar bg-[#f7f7f7] text-black w-64 h-full flex-col p-6 fixed z-40 top-0 left-0 transform ${menuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative lg:flex`}>

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
            <a href="/reportes" className="flex items-center space-x-2 hover:bg-gray-200 p-2 rounded">
              <img src="/Reportes.png" alt="Reportes Icon" className="w-6 h-6" />
              <span>Reportes</span>
            </a>
          </li>
          <li>
            <a href="/datos" className="flex items-center space-x-2 hover:bg-gray-200 p-2 rounded">
              <img src="/FolderNotch.png" alt="Datos históricos Icon" className="w-6 h-6" />
              <span>Datos históricos</span>
            </a>
          </li>
          <li>
            <a href="/programacion" className="flex items-center space-x-2 hover:bg-gray-200 p-2 rounded">
              <img src="/reloj.png" alt="Programación Icon" className="w-6 h-6" />
              <span>Programación</span>
            </a>
          </li>
        </ul>

        {/* SECCIONES INFORMATIVAS - MÓVIL (Acordeones) */}
        <div className="mt-6 block lg:hidden">
          {[{
            title: "Alertas y Notificaciones",
            content: <p>No hay alertas recientes</p>,
          }, {
            title: "Datos Ambientales",
            content: (
              <>
                <p>Temperatura: °C</p>
                <p>Luz:</p>
                <p>Humedad del Suelo:</p>
              </>
            ),
          }, {
            title: "Monitoreo Animal",
            content: (
              <>
                <p>Código:</p>
                <p>Temp. Animal (IR):</p>
                <p>Estado:</p>
                <p>Última Alimentación:</p>
              </>
            ),
          }, {
            title: "Acciones Rápidas",
            content: (
              <>
                <p>Riego</p>
                <p>Alimentador</p>
                <p>Ventilador</p>
              </>
            )
          }].map((section, index) => (
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
    </>
  );
};

export default Sidebar;
