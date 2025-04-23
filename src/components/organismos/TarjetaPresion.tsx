import React from "react";

interface TarjetaPresionProps {
  presion: number | null;
}

const TarjetaPresion: React.FC<TarjetaPresionProps> = ({ presion }) => {
  const getColor = () => {
    if (presion === null) return "text-gray-400";
    if (presion < 1000) return "text-red-600"; // Baja presión
    if (presion > 1020) return "text-yellow-500"; // Alta presión
    return "text-blue-600"; // Normal
  };

  const getIcon = () => {
    if (presion === null) return "🌫️";
    if (presion < 1000) return "⬇️";
    if (presion > 1020) return "⬆️";
    return "✅";
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center text-center">
      <span className="text-sm text-gray-500">Presión Atmosférica</span>
      <span className={`text-3xl font-bold ${getColor()}`}>
        {presion !== null ? `${presion.toFixed(1)} hPa` : "--"}
      </span>
      <span className="text-2xl mt-1">{getIcon()}</span>
    </div>
  );
};

export default TarjetaPresion;