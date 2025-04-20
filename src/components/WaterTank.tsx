/* components/WaterTank.tsx */
import React from 'react';

interface WaterTankProps {
  nivelPorcentaje: number;          // entre 0 y 100
  borderColorClass: string;         // p.ej. 'border-blue-500'
  fillColorClass: string;           // p.ej. 'bg-blue-400'
  textColorClass: string;           // p.ej. 'text-blue-900'
}

export default function WaterTank({ nivelPorcentaje, borderColorClass, fillColorClass, textColorClass }: WaterTankProps) {
  const altura = Math.max(0, Math.min(100, nivelPorcentaje));
  return (
    // Tanque alto para simetría vertical
    <div className={`relative w-24 h-56 border-2 ${borderColorClass} rounded-lg overflow-hidden bg-white shadow-md`}>
      {/* nivel de llenado */}
      <div
        className={`absolute bottom-0 left-0 w-full ${fillColorClass} transition-all duration-700`}
        style={{ height: `${altura}%` }}
      />
      {/* porcentaje centrado */}
      <div className={`absolute inset-0 flex items-center justify-center font-bold text-sm ${textColorClass}`}>
        {altura}%
      </div>
    </div>
  );
}
