"use client";

import React from "react";
import { Droplet } from "lucide-react";

interface Props {
  nivelPorcentaje: number | null;
}

export default function TarjetaTanque({ nivelPorcentaje }: Props) {
  const getColor = () => {
    if (nivelPorcentaje === null) return "bg-gray-200";
    if (nivelPorcentaje < 30) return "bg-red-500";
    if (nivelPorcentaje < 60) return "bg-yellow-400";
    return "bg-blue-400";
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
        <Droplet className="w-5 h-5 text-blue-500" /> Agua
      </h2>
      <div className="relative w-16 h-40 border-2 border-blue-300 rounded-full overflow-hidden">
        <div
          className={`${getColor()} absolute bottom-0 left-0 w-full transition-all duration-500`}
          style={{ height: `${nivelPorcentaje ?? 0}%` }}
        />
      </div>
      <span className="mt-2 font-medium text-lg">
        {nivelPorcentaje !== null ? `${nivelPorcentaje}%` : "--"}
      </span>
    </div>
  );
}
