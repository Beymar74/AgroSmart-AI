// src/components/organismos/GraficoAgua.tsx
"use client";

import React from "react";

interface Props {
  porcentaje: number;
}

const GraficoAgua: React.FC<Props> = ({ porcentaje }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 text-center">
      <h2 className="text-lg font-bold mb-2">Nivel de Agua</h2>
      <div className="w-12 mx-auto h-40 border-2 border-blue-400 rounded-md flex items-end">
        <div
          className="bg-blue-300 w-full transition-all duration-500"
          style={{ height: `${porcentaje}%` }}
        />
      </div>
      <p className="mt-2 font-semibold text-blue-600">{porcentaje}%</p>
    </div>
  );
};

export default GraficoAgua;
