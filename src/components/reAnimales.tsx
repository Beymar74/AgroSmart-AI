import React from 'react';

const ReAnimales: React.FC = () => {
  return (
    <div className="flex items-center">
      <button className="p-2 border rounded flex items-center">
        <img src="registro.png" alt="Registro Icon" className="w-4 h-4 mr-2" />
        Registros de animales enfermos
      </button>
    </div>
  );
};

export default ReAnimales;
