"use client";

import React from "react";
import { GaugeCircle } from "lucide-react";

interface Props {
  presion: number | null;
}

export default function TarjetaPresion({ presion }: Props) {
  const getColor = () => {
    if (presion === null) return "text-gray-400";
    if (presion < 1000) return "text-red-500";
    if (presion > 1020) return "text-yellow-500";
    return "text-blue-500";
  };

  const getEstado = () => {
    if (presion === null) return "Sin datos";
    if (presion < 1000) return "Baja";
    if (presion > 1020) return "Alta";
    return "Normal";
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
        <GaugeCircle className="w-5 h-5 text-indigo-500" /> Presión
      </h2>
      <span className={`text-3xl font-bold ${getColor()}`}>
        {presion !== null ? `${presion.toFixed(2)} hPa` : "--"}
      </span>
      <span className="mt-1 text-sm text-gray-500">{getEstado()}</span>
    </div>
  );
}
