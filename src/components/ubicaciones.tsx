'use client';

import React, { useState } from 'react';


const MapaUbicacion: React.FC = () => {
  const [selectedAnimal, setSelectedAnimal] = useState('Cow001');

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Mapa en Tiempo Real</h2>
      

      {/* Selector de código del animal */}
      <div className="mb-6">
        <label htmlFor="animal" className="block text-lg mb-2">Seleccionar El Código Del Animal:</label>
        <select
          id="animal"
          value={selectedAnimal}
          onChange={(e) => setSelectedAnimal(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="Cow001">Cow001</option>
          <option value="Cow002">Cow002</option>
          <option value="Cow003">Cow003</option>
          {/* Puedes añadir más opciones según lo necesites */}
        </select>
      </div>

      {/* Imagen simulada del mapa */}
      <div className="mb-6">
        <img
          src="/Picture12.jpg"  // Ruta de la imagen simulada en la carpeta public
          alt="Ubicación simulada del mapa"
          className="mx-auto mb-6 w-full h-auto max-w-4xl border rounded-lg shadow-lg"  // Aumenté el tamaño aquí
        />
      </div>

      {/* Etiqueta para mostrar la fecha actual */}
      <div className="text-sm text-gray-500">Today</div>
    </div>
  );
};

export default MapaUbicacion;
