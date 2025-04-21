// src/components/Indicadores.tsx
import React from 'react';

const Indicadores: React.FC = () => {
  return (

    <div className="bg-white p-4 mb-6 shadow rounded-lg flex justify-between space-x-4">
      <div className="text-center flex-1">
        <h3 className="font-semibold">Temperatura máxima</h3>
        <p className="text-2xl font-bold text-green-600">35°C</p>
        <p className="text-sm text-green-600">+10%</p>
      </div>
      <div className="text-center flex-1">
        <h3 className="font-semibold">Temperatura mínima</h3>
        <p className="text-2xl font-bold text-blue-600">5°C</p>
        <p className="text-sm text-red-600">-5%</p>
      </div>
      <div className="text-center flex-1">
        <h3 className="font-semibold">Humedad media</h3>
        <p className="text-2xl font-bold text-yellow-600">60%</p>
        <p className="text-sm text-green-600">+2%</p>
      </div>
    </div>
  );
};

export default Indicadores;
