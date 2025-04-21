// src/components/organismos/GraficoAgua.tsx
"use client";

import React from "react";

interface Props {
  porcentaje: number;
}

const GraficoAgua: React.FC<Props> = ({ porcentaje }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 text-center">
      <h2 className="text-lg font-bold mb-4">Agua</h2>
      <div className="w-full h-24 rounded-lg bg-blue-500 flex items-center justify-center">
        <div
          className="text-white text-2xl font-bold"
        >
          {porcentaje}%
        </div>
      </div>
    </div>
  );
};

export default GraficoAgua;
