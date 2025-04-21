import React from 'react';

const Fechas1: React.FC = () => {
  return (
    <div className="flex items-center">
      <button className="p-2 border rounded flex items-center">
      <img src="fecha.png" alt="Calendar Icon" className="w-4 h-4 mr-2" />
      Rango de fechas
      </button>
    </div>
  );
};

export default Fechas1;
