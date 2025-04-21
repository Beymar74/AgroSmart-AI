'use client';
import React from 'react';

const Button: React.FC = () => {

  const handleClick = () => {
    alert('Funcionalidad de exportar datos aún no implementada.');
  };

  return (
    <button 
      onClick={handleClick} 
      className="p-2 border rounded flex items-center"
    >
      <img src="Exportar.png" alt="Exportar Icon" className="w-4 h-4 mr-2" />
      Exportar datos
    </button>
  );
};

export default Button;
