// src/components/organismos/FoodTank.tsx

interface FoodTankProps {
    nivelPorcentaje: number | null; // entre 0 y 100, o null mientras carga
  }
  
  export default function FoodTank({ nivelPorcentaje }: FoodTankProps) {
    const altura = nivelPorcentaje !== null
      ? Math.max(0, Math.min(100, nivelPorcentaje))
      : 0;
  
    return (
      <div className="w-24 h-40 border-4 border-yellow-500 rounded-lg overflow-hidden relative bg-white shadow-md">
        {/* Relleno de comida */}
        <div
          className="absolute bottom-0 left-0 w-full bg-yellow-300 transition-all duration-700"
          style={{ height: `${altura}%` }}
        />
        {/* % en el centro */}
        <div className="absolute inset-0 flex items-center justify-center font-bold text-sm text-yellow-900">
          {nivelPorcentaje !== null ? `${altura}%` : '—'}
        </div>
      </div>
    );
  }
  